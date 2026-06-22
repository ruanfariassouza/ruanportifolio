import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { gsap } from '../../utils/gsap'
import usePreloader from '../../hooks/usePreloader'

const colors = {
  '/': '#c8b89d',
  '/projetos': '#8ea7c2',
  '/sobre': '#c8b89d',
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
      .to(curtain, { scaleY: 1, duration: 0.55, ease: 'power4.inOut' })
      .set(curtain, { transformOrigin: 'bottom center' })
      .to(curtain, { scaleY: 0, duration: 0.55, ease: 'power4.inOut' })
    return () => timeline.kill()
  }, [isLoading, location.pathname])

  return (
    <motion.div
      className="route-shell"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div ref={curtainRef} className="page-curtain" style={{ background: colors[routeKey] || '#c8b89d' }} />
      {children}
    </motion.div>
  )
}
