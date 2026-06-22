import { Link } from 'react-router-dom'
import ProjectVisual from '../../components/shared/ProjectVisual'

export default function CaseNext({ project }) {
  return (
    <section className="case-next shell">
      <Link to={`/projetos/${project.slug}`} data-cursor="project">
        <div><span>Próximo estudo</span><h2>{project.name}</h2><strong>↗</strong></div>
        <ProjectVisual project={project} compact />
      </Link>
    </section>
  )
}
