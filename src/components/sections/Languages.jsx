import { RevealOnScroll } from "../RevealOnScroll";
import { Globe2 } from "lucide-react";

export const Languages = () => {
  const languages = [
    { name: "English", level: 95, status: "Native/Fluent" },
    { name: "Hindi", level: 70, status: "Intermediate" },
    { name: "Urdu", level: 90, status: "Intermediate" },
    { name: "Telugu", level: 50, status: "Basic" },
  ];

  return (
    <section id="languages" className="min-h-screen flex items-center justify-center py-20 relative">
      <RevealOnScroll>
        <div className="max-w-4xl mx-auto px-4 w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="neon-text flex items-center justify-center gap-3">
                <Globe2 className="w-8 h-8" /> Languages
              </span>
            </h2>
            <p className="text-gray-400">The languages I speak and my proficiency level in each</p>
          </div>

          <div className="glass-panel p-8 md:p-12 relative overflow-hidden group">
            {/* Background glow */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-cyan-500/20 transition-colors duration-700"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 relative z-10">
              {languages.map((lang, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-2xl font-bold text-white block">{lang.name}</span>
                      <span className="text-xs text-cyan-400 uppercase tracking-widest font-bold">{lang.status}</span>
                    </div>
                    <span className="text-gray-400 font-mono">{lang.level}%</span>
                  </div>
                  
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/5">
                    <div 
                      className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-full rounded-full relative"
                      style={{ width: `${lang.level}%` }}
                    >
                      <div className="absolute inset-0 bg-cyan-400 blur-[2px] opacity-30"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 text-center">
              <p className="text-gray-500 text-sm">
                Always learning and improving my language skills to connect with people globally.
              </p>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
