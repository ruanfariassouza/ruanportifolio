import { useRef, useState } from 'react'
import Button from '../../components/ui/Button'
import { gsap } from '../../utils/gsap'
import { CONTACT_EMAIL, contactChannels } from '../../data/site'
import useLanguage from '../../hooks/useLanguage'

const initialValues = { nome: '', email: '', empresa: '', mensagem: '' }

export default function ContactForm() {
  const [values, setValues] = useState(initialValues)
  const [focused, setFocused] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const buttonRef = useRef(null)
  const { language, copy } = useLanguage()

  const validate = () => {
    const next = {}
    if (values.nome.trim().length < 2) next.nome = copy.contact.errors.name
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = copy.contact.errors.email
    if (values.empresa.trim().length < 2) next.empresa = copy.contact.errors.company
    if (values.mensagem.trim().length < 10) next.mensagem = copy.contact.errors.message
    return next
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      gsap.fromTo(event.currentTarget.querySelectorAll('.field--error'), { x: -5 }, { x: 5, duration: 0.08, yoyo: true, repeat: 5, clearProps: 'x' })
      return
    }
    const button = buttonRef.current
    const subject = encodeURIComponent(`${copy.contact.subject} — ${values.empresa}`)
    const body = encodeURIComponent(`${copy.contact.bodyName}: ${values.nome}\n${copy.contact.bodyEmail}: ${values.email}\n${copy.contact.bodyCompany}: ${values.empresa}\n\n${values.mensagem}`)
    gsap.timeline({ onComplete: () => {
      setSuccess(true)
      if (CONTACT_EMAIL) window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    } })
      .to(button, { scaleX: 0.3, borderRadius: '50%', duration: 0.35, ease: 'power3.inOut' })
      .to(button, { scaleX: 1, width: 56, color: '#050505', background: '#f4f1ea', duration: 0.35, ease: 'expo.out' })
    setValues(initialValues)
  }

  const fields = [
    { name: 'nome', label: copy.contact.fields.name, type: 'text', autoComplete: 'name' },
    { name: 'email', label: copy.contact.fields.email, type: 'email', autoComplete: 'email' },
    { name: 'empresa', label: copy.contact.fields.company, type: 'text', autoComplete: 'organization' },
  ]

  return (
    <section className="contact-form-section shell section-pad" id="form">
      <div className="contact-form-section__aside">
        <p className="eyebrow"><span /> {copy.contact.formEyebrow}</p>
        <h2>{copy.contact.formTitle}</h2>
        {CONTACT_EMAIL && <a href={`mailto:${CONTACT_EMAIL}`} data-cursor="link">{CONTACT_EMAIL}</a>}
        {!CONTACT_EMAIL && <p className="contact-form-section__config">{copy.contact.config}</p>}
        {contactChannels.filter((channel) => !channel.href.startsWith('mailto:')).map((channel) => <a key={channel.label} href={channel.href} target="_blank" rel="noreferrer" data-cursor="link">{language === 'en' && channel.label === 'E-mail' ? 'Email' : channel.label} ↗</a>)}
        <p>{copy.contact.location[0]}<br />{copy.contact.location[1]}</p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        {fields.map((field) => (
          <div key={field.name} className={`field ${errors[field.name] ? 'field--error' : ''} ${focused === field.name || values[field.name] ? 'field--active' : ''}`}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              value={values[field.name]}
              onChange={(event) => { setValues({ ...values, [field.name]: event.target.value }); setErrors({ ...errors, [field.name]: '' }) }}
              onFocus={() => setFocused(field.name)}
              onBlur={() => setFocused('')}
              aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
            />
            {errors[field.name] && <span id={`${field.name}-error`} className="field__error">{errors[field.name]}</span>}
          </div>
        ))}
        <div className={`field field--textarea ${errors.mensagem ? 'field--error' : ''} ${focused === 'mensagem' || values.mensagem ? 'field--active' : ''}`}>
          <label htmlFor="mensagem">{copy.contact.fields.message}</label>
          <textarea
            id="mensagem"
            name="mensagem"
            rows="5"
            value={values.mensagem}
            onChange={(event) => { setValues({ ...values, mensagem: event.target.value }); setErrors({ ...errors, mensagem: '' }) }}
            onFocus={() => setFocused('mensagem')}
            onBlur={() => setFocused('')}
            aria-describedby={errors.mensagem ? 'mensagem-error' : undefined}
          />
          {errors.mensagem && <span id="mensagem-error" className="field__error">{errors.mensagem}</span>}
        </div>
        <div className="contact-form__submit">
          <div ref={buttonRef} className="contact-form__button-wrap">
            {success ? <span className="contact-form__check" aria-label={copy.contact.ready}>✓</span> : <Button type="submit">{copy.contact.submit}</Button>}
          </div>
          {success && <p role="status">{CONTACT_EMAIL ? copy.contact.success : copy.contact.configure}</p>}
        </div>
      </form>
    </section>
  )
}
