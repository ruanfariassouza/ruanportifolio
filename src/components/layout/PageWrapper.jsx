import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from '../../utils/gsap'
import usePreloader from '../../hooks/usePreloader'
import { getSmoothScroll, resetScroll, scrollToElement } from '../../utils/smoothScroll'

export default function PageWrapper({ children, className = '' }) {
  const location = useLocation()
  const { isLoading } = usePreloader()

  useEffect(() => {
    resetScroll(true)
    const frame = window.requestAnimationFrame(() => {
      getSmoothScroll()?.onResize()
      ScrollTrigger.refresh()
    })
    return () => window.cancelAnimationFrame(frame)
  }, [location.pathname])

  useEffect(() => {
    if (isLoading) return undefined
    const observer = new ResizeObserver(() => {
      getSmoothScroll()?.onResize()
      ScrollTrigger.refresh()
    })
    observer.observe(document.documentElement)
    return () => observer.disconnect()
  }, [isLoading])

  useEffect(() => {
    if (isLoading || !location.hash) return undefined
    const frame = window.requestAnimationFrame(() => {
      const target = document.querySelector(location.hash)
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      scrollToElement(target, reduceMotion)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [isLoading, location.hash, location.pathname])

  return <main className={`page ${className}`}>{children}</main>
}