const ModeBadge = ({ mode }) => {
  const isAccount = mode === 'account';

  return (
    <span className={isAccount ? 'chip bg-brand text-white' : 'chip bg-accent-soft text-accent'}>
      {isAccount ? 'Account Mode' : 'Local Mode'}
    </span>
  );
};

export default ModeBadge;
