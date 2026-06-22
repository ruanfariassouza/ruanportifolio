import { useLayoutEffect, useRef } from 'react'
import { services } from '../../data/services'
import usePreloader from '../../hooks/usePreloader'
import { gsap } from '../../utils/gsap'

export default function ServicesHome() {
  const rootRef = useRef(null)
  const { isLoading } = usePreloader()

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
  }, [isLoading])

  return (
    <section ref={rootRef} className="services section-pad" id="servicos">
      <div className="shell">
        <div className="section-heading">
          <p className="eyebrow"><span /> Serviços</p>
          <h2>O que posso construir<br /><em>com um negócio real.</em></h2>
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
