import { useState } from "react"
import { useLogin } from "../api"
import { useLocation, useNavigate } from "react-router-dom"
import { DASHBOARD_URL } from "../../constants"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const location = useLocation()
  const navigate = useNavigate()
  const next = new URLSearchParams(location.search).get("next")

  const { handleLogin, loading, errors } = useLogin({
    onSuccess: () => {
      if (next) {
        navigate(next)
      } else {
        navigate(DASHBOARD_URL)
      }
    },
    onError: (errors) => {
      //
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleLogin({ username, password })
  }

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
