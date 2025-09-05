import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "Is my data private?",
    a: "Yes. Notes are stored locally on your device in this demo. Sync is an upcoming feature.",
  },
  {
    q: "Do you support markdown?",
    a: "Yes, basic markdown shortcuts like # for headings are supported in the editor roadmap.",
  },
  {
    q: "Is there a mobile app?",
    a: "A PWA works great today; native apps are on the roadmap.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-slate-900">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="mt-6">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-slate-600">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
