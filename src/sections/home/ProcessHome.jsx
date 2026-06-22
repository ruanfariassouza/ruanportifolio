import { useLayoutEffect, useRef } from 'react'
import usePreloader from '../../hooks/usePreloader'
import { gsap } from '../../utils/gsap'

const steps = [
  ['01', 'Diagnóstico', 'Entender produto, contexto, perfil e o que hoje não está claro.'],
  ['02', 'Posicionamento', 'Escolher uma ideia central e um jeito coerente de se apresentar.'],
  ['03', 'Direção visual', 'Definir imagem, ritmo, enquadramento e regras que evitam improviso.'],
  ['04', 'Linha editorial', 'Transformar a estratégia em assuntos que a marca consegue sustentar.'],
  ['05', 'Conteúdo mobile', 'Roteirizar e captar com o que existe, sem depender de produção impossível.'],
  ['06', 'Publicação', 'Criar frequência com propósito, CTA e caminhos claros para contato.'],
  ['07', 'Leitura', 'Observar resposta, ajustar o sistema e registrar o que realmente funcionou.'],
]

export default function ProcessHome() {
  const rootRef = useRef(null)
  const { isLoading } = usePreloader()

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
  }, [isLoading])

  return (
    <section ref={rootRef} className="process section-pad" id="processo">
      <div className="shell">
        <div className="process__heading">
          <p className="eyebrow"><span /> Processo</p>
          <h2>Quando ainda não há muitos cases, <em>o processo vira prova.</em></h2>
        </div>
        <div className="process__list">
          {steps.map(([num, title, description]) => (
            <article className="process-row" key={num}><span>{num}</span><h3>{title}</h3><p>{description}</p></article>
          ))}
        </div>
      </div>
    </section>
  )
}
