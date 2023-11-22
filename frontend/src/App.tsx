import { useEffect, useRef, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"

axios.defaults.xsrfCookieName = "csrftoken"
axios.defaults.withCredentials = true

function App() {
  const [count, setCount] = useState<number>(0)

  const initialized = useRef(false)
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    axios
      .get("http://localhost:8000/api/csrf/")
      .then((response) => response.data.csrfToken)

    axios
      .get("http://localhost:8000/api/counter/")
      .then((response) => setCount(response.data.count))
  }, [])

  const incrementCount = async () => {
    axios
      .post(
        "http://localhost:8000/api/counter/",
        {},
        {
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        }
      )
      .then((response) => setCount(response.data.count))
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={incrementCount}>Increment</button>
    </div>
  )
}

export default App
