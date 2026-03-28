import { Link } from 'react-router-dom';
import { useAppMode } from '../../context/AppModeContext';
import ModeBadge from './ModeBadge';

const Navbar = () => {
  const { mode } = useAppMode();

  return (
    <header className="sticky top-0 z-30 border-b border-brand/15 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold tracking-tight text-brand">
          FUNCLEXA
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-muted md:flex">
          <Link to="/projects" className="hover:text-ink">Projects</Link>
          <Link to="/pricing" className="hover:text-ink">Pricing</Link>
          <Link to="/portfolio" className="hover:text-ink">Portfolio</Link>
        </nav>

        <div className="flex items-center gap-2">
          {mode ? <ModeBadge mode={mode} /> : <Link to="/auth/login" className="btn-outline">Continue</Link>}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
