const ENTRIES = [
  {
    label: 'Education',
    title: 'Bachelor of Computer Science',
    org: 'Chandigarh University',
    date: '2024 - 2028',
    text: 'Focusing on core computer science principles, software engineering, and modern web technologies while participating in technical clubs.',
  },
  {
    label: 'Experience',
    title: 'Full Stack Development',
    org: 'Self-Directed Learning',
    date: '2023 - Present',
    text: 'Building personal projects and contributing to open-source communities to master full-stack development.',
  },
  {
    label: 'Certification',
    title: 'Dev Trails',
    org: 'GuideWire',
    date: '2026',
    text: 'Industry program focused on practical development skills.',
  },
  {
    label: 'Certification',
    title: 'Full Stack Web Development',
    org: 'Coursera',
    date: '2026',
    text: 'End-to-end web development coursework covering front-end and back-end fundamentals.',
  },
  {
    label: 'Certification',
    title: 'Java',
    org: 'Coursera',
    date: '2026',
    text: 'Core Java programming coursework.',
  },
]

export default function Education() {
  return (
    <section id="education">
      <div className="container mx-auto md:py-24 py-16">
        <h1 className="font-bold xl:text-7xl md:text-6xl text-5xl xl:leading-tight md:leading-tight sm:leading-tight leading-tight md:mb-12 mb-10">
          Education & Certifications 🎓
        </h1>
        <p className="md:text-xl text-base text-white md:leading-relaxed leading-relaxed md:mb-16 mb-8">
          My learning journey and credentials.
        </p>
        <div className="flex flex-wrap -mx-5">
          {ENTRIES.map((entry) => (
            <div key={entry.title + entry.org} className="xl:w-4/12 md:w-1/2 w-full px-5 mb-8">
              <div className="flex flex-col items-start relative border-2 border-white w-full h-full md:pl-12 md:pt-12 pl-8 pt-8 pb-6 pr-6 hover:bg-primary hover:border-primary">
                <p className="inline-block text-base relative pb-1 md:mb-8 mb-6 after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:border-b-[1.5px] after:border-white">
                  {entry.label}
                </p>
                <h3 className="md:text-3xl text-2xl font-bold md:leading-snug leading-snug mb-2">
                  {entry.title}
                </h3>
                <p className="text-base mb-1">{entry.org}</p>
                <p className="text-base text-slate-400 mb-5">{entry.date}</p>
                <p className="text-base">{entry.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
