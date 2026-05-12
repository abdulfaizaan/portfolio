import { useState, useEffect } from 'react';
import { Home, Code, Briefcase, GraduationCap, Globe,Mail } from 'lucide-react';

export const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'skills', 'portfolio', 'education', 'languages', 'contact'];
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section is currently in the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
            break;
          }
        }
      }

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const navItems = [
    { id: 'hero', icon: <Home size={20} />, label: 'Home' },
    { id: 'skills', icon: <Code size={20} />, label: 'Skills' },
    { id: 'portfolio', icon: <Briefcase size={20} />, label: 'Portfolio' },
    { id: 'education', icon: <GraduationCap size={20} />, label: 'Education' },
    { id: 'languages', icon: <Globe size={20} />, label: 'Languages' },
    {id: 'contact', icon: <Mail size={20} />, label: 'Contact' }
  ];

  return (
    <div className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-50">
      <nav className="glass-panel py-6 px-3 rounded-full flex flex-col gap-6 items-center">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`p-3 rounded-full transition-all duration-300 group relative ${
              activeSection === item.id
                ? 'bg-cyan-400/20 text-cyan-400 box-glow'
                : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10'
            }`}
            aria-label={item.label}
          >
            {item.icon}
            
            {/* Tooltip */}
            <span className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-cyan-400 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap glass-panel border-cyan-400/20">
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
};
