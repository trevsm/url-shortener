import { useState } from "react"
import { useLogin } from "../api"
import { useLocation, useNavigate } from "react-router-dom"
import { DASHBOARD_URL } from "../../constants"
import { useSnackbar } from "notistack"
import { Button, Container, Stack, TextField, Typography } from "@mui/material"

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  })

  const location = useLocation()
  const navigate = useNavigate()
  const next = new URLSearchParams(location.search).get("next")

  const { enqueueSnackbar } = useSnackbar()

  const { handleLogin, loading, errors } = useLogin({
    onSuccess: () => {
      if (next) {
        navigate(next)
      } else {
        navigate(DASHBOARD_URL)
      }
    },
    onError: (errors) => {
      errors.forEach((err) => enqueueSnackbar(err, { variant: "error" }))
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleLogin(form)
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        pt: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Stack spacing={1}>
          <TextField
            type="text"
            label="Username"
            autoComplete="false"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            size="small"
          />
          <TextField
            type="password"
            label="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            size="small"
          />
          <Button type="submit" variant="contained" disabled={loading}>
            Login
          </Button>
        </Stack>
      </form>
    </Container>
  )
}

export default Login
