import { useEffect, useState } from "react"
import axios from "../axios"
import PostList from "../components/PostList"

export default function Home() {
  return (
    <div>
      <PostList />
    </div>
  )
}
