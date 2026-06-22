import { useLayoutEffect, useRef } from 'react'
import usePreloader from '../../hooks/usePreloader'
import { gsap } from '../../utils/gsap'

export default function AboutIntro() {
  const rootRef = useRef(null)
  const { isLoading } = usePreloader()

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
  }, [isLoading])

  return (
    <section ref={rootRef} className="about-intro shell section-pad" id="manifesto">
      <div data-about-reveal>
        <p className="eyebrow"><span /> Manifesto</p>
        <h2>Postar não é <em>presença.</em></h2>
      </div>
      <div className="about-intro__copy" data-about-reveal>
        <p>Um perfil pode ter conteúdo todos os dias e ainda não dizer nada.</p>
        <p>O que eu busco construir é direção: uma forma de organizar imagem, texto, ritmo e intenção para que uma marca pareça mais clara, confiável e desejável.</p>
        <div className="manifesto-note"><span>01</span><p>Clareza antes de volume.<br />Sistema antes de improviso.<br />Intenção antes de tendência.</p></div>
      </div>
    </section>
  )
}
