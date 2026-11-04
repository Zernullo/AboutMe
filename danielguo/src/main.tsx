import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './styles/global.css'
import AnimatedRoutes from '@/components/ui/AnimateRoute'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <AnimatedRoutes />
    </HashRouter>
  </StrictMode>
)