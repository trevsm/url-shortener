import { useState } from "react"
import { useShortenUrl } from "../../api"
import { Button, Stack, TextField } from "@mui/material"
import { useSnackbar } from "notistack"

export function NewUrlForm({ callback }: { callback: () => void }) {
  const { enqueueSnackbar } = useSnackbar()

  const [formData, setFormData] = useState({
    title: "",
    url: "",
  })

  const { handleShortenUrl, loading: shortenUrlLoading } = useShortenUrl({
    onSuccess: () => {
      enqueueSnackbar("Shortened!", { variant: "success" })
      setFormData({
        title: "",
        url: "",
      })
    },
    onError: (errors) => {
      errors.forEach((err) => enqueueSnackbar(err, { variant: "error" }))
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.url) {
      enqueueSnackbar("Please enter a URL", { variant: "error" })
      return
    }

    await handleShortenUrl(formData)
    callback()
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginBottom: "10px", display: "flex", gap: "10px" }}
    >
      <Stack spacing={1} direction="row">
        <TextField
          type="text"
          name="title"
          label="Title (optional)"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          disabled={shortenUrlLoading}
          size="small"
        />
        <TextField
          type="text"
          name="url"
          label="URL"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          disabled={shortenUrlLoading}
          size="small"
        />
        <Button type="submit" disabled={shortenUrlLoading} variant="contained">
          {shortenUrlLoading ? "Loading..." : "Shorten"}
        </Button>
      </Stack>
    </form>
  )
}
