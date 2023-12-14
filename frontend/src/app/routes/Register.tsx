import { useState } from "react"
import { useRegister } from "../api"
import { DASHBOARD_URL } from "../../constants"
import { useSnackbar } from "notistack"
import { Button, Container, Stack, TextField, Typography } from "@mui/material"

function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
  })

  const { enqueueSnackbar } = useSnackbar()

  const { handleRegister, loading, errors } = useRegister({
    onSuccess: () => {
      window.location.href = DASHBOARD_URL
    },
    onError: (errors) => {
      errors.forEach((err) => enqueueSnackbar(err, { variant: "error" }))
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleRegister(form)
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        pt: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Stack spacing={1}>
          <TextField
            type="email"
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            size="small"
          />
          <TextField
            type="text"
            label="Username"
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
            Register
          </Button>
        </Stack>
      </form>
    </Container>
  )
}

export default Register
