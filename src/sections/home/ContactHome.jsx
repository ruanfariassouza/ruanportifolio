import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useInView from '../../hooks/useInView'
import usePreloader from '../../hooks/usePreloader'
import Button from '../../components/ui/Button'
import { contactChannels } from '../../data/site'
import useLanguage from '../../hooks/useLanguage'

const ParticleField = lazy(() => import('../../canvas/scenes/ParticleField'))
export default function ContactHome() {
  const rootRef = useRef(null)
  const active = useInView(rootRef)
  const { isLoading } = usePreloader()
  const { language, copy } = useLanguage()
  const defaultLinks = [
    { label: copy.contactHome.fallback[0], href: '/sobre' },
    { label: copy.contactHome.fallback[1], href: '/projetos' },
    { label: copy.contactHome.fallback[2], href: '/#processo' },
    { label: copy.contactHome.fallback[3], href: '/contato' },
  ]
  const [webgl, setWebgl] = useState(() => window.innerWidth >= 768)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const update = () => setWebgl(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return (
    <section ref={rootRef} className="contact-home">
      <div className="contact-home__gradient" />
      {webgl && <div className="contact-home__canvas"><Suspense fallback={null}><ParticleField active={active && !isLoading} /></Suspense></div>}
      <div className="contact-home__content shell">
        <p className="eyebrow"><span /> {copy.contactHome.eyebrow}</p>
        <h2 className="contact-home__title">{copy.contactHome.title} <em>{copy.contactHome.accent}</em></h2>
        <p className="contact-home__availability">{copy.contactHome.body}</p>
        <div className="contact-home__action"><Button to="/contato">{copy.contactHome.cta}</Button></div>
        <div className="social-row">
          {contactChannels.length
            ? contactChannels.map((item) => <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined} data-cursor="link">{language === 'en' && item.label === 'E-mail' ? 'Email' : item.label}<span>↗</span></a>)
            : defaultLinks.map((item) => <Link key={item.label} to={item.href} data-cursor="link">{item.label}<span>↗</span></Link>)}
        </div>
      </div>
    </section>
  )
}
