import { Lock, Cloud } from 'lucide-react';

const modeMeta = {
  local: { label: 'Local Mode', hex: '#22C55E', Icon: Lock },
  account: { label: 'Account Mode', hex: '#00E5FF', Icon: Cloud },
};

const AppHeader = ({ title, description, mode }) => {
  const m = modeMeta[mode] || modeMeta.local;
  const Icon = m.Icon;

  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">{title}</h1>
        {description && <p className="mt-1.5 text-sm text-slate-500 max-w-lg">{description}</p>}
      </div>

      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
        style={{ background: `${m.hex}12`, border: `1px solid ${m.hex}30`, color: m.hex }}
      >
        <Icon className="w-3 h-3" />
        {m.label}
      </div>
    </div>
  );
};

export default AppHeader;
