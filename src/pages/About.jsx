import PageWrapper from '../components/layout/PageWrapper'
import AboutHero from '../sections/about/AboutHero'
import AboutBio from '../sections/about/AboutBio'
import AboutSkills from '../sections/about/AboutSkills'

export default function About() {
  return <PageWrapper><AboutHero /><AboutBio /><AboutSkills /></PageWrapper>
}
