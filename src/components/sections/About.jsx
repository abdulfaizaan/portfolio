import cv from '../../assets/Abdul_Faizaan.pdf'

const inlineLink =
  'relative text-primary after:content-[\'\'] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:block after:w-0 after:border-t-[1.5px] after:border-white after:transition-all after:duration-300 after:ease-out hover:after:w-full'

export default function About() {
  return (
    <section id="about">
      <div className="container mx-auto md:py-24 py-16">
        <div className="flex flex-wrap items-start">
          <div className="lg:w-5/12 w-full">
            <h1 className="font-bold xl:text-7xl md:text-6xl text-5xl xl:leading-tight md:leading-tight sm:leading-tight leading-tight md:mb-12 mb-10">
              About Me 👨‍💻
            </h1>
            <p className="md:text-xl text-base text-white md:leading-relaxed leading-relaxed md:mb-16 mb-12">
              Interested To Work With Me? You can reach out by sending an{' '}
              <a href="mailto:faizaanoffice@gmail.com" className={inlineLink}>e-mail</a>
              {' '}or connect with me on{' '}
              <a href="https://www.linkedin.com/in/abdul-faizaan" target="_blank" rel="noreferrer" className={inlineLink}>LinkedIn</a>
            </p>
            <a href={cv} download="Abdul_Faizaan.pdf" className="group inline-block md:text-lg text-base border-2 border-white px-8 py-3 hover:border-primary md:mb-16 mb-12">
              <span className="relative after:content-[''] after:absolute after:block after:w-0 after:border-t-2 after:border-white after:top-1/2 after:left-0 after:-translate-y-1/2 after:transition-all after:duration-300 after:ease-out group-hover:after:w-full">Download CV</span>
            </a>
          </div>
          <div className="lg:w-6/12 w-full ml-auto">
            <p className="md:text-xl text-base md:leading-relaxed leading-relaxed mb-4">
              I'm a web developer who enjoys turning ideas into clean, responsive interfaces.
              Most of my day-to-day work is{' '}
              <a href="https://react.dev" target="_blank" rel="noreferrer" className={inlineLink}>React</a>{' '}
              and Tailwind CSS on the front end, with Node.js on the server when a project
              needs one. I care about code that is easy to read, easy to extend, and fast for
              the person using it.
            </p>
            <p className="md:text-xl text-base md:leading-relaxed leading-relaxed mb-4">
              Recently I've been building full-stack projects — from a{' '}
              <a href="https://elegant-todolist.netlify.app/" target="_blank" rel="noreferrer" className={inlineLink}>
                vanilla JavaScript todo app
              </a>{' '}
              to an{' '}
              <a href="https://guide-wire-dev-trail.vercel.app" target="_blank" rel="noreferrer" className={inlineLink}>
                AI-powered insurance claim prediction system
              </a>{' '}
              — while deepening my backend skills. I'm currently pursuing a Bachelor of
              Computer Science at Chandigarh University (2024–2028), alongside project work
              and certifications like the GuideWire Dev Trails program and Coursera's Full
              Stack Web Development course.
            </p>
            <p className="md:text-xl text-base md:leading-relaxed leading-relaxed">
              When I'm not shipping features, I'm usually exploring a new technology,
              contributing to{' '}
              <a href="https://github.com/abdulfaizaan" target="_blank" rel="noreferrer" className={inlineLink}>
                open source
              </a>
              , or refining the details that make an interface feel polished.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
