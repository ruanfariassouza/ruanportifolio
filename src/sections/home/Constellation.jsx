import { useLayoutEffect, useRef } from 'react'
import usePreloader from '../../hooks/usePreloader'
import { gsap } from '../../utils/gsap'
import useLanguage from '../../hooks/useLanguage'

export default function Constellation({ isClone = false }) {
  const rootRef = useRef(null)
  const { isLoading } = usePreloader()
  const { language, copy } = useLanguage()

  useLayoutEffect(() => {
    if (isLoading || isClone) return undefined
    const items = rootRef.current.querySelectorAll('.constellation__item')
    const context = gsap.context(() => {
      gsap.fromTo(items, 
        { autoAlpha: 0, scale: 0.9, y: 10 }, 
        {
          autoAlpha: (i) => copy.constellation[i].opacity,
          scale: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 70%',
            end: 'bottom 20%',
            scrub: 1
          }
        }
      )
    })
    return () => context.revert()
  }, [copy.constellation, isClone, isLoading, language])

  return (
    <section ref={rootRef} className="constellation" id={isClone ? undefined : 'repertorio'}>
      <div className="constellation__space">
        {copy.constellation.map((item) => (
          <span 
            key={item.text} 
            className="constellation__item"
            style={{
              position: 'absolute',
              left: item.x,
              top: item.y,
              fontSize: item.size,
              fontWeight: item.weight,
              transform: 'translate(-50%, -50%)',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap'
            }}
          >
            {item.text}
          </span>
        ))}
      </div>
    </section>
  )
}
