import { useState } from "react"
import { useLogin } from "../api"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { handleLogin, loading, errors } = useLogin({
    onSuccess: () => {
      window.location.href = "/dashboard"
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
