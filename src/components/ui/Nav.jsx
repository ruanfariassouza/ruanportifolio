import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { gsap } from '../../utils/gsap'
import usePreloader from '../../hooks/usePreloader'
import useLanguage from '../../hooks/useLanguage'

export default function Nav() {
  const navRef = useRef(null)
  const [open, setOpen] = useState(false)
  const { isLoading } = usePreloader()
  const { language, copy, toggleLanguage } = useLanguage()
  const location = useLocation()
  const links = [
    { label: copy.nav.projects, to: '/projetos' },
    { label: copy.nav.process, to: '/#processo' },
    { label: copy.nav.capabilities, to: '/#competencias' },
    { label: copy.nav.about, to: '/sobre' },
    { label: copy.nav.contact, to: '/contato' },
  ]

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (isLoading) return undefined
    const tween = gsap.fromTo(navRef.current, { autoAlpha: 0, y: -24 }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.9,
      ease: 'expo.out',
      clearProps: 'transform',
    })
    return () => tween.kill()
  }, [isLoading])

  return (
    <nav ref={navRef} className={`nav ${open ? 'nav--open' : ''}`} aria-label={copy.nav.aria}>
      <NavLink to="/" className="nav__logo" data-cursor="link" aria-label={copy.nav.home}>
        <span>RUAN</span><span>FARIAS</span>
      </NavLink>
      <div className="nav__links">
        {links.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            className={({ isActive }) => {
              const active = link.to.includes('#') ? location.hash === `#${link.to.split('#')[1]}` : isActive
              return active ? 'nav__link is-active' : 'nav__link'
            }}
            data-cursor="link"
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      <div className="nav__meta">
        <button className="nav__language" type="button" onClick={toggleLanguage} aria-label={copy.nav.switchLabel} data-cursor="link">{language === 'pt' ? 'EN' : 'PT'}</button>
        <span className="nav__location">Vila Velha · ES</span>
      </div>
      <button className="nav__toggle" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={copy.nav.menu}>
        <span /><span />
      </button>
    </nav>
  )
}
