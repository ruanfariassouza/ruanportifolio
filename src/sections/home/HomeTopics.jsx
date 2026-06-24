import Hero from './Hero'
import AboutIntro from './AboutIntro'
import Reel from './Reel'
import ProcessHome from './ProcessHome'
import ServicesHome from './ServicesHome'
import AboutTeaser from './AboutTeaser'
import ContactHome from './ContactHome'

export default function HomeTopics({ isClone = false }) {
  return (
    <>
      <Hero isClone={isClone} />
      <AboutIntro isClone={isClone} />
      <Reel isClone={isClone} />
      <ProcessHome isClone={isClone} />
      <ServicesHome isClone={isClone} />
      <AboutTeaser isClone={isClone} />
      <ContactHome isClone={isClone} />
    </>
  )
}