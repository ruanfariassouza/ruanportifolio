import { useEffect, useRef } from 'react'

export default function useMousePosition() {
  const position = useRef({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 })

  useEffect(() => {
    const onMove = ({ clientX, clientY }) => {
      position.current = {
        x: clientX,
        y: clientY,
        normalizedX: (clientX / window.innerWidth) * 2 - 1,
        normalizedY: -(clientY / window.innerHeight) * 2 + 1,
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return position
}
