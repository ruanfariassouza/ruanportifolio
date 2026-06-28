import { useLayoutEffect, useRef } from 'react'
import usePreloader from '../../hooks/usePreloader'
import { gsap, SplitText } from '../../utils/gsap'
import useLanguage from '../../hooks/useLanguage'

export default function AboutIntro({ isClone = false }) {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const { isLoading } = usePreloader()
  const { language, copy } = useLanguage()

  useLayoutEffect(() => {
    if (isLoading || isClone) return undefined
    const split = new SplitText(titleRef.current, { type: 'words,lines' })
    const context = gsap.context(() => {
      gsap.fromTo(split.words, { yPercent: 115, autoAlpha: 0 }, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 1.15,
        stagger: 0.05,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 85%' },
      })
      gsap.fromTo('.about-intro__copy', { y: 30, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
      })
    })
    return () => { context.revert(); split.revert() }
  }, [isClone, isLoading, language])

  return (
    <section ref={rootRef} className="about-intro section-pad shell" id={isClone ? undefined : 'manifesto'}>
      <h2 key={language} ref={titleRef} style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.7)' }}>{copy.manifesto.title}</h2>
      <div className="about-intro__copy" style={{ paddingTop: '1rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>{copy.manifesto.body}</p>
        <div className="tag-list" style={{ marginTop: '1rem' }}>
          <span className="tag about-intro__location" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', borderRadius: '2px', padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>{copy.manifesto.location}</span>
        </div>
      </div>
    </section>
  )
}