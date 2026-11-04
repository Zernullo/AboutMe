import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import { AnimatePresence, motion, type Variants } from "framer-motion"
import { lazy, Suspense, useEffect } from "react"
import App from "../../App"

// Lazy load pages
const CybernewsPage = lazy(() => import("../../pages/CybernewsPage"))
const ProjectsPage = lazy(() => import("../../pages/ProjectsPage"))

// Automatically reset scroll position to top when navigating across pages
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

// Fast, snappy cyber loader styling
const extraStyles = `
  .cyber-loader {
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-color);
    color: var(--primary-accent);
    font-family: var(--font-mono);
    padding: clamp(1.5rem, 6vw, 4rem);
    position: relative;
    overflow: hidden;
  }

  .cl-inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: min(480px, 90vw);
    position: relative;
    z-index: 1;
  }

  /* Scrolling grid */
  .cyber-loader::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,255,65,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,255,65,0.035) 1px, transparent 1px);
    background-size: 44px 44px;
    animation: cl-grid 14s linear infinite;
    pointer-events: none;
  }

  @keyframes cl-grid {
    from { transform: translateY(0); }
    to   { transform: translateY(44px); }
  }

  /* CRT vignette */
  .cyber-loader::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.75) 100%);
    pointer-events: none;
  }

  .cl-corner {
    position: absolute;
    width: 20px;
    height: 20px;
    border-color: var(--primary-accent);
    border-style: solid;
    opacity: 0.6;
    z-index: 2;
  }
  .cl-corner--tl { top: 16px; left: 16px; border-width: 2px 0 0 2px; }
  .cl-corner--tr { top: 16px; right: 16px; border-width: 2px 2px 0 0; }
  .cl-corner--bl { bottom: 16px; left: 16px; border-width: 0 0 2px 2px; }
  .cl-corner--br { bottom: 16px; right: 16px; border-width: 0 2px 2px 0; }

  .cl-title {
    font-size: clamp(0.85rem, 3vw, 1.6rem);
    font-weight: 700;
    letter-spacing: 0.3em;
    color: var(--primary-accent);
    text-shadow: 0 0 8px var(--primary-accent), 0 0 24px rgba(0,255,65,0.4);
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 1;
  }

  .cl-title::after {
    content: '_';
    animation: cl-blink 0.8s step-end infinite;
  }

  @keyframes cl-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  .cl-line {
    font-size: clamp(0.6rem, 1.5vw, 0.7rem);
    line-height: 2;
    letter-spacing: 0.1em;
    position: relative;
    z-index: 1;
    opacity: 0;
    animation: cl-appear 0.18s ease forwards;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .cl-line:nth-child(3) { animation-delay: 0.04s; }
  .cl-line:nth-child(4) { animation-delay: 0.12s; }
  .cl-line:nth-child(5) { animation-delay: 0.22s; }
  .cl-line:nth-child(6) { animation-delay: 0.32s; }
  .cl-line:nth-child(7) { animation-delay: 0.42s; }
  .cl-line:nth-child(8) { animation-delay: 0.52s; }

  @keyframes cl-appear {
    to { opacity: 1; }
  }

  .cl-tag  { color: var(--secondary-accent); margin-right: 0.6em; font-size: 0.65rem; }
  .cl-ok   { color: var(--primary-accent); text-shadow: 0 0 6px rgba(0,255,65,0.5); }
  .cl-warn { color: #ffaa00; }

  .cl-bar-track {
    width: 100%;
    height: 2px;
    background: rgba(0,255,65,0.12);
    border: 1px solid rgba(0,255,65,0.2);
    margin-top: 1.5rem;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }

  .cl-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-accent), #00f5ff);
    box-shadow: 0 0 8px var(--primary-accent);
    animation: cl-bar 0.95s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes cl-bar {
    0%   { width: 0%;   opacity: 1; }
    85%  { width: 100%; opacity: 1; }
    100% { width: 100%; opacity: 0.9; }
  }

  .cl-status {
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    color: var(--secondary-accent);
    margin-top: 0.5rem;
    position: relative;
    z-index: 1;
  }
`

export const LoadingScreen = () => (
  <>
    <style>{extraStyles}</style>
    <div className="cyber-loader">
      <div className="cl-corner cl-corner--tl" />
      <div className="cl-corner cl-corner--tr" />
      <div className="cl-corner cl-corner--bl" />
      <div className="cl-corner cl-corner--br" />

      <div className="cl-inner">
        <p className="cl-title">SYSTEM INIT</p>

        <p className="cl-line"><span className="cl-tag">[SYS]</span><span className="cl-ok">▶ OS_CORE .............. OK</span></p>
        <p className="cl-line"><span className="cl-tag">[NET]</span><span className="cl-ok">▶ UPLINK ............... ESTABLISHED</span></p>
        <p className="cl-line"><span className="cl-tag">[ENC]</span><span className="cl-ok">▶ AES-256 .............. ACTIVE</span></p>
        <p className="cl-line"><span className="cl-tag">[FW]</span> <span className="cl-ok">▶ FIREWALL ............. ONLINE</span></p>
        <p className="cl-line"><span className="cl-tag">[MEM]</span><span className="cl-ok">▶ HEAP ................. 2048 MB</span></p>
        <p className="cl-line"><span className="cl-tag">[MOD]</span><span className="cl-ok">▶ CORE MODULES ......... LOADED</span></p>

        <div className="cl-bar-track">
          <div className="cl-bar-fill" />
        </div>
        <p className="cl-status">INITIALIZING — INITIAL SEQUENCE READY</p>
      </div>
    </div>
  </>
)

const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
}

export default function AnimatedRoutes() {
  const location = useLocation()

  return (
    <Suspense fallback={<LoadingScreen />}>
      <ScrollToTop />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<App />} />
            <Route path="/cybernews" element={<CybernewsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            {/* Catch-all route to prevent 404 or blank screens */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Suspense>
  )
}
