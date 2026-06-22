import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { gsap } from '../../utils/gsap'
import usePreloader from '../../hooks/usePreloader'

const links = [
  { label: 'Projetos', to: '/projetos' },
  { label: 'Processo', to: '/#processo' },
  { label: 'Serviços', to: '/#servicos' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Contato', to: '/contato' },
]

export default function Nav() {
  const navRef = useRef(null)
  const [open, setOpen] = useState(false)
  const { isLoading } = usePreloader()
  const location = useLocation()

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
    <nav ref={navRef} className={`nav ${open ? 'nav--open' : ''}`} aria-label="Navegação principal">
      <NavLink to="/" className="nav__logo" data-cursor="link" aria-label="Ruan Farias — início">
        <span>RUAN</span><span>FARIAS</span>
      </NavLink>
      <button className="nav__toggle" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Abrir menu">
        <span /><span />
      </button>
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
      <span className="nav__location">Vila Velha · ES</span>
    </nav>
  )
}
