import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { SiteFooter } from "@/components/SiteFooter";
import { ExtractionForm } from "@/components/ExtractionForm";
import { useState } from "react";
import {
  User,
  FlaskConical,
  Newspaper,
  Radar,
  Brush,
  LayoutGrid,
  MailPlus,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "flowXtract — Turn Website Data Into an Organized Google Sheet" },
      {
        name: "description",
        content:
          "Paste a public website URL, describe what you need, and flowXtract delivers a clean Google Sheet to your inbox. AI-powered web data extraction.",
      },
      { property: "og:title", content: "flowXtract — AI-Powered Web Data Extraction" },
      {
        property: "og:description",
        content:
          "Turn any website into structured intelligence in minutes with AI.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Landing,
});

const BRAND = "#1e40af";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Nav() {
  const link =
    "text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium";
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <button
          onClick={() => scrollTo("top")}
          className="text-[color:var(--brand)]"
          style={{ ["--brand" as never]: BRAND }}
        >
          <Logo imgClassName="h-7 w-auto" />
        </button>
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo("features")} className={link}>Features</button>
          <button onClick={() => scrollTo("how")} className={link}>How It Works</button>
          <button onClick={() => scrollTo("faq")} className={link}>FAQ</button>
        </nav>
        <Link
          to="/extract"
          className="shrink-0 rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
          style={{ backgroundColor: BRAND }}
        >
          Start Extraction
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="bg-slate-50 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-20 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div>
          <span
            className="inline-block rounded-full px-3 py-1 text-[11px] font-semibold tracking-wider"
            style={{ backgroundColor: `${BRAND}15`, color: BRAND }}
          >
            AI-POWERED WEB DATA EXTRACTION
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
            Turn Website Data Into an{" "}
            <span style={{ color: BRAND }}>Organized Google Sheet</span>
          </h1>
          <p className="mt-6 text-slate-600 leading-relaxed max-w-lg">
            Paste a public website URL, describe the information you need, and
            flowXtract will extract, clean and organize the results before
            sending the completed Google Sheet directly to your email.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              to="/extract"
              className="rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
              style={{ backgroundColor: BRAND }}
            >
              Start Extraction
            </Link>
            <button
              onClick={() => scrollTo("how")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:opacity-70"
            >
              See How It Works <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-6 text-xs text-slate-500 flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full border border-slate-400" />
            No coding or technical setup required.
          </p>
        </div>

        {/* Extraction form */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 bg-slate-50">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-3 text-xs text-slate-500 font-medium">
              New Extraction Task
            </span>
          </div>
          <ExtractionForm bare showTrust={false} />
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{children}</h2>
      <div className="mx-auto mt-3 h-1 w-12 rounded-full" style={{ backgroundColor: BRAND }} />
    </div>
  );
}

function Audience() {
  const items = [
    {
      icon: User,
      title: "Freelancers",
      desc: "Gather leads, portfolio samples, or market pricing without wasting hours on manual copy-pasting.",
    },
    {
      icon: FlaskConical,
      title: "Researchers",
      desc: "Collect academic data, news archives, or competitive landscape analysis for your next big project.",
    },
    {
      icon: Newspaper,
      title: "Businesses",
      desc: "Automate competitor monitoring, inventory tracking, and sales prospecting at scale.",
    },
  ];
  return (
    <section className="bg-slate-50 py-20 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle>Who is flowXtract for?</SectionTitle>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.title} className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm transition-shadow hover:shadow-md">
              <div
                className="h-10 w-10 rounded-md flex items-center justify-center"
                style={{ backgroundColor: `${BRAND}15`, color: BRAND }}
              >
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-bold text-slate-900">{it.title}</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: Radar, title: "AI-Powered Extraction", desc: "Our LLMs understand complex site structures automatically." },
    { icon: Brush, title: "Automatic Data Cleaning", desc: "Duplicate removal and formatting fixed before delivery." },
    { icon: LayoutGrid, title: "Organized Google Sheets", desc: "Formatted perfectly for immediate analysis and reporting." },
    { icon: MailPlus, title: "Email Delivery", desc: "No dashboard to check. We send the results directly to you." },
  ];
  return (
    <section id="features" className="bg-white py-20 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            From Website URL to Clean Spreadsheet
          </h2>
          <p className="mt-3 text-slate-600">
            Our powerful engine handles the complexity of the web so you don't have to.
          </p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it) => (
            <div key={it.title} className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm text-center transition-shadow hover:shadow-md">
              <div
                className="mx-auto h-12 w-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${BRAND}15`, color: BRAND }}
              >
                <it.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-bold text-slate-900">{it.title}</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: 1, title: "Submit Your Request", desc: "Provide the URL and tell our AI exactly what labels and data points you need to collect." },
    { n: 2, title: "flowXtract Processes", desc: "Our engine crawls the site, extracts matching data, and organizes it into columns." },
    { n: 3, title: "Receive Your Google Sheet", desc: "Within minutes, check your inbox for a link to your perfectly formatted Google Sheet." },
  ];
  return (
    <section id="how" className="py-16" style={{ backgroundColor: BRAND }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 text-white">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Simple From Start to Finish</h2>
          <p className="mt-3 text-white/80">Three easy steps to your structured data.</p>
        </div>
        <div className="relative mt-14 grid md:grid-cols-3 gap-10">
          <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px bg-white/30" />
          {steps.map((s) => (
            <div key={s.n} className="relative text-center">
              <div
                className="mx-auto h-16 w-16 rounded-full bg-white flex items-center justify-center text-xl font-bold shadow"
                style={{ color: BRAND }}
              >
                {s.n}
              </div>
              <h3 className="mt-6 font-bold">{s.title}</h3>
              <p className="mt-3 text-sm text-white/80 leading-relaxed max-w-xs mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 md:p-12 text-center shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Spend Less Time Copying Data Manually
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
            Join thousands of professionals who use flowXtract to automate their web data gathering workflows.
          </p>
          <Link
            to="/extract"
            className="mt-8 inline-block rounded-md px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            style={{ backgroundColor: BRAND }}
          >
            Start Extraction
          </Link>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Can it extract from any website?", a: "flowXtract works with most public websites. Sites requiring login or with heavy anti-bot protection may not be supported." },
    { q: "How long does an extraction take?", a: "Most extractions complete within a few minutes. Larger sites can take longer, and we'll email you the moment it's ready." },
    { q: "Do I need to know CSS or HTML?", a: "No. Just describe the data you need in plain English and our AI figures out the structure for you." },
    { q: "Is my data secure?", a: "Yes. Extractions are processed securely and delivered privately to your email as a Google Sheet link." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center">
          Frequently Asked Questions
        </h2>
        <div className="mt-10 space-y-4">
          {faqs.map((f, i) => (
            <div key={f.q} className="rounded-lg border border-slate-200 bg-white shadow-sm">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-semibold text-slate-900">{f.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-500 transition-transform ${open === i ? "rotate-180" : ""}`}
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
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Nav />
      <main>
        <Hero />
        <Audience />
        <Features />
        <HowItWorks />
        <FinalCTA />
        <FAQ />
      </main>
      <SiteFooter onScrollFeatures={() => scrollTo("features")} />
    </div>
  );
}
