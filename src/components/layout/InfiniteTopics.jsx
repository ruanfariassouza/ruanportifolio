import { useEffect, useRef } from 'react'
import { ScrollTrigger } from '../../utils/gsap'
import { clearInfiniteLoopElement, getSmoothScroll, setInfiniteLoopElement } from '../../utils/smoothScroll'

export default function InfiniteTopics({ primary, clone }) {
  const loopRef = useRef(null)

  useEffect(() => {
    const node = loopRef.current
    if (!node) return undefined

    setInfiniteLoopElement(node)
    getSmoothScroll()?.setScroll(0, true)

    const observer = new ResizeObserver(() => {
      setInfiniteLoopElement(node)
      ScrollTrigger.refresh()
    })
    observer.observe(node)

    return () => {
      observer.disconnect()
      clearInfiniteLoopElement()
    }
  }, [])

  return (
    <div className="infinite-topics">
      <div ref={loopRef} className="infinite-topics__set">
        {primary}
      </div>
      <div className="infinite-topics__set infinite-topics__set--clone" aria-hidden="true">
        {clone}
      </div>
    </div>
  )
}