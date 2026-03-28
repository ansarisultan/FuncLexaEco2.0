import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocalMode } from '../../context/LocalModeContext';
import { Database, Download, Upload, Trash2, Cpu, CheckCircle } from 'lucide-react';

const LocalModeControls = () => {
  const { exportWorkspace, importWorkspace, clearWorkspace } = useLocalMode();
  const fileRef = useRef(null);
  const [imported, setImported] = useState(false);

  const onImport = () => {
    fileRef.current?.click();
  };

  const onFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await importWorkspace(file);
      setImported(true);
      setTimeout(() => setImported(false), 3000);
    } catch (error) {
      window.alert(error.message);
    } finally {
      event.target.value = '';
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl p-6 relative overflow-hidden flex flex-col lg:flex-row gap-8 items-center"
      style={{
        background: 'rgba(13,21,38,0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(34,197,94,0.15)',
      }}
    >
      {/* Background Effect */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 10% 50%, rgba(34,197,94,0.06), transparent 50%)' }} />

      {/* Left side: Context */}
      <div className="flex-1 min-w-[250px] relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-neon-green/10 flex items-center justify-center border border-neon-green/20">
            <Database className="w-5 h-5 text-neon-green" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Zero-Trust Vault</h3>
            <p className="text-xs text-neon-green font-medium uppercase tracking-widest mt-0.5">Local Mode Active</p>
          </div>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          In Local Mode, all data is stored securely in your browser's IndexedDB.
          Manage your workspace state below to backup or migrate your data.
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Cpu className="w-3.5 h-3.5" />
          <span>AES-256 Encryption Ready</span>
        </div>
      </div>

      {/* Right side: Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto relative z-10">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={exportWorkspace}
          className="flex-1 lg:w-36 flex flex-col items-center justify-center gap-2 py-4 rounded-2xl transition-colors"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <Download className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-sm font-semibold text-slate-300">Export State</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onImport}
          className="flex-1 lg:w-36 flex flex-col items-center justify-center gap-2 py-4 rounded-2xl transition-colors"
          style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)' }}
        >
          <div className="w-8 h-8 rounded-full bg-neon-green/10 flex items-center justify-center border border-neon-green/30">
            {imported ? <CheckCircle className="w-4 h-4 text-neon-green" /> : <Upload className="w-4 h-4 text-neon-green" />}
          </div>
          <span className="text-sm font-semibold text-neon-green">{imported ? 'Imported!' : 'Import State'}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={clearWorkspace}
          className="flex-1 lg:w-36 flex flex-col items-center justify-center gap-2 py-4 rounded-2xl transition-colors"
          style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
            <Trash2 className="w-4 h-4 text-red-500" />
          </div>
          <span className="text-sm font-semibold text-red-500">Wipe Data</span>
        </motion.button>
      </div>

      <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={onFileChange} />
    </motion.section>
  );
};

export default LocalModeControls;
