import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthProvider } from "./components/auth/auth-context"
import CreateNote from "./pages/CreateNote"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import NoteDetailPage from "./pages/NoteDetailPage"
import NotesPage from "./pages/NotesPage"
import SignupPage from "./pages/SignupPage"

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/editor",
      element: <CreateNote />,
    },
    {
      path: "/notes",
      element: <NotesPage />,
    },
    {
      path: "/notes/:id",
      element: <NoteDetailPage />,
    },
  ])
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
