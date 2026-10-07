import { useEffect, useRef } from 'react'
import '../../assets/circletype.min.js'
import square from '../../assets/shapes/square.png'
import triangle from '../../assets/shapes/triangle.png'
import circle from '../../assets/shapes/circle.png'
import x from '../../assets/shapes/x.png'

const AVATAR = 'https://avatars.githubusercontent.com/u/64828142?s=400&v=4'

export default function Hero() {
  const badgeRef = useRef(null)

  useEffect(() => {
    if (!badgeRef.current || !window.CircleType) return
    const ct = new window.CircleType(badgeRef.current)
    return () => ct.destroy()
  }, [])

  return (
    <section id="hero">
      <div className="container flex items-center lg:min-h-screen mx-auto py-24">
        <div className="flex flex-wrap items-center h-full">
          <div className="lg:w-7/12 lg:order-1 order-2">
            <h1 className="font-bold xl:text-7xl md:text-6xl text-5xl xl:leading-tight md:leading-tight sm:leading-tight leading-tight mb-14">
              Hello, I'm Abdul Faizaan a<br />
              <span className="text-primary sm:inline hidden">{'{'}</span>
              <span className="text-slate-400">Web Developer</span>
              <span className="text-primary sm:inline hidden">{'}'}</span>
            </h1>
            <a href="#work" className="inline-block relative md:text-xl text-lg pb-3 before:content-[''] before:absolute before:w-full before:border-b-2 before:border-white before:left-0 before:bottom-0 after:content-[''] after:absolute after:w-0 after:border-b-2 after:border-primary after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300 after:ease-out">
              See my recent work
            </a>
          </div>
          <div className="lg:w-5/12 lg:order-2 order-1 relative bg-radial-blur lg:mb-0 md:mb-16 mb-10">
            <img src={AVATAR} className="relative xl:w-10/12 lg:w-11/12 sm:w-3/4 w-full m-auto z-[1] rounded-full border-4 border-white" alt="Abdul Faizaan" />
            <div className="absolute top-3/4 sm:left-1/4 left-[15%] -translate-y-1/2 -translate-x-1/2 z-0">
              <div className="animate-vertical-move-1 -translate-y-4">
                <img src={square} className="-rotate-[30deg] sm:w-16 w-12" alt="" />
              </div>
            </div>
            <div className="absolute top-1/4 sm:left-1/4 left-[15%] -translate-y-1/2 -translate-x-1/2 z-0">
              <div className="animate-vertical-move-2 -translate-y-4">
                <img src={triangle} className="-rotate-[30deg] sm:w-20 w-16" alt="" />
              </div>
            </div>
            <div className="absolute top-1/4 sm:left-3/4 left-[85%] -translate-y-1/2 -translate-x-1/2 z-0">
              <div className="animate-vertical-move-3 -translate-y-4">
                <img src={circle} className="rotate-[30deg] sm:w-16 w-12" alt="" />
              </div>
            </div>
            <div className="absolute top-3/4 sm:left-3/4 left-[85%] -translate-y-1/2 -translate-x-1/2 z-0">
              <div className="animate-vertical-move-4 -translate-y-4">
                <img src={x} className="rotate-[30deg] sm:w-16 w-12" alt="" />
              </div>
            </div>
            <div className="absolute bottom-0 lg:left-0 md:left-16 sm:left-5 left-12 z-[1] md:block hidden">
              <p ref={badgeRef} className="tracking-wide animate-spin circle-text sm:text-base text-sm">
                OPEN • FOR • FREELANCE • WORK •
              </p>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#580EF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
