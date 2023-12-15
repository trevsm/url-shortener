import { Box, Container, LinearProgress, Typography } from "@mui/material"

export default function Page({
  children,
  loading,
  title,
}: {
  children: React.ReactNode
  loading?: boolean
  title?: string
}) {
  return (
    <Container
      maxWidth="md"
      sx={{
        pt: 4,
        pb: 6,
      }}
    >
      <Box height={20}>{loading && <LinearProgress />}</Box>
      {title && (
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
      )}
      <Box component="main">{children}</Box>
    </Container>
  )
}
