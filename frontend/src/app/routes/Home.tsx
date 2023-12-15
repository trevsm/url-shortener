import { Container, Typography, Button, Box } from "@mui/material"
import { Link } from "react-router-dom"
import { DASHBOARD_URL } from "../../constants"

function Home() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        paddingTop: 10,
        height: "100%",
      }}
    >
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to{" "}
          <code
            style={{
              backgroundColor: "whitesmoke",
              padding: "0.2rem 0.4rem",
              borderRadius: "0.2rem",
            }}
          >
            link.trevsm.com
          </code>
        </Typography>
        <Typography variant="h5" gutterBottom>
          Quickly shorten links & Get real-time click analytics.
        </Typography>
        <Box my={4}>
          <Link to={DASHBOARD_URL}>
            <Button variant="contained" color="primary">
              Go to Dashboard
            </Button>
          </Link>

          <Link to="/login">
            <Button
              variant="outlined"
              color="secondary"
              sx={{ marginLeft: "1rem" }}
            >
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button
              variant="outlined"
              color="warning"
              sx={{ marginLeft: "1rem" }}
            >
              Register
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

export default Home
