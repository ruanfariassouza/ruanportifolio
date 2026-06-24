import { useLayoutEffect, useRef } from 'react'
import usePreloader from '../../hooks/usePreloader'
import { gsap } from '../../utils/gsap'
import { revealSection } from '../../utils/reveal'
import useLanguage from '../../hooks/useLanguage'

export default function ProcessHome({ isClone = false }) {
  const rootRef = useRef(null)
  const { isLoading } = usePreloader()
  const { language, copy } = useLanguage()

  useLayoutEffect(() => {
    if (isLoading || isClone) return undefined
    const context = gsap.context(() => {
      revealSection('.process-row', rootRef.current, { y: 36, stagger: 0.08, duration: 0.85 })
    })
    return () => context.revert()
  }, [isClone, isLoading, language])

  return (
    <section ref={rootRef} className="process section-pad" id={isClone ? undefined : 'processo'}>
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