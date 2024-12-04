import { useState } from "react"
import axios from "../axios"
import { useEffect } from "react"

export default function useFetch(uri) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(uri)
      const data = res.data
      setData(data)
      setLoading(false)
    }
    fetchData()
  }, [uri])

  return [data, loading]
}
