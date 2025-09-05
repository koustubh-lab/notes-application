import { Link } from "react-router-dom"
export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-6 w-6 rounded-md bg-emerald-600"
              aria-hidden="true"
            />
            <span className="text-base font-semibold text-slate-900">
              NoteNest
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Capture ideas, organize thoughts, and stay in flow. Your notes,
            always with you.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Product</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link to="/#features" className="hover:text-emerald-600">
                Features
              </Link>
            </li>
            <li>
              <Link to="/#pricing" className="hover:text-emerald-600">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/#faq" className="hover:text-emerald-600">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Company</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <a href="#!" className="hover:text-emerald-600">
                About
              </a>
            </li>
            <li>
              <a href="#!" className="hover:text-emerald-600">
                Blog
              </a>
            </li>
            <li>
              <a href="#!" className="hover:text-emerald-600">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto max-w-5xl px-4 py-4 text-xs text-slate-500 flex items-center justify-between">
          <span>© {new Date().getFullYear()} NoteNest</span>
          <div className="flex gap-4">
            <a href="#!" className="hover:text-emerald-600">
              Privacy
            </a>
            <a href="#!" className="hover:text-emerald-600">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
