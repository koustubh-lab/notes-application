import type React from "react"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./auth-context"

export function Protected({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, authLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login")
    }
  }, [authLoading, isAuthenticated])

  if (authLoading) return null
  return <>{children}</>
}
