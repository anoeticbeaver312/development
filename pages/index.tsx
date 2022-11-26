import Link from 'next/link'
import DefaultHead from '../components/DefaultHead'

export default function Home() {
  return (
    <div>
      <DefaultHead />
      <h1>A work in progress</h1>
      <Link href="/workers">Go to workers lists</Link>
    </div>
  )
}
