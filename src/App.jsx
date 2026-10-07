import Preloader from './components/Preloader.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/sections/Hero.jsx'
import About from './components/sections/About.jsx'

export default function App() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <About />
      </main>
    </>
  )
}
