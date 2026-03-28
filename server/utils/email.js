import nodemailer from 'nodemailer';

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────────────────── */

const normalizeUrl = (value) => {
  if (!value || typeof value !== 'string') return null;
  const trimmed = value.trim().replace(/\/+$/, '');
  if (!trimmed) return null;
  try {
    const parsed = new URL(trimmed);
    if (!['http:', 'https:'].includes(parsed.protocol)) return null;
    return parsed.toString().replace(/\/+$/, '');
  } catch {
    return null;
  }
};

const isLikelyApiUrl = (value) => {
  try {
    return new URL(value).pathname.startsWith('/api');
  } catch {
    return false;
  }
};

const getClientBaseUrl = () => {
  const candidates = [
    process.env.RESET_PASSWORD_URL_BASE,
    process.env.FRONTEND_URL,
    process.env.CLIENT_APP_URL,
    process.env.WEBSITE_URL,
    process.env.CLIENT_URL,
    process.env.APP_URL,
    ...(process.env.CLIENT_URLS ? process.env.CLIENT_URLS.split(',') : []),
  ];

  for (const candidate of candidates) {
    const normalized = normalizeUrl(candidate);
    if (!normalized || isLikelyApiUrl(normalized)) continue;
    return normalized;
  }

  if (process.env.NODE_ENV === 'production') {
    const vppUrl = normalizeUrl(
      process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : null
    );
    if (vppUrl) return vppUrl;
    const vuUrl = normalizeUrl(
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
    );
    if (vuUrl) return vuUrl;
    return 'https://funclexa.com';
  }

  return 'http://localhost:5173';
};

export const buildResetUrl = (resetToken) =>
  `${getClientBaseUrl()}/reset-password/${resetToken}`;

export const buildVerifyEmailUrl = (verificationToken) =>
  `${getClientBaseUrl()}/verify-email/${verificationToken}`;

const escapeHtml = (v = '') =>
  String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/* ─────────────────────────────────────────────────────────────────────────────
   Transport helpers
───────────────────────────────────────────────────────────────────────────── */

const getSmtpTransport = () => {
  const host = process.env.SMTP_HOST || process.env.EMAIL_HOST;
  const port = process.env.SMTP_PORT || process.env.EMAIL_PORT;
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  if (!host || !port || !user || !pass) return null;
  const parsedPort = Number(port);
  const isGmail = String(host).toLowerCase() === 'smtp.gmail.com';
  return nodemailer.createTransport({
    host, port: parsedPort,
    secure: parsedPort === 465,
    requireTLS: parsedPort === 587,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
    auth: { user, pass },
    tls: isGmail ? { servername: 'smtp.gmail.com' } : undefined,
  });
};

/**
 * Primary delivery via Resend REST API.
 * Returns { delivered: true } on success, throws on failure.
 */
const sendViaResend = async ({ from, to, subject, text, html }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddr = from || process.env.RESEND_FROM || process.env.EMAIL_FROM;
  if (!apiKey || !fromAddr) {
    throw new Error('RESEND_API_KEY or RESEND_FROM not configured');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: fromAddr, to: [to], subject, text, html }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Resend API error ${response.status}: ${errText}`);
  }

  return { delivered: true };
};

/**
 * Send an email — tries Resend first, falls back to SMTP in non-production.
 * In production, Resend failures are fatal (no silent fallback).
 */
const sendEmail = async ({ to, subject, text, html }) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const hasResend = !!(process.env.RESEND_API_KEY && (process.env.RESEND_FROM || process.env.EMAIL_FROM));
  const hasSmtp = !!(process.env.SMTP_HOST || process.env.EMAIL_HOST);

  if (hasResend) {
    try {
      return await sendViaResend({ to, subject, text, html });
    } catch (err) {
      console.error('[Email] Resend failed:', err?.message || err);
      if (isProduction) {
        throw err;
      }
      if (!hasSmtp) {
        // In development, don't hard-fail auth flows when email providers are unavailable.
        return { delivered: false, reason: 'resend_failed_no_smtp' };
      }
      console.error('[Email] Falling back to SMTP...');
    }
  }

  // SMTP fallback 
  const transport = getSmtpTransport();
  if (!transport) {
    if (isProduction) {
      throw new Error('No email provider (Resend or SMTP) configured correctly.');
    }
    return { delivered: false, reason: 'provider_not_configured' };
  }

  const from =
    process.env.SMTP_FROM ||
    process.env.EMAIL_FROM ||
    process.env.SMTP_USER ||
    process.env.EMAIL_USER;

  try {
    const result = await Promise.race([
      transport.sendMail({ from, to, subject, text, html }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('SMTP send timeout')), 15_000)
      ),
    ]);

    if (!result) throw new Error('SMTP send failed');
    return { delivered: true };
  } catch (err) {
    if (isProduction) throw err;
    console.error('[Email] SMTP failed:', err?.message || err);
    return { delivered: false, reason: 'smtp_failed' };
  }
};

/* ─────────────────────────────────────────────────────────────────────────────
   HTML Templates
───────────────────────────────────────────────────────────────────────────── */

const buildResetPasswordHtml = ({ name, resetUrl }) => {
  const safeName = escapeHtml(name || 'there');
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset your password</title>
  </head>
  <body style="margin:0;padding:0;background:#020617;font-family:'Segoe UI',Arial,sans-serif;color:#e5e7eb;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;background:#0f172a;border:1px solid #1f2a44;border-radius:24px;overflow:hidden;box-shadow:0 20px 48px rgba(2,6,23,0.55);">
          <tr>
            <td style="background:radial-gradient(circle at 10% 20%,rgba(56,189,248,0.45),transparent 55%),linear-gradient(120deg,#0f172a,#1d4ed8 45%,#0ea5e9);padding:30px 32px;">
              <div style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;font-weight:800;color:#e0f2fe;">FuncLexa Premium Security</div>
              <h1 style="margin:10px 0 0;font-size:28px;font-weight:900;color:#f8fafc;">Password Reset Request</h1>
              <p style="margin:8px 0 0;font-size:13px;color:#bfdbfe;">For your FuncLexa ecosystem account</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#cbd5e1;">Hi <strong style="color:#f8fafc;">${safeName}</strong>,</p>
              <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#94a3b8;">
                We received a request to reset your <strong style="color:#38bdf8;">FuncLexa</strong> password. This secure link gives you direct access to update credentials.
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;">
                <tr>
                  <td align="center" style="border-radius:12px;background:linear-gradient(135deg,#38bdf8,#2563eb);">
                    <a href="${resetUrl}" style="display:inline-block;padding:14px 28px;color:#eff6ff;text-decoration:none;font-size:15px;font-weight:700;letter-spacing:0.02em;">Reset Password</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 8px;font-size:13px;color:#64748b;">This link expires in <strong style="color:#94a3b8;">15 minutes</strong>. If this was not you, you can safely ignore this email.</p>
              <p style="margin:0;font-size:12px;color:#475569;word-break:break-all;">Fallback URL: <a href="${resetUrl}" style="color:#38bdf8;text-decoration:none;">${resetUrl}</a></p>
              <div style="margin:24px 0 0;padding-top:20px;border-top:1px solid #1e2b45;">
                <p style="margin:0;font-size:13px;color:#475569;">With gratitude,<br/><strong style="color:#94a3b8;">Team FuncLexa</strong></p>
              </div>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
};
const buildSignupOtpHtml = ({ name, otp }) => {
  const safeName = escapeHtml(name || 'there');
  const safeOtp = escapeHtml(String(otp));
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your FuncLexa OTP</title>
  </head>
  <body style="margin:0;padding:0;background:#070b16;font-family:'Segoe UI',Arial,sans-serif;color:#e5e7eb;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background:#0f172a;border:1px solid #1e2b45;border-radius:20px;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,#00e5ff,#22d3ee,#8b5cf6);padding:28px 32px;">
              <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;font-weight:700;color:rgba(4,32,43,0.85);">FuncLexa Security</div>
              <h1 style="margin:8px 0 0;font-size:26px;font-weight:800;color:#04202b;">Email Verification</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#cbd5e1;">Hi <strong style="color:#f1f5f9;">${safeName}</strong>,</p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#94a3b8;">
                You're one step away from joining FuncLexa. Enter the verification code below to confirm your email address.
              </p>
              <div style="text-align:center;margin:0 0 24px;">
                <div style="display:inline-block;background:linear-gradient(135deg,rgba(0,229,255,0.12),rgba(139,92,246,0.12));border:2px solid rgba(0,229,255,0.3);border-radius:16px;padding:20px 36px;">
                  <div style="font-size:42px;font-weight:900;letter-spacing:0.25em;color:#00e5ff;font-family:'Courier New',monospace;">${safeOtp}</div>
                </div>
              </div>
              <p style="margin:0 0 8px;font-size:13px;color:#64748b;text-align:center;">This code expires in <strong style="color:#94a3b8;">10 minutes</strong>.</p>
              <p style="margin:16px 0 0;font-size:13px;color:#475569;text-align:center;">If you didn't sign up for FuncLexa, you can safely ignore this email.</p>
              <div style="margin:24px 0 0;padding-top:20px;border-top:1px solid #1e2b45;">
                <p style="margin:0;font-size:13px;color:#475569;">With gratitude,<br/><strong style="color:#94a3b8;">Team FuncLexa</strong></p>
              </div>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
};

const buildWelcomeHtml = ({ name, websiteUrl }) => {
  const safeName = escapeHtml(name || 'there');
  const safeUrl = escapeHtml(websiteUrl || 'https://www.funclexa.me');
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to FuncLexa</title>
  </head>
  <body style="margin:0;padding:0;background:#070b16;font-family:'Segoe UI',Arial,sans-serif;color:#e5e7eb;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background:#0f172a;border:1px solid #1e2b45;border-radius:20px;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,#00e5ff,#8b5cf6);padding:28px 32px;">
              <h1 style="margin:0;font-size:28px;font-weight:900;color:#04202b;">FuncLexa</h1>
              <p style="margin:6px 0 0;font-size:13px;color:rgba(4,32,43,0.75);font-weight:600;">Build. Learn. Create.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#f1f5f9;">Welcome to the family, <span style="color:#00e5ff;">${safeName}</span> 🎉</h2>
              <p style="margin:0 0 14px;font-size:15px;line-height:1.7;color:#94a3b8;">We're truly grateful to have you here. FuncLexa was built to help creators and developers turn ideas into real products.</p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#94a3b8;">Whether you're exploring AI tools, building projects, or learning faster — we're with you on every step.</p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                <tr>
                  <td style="border-radius:12px;background:linear-gradient(135deg,#00e5ff,#8b5cf6);">
                    <a href="${safeUrl}" style="display:inline-block;padding:14px 28px;color:#04202b;text-decoration:none;font-size:15px;font-weight:700;">Visit FuncLexa →</a>
                  </td>
                </tr>
              </table>
              <div style="margin:24px 0 0;padding-top:20px;border-top:1px solid #1e2b45;">
                <p style="margin:0;font-size:13px;color:#475569;">With gratitude,<br/><strong style="color:#94a3b8;">Team FuncLexa</strong></p>
              </div>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
};

const buildVerifyEmailHtml = ({ name, verifyUrl }) => {
  const safeName = escapeHtml(name || 'there');
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify your email</title>
  </head>
  <body style="margin:0;padding:0;background:#070b16;font-family:'Segoe UI',Arial,sans-serif;color:#e5e7eb;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background:#0f172a;border:1px solid #1e2b45;border-radius:20px;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,#00e5ff,#8b5cf6);padding:28px 32px;">
              <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;font-weight:700;color:rgba(4,32,43,0.85);">FuncLexa Security</div>
              <h1 style="margin:8px 0 0;font-size:26px;font-weight:800;color:#04202b;">Verify Your Email</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#cbd5e1;">Hi <strong style="color:#f1f5f9;">${safeName}</strong>,</p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#94a3b8;">Thanks for signing up for FuncLexa. Please verify your email to activate your account.</p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                <tr>
                  <td style="border-radius:12px;background:linear-gradient(135deg,#00e5ff,#8b5cf6);">
                    <a href="${verifyUrl}" style="display:inline-block;padding:14px 28px;color:#04202b;text-decoration:none;font-size:15px;font-weight:700;">Verify Email →</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-size:13px;color:#64748b;">This link expires in <strong style="color:#94a3b8;">24 hours</strong>.</p>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
};

/* ─────────────────────────────────────────────────────────────────────────────
   Public send functions
───────────────────────────────────────────────────────────────────────────── */

export const sendPasswordResetEmail = async ({ to, name, resetUrl }) => {
  const subject = 'Reset your FuncLexa password';
  const text = [
    `Hi ${name || 'there'},`,
    '',
    'We received a request to reset your FuncLexa password.',
    `Reset link: ${resetUrl}`,
    '',
    'This link expires in 15 minutes.',
    'If you did not request this, you can ignore this email.',
    '',
    'With gratitude,',
    'Team FuncLexa',
  ].join('\n');
  const html = buildResetPasswordHtml({ name, resetUrl });
  return sendEmail({ to, subject, text, html });
};

export const sendEmailVerificationEmail = async ({ to, name, verifyUrl }) => {
  const subject = 'Verify your FuncLexa email';
  const text = [
    `Hi ${name || 'there'},`,
    '',
    'Welcome to FuncLexa. Please verify your email to activate your account.',
    `Verify link: ${verifyUrl}`,
    '',
    'This link expires in 24 hours.',
  ].join('\n');
  const html = buildVerifyEmailHtml({ name, verifyUrl });
  return sendEmail({ to, subject, text, html });
};

export const sendSignupOtpEmail = async ({ to, name, otp }) => {
  const subject = 'Your FuncLexa verification code';
  const text = [
    `Hi ${name || 'there'},`,
    '',
    `Your FuncLexa verification code is: ${otp}`,
    '',
    'It expires in 10 minutes.',
    '',
    'If you didn\'t sign up for FuncLexa, you can ignore this email.',
    '',
    'With gratitude,',
    'Team FuncLexa',
  ].join('\n');
  const html = buildSignupOtpHtml({ name, otp });

  const result = await sendEmail({ to, subject, text, html });

  // In dev with no email provider, expose OTP in response for testing
  if (!result.delivered && process.env.NODE_ENV !== 'production') {
    return { ...result, otp };
  }
  return result;
};

export const sendWelcomeEmail = async ({ to, name }) => {
  const websiteUrl = normalizeUrl(process.env.WEBSITE_URL) || 'https://www.funclexa.me';
  const subject = 'Welcome to FuncLexa — built for creators like you';
  const text = [
    `Hi ${name || 'there'},`,
    '',
    'Welcome to FuncLexa.',
    'We\'re truly grateful to have you here. Your support means everything.',
    '',
    `Visit us: ${websiteUrl}`,
    '',
    'With gratitude,',
    'Team FuncLexa',
  ].join('\n');
  const html = buildWelcomeHtml({ name, websiteUrl });
  return sendEmail({ to, subject, text, html });
};


