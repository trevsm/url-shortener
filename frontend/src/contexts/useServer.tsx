import { ReactNode, createContext, useContext, useState, useMemo } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import {
  LIST_URL,
  SHORTEN_URL,
  CSRF_URL,
  LOGIN_URL,
  REGISTER_URL,
  PROFILE_URL,
} from "../constants"
import { useSetupEffect } from "../hooks/useSetupEffect"

export interface URLItem {
  id: number
  original_url: string
  short_id: string
  count: number
}

export interface ServerContextType {
  getUrls: () => Promise<URLItem[]>
  shortenUrl: (url: string) => Promise<void>
  register: (
    username: string,
    password: string,
    email: string
  ) => Promise<boolean>
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: () => boolean
  profile: () => Promise<void>
}

const ServerContext = createContext<ServerContextType | null>(null)

export const useServer = (): ServerContextType =>
  useContext(ServerContext) as ServerContextType

export const ServerProvider = ({ children }: { children: ReactNode }) => {
  const [csrf, setCsrf] = useState<string>()
  const [token, setToken] = useState<string | null>(
    Cookies.get("token") || null
  )
  const [user, setUser] = useState<string | null>(Cookies.get("user") || null)

  const getCsrf = async () => {
    await axios.get(CSRF_URL)
    setCsrf(Cookies.get("csrftoken") as string)
  }

  const getUrls = async (): Promise<URLItem[]> => {
    const response = await axios.get(LIST_URL, {
      headers: { Authorization: `Token ${token}` },
    })
    return response.data.urls
  }

  const shortenUrl = async (url: string): Promise<void> => {
    await axios.post(
      SHORTEN_URL,
      { url },
      { headers: { "X-CSRFToken": csrf, Authorization: `Token ${token}` } }
    )
  }

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await axios.post(
        LOGIN_URL,
        { username, password },
        {
          headers: { "X-CSRFToken": csrf },
        }
      )
      setToken(response.data.token)
      Cookies.set("token", response.data.token)
      return true
    } catch (error) {
      console.error("Login error", error)
      return false
    }
  }

  const register = async (
    username: string,
    password: string,
    email: string
  ): Promise<boolean> => {
    try {
      const response = await axios.post(
        REGISTER_URL,
        {
          username,
          password,
          email,
        },
        { headers: { "X-CSRFToken": csrf } }
      )
      setToken(response.data.token)
      Cookies.set("token", response.data.token)
      return true
    } catch (error) {
      console.error("Registration error", error)
      return false
    }
  }

  const profile = async (): Promise<void> => {
    const response = await axios.get(PROFILE_URL, {
      headers: { Authorization: `Token ${token}` },
    })
    setUser(response.data.username)
  }

  const logout = () => {
    setToken(null)
    Cookies.remove("token")
  }

  const isAuthenticated = () => {
    return token !== null
  }

  useSetupEffect(() => {
    getCsrf()
    if (token) {
      profile()
    }
  })

  const contextValue = useMemo(
    () => ({
      getUrls,
      shortenUrl,
      login,
      logout,
      isAuthenticated,
      register,
      profile,
    }),
    [csrf, token, user]
  )

  return (
    <ServerContext.Provider value={contextValue}>
      {children}
    </ServerContext.Provider>
  )
}
