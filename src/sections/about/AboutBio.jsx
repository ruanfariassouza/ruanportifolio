import useLanguage from '../../hooks/useLanguage'

export default function AboutBio() {
  const { copy } = useLanguage()
  return (
    <section className="about-bio shell section-pad">
      <figure><img src="/images/ruan_portrait.jpg" alt={copy.about.portraitAlt} loading="lazy" /></figure>
      <div className="about-bio__copy">
        <p className="eyebrow"><span /> {copy.about.bioEyebrow}</p>
        {copy.about.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>
  )
}
