import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ProjectVisual from '../../components/shared/ProjectVisual'
import { featuredProjects, localizeProjects } from '../../data/projects'
import { gsap } from '../../utils/gsap'
import usePreloader from '../../hooks/usePreloader'
import useLanguage from '../../hooks/useLanguage'

export default function Reel({ isClone = false }) {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const { isLoading } = usePreloader()
  const { language, copy } = useLanguage()
  const projects = localizeProjects(featuredProjects, language)

  useLayoutEffect(() => {
    if (isLoading || isClone || window.innerWidth < 768) return undefined
    const context = gsap.context(() => {
      const distance = () => Math.max(0, trackRef.current.scrollWidth - window.innerWidth)
      gsap.to(trackRef.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    })
    return () => context.revert()
  }, [isClone, isLoading, language])

  return (
    <section ref={rootRef} className="reel" aria-label={copy.reel.aria}>
      <div className="reel__intro shell">
        <div><p className="eyebrow"><span /> {copy.reel.eyebrow}</p><h2>{copy.reel.title}<br /><em>{copy.reel.accent}</em></h2></div>
        <p>{copy.reel.body}</p>
      </div>
      <div ref={trackRef} className="reel__track">
        {projects.map((project) => (
          <Link key={project.slug} className="reel-card" to={`/projetos/${project.slug}`} data-cursor="project">
            <ProjectVisual project={project} />
            <div className="reel-card__meta"><span>{project.type}</span><h3>{project.name}</h3><p>{project.coverLine}</p></div>
          </Link>
        ))}
      </div>
    </section>
  )
}
