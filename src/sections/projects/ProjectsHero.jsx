import { useLayoutEffect, useRef } from 'react'
import usePreloader from '../../hooks/usePreloader'
import { gsap, SplitText } from '../../utils/gsap'

export default function ProjectsHero() {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const { isLoading } = usePreloader()

  useLayoutEffect(() => {
    if (isLoading) return undefined
    const split = new SplitText(titleRef.current, { type: 'chars' })
    const context = gsap.context(() => {
      gsap.fromTo(split.chars, { yPercent: 115, rotate: 4, autoAlpha: 0 }, {
        yPercent: 0,
        rotate: 0,
        autoAlpha: 1,
        duration: 1.05,
        stagger: 0.035,
        ease: 'expo.out',
      })
      gsap.fromTo('.projects-hero__sub', { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, delay: 0.45, duration: 0.8, ease: 'expo.out' })
    })
    return () => { context.revert(); split.revert() }
  }, [isLoading])

  return (
    <header ref={rootRef} className="projects-hero shell">
      <p className="eyebrow"><span /> Estudos autorais e projetos reais</p>
      <h1 ref={titleRef}>Projetos</h1>
      <div className="projects-hero__sub"><span>Problema · Insight · Sistema · Aprendizado</span><span>2025</span></div>
    </header>
  )
}
