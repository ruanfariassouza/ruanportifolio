import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/ui/Nav'
import Preloader from './components/ui/Preloader'
import VirtualScroll from './utils/virtualScroll'

const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))

export default function App() {
  const location = useLocation()

  useEffect(() => {
    const scroll = new VirtualScroll()
    return () => scroll.destroy()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.classList.remove('nav-open')
  }, [location.pathname])

  return (
    <>
      <Preloader />
      <Nav />
      <div className="route-shell">
        <Suspense fallback={<div className="route-loader" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<Projects />} />
            <Route path="/projetos/:slug" element={<ProjectDetail />} />
          </Routes>
        </Suspense>
      </div>
    </>
  )
}