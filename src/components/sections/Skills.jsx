import { RevealOnScroll } from "../RevealOnScroll";

export const Skills = () => {
  const skills = [
    { name: "React", level: 90, icon: "⚛️" },
    { name: "TailwindCSS", level: 85, icon: "🎨" },
    { name: "Node.js", level: 75, icon: "🟩" },
    { name: "Python", level: 80, icon: "🐍" },
    { name: "Springboot", level: 50, icon: "🍃" },
  ];

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center py-20 relative">
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4 w-full">
          
          <div className="glass-panel p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
              My <span className="neon-text">Skills</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Column: Text and Image/Graphic */}
              <div>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  Passionate Web developer with expertise in building scalable web applications. 
                  Currently learning Backend development and exploring new technologies to deliver 
                  exceptional user experiences.
                </p>
                
                {/* Decorative Element mimicking the robotic hand */}
                <div className="relative h-64 w-full rounded-2xl overflow-hidden glass-panel flex items-center justify-center group">
                  <div className="absolute inset-0 bg-cyan-900/20 group-hover:bg-cyan-900/40 transition-all duration-500"></div>
                  
                  {/* Glowing core */}
                  <div className="absolute w-32 h-32 bg-cyan-400 rounded-full blur-[50px] opacity-20 animate-pulse"></div>
                  
                  {/* Floating particles/icons */}
                  <div className="relative z-10 flex gap-6 text-4xl animate-float">
                    <span className="drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">⚛️</span>
                    <span className="drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] mt-8">💻</span>
                    <span className="drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">🚀</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Skill Bars */}
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-200 font-medium flex items-center gap-2">
                        <span>{skill.icon}</span> {skill.name}
                      </span>
                      <span className="text-cyan-400 font-bold">{skill.level}%</span>
                    </div>
                    
                    <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-white/5">
                      <div 
                        className="bg-cyan-400 h-3 rounded-full relative"
                        style={{ width: `${skill.level}%` }}
                      >
                        {/* Glow effect on the progress bar */}
                        <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/30 blur-sm rounded-full"></div>
                        <div className="absolute inset-0 bg-cyan-400 blur-[4px] opacity-50"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
