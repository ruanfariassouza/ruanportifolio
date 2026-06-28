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
    <header ref={contentRef} className="case-fullbleed" style={{ marginBottom: '4rem' }}>
      <div className="case-fullbleed__bg">
        <ProjectVisual project={project} />
        <div className="case-fullbleed__overlay" />
      </div>
      <div className="case-fullbleed__content shell">
        <div className="case-fullbleed__tags">
          {project.tags?.map(tag => <span key={tag} className="tag-tech">[{tag}]</span>)}
          <span className="tag-tech tag-tech--status">status: {project.status || 'estudo'}</span>
        </div>
        <h1 className="case-fullbleed__title" style={{ color: '#fff' }}>{project.name}</h1>
        <p className="case-fullbleed__claim">{project.coverLine}</p>
      </div>
    </header>
  )
}
