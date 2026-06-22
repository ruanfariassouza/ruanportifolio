import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'
import usePreloader from '../../hooks/usePreloader'
import useLanguage from '../../hooks/useLanguage'

export default function Preloader() {
  const rootRef = useRef(null)
  const counterRef = useRef(null)
  const lineRef = useRef(null)
  const labelRef = useRef(null)
  const { isLoading, setIsLoading } = usePreloader()
  const { copy } = useLanguage()

  useLayoutEffect(() => {
    if (!isLoading) return undefined
    const state = { value: 0 }
    const context = gsap.context(() => {
      gsap.set([counterRef.current, labelRef.current], { autoAlpha: 0 })
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' })
      const timeline = gsap.timeline({
        onComplete: () => setIsLoading(false),
      })
      timeline
        .to(labelRef.current, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' }, 0)
        .to(counterRef.current, { autoAlpha: 1, duration: 0.25 }, 0)
        .to(state, {
          value: 100,
          duration: 2.8,
          ease: 'expo.out',
          onUpdate: () => {
            if (counterRef.current) counterRef.current.textContent = String(Math.round(state.value)).padStart(2, '0')
          },
        }, 0)
        .to(lineRef.current, { scaleX: 1, duration: 2.8, ease: 'expo.out' }, 0)
        .to(rootRef.current, { autoAlpha: 0, duration: 0.4, ease: 'power2.out' }, 2.8)
    })
    return () => context.revert()
  }, [isLoading, setIsLoading])

  if (!isLoading) return null
  return (
    <div ref={rootRef} className="preloader" role="status" aria-live="polite">
      <div ref={labelRef} className="preloader__label">{copy.preloader}</div>
      <div ref={counterRef} className="preloader__counter">00</div>
      <div className="preloader__line"><span ref={lineRef} /></div>
    </div>
  )
}
