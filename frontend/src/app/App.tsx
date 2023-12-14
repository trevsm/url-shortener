import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SnackbarProvider } from "notistack"

import Home from "./routes/Home"
import Login from "./routes/Login"
import Register from "./routes/Register"
import Dashboard from "./routes/Dashboard"
import AuthRequired from "./AuthRequired"
import UrlDetails from "./routes/UrlDetails"

function App() {
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      maxSnack={1}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard">
            <Route
              index
              element={
                <AuthRequired>
                  <Dashboard />
                </AuthRequired>
              }
            />
            <Route
              path=":id"
              element={
                <AuthRequired>
                  <UrlDetails />
                </AuthRequired>
              }
            />
          </Route>
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  )
}

export default App
