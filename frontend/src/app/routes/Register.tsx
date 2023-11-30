import { useState } from "react"
import { useRegister } from "../api"
import { DASHBOARD_URL } from "../../constants"

function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const { handleRegister, loading, errors } = useRegister({
    onSuccess: () => {
      window.location.href = DASHBOARD_URL
    },
    onError: (errors) => {
      //
    },
  })

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleRegister({ username, password, email })
  }

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={handleLogin}>
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
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Register
