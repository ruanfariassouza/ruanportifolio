import { useLayoutEffect, useRef } from 'react'
import { gsap, SplitText as GSAPSplitText } from '../../utils/gsap'
import usePreloader from '../../hooks/usePreloader'

export default function SplitText({ children, as: Tag = 'span', className = '', delay = 0, stagger = 0.08 }) {
  const ref = useRef(null)
  const { isLoading } = usePreloader()

  useLayoutEffect(() => {
    if (isLoading || !ref.current) return undefined
    const split = new GSAPSplitText(ref.current, { type: 'words,lines', linesClass: 'split-line' })
    const tween = gsap.fromTo(split.words, { yPercent: 110, autoAlpha: 0 }, {
      yPercent: 0,
      autoAlpha: 1,
      duration: 1.1,
      delay,
      stagger,
      ease: 'expo.out',
    })
    return () => {
      tween.kill()
      split.revert()
    }
  }, [delay, isLoading, stagger])

  return <Tag ref={ref} className={className}>{children}</Tag>
}
