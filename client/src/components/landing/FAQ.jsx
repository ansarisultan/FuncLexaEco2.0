import AnimatedSection from '../common/AnimatedSection';

const faqs = [
  {
    question: 'Do I need an account to use FuncLexa?',
    answer: 'No. You can start immediately in Local Mode without signing in.',
  },
  {
    question: 'What is the difference between modes?',
    answer: 'Local Mode keeps data on your device. Account Mode enables cloud sync and session continuity.',
  },
  {
    question: 'Can I switch modes later?',
    answer: 'Yes. You can start locally and continue with an account whenever you are ready.',
  },
  {
    question: 'Which apps are included?',
    answer: 'FuncLexa currently includes LexaChat and Flexa Voice.',
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-ink md:text-4xl">FAQ</h2>
          <p className="mt-3 text-muted">Answers to common questions about FuncLexa.</p>
        </AnimatedSection>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <AnimatedSection key={faq.question} delay={index * 90} className="panel p-0">
              <details className="group rounded-2xl p-5">
                <summary className="cursor-pointer list-none font-semibold text-ink">
                  {faq.question}
                </summary>
                <p className="mt-3 text-muted">{faq.answer}</p>
              </details>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
