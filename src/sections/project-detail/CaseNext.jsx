import { Link } from 'react-router-dom'
import ProjectVisual from '../../components/shared/ProjectVisual'
import useLanguage from '../../hooks/useLanguage'

export default function CaseNext({ project }) {
  const { copy } = useLanguage()
  return (
    <section className="case-next shell">
      <Link to={`/projetos/${project.slug}`} data-cursor="project">
        <div><span>{copy.case.next}</span><h2>{project.name}</h2><strong>↗</strong></div>
        <ProjectVisual project={project} compact />
      </Link>
    </section>
  )
}
