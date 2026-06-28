import ProjectVisual from '../../components/shared/ProjectVisual'
import useLanguage from '../../hooks/useLanguage'

export default function CaseContent({ project }) {
  const { copy } = useLanguage()
  return (
    <section className="shell" style={{ display: 'flex', flexDirection: 'column', gap: '6rem', paddingBottom: '6rem' }}>
      <div className="case-log-block" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', maxWidth: '48rem', lineHeight: '1.7' }}>
        <p style={{ opacity: 0.5, marginBottom: '0.5rem' }}>{'>'} {copy.case.insight}</p>
        <p>{project.insight}</p>
      </div>

      <div className="case-log-block" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', maxWidth: '48rem', lineHeight: '1.7' }}>
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ opacity: 0.5, marginBottom: '0.5rem', color: '#ff5555' }}>{'>'} {copy.case.problem}</p>
          <p>{project.problem}</p>
        </div>
        <div>
          <p style={{ opacity: 0.5, marginBottom: '0.5rem', color: '#55ff55' }}>{'>'} {copy.case.response}</p>
          <p>{project.solution}</p>
        </div>
      </div>

      <div className="case-content__full" style={{ width: '100%', padding: '0' }}><ProjectVisual project={project} /></div>

      <div className="case-log-block" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', maxWidth: '48rem', lineHeight: '1.7' }}>
        <p style={{ opacity: 0.5, marginBottom: '1rem' }}>{'>'} const {copy.case.deliverables.toLowerCase()} = [</p>
        <div style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          {project.deliverables.map((item, index) => (
            <span key={item}>"{item}"{index < project.deliverables.length - 1 ? ',' : ''}</span>
          ))}
        </div>
        <p style={{ opacity: 0.5, marginTop: '1rem' }}>]</p>
      </div>

      <div className="case-content__grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {project.gallery?.[0] ? <figure><img src={project.gallery[0]} alt={`${project.name} — ${copy.case.imageAlt}`} loading="lazy" style={{ width: '100%', height: 'auto', display: 'block' }} /></figure> : <ProjectVisual project={project} compact />}
        <div className="case-log-block" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.7' }}>
          <p style={{ opacity: 0.5, marginBottom: '0.5rem' }}>{'>'} {copy.case.visualDirection}</p>
          <p>{project.visualDirection}</p>
        </div>
      </div>

      {project.video && (
        <div className="case-content__video" data-cursor="video" style={{ width: '100%' }}>
          <video src={project.video} poster={project.image} muted loop autoPlay playsInline controls aria-label={`${copy.case.videoAlt} ${project.name}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      )}

      <div className="case-log-block" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', maxWidth: '48rem', lineHeight: '1.7' }}>
        <p style={{ opacity: 0.5, marginBottom: '0.5rem', color: '#aaaa88' }}>{'>'} {project.resultLabel}</p>
        <p>{project.result}</p>
      </div>
    </section>
  )
}
