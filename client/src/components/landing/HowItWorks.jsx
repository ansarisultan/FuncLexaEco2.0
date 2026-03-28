import AnimatedSection from '../common/AnimatedSection';

const steps = [
  {
    title: 'Pick a mode',
    description: 'Start in Local Mode instantly, or choose Account Mode for cloud sync.',
  },
  {
    title: 'Launch an app',
    description: 'Open LexaChat or Flexa Voice from your dashboard.',
  },
  {
    title: 'Keep building',
    description: 'Continue with the same workflow or switch modes when needed.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-ink md:text-4xl">How It Works</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            Move from idea to execution in three simple steps.
          </p>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <AnimatedSection key={step.title} delay={index * 120} className="panel p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">
                Step {index + 1}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-3 text-muted">{step.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
