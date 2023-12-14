import axios from "axios"
import Cookies from "js-cookie"

import {
  LIST_API,
  SHORTEN_API,
  CSRF_API,
  LOGIN_API,
  REGISTER_API,
  PROFILE_API,
  DETAILED_URL_API,
  UPDATE_API,
  DELETE_API,
} from "../constants"
import { useEffect, useRef, useState } from "react"
import { URLItem } from "./types"

axios.defaults.withCredentials = true

const useCsrf = () => {
  const [csrf, setCsrf] = useState(Cookies.get("csrftoken"))

  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState<string[]>([])

  const localLoading = useRef(false)
  useEffect(() => {
    if (csrf) {
      setLoading(false)
      return
    }

    if (localLoading.current) return
    localLoading.current = true

    axios
      .get(CSRF_API)
      .then((res) => {
        setCsrf(res.data.csrfToken)
      })
      .catch(() => {
        setErrors((prev) => [...prev, "Error getting csrf token"])
      })
      .finally(() => {
        setLoading(false)
        localLoading.current = false
      })
  }, [])

  return { csrf, loading, errors }
}

const getToken = () => {
  return Cookies.get("token")
}

const useCurrentUser = () => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState<string[]>([])
  const token = getToken()

  const localLoading = useRef(false)
  useEffect(() => {
    if (!token) {
      setLoading(false)
      setErrors((prev) => [...prev, "No token"])
      return
    }
    if (localLoading.current) return
    localLoading.current = true

    axios
      .get(PROFILE_API, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setUser(res.data)
      })
      .catch(() => {
        Cookies.remove("token")
        setErrors((prev) => [...prev, "Error getting user"])
      })
      .finally(() => {
        setLoading(false)
        localLoading.current = false
      })
  }, [])

  return { user, loading, errors }
}
const useRegister = (props?: {
  onSuccess?: () => void
  onError?: (errors: string[]) => void
}) => {
  const onSuccess = props?.onSuccess || (() => {})
  const onError = props?.onError || (() => {})

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const { csrf, loading: csrfLoading, errors: csrfErrors } = useCsrf()

  const handleRegister = async ({
    username,
    password,
    email,
  }: {
    username: string
    password: string
    email: string
  }) => {
    setLoading(true)
    setErrors([])
    try {
      const res = await axios.post(
        REGISTER_API,
        {
          username,
          password,
          email,
        },
        {
          headers: {
            "X-CSRFToken": csrf,
          },
        }
      )
      Cookies.set("token", res.data.token)
      onSuccess()
    } catch (err) {
      setErrors((prev) => [...prev, "Error registering"])
      onError(["Error registering"])
    } finally {
      setLoading(false)
    }
  }

  return {
    handleRegister,
    loading: loading || csrfLoading,
    errors: [...errors, ...csrfErrors],
  }
}
const useLogin = (props?: {
  onSuccess?: () => void
  onError?: (errors: string[]) => void
}) => {
  const onSuccess = props?.onSuccess || (() => {})
  const onError = props?.onError || (() => {})

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const { csrf, loading: csrfLoading, errors: csrfErrors } = useCsrf()

  const handleLogin = async ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => {
    setLoading(true)
    setErrors([])
    try {
      const res = await axios.post(
        LOGIN_API,
        {
          username,
          password,
        },
        {
          headers: {
            "X-CSRFToken": csrf,
          },
        }
      )
      Cookies.set("token", res.data.token)
      onSuccess()
    } catch (err) {
      setErrors((prev) => [...prev, "Error logging in"])
      onError(["Error logging in"])
    } finally {
      setLoading(false)
    }
  }

  return {
    handleLogin,
    loading: loading || csrfLoading,
    errors: [...errors, ...csrfErrors],
  }
}

const useLogout = () => {
  const [errors, setErrors] = useState<string[]>([])

  const handleLogout = async () => {
    setErrors([])
    try {
      Cookies.remove("token")
    } catch (err) {
      setErrors((prev) => [...prev, "Error logging out"])
    }
  }

  return { handleLogout, errors }
}

const useShortenUrl = (props?: {
  onSuccess?: () => void
  onError?: (errors: string[]) => void
}) => {
  const onSuccess = props?.onSuccess || (() => {})
  const onError = props?.onError || (() => {})

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const { csrf, loading: csrfLoading, errors: csrfErrors } = useCsrf()

  const handleShortenUrl = async ({
    url,
    title,
  }: {
    url: string
    title?: string
  }) => {
    setLoading(true)
    setErrors([])
    try {
      await axios.post(
        SHORTEN_API,
        { url, title },
        {
          headers: {
            Authorization: `Token ${getToken()}`,
            "X-CSRFToken": csrf,
          },
        }
      )
      onSuccess()
    } catch (err) {
      setErrors((prev) => [...prev, "Error shortening url"])
      onError(["Error shortening url"])
    } finally {
      setLoading(false)
    }
  }

  return {
    handleShortenUrl,
    loading: loading || csrfLoading,
    errors: [...errors, ...csrfErrors],
  }
}

const useUpdateUrl = (props?: {
  onSuccess?: (url: URLItem) => void
  onError?: (errors: string[]) => void
}) => {
  const onSuccess = props?.onSuccess || (() => {})
  const onError = props?.onError || (() => {})

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const { csrf, loading: csrfLoading, errors: csrfErrors } = useCsrf()

  const handleUpdateUrl = async ({
    shortId,
    original_url,
    title,
  }: {
    shortId: string
    original_url?: string
    title?: string
  }) => {
    setLoading(true)
    setErrors([])
    try {
      const res = await axios.patch(
        UPDATE_API(shortId),
        { original_url, title },
        {
          headers: {
            Authorization: `Token ${getToken()}`,
            "X-CSRFToken": csrf,
          },
        }
      )
      onSuccess(res.data)
    } catch (err) {
      setErrors((prev) => [...prev, "Error updating url"])
      onError(["Error updating url"])
    } finally {
      setLoading(false)
    }
  }

  return {
    handleUpdateUrl,
    loading: loading || csrfLoading,
    errors: [...errors, ...csrfErrors],
  }
}

const useDeleteUrl = (props?: {
  onSuccess?: () => void
  onError?: (errors: string[]) => void
}) => {
  const onSuccess = props?.onSuccess || (() => {})
  const onError = props?.onError || (() => {})

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const { csrf, loading: csrfLoading, errors: csrfErrors } = useCsrf()

  const handleDeleteUrl = async (shortId: string) => {
    setLoading(true)
    setErrors([])
    try {
      await axios.delete(DELETE_API(shortId), {
        headers: {
          Authorization: `Token ${getToken()}`,
          "X-CSRFToken": csrf,
        },
      })
      onSuccess()
    } catch (err) {
      setErrors((prev) => [...prev, "Error deleting url"])
      onError(["Error deleting url"])
    } finally {
      setLoading(false)
    }
  }

  return {
    handleDeleteUrl,
    loading: loading || csrfLoading,
    errors: [...errors, ...csrfErrors],
  }
}

const useGetUrls = () => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [urlList, setUrlList] = useState<URLItem[]>([])

  const handleGetUrls = async () => {
    setLoading(true)
    setErrors([])
    try {
      const res = await axios.get(LIST_API, {
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      })
      setUrlList(res.data.urls)
    } catch (err) {
      setErrors((prev) => [...prev, "Error getting urls"])
    } finally {
      setLoading(false)
    }
  }

  return {
    handleGetUrls,
    loading,
    errors,
    urlList,
  }
}

const useUrlDetails = (props?: {
  onSuccess?: (url: URLItem) => void
  onError?: (errors: string[]) => void
}) => {
  const onSuccess = props?.onSuccess || (() => {})
  const onError = props?.onError || (() => {})

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [urlData, setUrlData] = useState<URLItem>()

  const handleGetUrlDetails = async (short: string) => {
    setLoading(true)
    setErrors([])
    try {
      const res = await axios.get(`${DETAILED_URL_API}${short}/`, {
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      })
      setUrlData(res.data)
      onSuccess(res.data)
    } catch (err) {
      setErrors((prev) => [...prev, "Error getting url details"])
      onError(["Error getting url details"])
    } finally {
      setLoading(false)
    }
  }

  return {
    handleGetUrlDetails,
    loading,
    errors,
    urlData,
  }
}

export {
  useCsrf,
  useCurrentUser,
  useRegister,
  useLogin,
  useLogout,
  useShortenUrl,
  useUpdateUrl,
  useDeleteUrl,
  useGetUrls,
  useUrlDetails,
}
