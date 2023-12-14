import { Link, useParams } from "react-router-dom"
import { useUrlDetails } from "../api"
import { useEffect, useRef, useState } from "react"
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { BASE_REDIRECT_URL, DASHBOARD_URL } from "../../constants"
import { useSnackbar } from "notistack"

function UrlDetails() {
  const { id } = useParams()
  const [localOriginalUrl, setLocalOriginalUrl] = useState("")

  const { handleGetUrlDetails, loading, url } = useUrlDetails({
    onSuccess: (url) => {
      setLocalOriginalUrl(url.original_url)
    },
  })
  const { enqueueSnackbar } = useSnackbar()

  const shortUrl = `${BASE_REDIRECT_URL}/${url?.short_id}`
  const sortedViews = url?.views?.sort((a, b) => b.id - a.id)

  const initial = useRef(true)
  useEffect(() => {
    if (!id) return

    if (!initial.current) return
    initial.current = false

    handleGetUrlDetails(id)
  }, [])

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shortUrl)
    enqueueSnackbar("Copied!", { variant: "success" })
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        pt: 2,
      }}
    >
      <Link to={DASHBOARD_URL}>
        <Button variant="contained" color="primary">
          Back
        </Button>
      </Link>
      <Typography variant="h4" sx={{ my: 2 }} component="h1">
        Details
      </Typography>
      <Stack spacing={2}>
        <Box display="flex" gap={1}>
          <TextField
            type="text"
            name="url"
            label="Original"
            value={localOriginalUrl}
            onChange={(e) => setLocalOriginalUrl(e.target.value)}
            size="small"
          />
          <Button
            variant="contained"
            color="primary"
            disabled={loading || localOriginalUrl === url?.original_url}
          >
            Update
          </Button>
        </Box>
        <Box display="flex" gap={1}>
          <TextField
            type="text"
            name="url"
            label="Short"
            value={shortUrl}
            size="small"
            disabled
          />
          <Button variant="contained" color="primary" onClick={handleCopyUrl}>
            Copy
          </Button>
        </Box>
      </Stack>

      <Typography variant="h6" sx={{ mt: 2 }} component="h2">
        Views
      </Typography>
      <Paper>
        <Stack borderRadius={1} sx={{ mt: 2 }} maxHeight={200} overflow="auto">
          {sortedViews?.length === 0 ? (
            <Typography variant="body2" p={2}>
              No views yet
            </Typography>
          ) : (
            sortedViews?.map((visit, index) => {
              const date = new Date(visit.viewed_at)
              const day = date.toLocaleDateString()
              const month = date.toLocaleString("default", { month: "short" })
              const year = date.getFullYear()
              const time = date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })
              return (
                <Box
                  key={visit.id}
                  display="flex"
                  p={2}
                  borderBottom={
                    sortedViews && index === sortedViews.length - 1
                      ? "none"
                      : "1px solid #e0e0e0"
                  }
                >
                  <Typography variant="body2" mr={1}>
                    {day} {month} {year}: {time}
                  </Typography>
                  <Typography variant="body2">{visit.ip_address}</Typography>
                </Box>
              )
            })
          )}
        </Stack>
      </Paper>
    </Container>
  )
}

export default UrlDetails
