import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function CTA() {
  return (
    <section className="bg-white mb-8">
      <div className="mx-auto max-w-5xl px-4 py-16 rounded-lg border text-center">
        <h3 className="text-2xl font-semibold text-slate-900 text-balance">
          Ready to tidy your mind?
        </h3>
        <p className="mt-3 text-slate-600">
          Create your first note in seconds. It’s free.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link to="/signup">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Get started
            </Button>
          </Link>
          <Link to="/notes">
            <Button variant="outline">Open Notes</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
