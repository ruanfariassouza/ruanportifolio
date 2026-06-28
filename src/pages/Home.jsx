import PageWrapper from '../components/layout/PageWrapper'
import HomeTopics from '../sections/home/HomeTopics'

export default function Home() {
  return (
    <PageWrapper theme="dark">
      <main className="home-page page">
        <HomeTopics />
      </main>
    </PageWrapper>
  )
}