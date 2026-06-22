import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import vertexShader from '../shaders/fluidSphere.vert.glsl'
import fragmentShader from '../shaders/fluidSphere.frag.glsl'
import PostProcessingEffects from '../postprocessing/effects'

const REQUESTED_DETAIL = 20
const RUNTIME_DETAIL = Math.min(REQUESTED_DETAIL, 6)

function Sphere({ active }) {
  const meshRef = useRef(null)
  const materialRef = useRef(null)
  const targetMouse = useMemo(() => new THREE.Vector2(), [])
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2() },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uColor1: { value: new THREE.Color('#c8b89d') },
    uColor2: { value: new THREE.Color('#8ea7c2') },
  }), [])

  useFrame(({ pointer, size }) => {
    if (!active || !materialRef.current) return
    materialRef.current.uniforms.uTime.value += 0.01
    targetMouse.set(pointer.x, pointer.y)
    materialRef.current.uniforms.uMouse.value.lerp(targetMouse, 0.05)
    materialRef.current.uniforms.uResolution.value.set(size.width, size.height)
    meshRef.current.rotation.y += 0.0015
  })

  return (
    <mesh ref={meshRef} rotation={[0.1, -0.4, 0]} scale={1.08}>
      <icosahedronGeometry args={[2, RUNTIME_DETAIL]} />
      <shaderMaterial ref={materialRef} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
    </mesh>
  )
}

export default function FluidSphere({ active = true }) {
  return (
    <Canvas className="webgl-canvas" dpr={[1, 1.5]} camera={{ position: [0, 0, 5.4], fov: 45 }} gl={{ antialias: false, powerPreference: 'high-performance' }}>
      <Sphere active={active} />
      <PostProcessingEffects active={active} />
    </Canvas>
  )
}
