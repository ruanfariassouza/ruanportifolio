import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Marquee from '../../components/ui/Marquee'
import ScrollIndicator from '../../components/ui/ScrollIndicator'
import Button from '../../components/ui/Button'
import useInView from '../../hooks/useInView'
import usePreloader from '../../hooks/usePreloader'
import { gsap, SplitText } from '../../utils/gsap'

const FluidSphere = lazy(() => import('../../canvas/scenes/FluidSphere'))
const marqueeItems = ['Diagnóstico', '·', 'Direção criativa', '·', 'Conteúdo mobile', '·', 'Planejamento', '·', 'Presença digital', '·']

export default function Hero() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollRef = useRef(null)
  const isInView = useInView(sectionRef)
  const { isLoading } = usePreloader()
  const [webgl, setWebgl] = useState(() => window.innerWidth >= 768)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const update = () => setWebgl(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useLayoutEffect(() => {
    if (isLoading) return undefined
    const split = new SplitText(headlineRef.current, { type: 'words', wordsClass: 'hero-word' })
    const context = gsap.context(() => {
      gsap.fromTo(split.words, { y: 80, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        duration: 1.15,
        stagger: 0.12,
        ease: 'expo.out',
      })
      gsap.fromTo(subRef.current, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, delay: 0.6, ease: 'expo.out' })
      gsap.fromTo(ctaRef.current, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, delay: 0.8, ease: 'expo.out' })
      gsap.fromTo(scrollRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7, delay: 1 })
    })
    return () => {
      context.revert()
      split.revert()
    }
  }, [isLoading])

  return (
    <section ref={sectionRef} className="hero" aria-labelledby="hero-title">
      <div className="hero__gradient" />
      {webgl && (
        <div className="hero__canvas" aria-hidden="true">
          <Suspense fallback={null}><FluidSphere active={isInView && !isLoading} /></Suspense>
        </div>
      )}
      <div className="hero__content shell">
        <p className="eyebrow hero__eyebrow"><span /> Social Media · Direção Criativa · Presença Digital</p>
        <h1 id="hero-title" ref={headlineRef} className="hero__title">
          Construo presença digital para marcas que ainda não sabem <em>se apresentar.</em>
        </h1>
        <p ref={subRef} className="hero__sub">Antes de postar mais, uma marca precisa parecer intencional. Este portfólio reúne estudos autorais, experimentos visuais e sistemas de conteúdo para pequenos negócios e projetos digitais.</p>
        <div ref={ctaRef} className="hero__cta"><Button to="/projetos">Ver projetos</Button><Button to="/contato" className="button--quiet">Falar comigo</Button></div>
        {!isLoading && <div ref={scrollRef} className="hero__scroll"><ScrollIndicator /></div>}
        <Link className="hero__side-note" to="/sobre" data-cursor="link">Estudos autorais<br />Processo como prova</Link>
      </div>
      {!isLoading && <Marquee items={marqueeItems} />}
    </section>
  )
}
