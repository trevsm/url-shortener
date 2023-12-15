import { TableCell, TableRow, Typography } from "@mui/material"
import { ViewItem } from "../../types"

interface ViewRowProps {
  visit: ViewItem
}

export function ViewRow({ visit }: ViewRowProps) {
  const date = new Date(visit.viewed_at)
  const dateString = date.toLocaleDateString("default", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })

  return (
    <TableRow>
      <TableCell>
        <Typography variant="body2">{dateString}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{timeString}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{visit.ip_address}</Typography>
      </TableCell>
    </TableRow>
  )
}
