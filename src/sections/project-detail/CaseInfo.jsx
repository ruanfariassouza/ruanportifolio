export default function CaseInfo({ project }) {
  const facts = [
    ['Natureza', project.type],
    ['Estado', project.status],
    ['Ano', project.year],
    ['Ferramentas', project.tools],
  ]
  return (
    <section className="case-info shell section-pad">
      <div className="case-info__facts">
        {facts.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
      </div>
      <div className="case-info__copy"><p className="eyebrow"><span /> Contexto</p><h2>{project.summary}</h2></div>
    </section>
  )
}
