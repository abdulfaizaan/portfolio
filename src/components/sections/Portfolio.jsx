import { RevealOnScroll } from "../RevealOnScroll";

export const Portfolio = () => {
  const projects = [
    {
      title: "Todo App",
      description: "An elegant todo app built with HTML, CSS, and JavaScript. With a clean and intuitive interface, it allows users to easily manage their tasks and stay organized.",
      tech: ["React", "Node.js", "AWS", "Docker"],
      link: "#",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop"
    },
    {
      title: "Gig Shield",
      description: "AI/ML-powered Insurance Claim Prediction System for Accurate Risk Assessment and Fraud Detection.",
      tech: ["Python", "Node", "TypeScript"],
      link: "#",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "More Projects",
      description: "Explore a variety of projects showcasing my skills in web development on GitHub.",
      tech: ["Node", "React", "Springboot"],
      link: "#",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section id="portfolio" className="min-h-screen flex items-center justify-center py-20 relative">
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              My <span className="neon-text">Portfolio</span>
            </h2>
            <p className="text-gray-400">A collection of my recent projects</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="glass-panel glass-panel-hover overflow-hidden rounded-xl group flex flex-col h-full"
              >
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-300 z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 text-sm flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, key) => (
                      <span
                        key={key}
                        className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 py-1 px-3 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    className="mt-auto inline-flex items-center text-sm font-medium text-white hover:text-cyan-400 transition-colors"
                  >
                    View Project <span className="ml-2">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
