const LANGUAGES = [
  { name: 'English', level: 95, status: 'Native/Fluent' },
  { name: 'Hindi', level: 70, status: 'Intermediate' },
  { name: 'Urdu', level: 90, status: 'Intermediate' },
  { name: 'Telugu', level: 50, status: 'Basic' },
]

export default function Languages() {
  return (
    <section id="languages">
      <div className="container mx-auto md:py-24 py-16">
        <h1 className="font-bold xl:text-7xl md:text-6xl text-5xl xl:leading-tight md:leading-tight sm:leading-tight leading-tight md:mb-12 mb-10">
          Languages 🌐
        </h1>
        <p className="md:text-xl text-base text-white md:leading-relaxed leading-relaxed md:mb-16 mb-8">
          The languages I speak and my proficiency level in each.
        </p>
        <div className="border-2 border-white p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {LANGUAGES.map((lang) => (
              <div key={lang.name}>
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <span className="md:text-2xl text-xl font-bold block">{lang.name}</span>
                    <span className="text-xs text-primary uppercase tracking-widest font-bold">
                      {lang.status}
                    </span>
                  </div>
                  <span className="text-slate-400">{lang.level}%</span>
                </div>
                <div className="w-full border-2 border-white h-4">
                  <div className="bg-primary h-full" style={{ width: `${lang.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 pt-8 border-t-2 border-white text-center">
            <p className="text-slate-400 text-sm">
              Always learning and improving my language skills to connect with people globally.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
