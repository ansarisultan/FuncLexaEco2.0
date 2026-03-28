import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import AppHeader from './AppHeader';
import { useAppMode } from '../../context/AppModeContext';
import { getAppById } from '../../data/appRegistry';

const AppLoader = () => {
  const { appId } = useParams();
  const { mode } = useAppMode();

  const app = useMemo(() => getAppById(appId), [appId]);

  if (!app) {
    return (
      <div className="min-h-screen bg-base">
        <Sidebar />
        <main className="px-4 py-8 md:ml-64 md:px-8">
          <div className="panel p-6">
            <h1 className="text-2xl font-bold text-ink">App not found</h1>
            <p className="mt-2 text-sm text-muted">The requested app is not registered.</p>
            <Link className="btn-primary mt-4" to="/apps">
              Back to Apps
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const hasProxy = Boolean(app.proxyPath);

  return (
    <div className="min-h-screen bg-base">
      <Sidebar />
      <main className="px-4 py-8 md:ml-64 md:px-8">
        <AppHeader
          title={app.name}
          description="Reverse-proxy launch surface. Replace this panel with iframe embed when target app is ready."
          mode={mode}
        />

        <section className="panel p-6">
          <p className="text-sm text-muted">
            {hasProxy
              ? `Configured proxy path: ${app.proxyPath}`
              : 'No proxy path is configured for this app yet.'}
          </p>
          {hasProxy ? (
            <a href={app.proxyPath} className="btn-primary mt-4 inline-flex" target="_blank" rel="noreferrer">
              Open Proxied App
            </a>
          ) : null}
        </section>
      </main>
    </div>
  );
};

export default AppLoader;
