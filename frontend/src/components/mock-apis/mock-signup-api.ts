export default function mockSignupApi(email: string, password: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(email, password);
      return resolve(true)
    }, 2000);
  })
}