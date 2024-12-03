import { useEffect, useState } from "react"
import axios from "../axios"

export default function useFetch(uri) {
  const [value, setValue] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(uri)
      setValue(res.data)
      setLoading(false)
    }
    fetch()
  }, [])

  return [value, loading]
}
