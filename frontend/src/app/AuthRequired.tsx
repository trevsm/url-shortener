import { useCurrentUser } from "./api"
import { ReactElement } from "react"
import { LOGIN_URL } from "../constants"
import { CircularProgress, Grid, Typography } from "@mui/material"

function AuthRequired({ children }: { children: ReactElement }) {
  const { user, loading, errors } = useCurrentUser()

  // center of screen
  if (loading)
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Typography variant="h6" component="h1" mr={3}>
          Please wait...
        </Typography>
        <CircularProgress size={30} />
      </Grid>
    )
  else if (errors.length > 0 && !user) {
    window.location.href =
      LOGIN_URL + "?next=" + encodeURIComponent(window.location.pathname)
    return null
  }

  return <div>{children}</div>
}

export default AuthRequired
