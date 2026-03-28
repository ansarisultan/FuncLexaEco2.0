import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';
import { proxyApps } from './proxyRegistry.js';
import { logInfo, logWarn } from '../utils/logger.js';

/**
 * Strip headers from upstream that would block the proxy-served pages:
 *  - X-Frame-Options / frame-ancestors CSP: prevent embedding
 *  - HSTS: causes browser to pin the upstream domain
 */
const STRIP_HEADERS = [
  'x-frame-options',
  'content-security-policy',
  'content-security-policy-report-only',
  'strict-transport-security',
];

const createAppProxy = (appConfig) => {
  const appPathWithSlash = appConfig.path.endsWith('/') ? appConfig.path : `${appConfig.path}/`;

  return createProxyMiddleware({
    target: appConfig.target,
    changeOrigin: true,
    ws: true,
    followRedirects: true,
    selfHandleResponse: true,
    pathRewrite: {
      [`^${appConfig.path}`]: '',
    },
    on: {
      proxyRes: responseInterceptor(async (responseBuffer, proxyRes, req) => {
        STRIP_HEADERS.forEach((header) => {
          delete proxyRes.headers[header];
        });

        // Reflect request origin for credentialed requests.
        proxyRes.headers['x-content-type-options'] = 'nosniff';
        const requestOrigin = req.headers.origin;
        if (requestOrigin) {
          proxyRes.headers['access-control-allow-origin'] = requestOrigin;
          proxyRes.headers['access-control-allow-credentials'] = 'true';
          proxyRes.headers['vary'] = 'Origin';
        }

        const contentType = String(proxyRes.headers['content-type'] || '').toLowerCase();
        if (!contentType.includes('text/html')) {
          return responseBuffer;
        }

        let html = responseBuffer.toString('utf8');

        // Rewrite root-relative asset URLs so proxied apps load under /apps/<slug>/...
        html = html.replace(
          /((?:src|href)\s*=\s*["'])\/(?!\/)/gi,
          `$1${appPathWithSlash}`
        );

        // Silence Safari deprecation warning from upstream if this tag is missing.
        if (
          html.includes('name="apple-mobile-web-app-capable"') &&
          !html.includes('name="mobile-web-app-capable"')
        ) {
          html = html.replace(
            /<meta\s+name=["']apple-mobile-web-app-capable["'][^>]*>/i,
            (match) => `${match}\n  <meta name="mobile-web-app-capable" content="yes" />`
          );
        }

        return html;
      }),

      error(err, req, res) {
        logWarn(`Proxy error for ${appConfig.slug}: ${err.message}`);
        if (!res.headersSent) {
          res.writeHead(502, { 'Content-Type': 'application/json' });
        }
        res.end(
          JSON.stringify({
            success: false,
            message: `Proxy unavailable for ${appConfig.slug}. The upstream service may be down.`,
          })
        );
      },
    },
  });
};

export const mountProxies = (app) => {
  app.use(
    "/apps/lexachat",
    createProxyMiddleware({
      target: "https://lexachat.online",
      changeOrigin: true,

      onProxyReq: (proxyReq, req) => {
        const token = req.cookies?.funclexa_token;

        if (token) {
          proxyReq.setHeader("Authorization", `Bearer ${token}`);
        }
      },
    })
  );

  proxyApps.forEach((proxyConfig) => {
    app.use(proxyConfig.path, createAppProxy(proxyConfig));
    logInfo(`Proxy mounted: ${proxyConfig.path} → ${proxyConfig.target}`);
  });
};
