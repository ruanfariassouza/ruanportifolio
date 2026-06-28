import { lazy, Suspense, useLayoutEffect, useRef, useState, useEffect } from 'react'
import useInView from '../../hooks/useInView'
import usePreloader from '../../hooks/usePreloader'
import { gsap } from '../../utils/gsap'
import useLanguage from '../../hooks/useLanguage'

const ParticleField = lazy(() => import('../../canvas/scenes/ParticleField'))

export default function ContactHome({ isClone = false }) {
  const rootRef = useRef(null)
  const inView = useInView(rootRef)
  const { isLoading } = usePreloader()
  const { language } = useLanguage()
  const [webgl, setWebgl] = useState(() => window.innerWidth >= 768)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const update = () => setWebgl(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useLayoutEffect(() => {
    if (isLoading || isClone) return undefined
    const context = gsap.context(() => {
      gsap.fromTo('.contact-home__action', { autoAlpha: 0, y: 10 }, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
      })
    })
    return () => { context.revert() }
  }, [isClone, isLoading, language])

  return (
    <footer ref={rootRef} className="contact-home" id={isClone ? undefined : 'contato'}>
      <div className="contact-home__gradient" />
      {webgl && (
        <div className="contact-home__canvas" aria-hidden="true">
          <Suspense fallback={null}><ParticleField active={inView && !isLoading && !isClone} /></Suspense>
        </div>
      )}
      <div className="contact-home__content shell">

        <div className="contact-home__action" style={{ marginTop: '3rem' }}>
          <a href="mailto:contato@ruan.help" className="link-hover" style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)' }}>
            Falar ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
