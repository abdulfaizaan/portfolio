import { RevealOnScroll } from "../RevealOnScroll";

export const Home = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative pt-20 pb-20 md:pt-0 md:pb-0"
    >
      <RevealOnScroll>
        <div className="text-center z-10 px-4 flex flex-col items-center">
          
          <div className="relative mb-8">
            {/* Glowing circle behind image */}
            <div className="absolute inset-0 bg-cyan-400 rounded-full blur-[30px] opacity-20 animate-pulse"></div>
            
            {/* Avatar placeholder - You can replace the src with your actual image */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-cyan-400/50 p-1 relative z-10 box-glow overflow-hidden bg-[#0f172a]">
               <img 
                 src="https://avatars.githubusercontent.com/u/64828142?s=400&u=0794e14cb2a0122424e2057a87d89535e03fde2b&v=4" 
                 alt="Profile" 
                 className="w-full h-full object-cover rounded-full"
               />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Hi, I'm <span className="neon-text">Abdul Faizaan</span>
          </h1>

          <h2 className="text-xl md:text-3xl text-gray-300 mb-6 font-medium">
            I'm a Web Developer<span className="animate-blink text-cyan-400">|</span>
          </h2>

          <p className="text-gray-400 text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            I create beautiful, responsive web experiences using modern technologies. 
            Passionate about clean code and user-centered design.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="#portfolio"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 py-3 px-8 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]"
            >
              View My Work
            </a>

            <a href="../assets/Abdul_Faizaan.pdf" download="Abdul_Faizaan_Resume.pdf"
              className="border border-cyan-500/50 text-cyan-400 py-3 px-8 rounded-full font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:bg-cyan-500/10"
            >
              Download CV
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
