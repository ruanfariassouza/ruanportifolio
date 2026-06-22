import { useLayoutEffect, useRef } from 'react'
import usePreloader from '../../hooks/usePreloader'
import { gsap } from '../../utils/gsap'
import useLanguage from '../../hooks/useLanguage'

export default function ProcessHome() {
  const rootRef = useRef(null)
  const { isLoading } = usePreloader()
  const { language, copy } = useLanguage()

  useLayoutEffect(() => {
    if (isLoading) return undefined
    const context = gsap.context(() => {
      gsap.fromTo('.process-row', { y: 36, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.08,
        duration: 0.85,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 72%' },
      })
    })
    return () => context.revert()
  }, [isLoading, language])

  return (
    <section ref={rootRef} className="process section-pad" id="processo">
      <div className="shell">
        <div className="process__heading">
          <p className="eyebrow"><span /> {copy.process.eyebrow}</p>
          <h2>{copy.process.title} <em>{copy.process.accent}</em></h2>
        </div>
        <div className="process__list">
          {copy.process.steps.map(([num, title, description]) => (
            <article className="process-row" key={num}><span>{num}</span><h3>{title}</h3><p>{description}</p></article>
          ))}
        </div>
      </div>
    </section>
  )
}
