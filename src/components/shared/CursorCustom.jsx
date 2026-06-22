import { useEffect, useRef } from 'react'
import { lerp } from '../../utils/math'
import usePreloader from '../../hooks/usePreloader'

const labels = { project: 'Ver →', video: 'Play' }

export default function CursorCustom() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)
  const { isLoading } = usePreloader()

  useEffect(() => {
    if (isLoading || window.matchMedia('(pointer: coarse)').matches) return undefined
    const target = { x: -100, y: -100 }
    const current = { x: -100, y: -100 }
    let frame

    const onMove = (event) => {
      target.x = event.clientX
      target.y = event.clientY
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`
    }
    const onOver = (event) => {
      const trigger = event.target.closest('[data-cursor]')
      const state = trigger?.dataset.cursor || 'default'
      ringRef.current.dataset.state = state
      labelRef.current.textContent = labels[state] || ''
    }
    const onOut = (event) => {
      if (!event.relatedTarget?.closest?.('[data-cursor]')) {
        ringRef.current.dataset.state = 'default'
        labelRef.current.textContent = ''
      }
    }
    const update = () => {
      current.x = lerp(current.x, target.x, 0.08)
      current.y = lerp(current.y, target.y, 0.08)
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`
      frame = requestAnimationFrame(update)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerout', onOut)
    update()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
    }
  }, [isLoading])

  return (
    <div className={isLoading ? 'cursor-system is-hidden' : 'cursor-system'}>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" data-state="default"><span ref={labelRef} /></div>
    </div>
  )
}
