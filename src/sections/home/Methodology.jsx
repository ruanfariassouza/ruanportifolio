import { useLayoutEffect, useRef } from 'react'
import usePreloader from '../../hooks/usePreloader'
import { gsap, SplitText } from '../../utils/gsap'
import useLanguage from '../../hooks/useLanguage'

export default function Methodology({ isClone = false }) {
  const rootRef = useRef(null)
  const { isLoading } = usePreloader()
  const { language, copy } = useLanguage()

  useLayoutEffect(() => {
    if (isLoading || isClone) return undefined
    
    const lines = rootRef.current.querySelectorAll('.methodology__line')
    
    const context = gsap.context(() => {
      lines.forEach((line) => {
        const split = new SplitText(line, { type: 'words' })
        gsap.fromTo(split.words, 
          { autoAlpha: 0, y: 15 }, 
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.04,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 85%'
            }
          }
        )
      })
    })
    return () => context.revert()
  }, [isClone, isLoading, language])

  return (
    <section ref={rootRef} className="methodology section-pad shell" id={isClone ? undefined : 'metodo'}>
      <div className="methodology__content">
        {copy.method.map((text, i) => (
          <p key={i} className="methodology__line">{text}</p>
        ))}
      </div>
    </section>
  )
}
