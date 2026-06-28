import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import useInView from '../../hooks/useInView'
import usePreloader from '../../hooks/usePreloader'
import { gsap, SplitText } from '../../utils/gsap'
import useLanguage from '../../hooks/useLanguage'

const FluidSphere = lazy(() => import('../../canvas/scenes/FluidSphere'))

export default function Hero({ isClone = false }) {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const subRef = useRef(null)
  const inView = useInView(rootRef)
  const { isLoading } = usePreloader()
  const { language, copy } = useLanguage()
  const [webgl, setWebgl] = useState(() => window.innerWidth >= 768)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const update = () => setWebgl(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useLayoutEffect(() => {
    if (isLoading || isClone) return undefined
    const split = new SplitText(titleRef.current, { type: 'words,lines' })
    
    // Wrap words to keep them block level for overflow: hidden
    split.words.forEach(word => {
      const wrapper = document.createElement('div')
      wrapper.className = 'hero-word'
      wrapper.style.overflow = 'hidden'
      word.parentNode.insertBefore(wrapper, word)
      wrapper.appendChild(word)
    })

    const context = gsap.context(() => {
      gsap.fromTo(split.words, { yPercent: 120 }, {
        yPercent: 0,
        duration: 1.4,
        stagger: 0.05,
        ease: 'expo.out',
      })
      gsap.fromTo(subRef.current, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, delay: 0.4, ease: 'expo.out' })
    })

    return () => { context.revert(); split.revert() }
  }, [isClone, isLoading, language])

  return (
    <header ref={rootRef} className="hero">
      <div className="hero__gradient" />
      {webgl && <div className="hero__canvas"><Suspense fallback={null}><FluidSphere active={inView && !isClone && !isLoading} /></Suspense></div>}
      <div className="hero__content shell">
        <h1 key={language} ref={titleRef} className="hero__title">{copy.hero.title}</h1>
        <p ref={subRef} className="hero__sub">{copy.hero.body}</p>
      </div>
      
      <div className="scroll-indicator" style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', opacity: 0.5, fontFamily: 'var(--font-display)', fontSize: '0.8rem' }}>
        <span>{copy.scroll}</span>
      </div>
    </header>
  )
}
