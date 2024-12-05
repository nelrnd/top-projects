import { useState } from "react"
import axios from "../axios"
import { useEffect } from "react"

export default function useFetch(uri) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(uri)
        const data = res.data
        setData(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    setTimeout(() => {
      fetchData()
    }, 0)
  }, [uri])

  return [data, loading]
}
