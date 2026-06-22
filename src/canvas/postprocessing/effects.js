import { useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js'
import { Vector2 } from 'three'

export default function PostProcessingEffects({ active = true }) {
  const { gl, scene, camera, size } = useThree()
  const composer = useMemo(() => {
    const next = new EffectComposer(gl)
    next.addPass(new RenderPass(scene, camera))
    next.addPass(new UnrealBloomPass(new Vector2(size.width, size.height), 1.2, 0.4, 0.1))
    next.addPass(new FilmPass(0.15, false))
    return next
  }, [camera, gl, scene, size.height, size.width])

  useEffect(() => {
    composer.setSize(size.width, size.height)
  }, [composer, size])

  useEffect(() => () => composer.dispose(), [composer])

  useFrame((_, delta) => {
    if (active) composer.render(delta)
  }, 1)

  return null
}
