import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const passVertex = `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
`

const simulationFragment = `
  precision highp float;
  uniform sampler2D uPrev;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec2 uVelocity;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 texel = 1.0 / uResolution;
    vec4 center = texture2D(uPrev, vUv);
    vec4 blur = texture2D(uPrev, vUv + vec2(texel.x, 0.0))
      + texture2D(uPrev, vUv - vec2(texel.x, 0.0))
      + texture2D(uPrev, vUv + vec2(0.0, texel.y))
      + texture2D(uPrev, vUv - vec2(0.0, texel.y));
    blur *= 0.25;
    vec2 flow = vec2(center.g - center.b, center.r - center.g) * 0.003;
    vec4 advected = texture2D(uPrev, vUv - flow - uVelocity * 0.003);
    vec4 color = mix(advected, blur, 0.018) * 0.992;
    float aspect = uResolution.x / uResolution.y;
    vec2 delta = vUv - uMouse;
    delta.x *= aspect;
    float splat = exp(-dot(delta, delta) * 155.0) * min(length(uVelocity) * 8.0 + 0.13, 1.0);
    vec3 ink = mix(vec3(0.56, 0.65, 0.76), vec3(0.78, 0.72, 0.62), 0.5 + 0.5 * sin(uTime));
    color.rgb += ink * splat * 0.75;
    color.a = 1.0;
    gl_FragColor = color;
  }
`

const displayFragment = `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  void main() {
    vec3 ink = texture2D(uTexture, vUv).rgb;
    float vignette = smoothstep(0.95, 0.25, distance(vUv, vec2(0.5)));
    vec3 color = vec3(0.024) + ink * 1.18 * vignette;
    gl_FragColor = vec4(color, 1.0);
  }
`

function Simulation({ active }) {
  const displayRef = useRef(null)
  const { gl, size, pointer } = useThree()
  const previousMouse = useRef(new THREE.Vector2(0.5, 0.5))
  const targets = useRef([])

  const setup = useMemo(() => {
    const resolution = Math.min(768, Math.max(256, Math.round(window.innerWidth * 0.65)))
    const options = { type: THREE.HalfFloatType, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: false }
    const a = new THREE.WebGLRenderTarget(resolution, resolution, options)
    const b = new THREE.WebGLRenderTarget(resolution, resolution, options)
    targets.current = [a, b]
    const scene = new THREE.Scene()
    const camera = new THREE.Camera()
    const material = new THREE.ShaderMaterial({
      vertexShader: passVertex,
      fragmentShader: simulationFragment,
      uniforms: {
        uPrev: { value: a.texture },
        uResolution: { value: new THREE.Vector2(resolution, resolution) },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uVelocity: { value: new THREE.Vector2() },
        uTime: { value: 0 },
      },
    })
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(quad)
    return { scene, camera, material, read: a, write: b }
  }, [])

  const displayMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: passVertex,
    fragmentShader: displayFragment,
    uniforms: { uTexture: { value: setup.read.texture } },
    depthTest: false,
    depthWrite: false,
  }), [setup])

  useFrame((_, delta) => {
    if (!active) return
    const mouse = new THREE.Vector2(pointer.x * 0.5 + 0.5, pointer.y * 0.5 + 0.5)
    const velocity = mouse.clone().sub(previousMouse.current)
    previousMouse.current.lerp(mouse, 0.35)
    setup.material.uniforms.uPrev.value = setup.read.texture
    setup.material.uniforms.uMouse.value.copy(mouse)
    setup.material.uniforms.uVelocity.value.copy(velocity)
    setup.material.uniforms.uTime.value += delta
    gl.setRenderTarget(setup.write)
    gl.render(setup.scene, setup.camera)
    gl.setRenderTarget(null)
    const swap = setup.read
    setup.read = setup.write
    setup.write = swap
    displayMaterial.uniforms.uTexture.value = setup.read.texture
  }, -1)

  useEffect(() => () => {
    targets.current.forEach((target) => target.dispose())
    setup.material.dispose()
    displayMaterial.dispose()
  }, [displayMaterial, setup])

  return (
    <mesh ref={displayRef} material={displayMaterial} scale={[size.width / size.height, 1, 1]}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  )
}

export default function FluidSimulation({ active = true }) {
  return (
    <Canvas className="webgl-canvas" orthographic camera={{ position: [0, 0, 1], zoom: 1 }} dpr={[1, 1.25]} gl={{ antialias: false }}>
      <Simulation active={active} />
    </Canvas>
  )
}
