import { useRef, useState } from 'react'
import Button from '../../components/ui/Button'
import { gsap } from '../../utils/gsap'
import { CONTACT_EMAIL, contactChannels } from '../../data/site'

const initialValues = { nome: '', email: '', assunto: '', mensagem: '' }

export default function ContactForm() {
  const [values, setValues] = useState(initialValues)
  const [focused, setFocused] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const buttonRef = useRef(null)

  const validate = () => {
    const next = {}
    if (values.nome.trim().length < 2) next.nome = 'Como posso te chamar?'
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = 'Digite um e-mail válido.'
    if (values.assunto.trim().length < 3) next.assunto = 'Qual é o assunto?'
    if (values.mensagem.trim().length < 10) next.mensagem = 'Conte um pouco mais sobre o projeto.'
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
    const subject = encodeURIComponent(values.assunto)
    const body = encodeURIComponent(`Nome: ${values.nome}\nE-mail: ${values.email}\n\n${values.mensagem}`)
    gsap.timeline({ onComplete: () => {
      setSuccess(true)
      if (CONTACT_EMAIL) window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    } })
      .to(button, { scaleX: 0.3, borderRadius: '50%', duration: 0.35, ease: 'power3.inOut' })
      .to(button, { scaleX: 1, width: 56, color: '#050505', background: '#f4f1ea', duration: 0.35, ease: 'expo.out' })
    setValues(initialValues)
  }

  const fields = [
    { name: 'nome', label: 'Nome', type: 'text', autoComplete: 'name' },
    { name: 'email', label: 'E-mail', type: 'email', autoComplete: 'email' },
    { name: 'assunto', label: 'Assunto', type: 'text', autoComplete: 'off' },
  ]

  return (
    <section className="contact-form-section shell section-pad" id="form">
      <div className="contact-form-section__aside">
        <p className="eyebrow"><span /> Comece por aqui</p>
        <h2>Vamos começar pelo que precisa ficar mais claro.</h2>
        {CONTACT_EMAIL && <a href={`mailto:${CONTACT_EMAIL}`} data-cursor="link">{CONTACT_EMAIL}</a>}
        {!CONTACT_EMAIL && <p className="contact-form-section__config">Canal direto definido por variável de ambiente.</p>}
        {contactChannels.filter((channel) => !channel.href.startsWith('mailto:')).map((channel) => <a key={channel.label} href={channel.href} target="_blank" rel="noreferrer" data-cursor="link">{channel.label} ↗</a>)}
        <p>Vila Velha, Espírito Santo<br />Brasil · GMT−3</p>
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
          <label htmlFor="mensagem">Mensagem</label>
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
            {success ? <span className="contact-form__check" aria-label="Mensagem pronta">✓</span> : <Button type="submit">Enviar mensagem</Button>}
          </div>
          {success && <p role="status">{CONTACT_EMAIL ? 'Mensagem preparada no seu aplicativo de e-mail.' : 'Mensagem validada. Configure VITE_CONTACT_EMAIL para habilitar o envio.'}</p>}
        </div>
      </form>
    </section>
  )
}
