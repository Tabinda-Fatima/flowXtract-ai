import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";

const BRAND = "#1e40af";

export function SiteNav() {
  const link =
    "text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium";
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="shrink-0" aria-label="flowXtract home">
          <Logo imgClassName="h-7 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <a href="/#features" className={link}>Features</a>
          <a href="/#how" className={link}>How It Works</a>
          <a href="/#faq" className={link}>FAQ</a>
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
