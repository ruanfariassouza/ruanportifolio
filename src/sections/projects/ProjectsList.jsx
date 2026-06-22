import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ProjectVisual from '../../components/shared/ProjectVisual'
import { projects } from '../../data/projects'
import usePreloader from '../../hooks/usePreloader'
import { gsap } from '../../utils/gsap'

export default function ProjectsList() {
  const rootRef = useRef(null)
  const { isLoading } = usePreloader()

  useLayoutEffect(() => {
    if (isLoading) return undefined
    const context = gsap.context(() => {
      gsap.fromTo('.project-card', { y: 54, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.09,
        duration: 0.95,
        delay: 0.15,
        ease: 'expo.out',
      })
    })
    return () => context.revert()
  }, [isLoading])

  return (
    <section ref={rootRef} className="projects-list shell">
      <div className="projects-list__note"><p>Projetos apresentados com a natureza correta: real, estudo autoral ou marca-conceito. O objetivo é mostrar raciocínio e direção, não fabricar resultados.</p></div>
      <div className="projects-grid">
        {projects.map((project) => (
          <Link key={project.slug} className="project-card" to={`/projetos/${project.slug}`} data-cursor="project">
            <ProjectVisual project={project} compact />
            <div className="project-card__meta">
              <span>{project.category}</span><span>{project.num}</span>
              <h2>{project.name}</h2><p>{project.coverLine}</p>
              <div>{project.tags.map((tag) => <i key={tag}>{tag}</i>)}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
