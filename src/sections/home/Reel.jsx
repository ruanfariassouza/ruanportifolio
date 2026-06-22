import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ProjectVisual from '../../components/shared/ProjectVisual'
import { featuredProjects } from '../../data/projects'
import { gsap } from '../../utils/gsap'
import usePreloader from '../../hooks/usePreloader'

export default function Reel() {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const { isLoading } = usePreloader()

  useLayoutEffect(() => {
    if (isLoading || window.innerWidth < 768) return undefined
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
  }, [isLoading])

  return (
    <section ref={rootRef} className="reel" aria-label="Estudos autorais selecionados">
      <div className="reel__intro shell">
        <div><p className="eyebrow"><span /> Estudos selecionados</p><h2>Projetos que mostram<br /><em>como eu penso.</em></h2></div>
        <p>Nenhum cliente inventado. Cada estudo parte de um problema próximo da minha realidade e transforma observação em sistema.</p>
      </div>
      <div ref={trackRef} className="reel__track">
        {featuredProjects.map((project) => (
          <Link key={project.slug} className="reel-card" to={`/projetos/${project.slug}`} data-cursor="project">
            <ProjectVisual project={project} />
            <div className="reel-card__meta"><span>{project.type}</span><h3>{project.name}</h3><p>{project.coverLine}</p></div>
          </Link>
        ))}
      </div>
    </section>
  )
}
