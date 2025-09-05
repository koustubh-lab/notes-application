import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"

export function Pricing() {
  return (
    <section id="pricing" className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-slate-900">
          Simple pricing
        </h2>
        <p className="mt-3 text-center text-slate-600">
          Start free. Upgrade when you need more.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card className="border">
            <CardHeader>
              <CardTitle>Free</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-slate-900">
                $0<span className="text-sm text-slate-600">/mo</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Unlimited notes</li>
                <li>Local privacy</li>
                <li>Fast search</li>
              </ul>
              <Link to="/signup">
                <Button className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700">
                  Get started
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="border outline outline-1 outline-amber-400">
            <CardHeader>
              <CardTitle>Pro</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-slate-900">
                $5<span className="text-sm text-slate-600">/mo</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Sync across devices</li>
                <li>Shareable links</li>
                <li>Priority support</li>
              </ul>
              <Link to="/signup">
                <Button className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700">
                  Go Pro
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
