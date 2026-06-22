import { useEffect, useState } from 'react'

export default function useInView(ref, options = {}) {
  const [isInView, setIsInView] = useState(false)
  const threshold = options.threshold ?? 0.05
  const rootMargin = options.rootMargin ?? '120px'

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold, rootMargin },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, rootMargin, threshold])

  return isInView
}
