import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
  const error = useRouteError()

  return (
    <div>
      <h1>Error</h1>
      <p>Something went wrong</p>
      <p>{error.message || error.status}</p>
    </div>
  )
}
