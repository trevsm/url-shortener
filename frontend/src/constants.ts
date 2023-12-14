const BASE_API_URL = "http://localhost:8000/api"
const BASE_REDIRECT_URL = "http://localhost:8000/s"

const CSRF_API = `${BASE_API_URL}/csrf/`
const LIST_API = `${BASE_API_URL}/urls/`
const DETAILED_URL_API = `${BASE_API_URL}/url/`
const SHORTEN_API = `${BASE_API_URL}/shorten/`
const UPDATE_API = (id: string) => `${BASE_API_URL}/url/${id}/update/`
const DELETE_API = (id: string) => `${BASE_API_URL}/url/${id}/delete/`
const LOGIN_API = `${BASE_API_URL}/login/`
const REGISTER_API = `${BASE_API_URL}/register/`
const PROFILE_API = `${BASE_API_URL}/profile/`

const DASHBOARD_URL = "/dashboard"
const LOGIN_URL = "/login"
const REGISTER_URL = "/register"

export {
  BASE_API_URL,
  BASE_REDIRECT_URL,
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
