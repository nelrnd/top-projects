import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "../axios"
import CommentList from "../components/CommentList"
import useFetch from "../hooks/useFetch"

export default function Post() {
  const { postId } = useParams()
  const [post, loading] = useFetch(`/posts/${postId}`)

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <CommentList />
    </div>
  )
}
