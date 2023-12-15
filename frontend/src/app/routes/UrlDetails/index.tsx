import { Link, useNavigate, useParams } from "react-router-dom"
import { useDeleteUrl, useUrlDetails } from "../../api"
import { useEffect, useRef, useState } from "react"
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { DASHBOARD_URL } from "../../../constants"
import { DetailsForm } from "./DetailsForm"
import { ViewRow } from "./ViewRow"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useSnackbar } from "notistack"
import Page from "../../Page"

export interface EditableUrlItem {
  title?: string
  original_url: string
}

function UrlDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const [formData, setFormData] = useState<EditableUrlItem>({
    title: "",
    original_url: "",
  })
  const { handleDeleteUrl } = useDeleteUrl({
    onSuccess: () => {
      enqueueSnackbar("URL deleted", { variant: "success" })
      setTimeout(() => {
        navigate(DASHBOARD_URL)
      }, 1000)
    },
    onError: (errors) => {
      errors.forEach((err) => enqueueSnackbar(err, { variant: "error" }))
    },
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
    <Page title="Details" loading={loading}>
      <Link to={DASHBOARD_URL}>
        <Button variant="contained" color="primary">
          <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
          Dashboard
        </Button>
      </Link>
      <Box height={20} />
      <DetailsForm
        urlData={urlData}
        formData={formData}
        setFormData={setFormData}
        successCallback={() => handleGetUrlDetails(id)}
        loading={loading}
      />
      <Button
        variant="contained"
        color="error"
        sx={{ mt: 2 }}
        onClick={() => handleDeleteUrl(id)}
      >
        Delete URL
      </Button>
      <Box height={20} />
      <Typography variant="h6" sx={{ mt: 2 }} component="h2">
        Clicks: ({urlData?.views?.length})
      </Typography>
      <Paper>
        <TableContainer
          component={Paper}
          sx={{
            mt: 2,
            maxHeight: 200,
          }}
        >
          <Table stickyHeader>
            <TableHead
              sx={{
                "& th": {
                  backgroundColor: "whitesmoke",
                },
              }}
            >
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>IP Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedViews?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography variant="body2" p={2}>
                      No clicks yet
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                sortedViews?.map((visit) => (
                  <ViewRow key={visit.id} visit={visit} />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Page>
  )
}

export default UrlDetails
