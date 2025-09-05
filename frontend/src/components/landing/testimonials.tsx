import { Card, CardContent } from "@/components/ui/card"

const quotes = [
  {
    name: "Amira",
    role: "Product Manager",
    text: "NoteNest is the first notes app that never slows me down.",
  },
  {
    name: "Jon",
    role: "Engineer",
    text: "Search is instant and the UI disappears. It just lets me think.",
  },
  {
    name: "Riley",
    role: "Student",
    text: "Clean, quick, and exactly what I needed to organize my studies.",
  },
]

export function Testimonials() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-slate-900">
          Loved by focused people
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {quotes.map((q) => (
            <Card key={q.name} className="border">
              <CardContent className="pt-6">
                <p className="text-slate-700 leading-relaxed">“{q.text}”</p>
                <p className="mt-4 text-sm text-slate-600">
                  — {q.name}, {q.role}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
