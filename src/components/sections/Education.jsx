import { RevealOnScroll } from "../RevealOnScroll";
import { GraduationCap, Award, BookOpen } from "lucide-react";

export const Education = () => {
  return (
    <section id="education" className="min-h-screen flex items-center justify-center py-20 relative">
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="neon-text flex items-center justify-center gap-3">
                <BookOpen className="w-8 h-8" /> Education & Certifications
              </span>
            </h2>
            <p className="text-gray-400">My learning journey and credentials</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education Side */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                <GraduationCap className="text-cyan-400" /> Education
              </h3>

              <div className="glass-panel p-6 glass-panel-hover relative group">
                <div className="absolute -left-1 top-0 bottom-0 w-1 bg-cyan-400 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-white">Bachelor of Computer Science</h4>
                    <p className="text-cyan-400">Chandigarh University</p>
                  </div>
                  <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium border border-cyan-500/20">
                    2024 - 2028
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Focusing on core computer science principles, software engineering, and modern web technologies. 
                  Maintaining high academic standards while participating in technical clubs.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Data Structures", "Algorithms", "Web Dev", "DBMS"].map((course, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-wider text-gray-500 font-bold bg-white/5 px-2 py-1 rounded">
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Work Experience (Replacing with a placeholder to match design) */}
              <div className="glass-panel p-6 glass-panel-hover relative group">
                <div className="absolute -left-1 top-0 bottom-0 w-1 bg-cyan-400 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-white">Full Stack Development</h4>
                    <p className="text-cyan-400">Self-Directed Learning</p>
                  </div>
                  <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium border border-cyan-500/20">
                    2023 - Present
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Building personal projects and contributing to open-source communities to master full-stack development.
                </p>
              </div>
            </div>

            {/* Certifications Side */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                <Award className="text-cyan-400" /> Certifications
              </h3>

              <div className="space-y-4">
                {[
                  { title: "Dev Trails", issuer: "Guide Wire", date: "2026" },
                  { title: "Full Stack Web Development", issuer: "Coursera", date: "2026" },
                  { title: "Java", issuer: "Coursera", date: "2026" },
                ].map((cert, i) => (
                  <div key={i} className="glass-panel p-4 flex items-center justify-between glass-panel-hover border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                        <Award size={20} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm">{cert.title}</h4>
                        <p className="text-gray-500 text-xs">{cert.issuer}</p>
                      </div>
                    </div>
                    <span className="text-gray-500 text-xs font-medium">{cert.date}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-cyan-500/5 to-transparent border border-cyan-500/10">
                 <p className="text-cyan-400/80 text-xs italic text-center">
                   "Always learning and growing my technical expertise through industry-recognized certifications."
                 </p>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
