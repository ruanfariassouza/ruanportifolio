import ProjectVisual from '../../components/shared/ProjectVisual'
import useLanguage from '../../hooks/useLanguage'

export default function CaseContent({ project }) {
  const { copy } = useLanguage()
  return (
    <section className="case-content">
      <div className="case-content__statement shell"><span>{copy.case.insight}</span><p>{project.insight}</p></div>

      <div className="case-thinking shell">
        <article><span>{copy.case.problem}</span><h2>{project.problem}</h2></article>
        <article><span>{copy.case.response}</span><h2>{project.solution}</h2></article>
      </div>

      <div className="case-content__full"><ProjectVisual project={project} /></div>

      <div className="case-deliverables shell">
        <div><p className="eyebrow"><span /> {copy.case.system}</p><h2>{copy.case.deliverables}</h2></div>
        <ol>{project.deliverables.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ol>
      </div>

      <div className="case-content__grid shell">
        {project.gallery?.[0] ? <figure><img src={project.gallery[0]} alt={`${project.name} — ${copy.case.imageAlt}`} loading="lazy" /></figure> : <ProjectVisual project={project} compact />}
        <div className="case-content__note"><span>{copy.case.visualDirection}</span><p>{project.visualDirection}</p></div>
      </div>

      {project.video && (
        <div className="case-content__video shell" data-cursor="video">
          <video src={project.video} poster={project.image} muted loop autoPlay playsInline controls aria-label={`${copy.case.videoAlt} ${project.name}`} />
        </div>
      )}

      <div className="case-outcome shell"><span>{project.resultLabel}</span><p>{project.result}</p></div>
    </section>
  )
}
