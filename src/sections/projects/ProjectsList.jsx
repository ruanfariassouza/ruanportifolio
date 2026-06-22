import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ProjectVisual from '../../components/shared/ProjectVisual'
import { localizeProjects, projects as projectData } from '../../data/projects'
import usePreloader from '../../hooks/usePreloader'
import { gsap } from '../../utils/gsap'
import useLanguage from '../../hooks/useLanguage'

export default function ProjectsList() {
  const rootRef = useRef(null)
  const { isLoading } = usePreloader()
  const { language, copy } = useLanguage()
  const projects = localizeProjects(projectData, language)

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
  }, [isLoading, language])

  return (
    <section ref={rootRef} className="projects-list shell">
      <div className="projects-list__note"><p>{copy.projects.note}</p></div>
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
