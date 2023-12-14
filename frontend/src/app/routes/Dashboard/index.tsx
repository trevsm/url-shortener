import { useEffect, useRef, useState } from "react"
import { useGetUrls } from "../../api"
import {
  Box,
  Button,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material"
import { DashboardCard } from "./DashboardCard"
import { NewUrlForm } from "./NewUrlForm"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"

function Dashboard() {
  const { handleGetUrls, loading, errors, urlList } = useGetUrls()
  const [activeAdd, setActiveAdd] = useState(false)

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
        pt: 4,
        pb: 6,
      }}
    >
      <Box height={20}>{loading && <LinearProgress />}</Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      <Stack spacing={2}>
        {activeAdd ? (
          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: "5px",
              minHeight: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <NewUrlForm
              successCallback={() => {
                setActiveAdd(false)
                handleGetUrls()
              }}
              handleCancel={() => setActiveAdd(false)}
            />
          </Box>
        ) : (
          <Button
            variant="outlined"
            onClick={() => setActiveAdd(true)}
            sx={{
              display: "flex",
              alignItems: "center",
              verticalAlign: "middle",
              justifyContent: "center",
              gap: 1,
              minHeight: 80,
            }}
          >
            <AddCircleOutlineIcon />
            <Typography variant="body1">Add a new URL</Typography>
          </Button>
        )}
        {errors.length ? (
          <Typography variant="h6" component="h2">
            Unable to fetch data...
          </Typography>
        ) : (
          sortedUrlList.map((url) => (
            <DashboardCard
              urlItem={url}
              key={url.short_id}
              successCallback={handleGetUrls}
            />
          ))
        )}
      </Stack>
    </Container>
  )
}
export default Dashboard
