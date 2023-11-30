import { useEffect, useRef, useState } from "react"
import { useGetUrls, useShortenUrl } from "../api"
import { DASHBOARD_URL } from "../../constants"
import { Link } from "react-router-dom"

function Dashboard() {
  const [url, setUrl] = useState("")

  const { handleGetUrls, loading, errors, urlList } = useGetUrls()
  const { handleShortenUrl, loading: shortenUrlLoading } = useShortenUrl({
    onSuccess: () => {
      setUrl("")
    },
    onError: (errors) => {
      //
    },
  })

  const sortedUrlList = urlList.sort((a, b) => b.id - a.id)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleShortenUrl(url)
    handleGetUrls()
  }

  const initial = useRef(true)
  useEffect(() => {
    if (!initial.current) return
    initial.current = false

    handleGetUrls()
  }, [])

  return (
    <>
      <h3>Shorten URL</h3>
      <form
        onSubmit={handleSubmit}
        style={{ marginBottom: "10px", display: "flex", gap: "10px" }}
      >
        <input
          type="text"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={shortenUrlLoading}
        />
        <button type="submit" disabled={shortenUrlLoading}>
          {shortenUrlLoading ? "Loading..." : "Shorten"}
        </button>
      </form>
      <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Original URL
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Short ID
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Count</th>
          </tr>
        </thead>
        <tbody>
          {sortedUrlList.map((item, index) => {
            const originalUrl =
              item.original_url.length > 15
                ? item.original_url.substring(0, 15) + "..."
                : item.original_url
            return (
              <tr key={index}>
                <td>{originalUrl}</td>
                <td>
                  <Link to={DASHBOARD_URL + "/" + item.short_id}>
                    {item.short_id}
                  </Link>
                </td>
                <td>{item.count}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
export default Dashboard
