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
    <section className="shell" style={{ marginBottom: '6rem' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '3rem' }}>
        {facts.map(([label, value]) => (
          <div key={label}>
            <span style={{ opacity: 0.5 }}>[{label}]: </span>
            <span style={{ color: '#fff' }}>{value}</span>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'rgba(255,255,255,0.8)', maxWidth: '40rem', lineHeight: '1.6' }}>
        <p style={{ opacity: 0.5, marginBottom: '0.5rem' }}>{'>'} summary</p>
        <p>"{project.summary}"</p>
      </div>
    </section>
  )
}
