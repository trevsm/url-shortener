import { useEffect, useRef } from "react"
import { useGetUrls } from "../../api"
import { Box, Container, Skeleton, Stack, Typography } from "@mui/material"
import { DashboardCard } from "./DashboardCard"
import { NewUrlForm } from "./NewUrlForm"

function Dashboard() {
  const { handleGetUrls, loading, errors, urlList } = useGetUrls()

  const sortedUrlList = urlList.sort((a, b) => b.id - a.id)

  const initial = useRef(true)
  useEffect(() => {
    if (!initial.current) return
    initial.current = false

    handleGetUrls()
  }, [])

  return (
    <Container
      maxWidth="md"
      sx={{
        pt: 2,
      }}
    >
      <Typography variant="h4" component="h1">
        Dashboard
      </Typography>

      <Box borderBottom="1px solid" my={4} />

      <Typography variant="h6" component="h2" gutterBottom>
        Add a new URL
      </Typography>
      <Box mb={2}>
        <NewUrlForm callback={handleGetUrls} />
      </Box>

      <Box borderBottom="1px solid" my={5} />

      <Stack spacing={2}>
        {loading ? (
          Array.from({ length: 2 }, (_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              height={180}
              sx={{
                borderRadius: "5px",
              }}
            />
          ))
        ) : errors.length ? (
          <Typography variant="h6" component="h2">
            Unable to fetch data...
          </Typography>
        ) : (
          sortedUrlList.map((url) => (
            <DashboardCard urlItem={url} key={url.short_id} />
          ))
        )}
      </Stack>
    </Container>
  )
}
export default Dashboard
