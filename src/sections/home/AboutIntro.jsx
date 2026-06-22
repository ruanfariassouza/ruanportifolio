import { useLayoutEffect, useRef } from 'react'
import usePreloader from '../../hooks/usePreloader'
import { gsap } from '../../utils/gsap'
import useLanguage from '../../hooks/useLanguage'

export default function AboutIntro() {
  const rootRef = useRef(null)
  const { isLoading } = usePreloader()
  const { language, copy } = useLanguage()

  useLayoutEffect(() => {
    if (isLoading) return undefined
    const context = gsap.context(() => {
      gsap.fromTo('[data-about-reveal]', { y: 60, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        stagger: 0.16,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 72%' },
      })
    })
    return () => context.revert()
  }, [isLoading, language])

  return (
    <section ref={rootRef} className="about-intro shell section-pad" id="manifesto">
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
