import Link from 'next/link'
import DefaultHead from '../components/DefaultHead'
import Header from '../components/page-elements/Header'

export default function Home() {
  return (
    <div>
      <DefaultHead />
      <Header />
      <h1>A work in progress</h1>
      <Link href="/workers">Go to workers lists</Link>
    </div>
  )
}
