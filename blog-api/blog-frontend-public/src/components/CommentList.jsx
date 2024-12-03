import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import Comment from "./Comment"

export default function CommentList() {
  const { postId } = useParams()
  const [comments, loading] = useFetch(`/posts/${postId}/comments`)

  let content

  if (loading) {
    content = <p>Loading...</p>
  } else if (comments.length === 0) {
    content = <p>No comments for now</p>
  } else {
    content = comments.map((comment) => (
      <Comment key={comment.id} comment={comment} />
    ))
  }

  return (
    <div>
      <h2>Comments</h2>
      {content}
    </div>
  )
}
