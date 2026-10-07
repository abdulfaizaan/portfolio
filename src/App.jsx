import { useState } from 'react'
import Preloader from './components/Preloader.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/sections/Hero.jsx'
import About from './components/sections/About.jsx'
import Work from './components/sections/Work.jsx'
import ProjectModal from './components/ProjectModal.jsx'

export default function App() {
  const [modal, setModal] = useState({ open: false, project: null })

  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Work onSelect={(project) => setModal({ open: true, project })} />
      </main>
      <ProjectModal
        project={modal.project}
        open={modal.open}
        onClose={() => setModal((m) => ({ ...m, open: false }))}
      />
    </>
  )
}
