const SKILLS = [
  { name: 'React', level: 90 },
  { name: 'TailwindCSS', level: 85 },
  { name: 'Node.js', level: 75 },
]

export default function Skills() {
  return (
    <section id="skills">
      <div className="container mx-auto md:py-24 py-16">
        <h1 className="font-bold xl:text-7xl md:text-6xl text-5xl xl:leading-tight md:leading-tight sm:leading-tight leading-tight md:mb-12 mb-10">
          My Skills 💡
        </h1>
        <p className="md:text-xl text-base text-white md:leading-relaxed leading-relaxed md:mb-16 mb-8">
          Passionate web developer with expertise in building scalable web applications.
          Currently learning backend development and exploring new technologies to deliver
          exceptional user experiences.
        </p>
        <div className="border-2 border-white p-8 md:p-12">
          {SKILLS.map((skill) => (
            <div key={skill.name} className="mb-8 last:mb-0">
              <div className="flex justify-between items-center mb-3">
                <span className="md:text-xl text-base font-medium">{skill.name}</span>
                <span className="md:text-xl text-base font-bold text-primary">{skill.level}%</span>
              </div>
              <div className="w-full border-2 border-white h-4">
                <div className="bg-primary h-full" style={{ width: `${skill.level}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
