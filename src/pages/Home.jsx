import Hero from '../sections/home/Hero'
import Reel from '../sections/home/Reel'
import AboutIntro from '../sections/home/AboutIntro'
import ServicesHome from '../sections/home/ServicesHome'
import ContactHome from '../sections/home/ContactHome'
import ProcessHome from '../sections/home/ProcessHome'
import PageWrapper from '../components/layout/PageWrapper'

export default function Home() {
  return <PageWrapper><Hero /><AboutIntro /><Reel /><ProcessHome /><ServicesHome /><ContactHome /></PageWrapper>
}
