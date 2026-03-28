import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Loader2, Send, Sparkles } from 'lucide-react';
import Sidebar from '../../components/common/Sidebar';
import { useAppMode } from '../../context/AppModeContext';
import { useLocalMode } from '../../context/LocalModeContext';
import { useAuth } from '../../context/AuthContext';
import { logUsageEvent } from '../../services/usageService';
import BackgroundTheme from '../../components/common/BackgroundTheme';

const getBackendBaseUrl = () => {
  const explicit = import.meta.env.VITE_SOCKET_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, '');

  const apiBase =
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    '/api';

  if (apiBase.startsWith('/')) return '';

  try {
    const parsed = new URL(apiBase);
    parsed.pathname = parsed.pathname.replace(/\/api\/?$/, '') || '/';
    return parsed.toString().replace(/\/+$/, '');
  } catch {
    return '';
  }
};

const BACKEND_BASE = getBackendBaseUrl();
const PROXY_URL = `${BACKEND_BASE}/apps/lexachat`;
const ACCOUNT_CHAT_URL = `${BACKEND_BASE}/apps/lexachat/chat?embedded=1`;
const LOCAL_INITIAL = [
  {
    id: 'welcome',
    role: 'assistant',
    text: 'Welcome to LexaChat Local Mode. Your chat stays inside your FuncLexa workspace on this device.'
  }
];

const LexaChatLocalShell = () => {
  const { getAppWorkspace, updateAppWorkspace } = useLocalMode();
  const initialMessages = getAppWorkspace('lexachat')?.messages || LOCAL_INITIAL;
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  useEffect(() => {
    updateAppWorkspace('lexachat', { messages });
  }, [messages, updateAppWorkspace]);

  useEffect(() => {
    void logUsageEvent({ product: 'lexachat', action: 'Opened local LexaChat shell' }).catch(() => {});
  }, []);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const userMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text
    };
    const botMessage = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      text: 'Local mode captured your message. Switch to Account Mode to sync with your live LexaChat session.'
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    void logUsageEvent({ product: 'lexachat', action: 'Sent local LexaChat message' }).catch(() => {});
    setInput('');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="h-11 px-4 flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] bg-[rgba(13,21,38,0.85)]">
        <div className="text-sm font-semibold text-white">LexaChat Local Interface</div>
        <span className="text-[11px] text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10">Local Mode</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-cyan-500/15 border border-cyan-400/30 text-cyan-100'
                  : 'bg-slate-900/80 border border-slate-700 text-slate-200'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(7,12,22,0.9)]">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Type your message..."
            className="flex-1 rounded-xl px-3 py-2.5 bg-slate-900/70 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400/40"
          />
          <button
            onClick={sendMessage}
            className="px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-semibold text-sm inline-flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const LexaChatAccountShell = () => {
  const [loading, setLoading] = useState(true);
  const iframeUrl = useMemo(() => ACCOUNT_CHAT_URL, []);

  useEffect(() => {
    void logUsageEvent({ product: 'lexachat', action: 'Opened account LexaChat session' }).catch(() => {});
  }, []);

  return (
    <div className="h-full rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(5,11,20,0.8)] overflow-hidden">
      <div className="h-11 px-4 flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] bg-[rgba(13,21,38,0.85)]">
        <div className="text-sm font-semibold text-white inline-flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-electric-cyan" />
          LexaChat Session
        </div>
        <a
          href={PROXY_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-electric-cyan hover:text-white transition-colors"
        >
          Open full app
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="relative h-[calc(100%-44px)]">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[rgba(3,6,13,0.9)]"
          >
            <Loader2 className="w-6 h-6 animate-spin text-electric-cyan" />
            <p className="text-sm text-slate-400">Opening your LexaChat session...</p>
          </motion.div>
        ) : null}

        <iframe
          title="LexaChat Session"
          src={iframeUrl}
          onLoad={() => setLoading(false)}
          className="w-full h-full border-0"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
};

const LexaChat = () => {
  const { mode } = useAppMode();
  const { isAuthenticated } = useAuth();
  const shouldUseAccountSession = mode === 'account' && isAuthenticated;

  return (
    <div className="min-h-screen text-slate-300">
      <Sidebar />
      <main className="workspace-shell md:ml-64">
        <BackgroundTheme variant="workspace" />
        <div
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{ background: 'radial-gradient(circle at top right, rgba(0,229,255,0.2), transparent 65%)' }}
        />

        <div className="workspace-container h-[calc(100dvh-0.5rem)] md:h-[calc(100dvh-1rem)] px-3 md:px-6 pb-3 md:pb-6">
          <div className="h-full rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(5,11,20,0.8)] overflow-hidden">
            {shouldUseAccountSession ? <LexaChatAccountShell /> : <LexaChatLocalShell />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LexaChat;
