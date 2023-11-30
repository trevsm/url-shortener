import { useParams } from "react-router-dom"
import { useUrlDetails } from "../api"
import { useEffect, useRef } from "react"

function UrlDetails() {
  const { id } = useParams()
  const { handleGetUrlDetails, loading, url } = useUrlDetails()

  const initial = useRef(true)
  useEffect(() => {
    if (!id) return

    if (!initial.current) return
    initial.current = false

    handleGetUrlDetails(id)
  }, [])

  return (
    <>
      <h1>Url Details</h1>
      <div>{url?.short_id}</div>
      <div>{url?.original_url}</div>
      <ul>
        {url?.views?.map((visit) => (
          <li key={visit.id}>{visit.viewed_at}</li>
        ))}
      </ul>
    </>
  )
}

export default UrlDetails
