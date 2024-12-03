import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div>
      <h1>Welcome to my blog!</h1>
      <p>
        You can see my <Link to="/posts">posts</Link>
      </p>
    </div>
  )
}
