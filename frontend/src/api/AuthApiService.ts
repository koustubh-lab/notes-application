import apiClient from "./AxiosApiService";

export async function loginApi(email: string, password: string) {
  return apiClient.post("/api/login", { email, password })
}

export async function signupApi(email: string, password: string, otp: string) {
  return apiClient.post("/api/register", { email, password, otp })
}

export async function isTokenValidApi(token: string) {
  return apiClient.get("/api/is-token-valid", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}

export async function sendOtpApi(email: string) {
  return apiClient.post(`/api/send-otp?email=${email}`, {})
}