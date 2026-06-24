import { useLayoutEffect, useRef } from 'react'
import { localizeServices } from '../../data/services'
import usePreloader from '../../hooks/usePreloader'
import { gsap } from '../../utils/gsap'
import { revealSection } from '../../utils/reveal'
import useLanguage from '../../hooks/useLanguage'

export default function ServicesHome({ isClone = false }) {
  const rootRef = useRef(null)
  const { isLoading } = usePreloader()
  const { language, copy } = useLanguage()
  const services = localizeServices(language)

  useLayoutEffect(() => {
    if (isLoading || isClone) return undefined
    const context = gsap.context(() => {
      revealSection('.service-card', rootRef.current, { y: 48, stagger: 0.1, duration: 0.85 })
    })
    return () => context.revert()
  }, [isClone, isLoading, language])

  return (
    <section ref={rootRef} className="services section-pad" id={isClone ? undefined : 'competencias'}>
      <div className="shell">
        <div className="section-heading">
          <p className="eyebrow"><span /> {copy.capabilities.eyebrow}</p>
          <h2>{copy.capabilities.title}<br /><em>{copy.capabilities.accent}</em></h2>
        </div>
        <div className="services__grid">
          {services.map((service) => (
            <article key={service.num} className="service-card">
              <span>{service.num}</span>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}