import { useLayoutEffect, useRef } from 'react'
import usePreloader from '../../hooks/usePreloader'
import { gsap } from '../../utils/gsap'
import ProjectVisual from '../../components/shared/ProjectVisual'

export default function CaseHero({ project }) {
  const mediaRef = useRef(null)
  const contentRef = useRef(null)
  const { isLoading } = usePreloader()

  useLayoutEffect(() => {
    if (isLoading) return undefined
    const timeline = gsap.timeline()
    timeline
      .fromTo(mediaRef.current, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.25, ease: 'power4.inOut' })
      .fromTo(contentRef.current.children, { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.09, duration: 0.8, ease: 'expo.out' }, 0.72)
    return () => timeline.kill()
  }, [isLoading, project.slug])

  return (
    <header className="case-hero">
      <div ref={mediaRef} className="case-hero__media"><ProjectVisual project={project} /></div>
      <div ref={contentRef} className="case-hero__content shell">
        <span>{project.num} / {project.type} / {project.year}</span>
        <h1>{project.name}</h1>
        <p>{project.coverLine}</p>
      </div>
    </header>
  )
}
