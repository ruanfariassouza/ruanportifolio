import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import fragmentShader from '../shaders/ribbons.frag.glsl'

const vertexShader = `
  uniform float uTime;
  uniform float uOffset;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    float phase = uv.y * 8.0 + uTime * 0.65 + uOffset;
    pos.x += sin(phase) * 0.45 + cos(phase * 0.48) * 0.16;
    pos.z += cos(phase * 0.72) * 0.55;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

function RibbonCollection({ active }) {
  const groupRef = useRef(null)
  const materials = useRef([])
  const { camera, pointer } = useThree()
  const ribbons = useMemo(() => Array.from({ length: 20 }, (_, index) => ({
    x: (index - 9.5) * 0.42,
    y: Math.sin(index * 1.7) * 0.8,
    z: -2 - (index % 5) * 0.5,
    rotation: (Math.random() - 0.5) * 0.9,
    color: index % 2 === 0 ? '#c8b89d' : '#8ea7c2',
    offset: index * 0.73,
  })), [])

  useFrame(() => {
    if (!active) return
    materials.current.forEach((material) => { if (material) material.uniforms.uTime.value += 0.01 })
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.55, 0.03)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.3, 0.03)
    camera.lookAt(0, 0, -2)
    groupRef.current.rotation.z += 0.00025
  })

  return (
    <group ref={groupRef} rotation={[0, 0, Math.PI / 2]}>
      {ribbons.map((ribbon, index) => (
        <mesh key={ribbon.offset} position={[ribbon.x, ribbon.y, ribbon.z]} rotation={[0, ribbon.rotation, 0]}>
          <planeGeometry args={[0.1, 9, 1, 96]} />
          <shaderMaterial
            ref={(material) => { materials.current[index] = material }}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
            uniforms={{
              uTime: { value: 0 },
              uOffset: { value: ribbon.offset },
              uColor: { value: new THREE.Color(ribbon.color) },
            }}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function Ribbons({ active = true }) {
  return (
    <Canvas className="webgl-canvas" dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 50 }} gl={{ alpha: true, antialias: false }}>
      <RibbonCollection active={active} />
    </Canvas>
  )
}
