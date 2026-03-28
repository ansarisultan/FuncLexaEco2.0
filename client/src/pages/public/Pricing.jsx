import Navbar from '../../components/common/Navbar';

const plans = [
  {
    name: 'Local',
    price: '$0',
    detail: 'Browser-only mode with local workspace storage and manual backups.',
  },
  {
    name: 'Pro',
    price: '$19',
    detail: 'Account mode, usage analytics, and access to full proxy app suite.',
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-base">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-bold text-ink">Pricing</h1>
        <p className="mt-2 text-sm text-muted">Choose a mode that fits your workflow maturity.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {plans.map((plan) => (
            <article key={plan.name} className="panel p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">{plan.name}</p>
              <p className="mt-2 text-4xl font-bold text-ink">{plan.price}</p>
              <p className="mt-3 text-sm text-muted">{plan.detail}</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Pricing;
