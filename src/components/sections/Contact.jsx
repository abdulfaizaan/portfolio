const inlineLink =
  'relative text-primary after:content-[\'\'] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:block after:w-0 after:border-t-[1.5px] after:border-white after:transition-all after:duration-300 after:ease-out hover:after:w-full'

const social = [
  {
    name: 'GitHub',
    href: 'https://github.com/abdulfaizaan',
    path: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abdul-faizaan',
    path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/abdulfaizaan._7/',
    path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM17.5 6.5h.01',
  },
]

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const subject = encodeURIComponent(`Portfolio contact from ${data.get('name')}`)
    const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`)
    window.location.href = `mailto:faizaanoffice@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact">
      <div className="container mx-auto md:py-24 py-16">
        <h1 className="font-bold xl:text-7xl md:text-6xl text-5xl xl:leading-tight md:leading-tight sm:leading-tight leading-tight md:mb-12 mb-10">
          Get In Touch 📬
        </h1>
        <p className="md:text-xl text-base text-white md:leading-relaxed leading-relaxed md:mb-16 mb-8">
          Feel free to reach out for collaborations or just a friendly chat — send an{' '}
          <a href="mailto:faizaanoffice@gmail.com" className={inlineLink}>e-mail</a> or use the form below.
        </p>
        <div className="flex flex-wrap -mx-5">
          <div className="lg:w-7/12 w-full px-5 mb-10">
            <form onSubmit={handleSubmit} className="border-2 border-white p-8 md:p-12">
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="w-full bg-white/5 border-2 border-white/20 px-4 py-3 text-white mb-5 focus:outline-none focus:border-primary"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="example@gmail.com"
                className="w-full bg-white/5 border-2 border-white/20 px-4 py-3 text-white mb-5 focus:outline-none focus:border-primary"
              />
              <textarea
                name="message"
                required
                rows="5"
                placeholder="Your Message..."
                className="w-full bg-white/5 border-2 border-white/20 px-4 py-3 text-white mb-6 focus:outline-none focus:border-primary"
              ></textarea>
              <button
                type="submit"
                className="group inline-block md:text-lg text-base border-2 border-white px-8 py-3 hover:border-primary"
              >
                <span className="relative after:content-[''] after:absolute after:block after:w-0 after:border-t-2 after:border-white after:top-1/2 after:left-0 after:-translate-y-1/2 after:transition-all after:duration-300 after:ease-out group-hover:after:w-full">
                  Send Message
                </span>
              </button>
            </form>
          </div>
          <div className="lg:w-5/12 w-full px-5">
            <div className="border-2 border-white p-8 md:p-12 h-full">
              <p className="inline-block text-base relative pb-1 mb-8 after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:border-b-[1.5px] after:border-white">
                Find me online
              </p>
              <div className="flex gap-6">
                {social.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
                    className="border-2 border-white p-4 hover:border-primary hover:text-primary transition-colors duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
              <p className="text-slate-400 text-base mt-8 leading-relaxed">
                Prefer email? Write to{' '}
                <a href="mailto:faizaanoffice@gmail.com" className={inlineLink}>faizaanoffice@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
