import AnimatedSection from '../common/AnimatedSection';

const modes = [
  {
    key: 'local',
    title: 'Local Mode',
    subtitle: 'Private by default',
    features: [
      'Runs in your browser',
      'No account required',
      'Data stays on your device',
      'Fast start for testing and demos',
    ],
  },
  {
    key: 'account',
    title: 'Account Mode',
    subtitle: 'Synced and collaborative',
    features: [
      'Cloud-backed sessions',
      'Cross-device continuity',
      'Usage tracking and history',
      'Ready for team workflows',
    ],
  },
];

const ModeComparison = ({ onLocalStart, onAccountContinue }) => {
  const handleAction = (mode) => {
    if (mode === 'local') onLocalStart();
    if (mode === 'account') onAccountContinue();
  };

  return (
    <section id="mode-comparison" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-ink md:text-4xl">Choose Your Mode</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            Pick the workflow that matches your privacy and collaboration needs.
          </p>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-2">
          {modes.map((mode, index) => (
            <AnimatedSection key={mode.key} delay={index * 120} className="panel p-6">
              <h3 className="text-2xl font-semibold text-ink">{mode.title}</h3>
              <p className="mt-1 text-sm font-medium text-brand">{mode.subtitle}</p>
              <ul className="mt-5 space-y-2 text-muted">
                {mode.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full bg-brand" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="btn-primary mt-6 w-full"
                onClick={() => handleAction(mode.key)}
              >
                {mode.key === 'local' ? 'Try Local Mode' : 'Continue With Account'}
              </button>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModeComparison;
