import { useCurrentUser } from "./api"
import { ReactElement } from "react"
import { LOGIN_URL } from "../constants"

function AuthRequired({ children }: { children: ReactElement }) {
  const { user, loading, errors } = useCurrentUser()

  if (loading) return <h1>Loading...</h1>
  else if (errors.length > 0 && !user) {
    window.location.href =
      LOGIN_URL + "?next=" + encodeURIComponent(window.location.pathname)
    return null
  }

  return <div>{children}</div>
}

export default AuthRequired
