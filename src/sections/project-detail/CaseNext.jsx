import { Link } from 'react-router-dom'
export default function CaseNext({ project }) {
  return (
    <section className="shell" style={{ padding: '6rem 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <Link to={`/projetos/${project.slug}`} data-cursor="project" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: '#fff', textDecoration: 'none' }} className="link-hover">
        <span style={{ opacity: 0.5, marginRight: '1rem' }}>{'>'} cd</span>
        /projetos/{project.slug} ↗
      </Link>
    </section>
  )
}
