import { useEffect, useState } from 'react'

export default function Preloader() {
  const [count, setCount] = useState(0)
  const [grow, setGrow] = useState(false)
  const [fading, setFading] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const raf = requestAnimationFrame(() => setGrow(true))

    let counter = 0
    let fadeTimer
    const interval = setInterval(() => {
      setCount(counter++)
      if (counter > 100) {
        clearInterval(interval)
        setFading(true)
        fadeTimer = setTimeout(() => {
          setDone(true)
          document.body.style.overflow = ''
        }, 1000)
      }
    }, 30)

    return () => {
      cancelAnimationFrame(raf)
      clearInterval(interval)
      clearTimeout(fadeTimer)
      document.body.style.overflow = ''
    }
  }, [])

  if (done) return null

  return (
    <section
      id="preloader"
      className={`transition-all duration-1000 ${fading ? 'opacity-0' : ''}`}
    >
      <div
        className={`fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-black z-50 before:content-[''] before:absolute before:top-0 before:left-0 before:block before:border-t-4 before:border-r-4 before:border-primary after:content-[''] after:absolute after:bottom-0 after:right-0 after:block after:border-b-4 after:border-l-4 after:border-primary preloader-box-transition ${
          grow ? 'before:w-full before:h-full after:w-full after:h-full' : 'before:w-0 before:h-0 after:w-0 after:h-0'
        }`}
      >
        <h5 className="text-2xl tracking-widest">{count}%</h5>
      </div>
    </section>
  )
}
