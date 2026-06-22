import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import useInView from '../../hooks/useInView'
import usePreloader from '../../hooks/usePreloader'
import { gsap, SplitText } from '../../utils/gsap'

const Ribbons = lazy(() => import('../../canvas/scenes/Ribbons'))

export default function AboutHero() {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const inView = useInView(rootRef)
  const { isLoading } = usePreloader()
  const [webgl, setWebgl] = useState(() => window.innerWidth >= 768)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const update = () => setWebgl(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useLayoutEffect(() => {
    if (isLoading) return undefined
    const split = new SplitText(titleRef.current, { type: 'words' })
    const tween = gsap.fromTo(split.words, { yPercent: 115, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.15, stagger: 0.1, ease: 'expo.out' })
    return () => { tween.kill(); split.revert() }
  }, [isLoading])

  return (
    <header ref={rootRef} className="about-hero">
      <div className="about-hero__gradient" />
      {webgl && <div className="about-hero__canvas"><Suspense fallback={null}><Ribbons active={inView && !isLoading} /></Suspense></div>}
      <div className="about-hero__content shell">
        <p className="eyebrow"><span /> Social media em construção · Vila Velha</p>
        <h1 ref={titleRef}>Sou Ruan <em>Farias.</em></h1>
        <p className="about-hero__intro">Observo muito antes de criar. Minha vantagem começa aí.</p>
      </div>
    </header>
  )
}
