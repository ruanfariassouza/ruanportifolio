import { Navigate, useParams } from 'react-router-dom'
import PageWrapper from '../components/layout/PageWrapper'
import CaseHero from '../sections/project-detail/CaseHero'
import CaseInfo from '../sections/project-detail/CaseInfo'
import CaseContent from '../sections/project-detail/CaseContent'
import CaseNext from '../sections/project-detail/CaseNext'
import { getNextProject, projects } from '../data/projects'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)
  if (!project) return <Navigate to="/projetos" replace />
  return (
    <PageWrapper>
      <CaseHero project={project} />
      <CaseInfo project={project} />
      <CaseContent project={project} />
      <CaseNext project={getNextProject(project.slug)} />
    </PageWrapper>
  )
}
