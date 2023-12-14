import { BASE_REDIRECT_URL, DASHBOARD_URL } from "../../../constants"
import { Link } from "react-router-dom"
import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material"
import { URLItem } from "../../types"
import { useSnackbar } from "notistack"

import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"

export function DashboardCard({ urlItem }: { urlItem: URLItem }) {
  if (!urlItem.original_url || !urlItem.short_id) return <></>

  const { enqueueSnackbar } = useSnackbar()

  const title = urlItem.title
    ? urlItem.title
    : new URL(urlItem.original_url).hostname + " Untitled"
  const shortUrl = `${BASE_REDIRECT_URL}/${urlItem.short_id}`
  const originalUrl =
    urlItem.original_url.substring(0, 50) === urlItem.original_url
      ? urlItem.original_url
      : urlItem.original_url.substring(0, 50) + "..."

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shortUrl)
    enqueueSnackbar("Copied!", { variant: "success" })
  }

  return (
    <Stack key={urlItem.id} spacing={1}>
      <Paper
        elevation={1}
        sx={{
          overflow: "hidden",
        }}
      >
        <Box
          px={2}
          py={1}
          borderBottom="1px solid #e0e0e0"
          bgcolor="whitesmoke"
        >
          <Link to={`${DASHBOARD_URL}/${urlItem.short_id}`}>
            <Tooltip title="More details">
              <Typography variant="h6" color="primary" width="fit-content">
                {title}
              </Typography>
            </Tooltip>
          </Link>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Short URL</TableCell>
                <TableCell>Original URL</TableCell>
                <TableCell>Visits</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "& > td": { maxWidth: "33.33%", width: "33.33%" } }}
              >
                <TableCell>
                  <Tooltip title="Click to copy">
                    <Box
                      onClick={handleCopyUrl}
                      sx={{
                        display: "flex",
                        gap: 1,
                        cursor: "pointer",
                        "&:active": { cursor: "default" },
                      }}
                    >
                      {shortUrl} <ContentCopyIcon fontSize="small" />
                    </Box>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title="Visit URL">
                    <a
                      href={urlItem.original_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Box sx={{ display: "flex", gap: 1 }}>
                        {originalUrl}
                        <OpenInNewIcon fontSize="small" />
                      </Box>
                    </a>
                  </Tooltip>
                </TableCell>
                <TableCell>{urlItem.count}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>
  )
}
