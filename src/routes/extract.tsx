import { createFileRoute, Link } from "@tanstack/react-router";
import { LogoIcon } from "@/components/LogoIcon";
import { Link as LinkIcon, Mail, Zap, Info, Lock, ShieldCheck, Database, Sparkles } from "lucide-react";

export const Route = createFileRoute("/extract")({
  head: () => ({
    meta: [
      { title: "Start Your Data Extraction — flowXtract" },
      {
        name: "description",
        content:
          "Enter a public website URL, describe what you need, and receive a clean Google Sheet by email.",
      },
      { property: "og:title", content: "Start Your Data Extraction — flowXtract" },
      {
        property: "og:description",
        content: "Submit a URL, describe the data, and we'll email your Google Sheet.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ExtractPage,
});

const BRAND = "#1e40af";

function Nav() {
  const link =
    "text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium";
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold"
          style={{ color: BRAND }}
        >
          <LogoIcon className="h-6 w-6" />
          flowXtract
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <a href="/#features" className={link}>Features</a>
          <a href="/#how" className={link}>How It Works</a>
          <a href="/#faq" className={link}>FAQ</a>
        </nav>
        <Link
          to="/extract"
          className="rounded-md px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition"
          style={{ backgroundColor: BRAND }}
        >
          Start Extraction
        </Link>
      </div>
    </header>
  );
}

function ExtractForm() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Start Your Data Extraction
          </h1>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto">
            Enter a public website URL, describe the information you need, and provide your email address.
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-10 rounded-2xl bg-white border border-slate-200 shadow-lg p-6 md:p-8 space-y-6"
        >
          <div>
            <label htmlFor="url" className="text-xs font-bold tracking-wider text-slate-700">
              WEBSITE URL
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-md border border-slate-200 px-3 focus-within:border-slate-400 bg-white">
              <LinkIcon className="h-4 w-4 text-slate-400" />
              <input
                id="url"
                type="url"
                placeholder="https://example.com"
                className="w-full bg-transparent py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="desc" className="text-xs font-bold tracking-wider text-slate-700">
              WHAT DATA DO YOU WANT TO EXTRACT?
            </label>
            <textarea
              id="desc"
              rows={4}
              placeholder="Example: Extract product names, prices, ratings and availability."
              className="mt-2 w-full resize-none rounded-md border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-400 bg-white"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-xs font-bold tracking-wider text-slate-700">
              EMAIL ADDRESS
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-md border border-slate-200 px-3 focus-within:border-slate-400 bg-white">
              <Mail className="h-4 w-4 text-slate-400" />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full bg-transparent py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold text-white hover:opacity-90 transition"
            style={{ backgroundColor: BRAND }}
          >
            Start AI Extraction <Zap className="h-4 w-4" />
          </button>

          <div className="border-t border-slate-200 pt-4 space-y-2">
            <p className="flex items-start gap-2 text-xs text-slate-600">
              <Info className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
              We'll send the completed Google Sheet to your email once processing is complete.
            </p>
            <p className="flex items-start gap-2 text-xs italic text-slate-500">
              <Lock className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
              Your email will only be used to deliver your extraction results.
            </p>
          </div>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4" /> Secure SSL
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Database className="h-4 w-4" /> Data Privacy
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" /> AI-Powered
          </span>
        </div>
      </div>
    </section>
  );
}

function DisabledLink({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-disabled="true"
      className="underline text-slate-500 pointer-events-auto select-none"
      style={{ cursor: "not-allowed" }}
    >
      {children}
    </span>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 font-bold" style={{ color: BRAND }}>
            <LogoIcon className="h-6 w-6" />
            flowXtract
          </div>
          <p className="mt-4 text-sm text-slate-600 max-w-xs leading-relaxed">
            Precision data extraction for the modern web.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold tracking-wider text-slate-700">PRODUCT</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="/#features" className="underline text-slate-700 hover:opacity-70">Features</a></li>
            <li><DisabledLink>Pricing</DisabledLink></li>
            <li><DisabledLink>API Docs</DisabledLink></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold tracking-wider text-slate-700">RESOURCES</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><DisabledLink>Blog</DisabledLink></li>
            <li><DisabledLink>Case Studies</DisabledLink></li>
            <li><DisabledLink>Support</DisabledLink></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold tracking-wider text-slate-700">LEGAL</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#" className="underline text-slate-700 hover:opacity-70">Privacy Policy</a></li>
            <li><a href="#" className="underline text-slate-700 hover:opacity-70">Terms of Service</a></li>
            <li><a href="#" className="underline text-slate-700 hover:opacity-70">Security</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-slate-500">
          © 2026 flowXtract. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function ExtractPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Nav />
      <main className="flex-1">
        <ExtractForm />
      </main>
      <Footer />
    </div>
  );
}
