import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LogIn, LogOut, User, UserPlus } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "./auth/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function SiteHeader() {
  const location = useLocation()
  const isRootPath = location.pathname === "/"

  const pathname = location.pathname
  const { isAuthenticated, logout, email } = useAuth()

  const NavLink = ({
    href,
    children,
  }: {
    href: string
    children: React.ReactNode
  }) => (
    <a
      href={href}
      className={cn(
        "text-sm font-medium hover:text-emerald-600 transition-colors",
        pathname === href ? "text-emerald-700" : "text-slate-600"
      )}
    >
      {children}
    </a>
  )

  return (
    <header className="sticky top-0 w-full border-b bg-white/50 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {/* <span
            className="inline-block h-6 w-6 rounded-md bg-emerald-600"
            aria-hidden="true"
          /> */}
          <span className="text-base font-semibold text-slate-900">
            NoteNest
          </span>
        </Link>

        {isRootPath && (
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/#features">Features</NavLink>
            <NavLink href="/#pricing">Pricing</NavLink>
            <NavLink href="/#faq">FAQ</NavLink>
            <NavLink href="/notes">Notes</NavLink>
          </nav>
        )}

        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button
                  variant="outline"
                  size={"sm"}
                  className="gap-2 bg-transparent"
                >
                  <LogIn size={16} />
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 gap-2"
                  size={"sm"}
                >
                  <UserPlus size={16} />
                  Sign up
                </Button>
              </Link>
            </>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size={"icon"}
                    className="gap-2 bg-transparent"
                  >
                    <User size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="pointer-events-none">
                    <span className="hidden sm:inline text-sm text-slate-600 font-bold">
                      {email}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={logout}
                    className="cursor-pointer"
                  >
                    <LogOut size={16} />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
