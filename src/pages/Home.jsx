import PageWrapper from '../components/layout/PageWrapper'
import InfiniteTopics from '../components/layout/InfiniteTopics'
import HomeTopics from '../sections/home/HomeTopics'

export default function Home() {
  return (
    <PageWrapper>
      <InfiniteTopics
        primary={<HomeTopics />}
        clone={<HomeTopics isClone />}
      />
    </PageWrapper>
  )
}