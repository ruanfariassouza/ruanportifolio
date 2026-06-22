import { useLayoutEffect, useRef } from 'react'
import { localizeServices } from '../../data/services'
import usePreloader from '../../hooks/usePreloader'
import { gsap } from '../../utils/gsap'
import useLanguage from '../../hooks/useLanguage'

export default function ServicesHome() {
  const rootRef = useRef(null)
  const { isLoading } = usePreloader()
  const { language, copy } = useLanguage()
  const services = localizeServices(language)

  useLayoutEffect(() => {
    if (isLoading) return undefined
    const context = gsap.context(() => {
      gsap.fromTo('.service-card', { y: 48, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.1,
        duration: 0.85,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 72%' },
      })
    })
    return () => context.revert()
  }, [isLoading, language])

  return (
    <section ref={rootRef} className="services section-pad" id="competencias">
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
