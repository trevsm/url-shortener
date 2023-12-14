import { Link, useParams } from "react-router-dom"
import { useUrlDetails } from "../../api"
import { useEffect, useRef, useState } from "react"
import { Button, Container, Paper, Stack, Typography } from "@mui/material"
import { DASHBOARD_URL } from "../../../constants"
import { DetailsForm } from "./DetailsForm"
import { ViewCard } from "./ViewCard"

export interface EditableUrlItem {
  title?: string
  original_url: string
}

function UrlDetails() {
  const { id } = useParams()
  const [formData, setFormData] = useState<EditableUrlItem>({
    title: "",
    original_url: "",
  })

  const { handleGetUrlDetails, loading, urlData } = useUrlDetails({
    onSuccess: (url) => {
      setFormData({
        title: url.title,
        original_url: url.original_url,
      })
    },
  })

  const sortedViews = urlData?.views?.sort((a, b) => b.id - a.id)

  const initial = useRef(true)
  useEffect(() => {
    if (!id) return

    if (!initial.current) return
    initial.current = false

    handleGetUrlDetails(id)
  }, [])

  if (!id) return

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
      <Typography variant="h6" sx={{ my: 2 }} component="h1">
        Details
      </Typography>
      <DetailsForm
        urlData={urlData}
        formData={formData}
        setFormData={setFormData}
        successCallback={() => handleGetUrlDetails(id)}
        loading={loading}
      />
      <Typography variant="h6" sx={{ mt: 2 }} component="h2">
        Clicks: ({urlData?.views?.length})
      </Typography>
      <Paper>
        <Stack borderRadius={1} sx={{ mt: 2 }} maxHeight={200} overflow="auto">
          {sortedViews?.length === 0 ? (
            <Typography variant="body2" p={2}>
              No clicks yet
            </Typography>
          ) : (
            sortedViews?.map((visit, index) => (
              <ViewCard
                key={visit.id}
                visit={visit}
                isLast={index === sortedViews.length - 1}
              />
            ))
          )}
        </Stack>
      </Paper>
    </Container>
  )
}

export default UrlDetails
