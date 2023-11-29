import React from "react"
import ReactDOM from "react-dom/client"
import App from "./app/App"
import "./index.css"
import { ServerProvider } from "./contexts/useServer"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <ServerProvider>
      <App />
    </ServerProvider>
  </React.StrictMode>
)
