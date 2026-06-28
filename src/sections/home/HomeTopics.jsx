import Hero from './Hero'
import AboutIntro from './AboutIntro'
import Reel from './Reel'
import Methodology from './Methodology'
import Constellation from './Constellation'
import ContactHome from './ContactHome'

export default function HomeTopics({ isClone = false }) {
  return (
    <>
      <Hero isClone={isClone} />
      <AboutIntro isClone={isClone} />
      <Reel isClone={isClone} />
      <Methodology isClone={isClone} />
      <Constellation isClone={isClone} />
      <ContactHome isClone={isClone} />
    </>
  )
}