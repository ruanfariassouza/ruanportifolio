import { useLayoutEffect, useRef } from 'react'
import usePreloader from '../../hooks/usePreloader'
import { gsap } from '../../utils/gsap'
import { revealSection } from '../../utils/reveal'
import useLanguage from '../../hooks/useLanguage'

export default function AboutIntro({ isClone = false }) {
  const rootRef = useRef(null)
  const { isLoading } = usePreloader()
  const { language, copy } = useLanguage()

  useLayoutEffect(() => {
    if (isLoading || isClone) return undefined
    const context = gsap.context(() => {
      revealSection('[data-about-reveal]', rootRef.current, { y: 60, stagger: 0.16, duration: 1 })
    })
    return () => context.revert()
  }, [isClone, isLoading, language])

  return (
    <section ref={rootRef} className="about-intro shell section-pad" id={isClone ? undefined : 'manifesto'}>
      <div data-about-reveal>
        <p className="eyebrow"><span /> {copy.manifesto.eyebrow}</p>
        <h2>{copy.manifesto.title} <em>{copy.manifesto.accent}</em></h2>
      </div>
      <div className="about-intro__copy" data-about-reveal>
        <p>{copy.manifesto.first}</p>
        <p>{copy.manifesto.second}</p>
        <div className="manifesto-note"><span>01</span><p>{copy.manifesto.principles.map((item) => <span key={item}>{item}<br /></span>)}</p></div>
      </div>
    </section>
  )
}