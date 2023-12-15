const LOCAL_API_URL = "http://localhost:8000/api"
const LOCAL_REDIRECT_URL = "http://localhost:8000/s"

const LIVE_API_URL = "https://a.trevsm.com/api"
const LIVE_REDIRECT_URL = "https://a.trevsm.com/s"

// check if in production
const REDIRECT_URL =
  process.env.NODE_ENV === "production" ? LIVE_REDIRECT_URL : LOCAL_REDIRECT_URL
const API_URL =
  process.env.NODE_ENV === "production" ? LIVE_API_URL : LOCAL_API_URL

const CSRF_API = `${API_URL}/csrf/`
const LIST_API = `${API_URL}/urls/`
const DETAILED_URL_API = `${API_URL}/url/`
const SHORTEN_API = `${API_URL}/shorten/`
const UPDATE_API = (id: string) => `${API_URL}/url/${id}/update/`
const DELETE_API = (id: string) => `${API_URL}/url/${id}/delete/`
const LOGIN_API = `${API_URL}/login/`
const REGISTER_API = `${API_URL}/register/`
const PROFILE_API = `${API_URL}/profile/`

const DASHBOARD_URL = "/dashboard"
const LOGIN_URL = "/login"
const REGISTER_URL = "/register"

export {
  API_URL,
  REDIRECT_URL,
  CSRF_API,
  LIST_API,
  SHORTEN_API,
  UPDATE_API,
  DELETE_API,
  LOGIN_API,
  REGISTER_API,
  PROFILE_API,
  DASHBOARD_URL,
  DETAILED_URL_API,
  LOGIN_URL,
  REGISTER_URL,
}
