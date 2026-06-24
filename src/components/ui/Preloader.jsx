import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'
import { trackInitialLoad } from '../../utils/preloaderProgress'
import usePreloader from '../../hooks/usePreloader'
import useLanguage from '../../hooks/useLanguage'

function setProgress(counterEl, lineEl, value) {
  const rounded = Math.min(100, Math.round(value))
  if (counterEl) counterEl.textContent = String(rounded).padStart(2, '0')
  if (lineEl) lineEl.style.transform = `scaleX(${value / 100})`
}

export default function Preloader() {
  const rootRef = useRef(null)
  const counterRef = useRef(null)
  const lineRef = useRef(null)
  const labelRef = useRef(null)
  const { isLoading, setIsLoading } = usePreloader()
  const { copy } = useLanguage()

  useLayoutEffect(() => {
    if (!isLoading) return undefined

    let cancelled = false
    const context = gsap.context(() => {
      gsap.set([counterRef.current, labelRef.current], { autoAlpha: 0 })
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' })
      setProgress(counterRef.current, lineRef.current, 0)

      gsap.timeline()
        .to(labelRef.current, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' })
        .to(counterRef.current, { autoAlpha: 1, duration: 0.2 }, 0)

      trackInitialLoad((progress) => {
        if (cancelled) return
        setProgress(counterRef.current, lineRef.current, progress)
      }).then(() => {
        if (cancelled) return
        const state = { value: Number(counterRef.current?.textContent ?? 99) }
        gsap.timeline({ onComplete: () => setIsLoading(false) })
          .to(state, {
            value: 100,
            duration: 0.25,
            ease: 'expo.out',
            onUpdate: () => setProgress(counterRef.current, lineRef.current, state.value),
          })
          .to(rootRef.current, { autoAlpha: 0, duration: 0.35, ease: 'power2.out' }, '-=0.08')
      })
    })

    return () => {
      cancelled = true
      context.revert()
    }
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