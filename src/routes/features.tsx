import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import {
  Radar,
  Network,
  ScanSearch,
  Brush,
  Sheet,
  FileSpreadsheet,
  MailPlus,
  MonitorSmartphone,
} from "lucide-react";

const BRAND = "#1e40af";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — flowXtract AI Web Data Extraction" },
      {
        name: "description",
        content:
          "Multi-agent AI extraction, intelligent site analysis, automatic data cleaning, and Google Sheets or Excel delivery straight to your inbox.",
      },
      { property: "og:title", content: "Features — flowXtract" },
      {
        property: "og:description",
        content:
          "Everything flowXtract does: AI extraction, data cleaning, spreadsheet export and email delivery.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: FeaturesPage,
});

const FEATURES = [
  {
    icon: Radar,
    title: "AI-Powered Website Data Extraction",
    desc: "Describe the data you need in plain English. Our language models read the page like a person would and pull out exactly the fields you asked for — no selectors, scripts or setup.",
  },
  {
    icon: Network,
    title: "Multi-Agent Architecture",
    desc: "Specialised agents split the work: one plans the extraction, one navigates the page, one validates the results. Each step is checked before the next begins.",
  },
  {
    icon: ScanSearch,
    title: "Intelligent Website Analysis",
    desc: "flowXtract inspects the structure of a page first — lists, tables, cards or article feeds — and adapts its strategy to the layout it finds.",
  },
  {
    icon: Brush,
    title: "Automatic Data Cleaning",
    desc: "Duplicates removed, whitespace trimmed, prices and dates normalised, and empty rows dropped before anything reaches your spreadsheet.",
  },
  {
    icon: Sheet,
    title: "Google Sheets Export",
    desc: "Results arrive as a ready-to-share Google Sheet with clean headers and consistent columns, formatted for immediate analysis.",
  },
  {
    icon: FileSpreadsheet,
    title: "Excel Export",
    desc: "Prefer working offline? The same structured dataset is available as an Excel-compatible file that opens anywhere.",
  },
  {
    icon: MailPlus,
    title: "Email Delivery",
    desc: "There is no dashboard to monitor. Submit your request, close the tab, and the finished spreadsheet lands in your inbox.",
  },
  {
    icon: MonitorSmartphone,
    title: "Modern Responsive Interface",
    desc: "A clean, fast interface that works just as well on a phone as it does on a large desktop screen.",
  },
];

function FeaturesPage() {
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
              FEATURES
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Everything You Need to Turn Pages Into Data
            </h1>
            <p className="mt-5 text-slate-600 leading-relaxed">
              flowXtract combines multi-agent AI with practical delivery: describe
              what you want, and receive a clean, organized spreadsheet by email.
            </p>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="flex flex-col rounded-xl bg-white border border-slate-200 p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div
                    className="h-11 w-11 shrink-0 rounded-md flex items-center justify-center"
                    style={{ backgroundColor: `${BRAND}15`, color: BRAND }}
                  >
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 font-bold text-slate-900 leading-snug">{f.title}</h2>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 border-t border-slate-200 py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 md:p-12 text-center shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Ready to try it on your own page?
              </h2>
              <p className="mt-4 text-slate-600 max-w-xl mx-auto leading-relaxed">
                Paste a URL, describe the data, and we'll email the finished sheet.
              </p>
              <Link
                to="/extract"
                className="mt-8 inline-block rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
                style={{ backgroundColor: BRAND }}
              >
                Start Extraction
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
