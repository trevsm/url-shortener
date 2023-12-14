import { Box, Typography } from "@mui/material"
import { ViewItem } from "../../types"

interface ViewCardProps {
  visit: ViewItem
  isLast: boolean
}

export function ViewCard({ visit, isLast }: ViewCardProps) {
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
      display="flex"
      p={2}
      borderBottom={isLast ? "none" : "1px solid #e0e0e0"}
    >
      <Typography variant="body2" mr={1}>
        {day} {month} {year}: {time}
      </Typography>
      <Typography variant="body2">{visit.ip_address}</Typography>
    </Box>
  )
}
