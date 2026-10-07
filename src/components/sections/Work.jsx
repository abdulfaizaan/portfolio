const PROJECTS = [
  {
    label: 'Personal Project',
    title: 'Todo App',
    summary: 'An elegant todo app built with HTML, CSS, and JavaScript.',
    description:
      'An elegant todo app built with HTML, CSS, and JavaScript. With a clean and intuitive interface, it allows users to easily manage their tasks and stay organized. It shows how far plain HTML, CSS, and JavaScript can take a project without a framework.',
    software: 'Visual Studio Code, Git, Chrome DevTools',
    tech: 'HTML, CSS, Vanilla JavaScript',
    date: '12 May 2026',
    link: 'https://elegant-todolist.netlify.app/',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop',
  },
  {
    label: 'AI Project',
    title: 'Gig Shield',
    summary: 'AI/ML-powered insurance claim prediction for accurate risk assessment and fraud detection.',
    description:
      'An AI/ML-powered insurance claim prediction system built for accurate risk assessment and fraud detection. The project pairs a machine learning model with a web interface, turning claim data into a clear risk verdict.',
    software: 'Visual Studio Code, GitHub, Postman',
    tech: 'Python, Node, TypeScript',
    date: '12 May 2026',
    link: 'https://guide-wire-dev-trail.vercel.app',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
  },
  {
    label: 'Open Source',
    title: 'More Projects',
    summary: 'Explore a variety of projects showcasing my skills in web development on GitHub.',
    description:
      "A collection of everything else I've built — web apps, experiments, and contributions. Browse the repositories to see the code behind my work, including projects built with Node, React, and Spring Boot.",
    software: 'Visual Studio Code, GitHub',
    tech: 'Node, React, Springboot',
    date: '12 May 2026',
    link: 'https://github.com/abdulfaizaan',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
  },
]

export default function Work({ onSelect }) {
  return (
    <section id="work">
      <div className="container mx-auto md:py-24 py-16">
        <h1 className="font-bold xl:text-7xl md:text-6xl text-5xl xl:leading-tight md:leading-tight sm:leading-tight leading-tight md:mb-12 mb-10">
          What I've Done 📁
        </h1>
        <p className="md:text-xl text-base text-white md:leading-relaxed leading-relaxed md:mb-16 mb-8">
          These are a selection of my recent works.
        </p>
        <div className="flex flex-wrap -mx-5">
          {PROJECTS.map((project) => (
            <div key={project.title} className="xl:w-4/12 md:w-1/2 w-full px-5 mb-8">
              <div className="flex flex-col justify-between items-start relative border-2 border-white w-full h-full md:pl-12 md:pt-12 pl-8 pt-8 pb-6 pr-6 z-[1] hover:bg-primary hover:border-primary">
                <div className="grow">
                  <p className="inline-block text-base relative pb-1 md:mb-12 mb-8 after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:border-b-[1.5px] after:border-white">
                    {project.label}
                  </p>
                  <h3 className="md:text-4xl text-3xl font-bold md:leading-snug leading-snug mb-5">
                    {project.title}
                  </h3>
                  <p className="text-base text-white md:mb-12 mb-8">{project.summary}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelect(project)}
                  className="group inline-block text-base border-[1.5px] border-white px-8 py-3 mt-auto"
                >
                  <span className="relative after:content-[''] after:absolute after:block after:w-0 after:border-t-[1.5px] after:border-white after:top-1/2 after:left-0 after:-translate-y-1/2 after:transition-all after:duration-300 after:ease-out group-hover:after:w-full">
                    See More
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
