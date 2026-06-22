import { Navigate, useParams } from 'react-router-dom'
import PageWrapper from '../components/layout/PageWrapper'
import CaseHero from '../sections/project-detail/CaseHero'
import CaseInfo from '../sections/project-detail/CaseInfo'
import CaseContent from '../sections/project-detail/CaseContent'
import CaseNext from '../sections/project-detail/CaseNext'
import { getNextProject, localizeProject, projects } from '../data/projects'
import useLanguage from '../hooks/useLanguage'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { language } = useLanguage()
  const projectData = projects.find((item) => item.slug === slug)
  if (!projectData) return <Navigate to="/projetos" replace />
  const project = localizeProject(projectData, language)
  const nextProject = localizeProject(getNextProject(projectData.slug), language)
  return (
    <PageWrapper>
      <CaseHero project={project} />
      <CaseInfo project={project} />
      <CaseContent project={project} />
      <CaseNext project={nextProject} />
    </PageWrapper>
  )
}
