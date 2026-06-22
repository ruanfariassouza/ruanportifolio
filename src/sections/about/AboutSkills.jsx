import { useRef, useState } from 'react'

const categories = [
  { title: 'Diagnóstico', items: ['Bio e destaques', 'Clareza da oferta', 'Linha editorial', 'Caminho de contato', 'Leitura de perfil'] },
  { title: 'Conteúdo', items: ['Planejamento', 'Roteiros curtos', 'Captação mobile', 'Carrosséis', 'Edição de Reels'] },
  { title: 'Direção', items: ['Sistema visual', 'Tom de voz', 'Ritmo editorial', 'Apresentação de produto', 'Prototipagem'] },
  { title: 'Tecnologia', items: ['React', 'Three.js', 'GSAP', 'Figma', 'IA aplicada'] },
]

export default function AboutSkills() {
  const trackRef = useRef(null)
  const drag = useRef({ active: false, start: 0, scroll: 0 })
  const [dragging, setDragging] = useState(false)

  const onPointerDown = (event) => {
    drag.current = { active: true, start: event.clientX, scroll: trackRef.current.scrollLeft }
    setDragging(true)
    trackRef.current.setPointerCapture(event.pointerId)
  }
  const onPointerMove = (event) => {
    if (!drag.current.active) return
    trackRef.current.scrollLeft = drag.current.scroll - (event.clientX - drag.current.start)
  }
  const endDrag = () => { drag.current.active = false; setDragging(false) }

  return (
    <section className="about-skills section-pad">
      <div className="shell section-heading"><p className="eyebrow"><span /> Repertório em construção</p><h2>O que já consigo<br /><em>colocar em prática.</em></h2></div>
      <div
        ref={trackRef}
        className={`about-skills__track ${dragging ? 'is-dragging' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {categories.map((category, index) => (
          <article key={category.title}>
            <span>0{index + 1}</span><h3>{category.title}</h3>
            <ul>{category.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  )
}
