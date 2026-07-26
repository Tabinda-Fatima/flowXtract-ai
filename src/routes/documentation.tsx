import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Link as LinkIcon, ListChecks, Mail, Zap, Inbox, ChevronDown } from "lucide-react";

const BRAND = "#1e40af";

export const Route = createFileRoute("/documentation")({
  head: () => ({
    meta: [
      { title: "Documentation — How flowXtract Works" },
      {
        name: "description",
        content:
          "Step-by-step guide to running an extraction with flowXtract: paste a URL, describe the data, enter your email, and receive a spreadsheet.",
      },
      { property: "og:title", content: "Documentation — flowXtract" },
      {
        property: "og:description",
        content: "A five-step guide to extracting website data with flowXtract, plus a short FAQ.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: DocumentationPage,
});

const STEPS = [
  {
    n: 1,
    icon: LinkIcon,
    title: "Paste Website URL",
    desc: "Open the extraction page and paste the exact page that contains the listings, products, jobs, properties or articles you want. A homepage often does not contain the data itself.",
  },
  {
    n: 2,
    icon: ListChecks,
    title: "Describe What Data You Want",
    desc: "Write it in plain English, for example: “Extract product names, prices, ratings and availability.” The more specific the fields, the cleaner the columns.",
  },
  {
    n: 3,
    icon: Mail,
    title: "Enter Your Email",
    desc: "This is where the finished spreadsheet is delivered. Your address is only used to send the results of your extraction.",
  },
  {
    n: 4,
    icon: Zap,
    title: "Click Start Extraction",
    desc: "Submit the request. Our agents analyse the page, extract matching records and clean the dataset automatically.",
  },
  {
    n: 5,
    icon: Inbox,
    title: "Receive the Spreadsheet by Email",
    desc: "When processing finishes, you receive an organized spreadsheet with clean headers, ready to open, filter and share.",
  },
];

const FAQS = [
  {
    q: "How long does an extraction take?",
    a: "Most requests finish within a few minutes. Larger or slower pages take longer, and the email arrives as soon as the result is ready.",
  },
  {
    q: "Which websites are supported?",
    a: "Any publicly accessible page. Pages behind a login, a paywall or heavy anti-bot protection may not be supported.",
  },
  {
    q: "Do I need any technical knowledge?",
    a: "No. There is nothing to install and no selectors to write — a plain-English description of the data is enough.",
  },
  {
    q: "What format do I receive?",
    a: "An organized spreadsheet delivered to your email, ready to open in Google Sheets or Excel.",
  },
  {
    q: "Can I run more than one extraction?",
    a: "Yes. After a request is submitted you can start another one straight away from the extraction page.",
  },
];

function DocumentationPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="bg-slate-50 border-b border-slate-200">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 md:py-20 text-center">
            <span
              className="inline-block rounded-full px-3 py-1 text-[11px] font-semibold tracking-wider"
              style={{ backgroundColor: `${BRAND}15`, color: BRAND }}
            >
              DOCUMENTATION
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              How to Run an Extraction
            </h1>
            <p className="mt-5 text-slate-600 leading-relaxed">
              Five short steps from a website URL to a clean spreadsheet in your inbox.
            </p>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-5">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="grid grid-cols-[auto_minmax(0,1fr)] gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className="h-11 w-11 shrink-0 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: `${BRAND}15`, color: BRAND }}
                >
                  {s.n}
                </div>
                <div className="min-w-0">
                  <h2 className="flex items-center gap-2 font-bold text-slate-900">
                    <s.icon className="h-4 w-4 shrink-0" style={{ color: BRAND }} />
                    {s.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}

            <div className="pt-4 text-center">
              <Link
                to="/extract"
                className="inline-block rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
                style={{ backgroundColor: BRAND }}
              >
                Start Extraction
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 border-t border-slate-200 py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center">
              Frequently Asked Questions
            </h2>
            <div className="mt-10 space-y-4">
              {FAQS.map((f, i) => (
                <div key={f.q} className="rounded-lg border border-slate-200 bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? null : i)}
                    aria-expanded={open === i}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-semibold text-slate-900">{f.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${open === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open === i && (
                    <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{f.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
