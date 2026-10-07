import { useEffect, useRef } from 'react'

export default function ProjectModal({ project, open, onClose }) {
  const closeRef = useRef(null)
  const openerRef = useRef(null)

  useEffect(() => {
    if (open) {
      openerRef.current = document.activeElement
      closeRef.current?.focus()
    } else {
      openerRef.current?.focus?.()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <section id="modal" aria-hidden={!open}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={project ? project.title : 'Project details'}
        className={`modal-content fixed top-0 w-screen h-screen bg-black overflow-auto z-40 transition-all duration-500 ease-in-out ${
          open ? 'left-0' : '-left-full after:delay-300'
        }`}
      >
        <div
          className={`modal-side md:fixed top-0 flex md:justify-center justify-end items-center bg-black z-10 md:h-full md:w-36 w-full md:p-0 p-8 after:content-[''] after:absolute after:right-0 after:top-0 after:h-0 md:after:border-r-2 after:border-primary after:transition-all after:duration-500 after:ease-in-out ${
            open ? 'left-0 after:delay-300 after:h-full' : '-left-full after:h-0'
          }`}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="group inline-block border-0 bg-transparent hover:-rotate-90 transition-all duration-300 ease-out"
          >
            <svg
              className="group-hover:stroke-primary"
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="md:ml-36">
          <div className="container md:px-20 md:py-16">
            {project && (
              <>
                <div className="lg:w-3/4 mb-24">
                  <h1 className="font-bold xl:text-7xl md:text-6xl text-5xl xl:leading-tight md:leading-tight sm:leading-tight leading-tight lg:w-11/12 md:w-full sm:w-10/12 md:mb-12 mb-10">
                    {project.title}
                  </h1>
                  <p className="md:text-xl text-base text-white md:leading-relaxed leading-relaxed md:mb-10 mb-8">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap items-start -mx-4">
                    <div className="lg:w-4/12 sm:w-1/2 px-4">
                      <p className="inline-block text-base relative pb-1 mb-4 after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:border-b-[1.5px] after:border-white">
                        Software Used
                      </p>
                      <p className="text-base text-slate-400 leading-relaxed mb-6">{project.software}</p>
                    </div>
                    <div className="lg:w-4/12 sm:w-1/2 px-4">
                      <p className="inline-block text-base relative pb-1 mb-4 after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:border-b-[1.5px] after:border-white">
                        Tech Stack
                      </p>
                      <p className="text-base text-slate-400 leading-relaxed mb-6">{project.tech}</p>
                    </div>
                    <div className="lg:w-4/12 sm:w-1/2 px-4">
                      <p className="inline-block text-base relative pb-1 mb-4 after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:border-b-[1.5px] after:border-white">
                        Project Date
                      </p>
                      <p className="text-base text-slate-400 leading-relaxed mb-6">{project.date}</p>
                    </div>
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-block md:text-lg text-base border-2 border-white px-8 py-3 hover:border-primary mt-12"
                  >
                    <span className="relative after:content-[''] after:absolute after:block after:w-0 after:border-t-2 after:border-white after:top-1/2 after:left-0 after:-translate-y-1/2 after:transition-all after:duration-300 after:ease-out group-hover:after:w-full">
                      Live Project
                    </span>
                  </a>
                </div>
                <img src={project.image} className="w-full md:mb-16 mb-8" alt={`${project.title} cover`} />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
