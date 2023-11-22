import { useEffect, useRef, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"

axios.defaults.xsrfCookieName = "csrftoken"
axios.defaults.withCredentials = true

function App() {
  const [list, setList] = useState<
    {
      id: number
      original_url: string
      short_id: string
      count: number
    }[]
  >([])
  list.sort((a, b) => b.id - a.id)

  const [url, setUrl] = useState("")

  const getUrls = () => {
    axios
      .get("http://localhost:8000/api/list")
      .then((response) => setList(response.data.urls))
  }

  const getCsrf = () => {
    axios
      .get("http://localhost:8000/api/csrf/")
      .then((response) => response.data.csrfToken)
  }

  const initialized = useRef(false)
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    getCsrf()
    getUrls()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await axios.post(
      "http://localhost:8000/api/shorten/",
      {
        url,
      },
      {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      }
    )

    getUrls()
  }

  return (
    <div style={{ padding: "10px" }}>
      <form
        onSubmit={handleSubmit}
        style={{ marginBottom: "10px", display: "flex", gap: "10px" }}
      >
        <input
          type="text"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Add</button>
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
          {list.map((item, index) => {
            const originalUrl =
              item.original_url.length > 15
                ? item.original_url.substring(0, 15) + "..."
                : item.original_url
            return (
              <tr key={index}>
                <td>{originalUrl}</td>
                <td>
                  <a
                    href={"http://localhost:8000/s/" + item.short_id}
                    target="new"
                  >
                    {item.short_id}
                  </a>
                </td>
                <td>{item.count}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App
