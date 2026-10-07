import Preloader from './components/Preloader.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/sections/Hero.jsx'

export default function App() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
      </main>
    </>
  )
}
