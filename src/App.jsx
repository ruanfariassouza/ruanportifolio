import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/ui/Nav'
import Preloader from './components/ui/Preloader'
import CursorCustom from './components/shared/CursorCustom'
import PageTransition from './components/layout/PageTransition'
import useLanguage from './hooks/useLanguage'
import usePreloader from './hooks/usePreloader'
import { destroySmoothScroll, initSmoothScroll } from './utils/smoothScroll'

const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

export default function App() {
  const location = useLocation()
  const { copy } = useLanguage()
  const { isLoading } = usePreloader()

  useEffect(() => {
    if (isLoading) return undefined
    initSmoothScroll()
    return () => destroySmoothScroll()
  }, [isLoading])

  return (
    <>
      <Preloader />
      <CursorCustom />
      <Nav />
      <PageTransition key={location.pathname}>
        <Suspense fallback={<div className="route-loader" aria-label={copy.routeLoading} />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<Projects />} />
            <Route path="/projetos/:slug" element={<ProjectDetail />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </PageTransition>
    </>
  )
}