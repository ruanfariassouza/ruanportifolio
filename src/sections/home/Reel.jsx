import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ProjectVisual from '../../components/shared/ProjectVisual'
import { featuredProjects, localizeProjects } from '../../data/projects'
import usePreloader from '../../hooks/usePreloader'
import useLanguage from '../../hooks/useLanguage'
import { gsap } from '../../utils/gsap'

export default function Reel({ isClone = false }) {
  const rootRef = useRef(null)
  const { isLoading } = usePreloader()
  const { language, copy } = useLanguage()
  const projects = localizeProjects(featuredProjects, language)

  useLayoutEffect(() => {
    if (isLoading || isClone) return undefined
    const items = rootRef.current.querySelectorAll('.case-fullbleed')
    
    const context = gsap.context(() => {
      items.forEach((item) => {
        gsap.fromTo(item.querySelector('.case-fullbleed__content'), 
          { autoAlpha: 0, y: 30 }, 
          {
            autoAlpha: 1, 
            y: 0, 
            duration: 1.2, 
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 60%' }
          }
        )
      })
    })
    return () => context.revert()
  }, [isClone, isLoading, language])

  return (
    <section ref={rootRef} className="cases-stack" aria-label={copy.reel.aria}>
      {projects.map((project, i) => (
        <article key={project.slug} className="case-fullbleed">
          <div className="case-fullbleed__bg">
            <ProjectVisual project={project} />
            <div className="case-fullbleed__overlay" />
          </div>
          <div className="case-fullbleed__content shell">
            <div className="case-fullbleed__tags">
              {copy.reel.tags.map(tag => <span key={tag} className="tag-tech">[{tag}]</span>)}
              <span className="tag-tech tag-tech--status">status: {project.status || 'estudo'}</span>
            </div>
            <h3 className="case-fullbleed__title">{project.name}</h3>
            <p className="case-fullbleed__claim">{project.coverLine}</p>
            <div className="case-fullbleed__action">
              <Link to={`/projetos/${project.slug}`} className="link-hover">
                ↗
              </Link>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
