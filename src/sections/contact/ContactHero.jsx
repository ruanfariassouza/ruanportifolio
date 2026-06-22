import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import useInView from '../../hooks/useInView'
import usePreloader from '../../hooks/usePreloader'
import { gsap, SplitText } from '../../utils/gsap'
import useLanguage from '../../hooks/useLanguage'

const FluidSimulation = lazy(() => import('../../canvas/scenes/FluidSimulation'))

export default function ContactHero() {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const inView = useInView(rootRef)
  const { isLoading } = usePreloader()
  const { language, copy } = useLanguage()
  const [webgl, setWebgl] = useState(() => window.innerWidth >= 768)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const update = () => setWebgl(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useLayoutEffect(() => {
    if (isLoading) return undefined
    const split = new SplitText(titleRef.current, { type: 'words,lines' })
    const tween = gsap.fromTo(split.words, { yPercent: 115, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, stagger: 0.09, duration: 1.15, ease: 'expo.out' })
    return () => { tween.kill(); split.revert() }
  }, [isLoading, language])

  return (
    <header ref={rootRef} className="contact-hero">
      <div className="contact-hero__gradient" />
      {webgl && <div className="contact-hero__canvas"><Suspense fallback={null}><FluidSimulation active={inView && !isLoading} /></Suspense></div>}
      <div className="contact-hero__content shell">
        <p className="eyebrow"><span /> {copy.contact.eyebrow}</p>
        <h1 key={language} ref={titleRef}>{copy.contact.title} <em>{copy.contact.accent}</em></h1>
        <p>{copy.contact.body}</p>
      </div>
    </header>
  )
}
