export default function mockLoginApi(email: string, password: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "abc@example.com" && password === "123456") resolve(true)
      reject(false)
    }, 2000);
  })
}