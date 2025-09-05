import { isTokenValidApi, loginApi, signupApi } from "@/api/AuthApiService"
import apiClient from "@/api/AxiosApiService"
import { jwtDecode } from "jwt-decode"
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

type AuthContextType = {
  signup: (email: string, password: string, otp: string) => Promise<boolean>
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  token: string | null
  isAuthenticated: boolean
  authLoading: boolean
  email: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const [email, setEmail] = useState<string>("")
  const interceptorId = useRef<number | null>(null)

  function applyInterceptors(userToken: string) {
    removeInterceptors()
    interceptorId.current = apiClient.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${userToken}`
      return config
    })
  }

  function removeInterceptors() {
    if (interceptorId.current)
      apiClient.interceptors.request.eject(interceptorId.current)
  }

  async function login(email: string, password: string) {
    email = email.trim().toLowerCase()
    if (!email || !password || password.length < 6) {
      return false
    }

    try {
      const response = await loginApi(email, password)
      const { status, data } = response
      if (status === 200) {
        const { token: userToken } = data
        setToken(userToken)
        setIsAuthenticated(true)
        localStorage.setItem("token", userToken)
        applyInterceptors(userToken)
        setEmail(email)
        return true
      } else {
        return false
      }
    } catch (error: any) {
      return false
    }
  }

  async function signup(email: string, password: string, otp: string) {
    email = email.trim().toLowerCase()
    if (!email || !password || password.length < 6 || !otp) {
      return false
    }
    try {
      const response = await signupApi(email, password, otp)
      const { status } = response
      if (status === 200) {
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  function logout() {
    setToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem("token")
    setEmail("")
    removeInterceptors()
  }

  async function checkTokenValidity(userToken: string) {
    try {
      const decodedToken = jwtDecode<{ exp: number }>(userToken)
      if (decodedToken.exp * 1000 > new Date().getTime()) {
        const response = await isTokenValidApi(userToken)
        const {
          status,
          data: { email: userEmail },
        } = response
        if (status === 200) {
          setIsAuthenticated(true)
          setToken(userToken)
          applyInterceptors(userToken)
          setEmail(userEmail)
        } else {
          setIsAuthenticated(false)
          setToken(null)
          removeInterceptors()
        }
      } else {
        setIsAuthenticated(false)
        removeInterceptors()
      }
    } catch (error) {
      setIsAuthenticated(false)
      setToken(null)
      removeInterceptors()
    } finally {
      setAuthLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      setIsAuthenticated(false)
      setToken(null)
      setAuthLoading(false)
      return
    }

    checkTokenValidity(token)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        logout,
        token,
        isAuthenticated,
        authLoading,
        email,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}

export { AuthContext }
