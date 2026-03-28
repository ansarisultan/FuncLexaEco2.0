import React from 'react';

const CTASection = ({ onLocalStart, onAccountContinue }) => {
  return (
    <section className="py-20 bg-[#050B14]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#111827] to-[#050B14] border border-[#00E5FF]/20">
            {/* Decorative glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#8B5CF6]/20 rounded-full blur-3xl" />
            
            <h2 className="text-3xl md:text-4xl font-bold text-[#E5E7EB] mb-4 relative z-10">
              Join the FuncLexa ecosystem
            </h2>
            <p className="text-lg text-[#9CA3AF] mb-8 max-w-2xl mx-auto relative z-10">
              Start locally with zero friction, or create an account to unlock the full potential of LexaChat and Flexa Voice.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <button
                onClick={onLocalStart}
                className="group relative px-8 py-4 text-lg font-semibold rounded-xl bg-[#00E5FF] text-[#050B14] hover:bg-[#00E5FF]/90 transition-all shadow-lg shadow-[#00E5FF]/20"
              >
                Try Local Mode Now
              </button>
              <button
                onClick={onAccountContinue}
                className="px-8 py-4 text-lg font-semibold rounded-xl bg-[#8B5CF6] text-white hover:bg-[#8B5CF6]/90 transition-all shadow-lg shadow-[#8B5CF6]/20"
              >
                Sign Up Free
              </button>
            </div>
            
            <p className="text-sm text-[#9CA3AF]/60 mt-6 relative z-10">
              Already have an account?{' '}
              <button onClick={onAccountContinue} className="text-[#00E5FF] hover:underline">
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;