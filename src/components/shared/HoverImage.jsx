import { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'
import { lerp } from '../../utils/math'

export default function HoverImage({ src, visible, alt = '' }) {
  const ref = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (event) => { mouse.current = { x: event.clientX, y: event.clientY } }
    let frame
    const update = () => {
      current.current.x = lerp(current.current.x, mouse.current.x, 0.1)
      current.current.y = lerp(current.current.y, mouse.current.y, 0.1)
      if (ref.current) gsap.set(ref.current, { x: current.current.x + 24, y: current.current.y - 120 })
      frame = requestAnimationFrame(update)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    update()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  useEffect(() => {
    gsap.to(ref.current, { autoAlpha: visible ? 1 : 0, scale: visible ? 1 : 0.84, duration: 0.35, ease: 'expo.out' })
  }, [visible])

  return <div ref={ref} className="hover-image"><img src={src} alt={alt} loading="lazy" /></div>
}
