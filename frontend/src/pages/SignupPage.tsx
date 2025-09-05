"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"

import { sendOtpApi } from "@/api/AuthApiService"
import { useAuth } from "@/components/auth/auth-context"
import { SiteHeader } from "@/components/site-header"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus } from "lucide-react"
import { toast } from "sonner"

const SignupSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  otp: z.string().length(6, "OTP must be 6 digits"),
})

type SignupValues = z.infer<typeof SignupSchema>

export default function SignupPage() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(SignupSchema),
  })

  const email = watch("email")

  const sendOtp = async () => {
    if (!email) return setError("Enter your email first")
    setError(null)
    try {
      const response = await sendOtpApi(email)
      if (response.status === 200) {
        setOtpSent(true)
        toast.info("OTP sent successfully")
      }
    } catch (err) {
      console.error(err)
      setError("Failed to send OTP")
    }
  }

  const submit = async (data: SignupValues) => {
    setError(null)
    setLoading(true)
    try {
      // Call your signup API with email, password, and OTP
      const response = await signup(data.email, data.password, data.otp) // adjust signup function to accept OTP
      if (response) navigate("/login")
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <SiteHeader />
      <section className="bg-white">
        <div className="mx-auto max-w-md px-4 py-16">
          <h1 className="text-2xl font-semibold text-slate-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Already have one?{" "}
            <Link to="/login" className="text-emerald-700 hover:underline">
              Log in
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

            {/* Email input + send OTP */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                  required
                />
                <Button type="button" onClick={sendOtp} disabled={otpSent}>
                  {otpSent ? "OTP Sent" : "Send OTP"}
                </Button>
              </div>
              {errors.email && (
                <p id="email-error" className="text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {otpSent && (
              <div className="grid gap-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  maxLength={6}
                  {...register("otp")}
                  aria-invalid={!!errors.otp}
                  aria-describedby="otp-error"
                />
                {errors.otp && (
                  <p id="otp-error" className="text-sm text-red-600">
                    {errors.otp.message}
                  </p>
                )}
              </div>
            )}

            {/* Password input */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
                required
              />
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 gap-2"
              disabled={loading || !otpSent}
            >
              <UserPlus size={16} />
              {loading ? "Signing up..." : "Sign up"}
            </Button>
          </form>
        </div>
      </section>
    </main>
  )
}
