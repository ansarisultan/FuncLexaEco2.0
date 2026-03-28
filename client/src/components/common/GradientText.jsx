const GradientText = ({ children, className = '', from = 'from-brand', to = 'to-accent' }) => {
  return (
    <span className={`bg-gradient-to-r ${from} ${to} bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
};

export default GradientText;
