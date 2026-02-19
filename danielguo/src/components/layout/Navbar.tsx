// Navigation bar component
// Provides navigation links to different pages and handles theme switching

import { useState } from 'react'
import { Github, Linkedin, Menu, Shield, X } from 'lucide-react'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav className="fixed left-0 top-0 z-50 w-full overflow-x-hidden rounded-b-xl border-b border-[#333] bg-[#1a1a1a] text-[#e0e0e0]">
            <div className="flex items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
                <div className="pl-10 text-2xl font-bold text-[#00ff41]">
                    <a href="/" className="hover:text-[#00ff41] hover:underline transition-colors">Daniel Guo</a>
                </div>
                
                {/* Desktop Navigation - hidden on mobile, visible on md+ */}
                <div className="hidden md:flex items-center space-x-4 text-xl">
                    <a href="#home" className="hover:text-[#00ff41] hover:underline transition-colors">Home</a>
                    <a href="#about" className="hover:text-[#00ff41] hover:underline transition-colors">About</a>
                    <a href="#projects" className="hover:text-[#00ff41] hover:underline transition-colors">Projects</a>
                    <a href="#cybernews" className="hover:text-[#00ff41] hover:underline transition-colors">Cybernews</a>
                    <a href="#contact" className="hover:text-[#00ff41] hover:underline transition-colors">Contact</a>
                    <div className="mx-2 h-6 w-px bg-[#333]" />
                    <div className="flex items-center gap-3">
                        <a href="https://github.com/Zernullo" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub Profile" className="transition-all hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.6)]">
                            <Github className="h-5 w-5 text-[#e0e0e0] transition-colors hover:text-[#00ff41]" />
                        </a>
                        <a href="https://www.linkedin.com/in/daniel-guo-8251062b6/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn Profile" className="transition-all hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.6)]">
                            <Linkedin className="h-5 w-5 text-[#e0e0e0] transition-colors hover:text-[#00ff41]" />
                        </a>
                        <a href="https://tryhackme.com/p/Zernullo" target="_blank" rel="noopener noreferrer" aria-label="TryHackMe" title="TryHackMe Profile" className="transition-all hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.6)]">
                            <Shield className="h-5 w-5 text-[#e0e0e0] transition-colors hover:text-[#00ff41]" />
                        </a>
                    </div>
                </div>

                {/* Hamburger Menu Button - visible on mobile, hidden on md+ */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-[#e0e0e0] hover:text-[#00ff41] transition-colors p-2"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation - slides down when menu is open */}
            {isMenuOpen && (
                <div 
                    className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
            
            {/* Mobile Sidebar - slides in from right */}
            <div 
                className={`md:hidden fixed top-0 right-0 h-full w-64 bg-[#1a1a1a] border-l border-[#333] shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Close button */}
                    <div className="flex justify-end p-4 border-b border-[#333]">
                        <button
                            onClick={toggleMenu}
                            className="text-[#e0e0e0] hover:text-[#00ff41] transition-colors p-2"
                            aria-label="Close menu"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    
                    {/* Menu items */}
                    <div className="flex flex-col space-y-2 px-6 py-6">
                        <a
                            href="#home"
                            className="hover:text-[#00ff41] hover:underline transition-colors py-3 text-xl"
                            onClick={() => setIsMenuOpen(false)}
                        >Home</a>
                        <a
                            href="#about"
                            className="hover:text-[#00ff41] hover:underline transition-colors py-3 text-xl"
                            onClick={() => setIsMenuOpen(false)}
                        >About</a>
                        <a
                            href="#projects"
                            className="hover:text-[#00ff41] hover:underline transition-colors py-3 text-xl"
                            onClick={() => setIsMenuOpen(false)}
                        >Projects</a>
                        <a
                            href="/cybernews"
                            className="hover:text-[#00ff41] hover:underline transition-colors py-3 text-xl"
                            onClick={() => setIsMenuOpen(false)}
                        >Cybernews</a>
                        <a
                            href="#contact"
                            className="hover:text-[#00ff41] hover:underline transition-colors py-3 text-xl"
                            onClick={() => setIsMenuOpen(false)}
                        >Contact</a>

                        <div className="my-2 h-px bg-[#333]" />
                        <div className="flex items-center gap-4 py-2">
                            <a href="https://github.com/Zernullo" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub Profile" className="transition-all hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.6)]">
                                <Github className="h-6 w-6 text-[#e0e0e0] transition-colors hover:text-[#00ff41]" />
                            </a>
                            <a href="https://www.linkedin.com/in/daniel-guo-8251062b6/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn Profile" className="transition-all hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.6)]">
                                <Linkedin className="h-6 w-6 text-[#e0e0e0] transition-colors hover:text-[#00ff41]" />
                            </a>
                            <a href="https://tryhackme.com/p/Zernullo" target="_blank" rel="noopener noreferrer" aria-label="TryHackMe" title="TryHackMe Profile" className="transition-all hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.6)]">
                                <Shield className="h-6 w-6 text-[#e0e0e0] transition-colors hover:text-[#00ff41]" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}  

export default Navbar