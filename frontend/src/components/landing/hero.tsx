import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { Link } from "react-router-dom"

export function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-14 md:py-20 grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-pretty text-3xl md:text-5xl font-bold text-slate-900">
            Think clearly. Write freely. Organize effortlessly.
          </h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            NoteNest is a fast, minimalist notes app that helps you capture
            ideas and turn them into action. Instant search, blazing editor, and
            simple organization built for flow.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to="/signup">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Get started free
              </Button>
            </Link>
            <Link to="/notes">
              <Button variant="outline">Open Notes</Button>
            </Link>
          </div>
          <ul className="mt-6 space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <Check size={16} className="text-emerald-600" /> Unlimited notes
            </li>
            <li className="flex items-center gap-2">
              <Check size={16} className="text-emerald-600" /> Keyboard-first
            </li>
            <li className="flex items-center gap-2">
              <Check size={16} className="text-emerald-600" /> Private by
              default
            </li>
          </ul>
        </div>
        <div className="rounded-lg border p-4 md:p-6 bg-white shadow-sm">
          <img
            src={"/notes-app-interface-preview.png"}
            alt="Notes app interface preview"
            className="w-full rounded-md"
          />
        </div>
      </div>
    </section>
  )
}
