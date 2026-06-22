import { useRef, useState } from 'react'
import useLanguage from '../../hooks/useLanguage'

export default function AboutSkills() {
  const trackRef = useRef(null)
  const drag = useRef({ active: false, start: 0, scroll: 0 })
  const [dragging, setDragging] = useState(false)
  const { copy } = useLanguage()

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
      <div className="shell section-heading"><p className="eyebrow"><span /> {copy.about.skillsEyebrow}</p><h2>{copy.about.skillsTitle}<br /><em>{copy.about.skillsAccent}</em></h2></div>
      <div
        ref={trackRef}
        className={`about-skills__track ${dragging ? 'is-dragging' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {copy.about.categories.map((category, index) => (
          <article key={category.title}>
            <span>0{index + 1}</span><h3>{category.title}</h3>
            <ul>{category.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  )
}
