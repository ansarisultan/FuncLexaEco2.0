const Loader = ({ label = 'Loading', fullscreen = false }) => {
  return (
    <div className={`flex items-center justify-center ${fullscreen ? 'min-h-screen' : 'min-h-[96px]'}`}>
      <div className="panel flex items-center gap-3 px-5 py-4">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand border-t-transparent" />
        <span className="text-sm font-medium text-muted">{label}</span>
      </div>
    </div>
  );
};

export default Loader;
