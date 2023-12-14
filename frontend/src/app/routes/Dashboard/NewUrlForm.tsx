import { useState } from "react"
import { useShortenUrl } from "../../api"
import { Button, Container, Stack, TextField } from "@mui/material"
import { useSnackbar } from "notistack"

export function NewUrlForm({
  successCallback,
  handleCancel,
}: {
  successCallback: () => void
  handleCancel: () => void
}) {
  const { enqueueSnackbar } = useSnackbar()

  const [formData, setFormData] = useState({
    title: "",
    url: "",
  })

  const { handleShortenUrl, loading: shortenUrlLoading } = useShortenUrl({
    onSuccess: () => {
      enqueueSnackbar("Shortened!", { variant: "success" })
      successCallback()
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
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Container>
        <Stack
          spacing={1}
          p={{
            xs: 2,
          }}
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <TextField
            type="text"
            name="title"
            label="Title (optional)"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
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
          <Button
            type="submit"
            disabled={shortenUrlLoading}
            variant="contained"
            size="small"
            disableElevation
          >
            {shortenUrlLoading ? "Loading..." : "Shorten"}
          </Button>
          <Button variant="outlined" size="small" onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
      </Container>
    </form>
  )
}
