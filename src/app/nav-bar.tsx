import Link from 'next/link'

export default function NavBar() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link href="/"> Home</Link></li>
          <li><Link href="/search">Search</Link></li>
          <li><Link href="/create-post">Add Post</Link></li>
        </ul>
      </nav>
    </div>
  )
}