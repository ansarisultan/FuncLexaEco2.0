import AnimatedSection from '../common/AnimatedSection';

const Contact = ({ onLocalStart, onAccountContinue }) => {
  return (
    <section id="contact" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="panel px-6 py-10 text-center sm:px-10">
          <h2 className="text-3xl font-bold text-ink md:text-4xl">Contact</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            Have questions or want a guided onboarding flow? Reach out anytime.
          </p>
          <a
            href="mailto:hello@funclexa.ai"
            className="mt-6 inline-flex rounded-xl border border-brand/30 bg-white px-5 py-2 font-semibold text-brand transition hover:bg-brand-light"
          >
            hello@funclexa.ai
          </a>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={onLocalStart} className="btn-primary min-w-44">
              Start Local Mode
            </button>
            <button type="button" onClick={onAccountContinue} className="btn-outline min-w-44">
              Continue With Account
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Contact;
