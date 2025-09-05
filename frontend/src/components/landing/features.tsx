import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Folder,
  PencilLine,
  Search,
  Share2,
  ShieldCheck,
  Zap,
} from "lucide-react"

const items = [
  {
    icon: PencilLine,
    title: "Delightful Editor",
    body: "A clean, fast editor with markdown shortcuts and instant formatting.",
  },
  {
    icon: Search,
    title: "Instant Search",
    body: "Find anything as you type. Titles, content, and recent edits.",
  },
  {
    icon: Folder,
    title: "Simple Organization",
    body: "Tags and pinning keep your ideas tidy without effort.",
  },
  {
    icon: ShieldCheck,
    title: "Private by Default",
    body: "Your notes stay on your device unless you decide to sync.",
  },
  {
    icon: Share2,
    title: "Effortless Sharing",
    body: "Turn notes into shareable links (coming soon).",
  },
  {
    icon: Zap,
    title: "Keyboard First",
    body: "Every action is just a shortcut away.",
  },
]

export function Features() {
  return (
    <section id="features" className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-slate-900 text-balance">
          Tools that keep you in flow
        </h2>
        <p className="mt-3 text-center text-slate-600 max-w-2xl mx-auto">
          Capture, refine, and organize without breaking concentration.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {items.map(({ icon: Icon, title, body }) => (
            <Card
              key={title}
              className="border hover:border-emerald-600/40 transition-colors"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-emerald-50">
                    <Icon className="text-emerald-600" size={20} />
                  </span>
                  <CardTitle className="text-base">{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                {body}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
