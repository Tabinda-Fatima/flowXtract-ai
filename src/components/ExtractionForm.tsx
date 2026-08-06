import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Link as LinkIcon,
  Mail,
  Zap,
  Info,
  Lock,
  ShieldCheck,
  Database,
  Sparkles,
  Loader2,
  CheckCircle2,
  ChevronDown,
  Check,
  X,
} from "lucide-react";

const WEBHOOK_URL = "https://haseebtabi01.app.n8n.cloud/webhook/dataextract-ai";
const BRAND = "#1e40af";

const FORMATS = [
  { value: "gsheet", label: "Google Sheets", desc: "Shareable cloud spreadsheet" },
  { value: "xlsx", label: "Excel (.xlsx)", desc: "Editable workbook" },
  { value: "csv", label: "CSV", desc: "Lightweight tabular file" },
  { value: "json", label: "JSON", desc: "Structured developer-ready data" },
];

const STEPS = [
  "Processing...",
  "Website Analyzer Agent working...",
  "Scraper Agent extracting data...",
  "Data Cleaner Agent organizing results...",
  "Data Store Agent preparing selected format(s)...",
  "Sending results to your email...",
];

const STEP_MS = 20000; // 6 steps => ~2 minutes

function shortLabel(value: string) {
  const f = FORMATS.find((x) => x.value === value);
  if (!f) return value;
  return f.label.replace(" (.xlsx)", "");
}

export function ExtractionForm({
  bare = false,
  showTrust = true,
}: {
  bare?: boolean;
  showTrust?: boolean;
}) {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [outputFormats, setOutputFormats] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [upgradeNotice, setUpgradeNotice] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    url?: string;
    description?: string;
    email?: string;
    formats?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [stepsDone, setStepsDone] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    function onClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [dropdownOpen]);

  useEffect(() => {
    if (!showProgress) return;
    setActiveStep(0);
    setStepsDone(false);
    const timers = STEPS.map((_, i) =>
      window.setTimeout(() => setActiveStep(i), i * STEP_MS)
    );
    timers.push(
      window.setTimeout(() => setStepsDone(true), STEPS.length * STEP_MS)
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [showProgress]);

  function selectFormat(value: string) {
    // Single format is free. Selecting a second one requires payment (not connected yet).
    if (outputFormats.includes(value)) return;
    if (outputFormats.length >= 1) {
      setUpgradeNotice(null);
      setUpgradeOpen(true);
      return;
    }
    setOutputFormats([value]);
  }

  function deselectFormat(value: string) {
    setOutputFormats((prev) => prev.filter((f) => f !== value));
  }


  function confirmUpgrade() {
    setUpgradeNotice("Payment integration is coming soon.");
  }

  function closeUpgrade() {
    setUpgradeNotice(null);
    setUpgradeOpen(false);
  }

  function validate() {
    const e: { url?: string; description?: string; email?: string; formats?: string } = {};
    if (!url.trim()) e.url = "Website URL is required.";
    else if (!/^https?:\/\//i.test(url.trim())) e.url = "URL must start with http:// or https://.";
    if (!description.trim()) e.description = "Please describe the data you want to extract.";
    if (outputFormats.length === 0) e.formats = "Select at least one output format.";
    if (!email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = "Please enter a valid email address.";
    return e;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (submitting) return;
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setSubmitError(null);
    setSucceeded(false);
    setSubmitting(true);
    setShowProgress(true);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          url: url.trim(),
          description: description.trim(),
          email: email.trim(),
          outputFormats,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSucceeded(true);
    } catch {
      setSubmitError("Unable to submit your request. Please try again.");
      setShowProgress(false);
    } finally {
      setSubmitting(false);
    }
  }

  const cardClass = bare
    ? "p-6 space-y-6"
    : "mt-10 rounded-2xl bg-white border border-slate-200 shadow-lg p-6 md:p-8 space-y-6";

  const summary =
    outputFormats.length === 0
      ? "Select output format"
      : outputFormats.map(shortLabel).join(" + ");

  return (
    <>
      <form onSubmit={onSubmit} noValidate className={cardClass}>
        <div>
          <label htmlFor="url" className="text-xs font-bold tracking-wider text-slate-700">
            WEBSITE URL
          </label>
          <div className={`mt-2 flex items-center gap-2 rounded-md border px-3 focus-within:border-slate-400 bg-white ${errors.url ? "border-red-400" : "border-slate-200"}`}>
            <LinkIcon className="h-4 w-4 text-slate-400" />
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Example: https://example.com/products"
              className="w-full bg-transparent py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none"
            />
          </div>
          <p className="mt-1.5 flex items-start gap-1.5 text-xs text-slate-500">
            <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            Paste the page that contains the actual listings, products, jobs, properties, or articles you want to extract. A homepage may not contain the required data.
          </p>
          {errors.url && <p className="mt-1.5 text-xs text-red-600">{errors.url}</p>}
        </div>

        <div>
          <label htmlFor="desc" className="text-xs font-bold tracking-wider text-slate-700">
            WHAT DATA DO YOU WANT TO EXTRACT?
          </label>
          <textarea
            id="desc"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Example: Extract product names, prices, ratings and availability."
            className={`mt-2 w-full resize-none rounded-md border px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-400 bg-white ${errors.description ? "border-red-400" : "border-slate-200"}`}
          />
          {errors.description && <p className="mt-1.5 text-xs text-red-600">{errors.description}</p>}
        </div>

        <div ref={dropdownRef} className="relative">
          <label className="text-xs font-bold tracking-wider text-slate-700">OUTPUT FORMAT</label>
          <p className="mt-1 text-xs text-slate-500">Choose one or more formats.</p>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            onClick={() => setDropdownOpen((o) => !o)}
            className={`mt-2 flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2.5 text-sm bg-white transition hover:border-slate-300 ${
              errors.formats ? "border-red-400" : "border-slate-200"
            }`}
          >
            <span className={outputFormats.length ? "text-slate-900 font-medium" : "text-slate-400"}>
              {summary}
            </span>
            <ChevronDown
              className={`h-4 w-4 text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>
          {dropdownOpen && (
            <div
              role="listbox"
              aria-multiselectable
              className="absolute z-30 mt-2 w-full overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg"
            >
              {FORMATS.map((f) => {
                const selected = outputFormats.includes(f.value);
                return (
                  <button
                    key={f.value}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => toggleFormat(f.value)}
                    className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left transition hover:bg-slate-50"
                  >
                    <span>
                      <span className="block text-sm font-medium text-slate-900">{f.label}</span>
                      <span className="block text-xs text-slate-500">{f.desc}</span>
                    </span>
                    {selected && <Check className="h-4 w-4 shrink-0" style={{ color: BRAND }} />}
                  </button>
                );
              })}
            </div>
          )}
          {errors.formats && <p className="mt-1.5 text-xs text-red-600">{errors.formats}</p>}
        </div>

        <div>
          <label htmlFor="email" className="text-xs font-bold tracking-wider text-slate-700">
            EMAIL ADDRESS
          </label>
          <div className={`mt-2 flex items-center gap-2 rounded-md border px-3 focus-within:border-slate-400 bg-white ${errors.email ? "border-red-400" : "border-slate-200"}`}>
            <Mail className="h-4 w-4 text-slate-400" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-transparent py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none"
            />
          </div>
          {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
        </div>

        {submitError && (
          <p className="text-sm text-red-600 text-center" role="alert">{submitError}</p>
        )}

        <button
          type="submit"
          disabled={submitting || showProgress}
          className="w-full inline-flex items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold text-white hover:opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ backgroundColor: BRAND }}
        >
          {submitting ? (
            <>
              Submitting Request... <Loader2 className="h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              Start AI Extraction <Zap className="h-4 w-4" />
            </>
          )}
        </button>

        {showProgress && (
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3 animate-in fade-in duration-300">
            <p className="text-xs font-bold tracking-wider text-slate-700">
              PROCESSING YOUR EXTRACTION
            </p>
            <ol className="space-y-2">
              {STEPS.map((step, i) => {
                const done = i < activeStep;
                const active = i === activeStep;
                return (
                  <li
                    key={step}
                    className={`flex items-center gap-3 rounded-md border px-3 py-2 text-sm transition-all duration-300 ${
                      active
                        ? "border-blue-200 bg-blue-50 text-slate-900"
                        : done
                          ? "border-slate-200 bg-white text-slate-700"
                          : "border-slate-200 bg-white text-slate-400"
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: BRAND }} />
                    ) : active ? (
                      <Loader2 className="h-4 w-4 shrink-0 animate-spin" style={{ color: BRAND }} />
                    ) : (
                      <span className="h-4 w-4 shrink-0 rounded-full border border-slate-300" />
                    )}
                    <span className="font-medium">{step}</span>
                  </li>
                );
              })}
            </ol>
            {succeeded && (
              <div className="flex items-start gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-2.5 text-sm text-slate-800 animate-in fade-in duration-300">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: BRAND }} />
                <span>
                  Your request has been submitted successfully. Your selected output format(s) will
                  be delivered to your email shortly.
                </span>
              </div>
            )}
          </div>
        )}

        <div className="border-t border-slate-200 pt-4 space-y-2">
          <p className="flex items-start gap-2 text-xs text-slate-600">
            <Info className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
            We'll send your selected output formats to your email once processing is complete.
          </p>
          <p className="flex items-start gap-2 text-xs italic text-slate-500">
            <Lock className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
            Your email will only be used to deliver your extraction results.
          </p>
        </div>
      </form>
      {showTrust && <TrustLabels />}

      {upgradeOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 md:p-8 shadow-xl animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={closeUpgrade}
              aria-label="Close"
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-bold text-slate-900">Export in multiple formats</h3>
            <p className="mt-2 text-sm text-slate-600">
              Receive multiple output formats together in one email.
            </p>
            {upgradeNotice && (
              <p className="mt-4 rounded-md border border-blue-200 bg-blue-50 px-3 py-2.5 text-sm font-medium text-slate-800">
                {upgradeNotice}
              </p>
            )}
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={confirmUpgrade}
                className="w-full rounded-md py-3 text-sm font-semibold text-white hover:opacity-90 transition"
                style={{ backgroundColor: BRAND }}
              >
                Unlock Multiple Formats
              </button>
              <button
                type="button"
                onClick={closeUpgrade}
                className="w-full rounded-md border border-slate-200 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300 transition"
              >
                Continue with One Format
              </button>
            </div>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500">
              <Lock className="h-3.5 w-3.5" /> Secure payment. Your details are never stored.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function TrustLabels() {
  return (
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
  );
}
