import { useState } from "react"
import axios from "axios"
import { URLItem, useServer } from "../contexts/useServer"
import { useSetupEffect } from "../hooks/useSetupEffect"

axios.defaults.xsrfCookieName = "csrftoken"
axios.defaults.withCredentials = true

function App() {
  const { getUrls, shortenUrl, register, login } = useServer()

  const [list, setList] = useState<URLItem[]>([])
  const [url, setUrl] = useState<string>("")

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  const handleGetUrls = async () => {
    const urls = await getUrls()
    setList(urls.sort((a, b) => b.id - a.id))
  }

  const handleShortenUrl = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await shortenUrl(url)
    await handleGetUrls()
  }

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await register(username, password, email)
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await login(username, password)
  }

  useSetupEffect(() => {
    handleGetUrls()
  })

  return (
    <div style={{ padding: "10px" }}>
      <h1>URL Shortener</h1>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <h3>Registration</h3>
      <form onSubmit={handleRegistration}>
        <input
          type="text"
          name="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="email"
          name="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>

      <h3>Shorten URL</h3>
      <form
        onSubmit={handleShortenUrl}
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
