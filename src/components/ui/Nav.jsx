import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useLanguage from '../../hooks/useLanguage'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [activeHash, setActiveHash] = useState('')
  const { pathname } = useLocation()
  const { language, copy, toggleLanguage } = useLanguage()

  const isHome = pathname === '/'

  useEffect(() => {
    setOpen(false)
    document.body.classList.remove('nav-open')
    
    if (!isHome) return
    
    const handleScroll = () => {
      const sections = ['manifesto', 'metodo', 'repertorio', 'contato']
      const scrollPosition = window.scrollY + window.innerHeight / 2
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { top, bottom } = element.getBoundingClientRect()
          const elementTop = top + window.scrollY
          const elementBottom = bottom + window.scrollY
          
          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveHash(section)
            return
          }
        }
      }
      setActiveHash('')
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname, isHome])



    const navLinks = [
    { label: copy.nav.about, href: '#manifesto', isHash: true, icon: 'eye' },
    { label: copy.nav.process, href: '#metodo', isHash: true, icon: 'node' },
    { label: copy.nav.qualifications, href: '#repertorio', isHash: true, icon: 'asterisk' },
    { label: copy.nav.contact, href: '#contato', isHash: true, icon: 'dash' },
  ]

  const icons = {
    circle: <circle cx="12" cy="12" r="6" fill="currentColor" />,
    eye: <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2" />,
    play: <polygon points="10,8 16,12 10,16" fill="currentColor" />,
    arrow: <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" fill="none" />,
    node: <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" fill="none" />,
    asterisk: <path d="M12 4v16M4 12h16M6.3 6.3l11.4 11.4M6.3 17.7L17.7 6.3" stroke="currentColor" strokeWidth="2" fill="none" />,
    dash: <line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="2" />
  }

  const handleLinkClick = (href, isHash) => {
    if (isHash && isHome) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setOpen(false)
    document.body.classList.remove('nav-open')
  }

  return (
    <>
      <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label={copy.nav.aria}>
        <Link to="/" className="nav__logo" aria-label={copy.nav.home} onClick={() => handleLinkClick('/', false)}>r. farias</Link>
        <div className="nav__meta">
          <span className="nav__location">BR · GMT-3</span>
          <button type="button" className="nav__language" onClick={toggleLanguage} aria-label={copy.nav.switchLabel}>
            {language.toUpperCase()}
          </button>
        </div>
      </nav>
      {isHome && (
        <div className="nav-dots">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className={`nav__dot ${activeHash === link.href.substring(1) ? 'is-active' : ''}`}
              aria-label={link.label}
              onClick={(e) => { e.preventDefault(); handleLinkClick(link.href, true) }}
            >
              <svg className="nav__dot-inner" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {icons[link.icon]}
              </svg>
              <span className="nav__dot-label">{link.label}</span>
            </a>
          ))}
        </div>
      )}
    </>
  )
}
