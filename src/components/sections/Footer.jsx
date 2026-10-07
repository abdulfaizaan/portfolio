export default function Footer() {
  return (
    <footer id="footer">
      <div className="container py-10">
        <div className="flex items-center">
          <p className="md:text-sm text-xs uppercase md:whitespace-nowrap">
            Copyright © 2026 Design & Code By &#8226;{' '}
            <a
              href="https://github.com/abdulfaizaan"
              target="_blank"
              rel="noreferrer"
              className="relative text-primary after:content-[''] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:block after:w-0 after:border-t-[1.5px] after:border-white after:transition-all after:duration-300 after:ease-out hover:after:w-full"
            >
              Abdul Faizaan
            </a>
          </p>
          <hr className="md:block hidden border-white w-full mx-6" />
        </div>
      </div>
    </footer>
  )
}
