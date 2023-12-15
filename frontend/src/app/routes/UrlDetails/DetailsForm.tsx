import { Box, Button, Stack, TextField } from "@mui/material"
import { REDIRECT_URL } from "../../../constants"
import { useSnackbar } from "notistack"
import { URLItem } from "../../types"
import { EditableUrlItem } from "."
import { useUpdateUrl } from "../../api"

export function DetailsForm({
  formData,
  setFormData,
  urlData,
  successCallback,
  loading,
}: {
  urlData?: URLItem
  formData: EditableUrlItem
  setFormData: React.Dispatch<
    React.SetStateAction<{
      title?: string
      original_url: string
    }>
  >
  successCallback: () => void
  loading: boolean
}) {
  const { enqueueSnackbar } = useSnackbar()

  const { handleUpdateUrl, loading: updateLoading } = useUpdateUrl({
    onSuccess: () => {
      successCallback()
      enqueueSnackbar("Updated!", { variant: "success" })
    },
    onError: (errors) => {
      errors.forEach((err) => enqueueSnackbar(err, { variant: "error" }))
    },
  })

  const shortUrl = `${REDIRECT_URL}/${urlData?.short_id}`

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shortUrl)
    enqueueSnackbar("Copied!", { variant: "success" })
  }

  const handleUpdate = () => {
    if (!urlData) return

    handleUpdateUrl({
      shortId: urlData?.short_id,
      ...formData,
    })
  }

  return (
    <Stack spacing={2}>
      <Box display="flex" gap={1}>
        <TextField
          type="text"
          name="title"
          label="Title"
          autoComplete="off"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          disabled={
            loading || updateLoading || formData.title === urlData?.title
          }
          onClick={handleUpdate}
        >
          {formData.title === urlData?.title ? "No changes" : "Update"}
        </Button>
      </Box>
      <Box display="flex" gap={1}>
        <TextField
          type="text"
          name="url"
          label="Original"
          autoComplete="off"
          value={formData.original_url}
          onChange={(e) =>
            setFormData({ ...formData, original_url: e.target.value })
          }
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          disabled={
            loading ||
            updateLoading ||
            formData.original_url === urlData?.original_url
          }
          onClick={handleUpdate}
        >
          {formData.original_url === urlData?.original_url
            ? "No changes"
            : "Update"}
        </Button>
      </Box>
      <Box display="flex" gap={1} py={2}>
        <TextField
          type="text"
          name="url"
          label="Short"
          value={urlData?.short_id ? shortUrl : "..."}
          size="small"
          disabled
        />
        <Button variant="contained" color="primary" onClick={handleCopyUrl}>
          Copy
        </Button>
      </Box>
    </Stack>
  )
}
