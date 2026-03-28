import Navbar from '../../components/common/Navbar';

const projects = [
  { title: 'LexaChat Bridge', detail: 'Proxy and launcher integration for chat workflows.' },
  { title: 'Flexa Voice', detail: 'Account-mode voice assistant routing and status panel.' },
  { title: 'Usage Analytics', detail: 'Summary and recent activity endpoints for dashboard insights.' },
];

const Projects = () => {
  return (
    <div className="min-h-screen bg-base">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-bold text-ink">Projects</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="panel p-5">
              <h2 className="text-lg font-semibold text-ink">{project.title}</h2>
              <p className="mt-2 text-sm text-muted">{project.detail}</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Projects;
