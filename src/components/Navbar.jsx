export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 w-full">
      <nav className="container flex justify-end mx-auto py-7">
        <a href="#contact" className="group md:text-lg text-base border-2 border-white px-8 py-3 hover:border-primary">
          <span className="relative after:content-[''] after:absolute after:block after:w-0 after:border-t-2 after:border-white after:top-1/2 after:left-0 after:-translate-y-1/2 after:transition-all after:duration-300 after:ease-out group-hover:after:w-full">Contact</span>
        </a>
      </nav>
    </header>
  )
}
