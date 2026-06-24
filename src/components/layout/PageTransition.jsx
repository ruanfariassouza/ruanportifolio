import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from '../../utils/gsap'
import usePreloader from '../../hooks/usePreloader'

const colors = {
  '/': '#2563eb',
  '/projetos': '#3b82f6',
  '/sobre': '#2563eb',
  '/contato': '#050505',
}

export default function PageTransition({ children }) {
  const curtainRef = useRef(null)
  const location = useLocation()
  const { isLoading } = usePreloader()
  const routeKey = location.pathname.startsWith('/projetos/') ? '/projetos' : location.pathname

  useLayoutEffect(() => {
    if (isLoading) return undefined
    const curtain = curtainRef.current
    const timeline = gsap.timeline()
    timeline
      .set(curtain, { scaleY: 0, transformOrigin: 'top center' })
      .to(curtain, { scaleY: 1, duration: 0.5, ease: 'power4.inOut' })
      .set(curtain, { transformOrigin: 'bottom center' })
      .to(curtain, { scaleY: 0, duration: 0.5, ease: 'power4.inOut' })
    return () => timeline.kill()
  }, [isLoading, location.pathname])

  return (
    <div className="route-shell">
      <div ref={curtainRef} className="page-curtain" style={{ background: colors[routeKey] || '#2563eb' }} />
      {children}
    </div>
  )
}