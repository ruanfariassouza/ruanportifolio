import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const COUNT = 2000

function Particles({ active }) {
  const pointsRef = useRef(null)
  const { positions, origins } = useMemo(() => {
    const data = new Float32Array(COUNT * 3)
    for (let index = 0; index < COUNT; index += 1) {
      const i = index * 3
      data[i] = (Math.random() - 0.5) * 12
      data[i + 1] = (Math.random() - 0.5) * 8
      data[i + 2] = (Math.random() - 0.5) * 3
    }
    return { positions: data, origins: new Float32Array(data) }
  }, [])

  useFrame(({ pointer }) => {
    if (!active || !pointsRef.current) return
    const attribute = pointsRef.current.geometry.attributes.position
    const mx = pointer.x * 5.5
    const my = pointer.y * 3.6
    for (let index = 0; index < COUNT; index += 1) {
      const i = index * 3
      let x = attribute.array[i]
      let y = attribute.array[i + 1]
      const dx = x - mx
      const dy = y - my
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < 1.5 && distance > 0.001) {
        const force = (1.5 - distance) * 0.035
        x += (dx / distance) * force
        y += (dy / distance) * force
      }
      attribute.array[i] = x + (origins[i] - x) * 0.03
      attribute.array[i + 1] = y + (origins[i + 1] - y) * 0.03
    }
    attribute.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={COUNT} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#2563eb" size={0.035} transparent opacity={0.48} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function ParticleField({ active = true }) {
  return (
    <Canvas className="webgl-canvas" dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 55 }} gl={{ alpha: true, antialias: false }}>
      <Particles active={active} />
    </Canvas>
  )
}
