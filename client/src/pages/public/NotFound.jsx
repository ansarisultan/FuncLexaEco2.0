import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base px-4">
      <div className="panel max-w-lg p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">404</p>
        <h1 className="mt-2 text-3xl font-bold text-ink">Page not found</h1>
        <p className="mt-2 text-sm text-muted">The route does not exist in this workspace.</p>
        <Link to="/" className="btn-primary mt-5 inline-flex">Go to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
