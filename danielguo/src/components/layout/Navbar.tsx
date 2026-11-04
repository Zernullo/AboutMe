import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Github, Linkedin, Menu, Shield, X } from 'lucide-react'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNav = (target: { sectionId?: string; path?: string }) => {
    setIsMenuOpen(false)
    if (target.path) {
      navigate(target.path)
      window.scrollTo(0, 0)
      return
    }

    if (target.sectionId) {
      if (location.pathname === '/') {
        const el = document.getElementById(target.sectionId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      } else {
        navigate({ pathname: '/', hash: `#${target.sectionId}` })
      }
    }
  }

  return (
    <nav className="fixed left-0 top-0 z-50 w-full overflow-x-hidden rounded-b-xl border-b border-[#333] bg-[#1a1a1a]/95 backdrop-blur-md text-[#e0e0e0]">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="pl-2 sm:pl-6 text-xl sm:text-2xl font-bold font-mono text-[#00ff41]">
          <Link
            to="/"
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
            className="hover:text-[#00ff41] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span className="h-2 w-2 rounded-full bg-[#00ff41] animate-ping" />
            <span>Daniel Guo</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-5 text-sm font-mono font-medium">
          <button
            type="button"
            onClick={() => handleNav({ sectionId: 'home' })}
            className="hover:text-[#00ff41] transition-colors cursor-pointer bg-transparent border-none p-0 text-inherit font-inherit"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => handleNav({ sectionId: 'about' })}
            className="hover:text-[#00ff41] transition-colors cursor-pointer bg-transparent border-none p-0 text-inherit font-inherit"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => handleNav({ sectionId: 'education' })}
            className="hover:text-[#00ff41] transition-colors cursor-pointer bg-transparent border-none p-0 text-inherit font-inherit"
          >
            Education
          </button>
          <button
            type="button"
            onClick={() => handleNav({ sectionId: 'experience' })}
            className="hover:text-[#00ff41] transition-colors cursor-pointer bg-transparent border-none p-0 text-inherit font-inherit"
          >
            Experience
          </button>
          <button
            type="button"
            onClick={() => handleNav({ path: '/projects' })}
            className="hover:text-[#00ff41] transition-colors cursor-pointer bg-transparent border-none p-0 text-inherit font-inherit"
          >
            Projects
          </button>
          <button
            type="button"
            onClick={() => handleNav({ sectionId: 'credentials' })}
            className="hover:text-[#00ff41] transition-colors cursor-pointer bg-transparent border-none p-0 text-inherit font-inherit"
          >
            Credentials
          </button>
          <button
            type="button"
            onClick={() => handleNav({ path: '/cybernews' })}
            className="hover:text-[#00ff41] transition-colors cursor-pointer bg-transparent border-none p-0 text-inherit font-inherit"
          >
            Threat Intel
          </button>
          <button
            type="button"
            onClick={() => handleNav({ sectionId: 'contact' })}
            className="hover:text-[#00ff41] transition-colors cursor-pointer bg-transparent border-none p-0 text-inherit font-inherit"
          >
            Contact
          </button>

          <div className="mx-2 h-5 w-px bg-[#333]" />
          <div className="flex items-center gap-3">
            <a href="https://github.com/Zernullo" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub Profile" className="transition-all hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.6)]">
              <Github className="h-4 w-4 text-[#e0e0e0] transition-colors hover:text-[#00ff41]" />
            </a>
            <a href="https://www.linkedin.com/in/daniel-guo-8251062b6/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn Profile" className="transition-all hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.6)]">
              <Linkedin className="h-4 w-4 text-[#e0e0e0] transition-colors hover:text-[#00ff41]" />
            </a>
            <a href="https://tryhackme.com/p/Zernullo" target="_blank" rel="noopener noreferrer" aria-label="TryHackMe" title="TryHackMe Profile" className="transition-all hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.6)]">
              <Shield className="h-4 w-4 text-[#e0e0e0] transition-colors hover:text-[#00ff41]" />
            </a>
          </div>
        </div>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-[#e0e0e0] hover:text-[#00ff41] transition-colors p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Backdrop */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-xs"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-[#1a1a1a] border-l border-[#333] shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close button */}
          <div className="flex justify-between items-center p-4 border-b border-[#333]">
            <span className="text-xs font-mono font-bold text-[#00ff41] tracking-wider">NAVIGATION</span>
            <button
              onClick={toggleMenu}
              className="text-[#e0e0e0] hover:text-[#00ff41] transition-colors p-1 cursor-pointer"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Menu items */}
          <div className="flex flex-col space-y-1 px-6 py-6 font-mono text-sm text-left">
            <button
              type="button"
              onClick={() => handleNav({ sectionId: 'home' })}
              className="hover:text-[#00ff41] transition-colors py-2.5 text-left bg-transparent border-none p-0 text-inherit font-inherit cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleNav({ sectionId: 'about' })}
              className="hover:text-[#00ff41] transition-colors py-2.5 text-left bg-transparent border-none p-0 text-inherit font-inherit cursor-pointer"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => handleNav({ sectionId: 'education' })}
              className="hover:text-[#00ff41] transition-colors py-2.5 text-left bg-transparent border-none p-0 text-inherit font-inherit cursor-pointer"
            >
              Education
            </button>
            <button
              type="button"
              onClick={() => handleNav({ sectionId: 'experience' })}
              className="hover:text-[#00ff41] transition-colors py-2.5 text-left bg-transparent border-none p-0 text-inherit font-inherit cursor-pointer"
            >
              Experience
            </button>
            <button
              type="button"
              onClick={() => handleNav({ path: '/projects' })}
              className="hover:text-[#00ff41] transition-colors py-2.5 text-left bg-transparent border-none p-0 text-inherit font-inherit cursor-pointer"
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() => handleNav({ sectionId: 'credentials' })}
              className="hover:text-[#00ff41] transition-colors py-2.5 text-left bg-transparent border-none p-0 text-inherit font-inherit cursor-pointer"
            >
              Credentials &amp; Leadership
            </button>
            <button
              type="button"
              onClick={() => handleNav({ path: '/cybernews' })}
              className="hover:text-[#00ff41] transition-colors py-2.5 text-left bg-transparent border-none p-0 text-inherit font-inherit cursor-pointer"
            >
              Threat Intel Radar
            </button>
            <button
              type="button"
              onClick={() => handleNav({ sectionId: 'contact' })}
              className="hover:text-[#00ff41] transition-colors py-2.5 text-left bg-transparent border-none p-0 text-inherit font-inherit cursor-pointer"
            >
              Contact
            </button>

            <div className="my-3 h-px bg-[#333]" />
            <div className="flex items-center gap-4 py-2">
              <a href="https://github.com/Zernullo" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub Profile">
                <Github className="h-5 w-5 text-[#e0e0e0] transition-colors hover:text-[#00ff41]" />
              </a>
              <a href="https://www.linkedin.com/in/daniel-guo-8251062b6/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn Profile">
                <Linkedin className="h-5 w-5 text-[#e0e0e0] transition-colors hover:text-[#00ff41]" />
              </a>
              <a href="https://tryhackme.com/p/Zernullo" target="_blank" rel="noopener noreferrer" aria-label="TryHackMe" title="TryHackMe Profile">
                <Shield className="h-5 w-5 text-[#e0e0e0] transition-colors hover:text-[#00ff41]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
