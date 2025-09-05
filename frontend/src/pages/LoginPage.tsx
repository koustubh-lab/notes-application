"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"

import { useAuth } from "@/components/auth/auth-context"
import { SiteHeader } from "@/components/site-header"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters"),
})

type LoginValues = z.infer<typeof LoginSchema>

export default function LoginPage() {
  const { login, authLoading, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const submit = async (data: LoginValues) => {
    setError(null)
    setLoading(true)

    try {
      const { email, password } = data
      const success = await login(email, password)
      if (success) {
        toast.success("Logged in successfully")
        navigate("/notes", { replace: true })
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate("/notes", { replace: true })
    }
  }, [isAuthenticated, authLoading])

  return (
    <main>
      <SiteHeader />
      <section className="bg-white">
        <div className="mx-auto max-w-md px-4 py-16">
          <h1 className="text-2xl font-semibold text-slate-900">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            New here?{" "}
            <Link to="/signup" className="text-emerald-700 hover:underline">
              Create an account
            </Link>
          </p>
          <form
            onSubmit={handleSubmit(submit)}
            className="mt-6 grid gap-4"
            noValidate
          >
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Oops</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
              />
              {errors.password && (
                <p id="password-error" className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 gap-2"
              disabled={loading}
            >
              <LogIn size={16} />
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </form>
        </div>
      </section>
    </main>
  )
}
