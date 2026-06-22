import useLanguage from '../../hooks/useLanguage'

export default function CaseInfo({ project }) {
  const { copy } = useLanguage()
  const facts = [
    [copy.case.nature, project.type],
    [copy.case.status, project.status],
    [copy.case.year, project.year],
    [copy.case.tools, project.tools],
  ]
  return (
    <section className="case-info shell section-pad">
      <div className="case-info__facts">
        {facts.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
      </div>
      <div className="case-info__copy"><p className="eyebrow"><span /> {copy.case.context}</p><h2>{project.summary}</h2></div>
    </section>
  )
}
