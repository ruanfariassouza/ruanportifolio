import Button from '../../components/ui/Button'
import useLanguage from '../../hooks/useLanguage'

export default function AboutTeaser({ isClone = false }) {
  const { copy } = useLanguage()

  return (
    <section className="about-teaser shell section-pad" id={isClone ? undefined : 'sobre'}>
      <p className="eyebrow"><span /> {copy.nav.about}</p>
      <h2>{copy.about.title} <em>{copy.about.accent}</em></h2>
      <p className="about-teaser__copy">{copy.about.intro}</p>
      {!isClone && (
        <div className="about-teaser__action">
          <Button to="/sobre">{copy.hero.secondary}</Button>
        </div>
      )}
    </section>
  )
}