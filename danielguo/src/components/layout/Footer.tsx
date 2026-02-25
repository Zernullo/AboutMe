// Footer component
// Displays footer content including copyright information and social media links

import { Github, Linkedin, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

function Footer() {
	const currentYear = new Date().getFullYear()

	return (
        <footer className="w-full overflow-x-hidden rounded-t-xl border-t border-[#333] bg-[#1a1a1a] text-[#e0e0e0] relative z-10">
            <div className="grid w-full grid-cols-1 gap-6 px-4 py-8 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
                <div className="min-w-0 text-center sm:text-left">
                    <h1 className="wrap-break-word text-xl font-bold text-[#00ff41] sm:text-4xl">Daniel Guo</h1>
                    <p className="mt-2 text-sm text-[#888888]">Cybersecurity Specialist</p>
                </div>

                <div className="min-w-0 text-center sm:text-left">
                    <h3 className="mb-3 text-lg font-bold text-[#00ff41] sm:text-xl">Contact</h3>
                    <p className="wrap-break-word">Email: dguo1@lsu.edu</p>
                    <p className="wrap-break-word">Location: Baton Rouge, LA</p>
                    <p className="wrap-break-word text-[#888888]">Open to opportunities</p>
                </div>

                <div className="min-w-0 text-center sm:text-left">
                    <h3 className="mb-3 text-lg font-bold text-[#00ff41] sm:text-xl">Connect</h3>
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
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

                <div className="min-w-0 text-center sm:text-left">
                    <h3 className="mb-3 text-lg font-bold text-[#00ff41] sm:text-xl">Navigation</h3>
                    <ul className="space-y-1">
                        <li>
                            <Link to="/#home" className="wrap-break-word hover:text-[#00ff41] hover:underline">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/#about" className="wrap-break-word hover:text-[#00ff41] hover:underline">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/projects" className="wrap-break-word hover:text-[#00ff41] hover:underline">
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link to="/cybernews" className="wrap-break-word hover:text-[#00ff41] hover:underline">
                                Cybernews
                            </Link>
                        </li>
                        <li>
                            <Link to="/#contact" className="wrap-break-word hover:text-[#00ff41] hover:underline">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-[#00ff41]/30 px-4 py-4 text-center text-sm text-[#888888] sm:px-6 lg:px-8">© {currentYear} Daniel Guo. All rights reserved.</div>
        </footer>
	)
}

export default Footer
