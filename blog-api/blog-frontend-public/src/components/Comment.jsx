export default function Comment({ comment }) {
  return (
    <div>
      {comment.user.name}: {comment.content}
    </div>
  )
}
