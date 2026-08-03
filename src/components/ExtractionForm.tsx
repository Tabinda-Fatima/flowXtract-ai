import { useState, type FormEvent } from "react";
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
} from "lucide-react";

const WEBHOOK_URL = "https://haseebtabi01.app.n8n.cloud/webhook/dataextract-ai";
const BRAND = "#1e40af";

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
  const [errors, setErrors] = useState<{ url?: string; description?: string; email?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const formatOptions = [
    { id: "google-sheets", label: "Google Sheets", ext: "" },
    { id: "excel", label: "Excel", ext: ".xlsx" },
    { id: "csv", label: "CSV", ext: ".csv" },
    { id: "json", label: "JSON", ext: ".json" },
  ];

  function toggleFormat(id: string) {
    setOutputFormats((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  function validate() {
    const e: { url?: string; description?: string; email?: string } = {};
    if (!url.trim()) e.url = "Website URL is required.";
    else if (!/^https?:\/\//i.test(url.trim())) e.url = "URL must start with http:// or https://.";
    if (!description.trim()) e.description = "Please describe the data you want to extract.";
    if (!email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Please enter a valid email address.";
    return e;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (submitting) return;
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ url: url.trim(), description: description.trim(), email: email.trim() }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmittedEmail(email.trim());
    } catch {
      setSubmitError("Unable to submit your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setUrl("");
    setDescription("");
    setEmail("");
    setErrors({});
    setSubmitError(null);
    setSubmittedEmail(null);
  }

  const cardClass = bare
    ? "p-6 space-y-6"
    : "mt-10 rounded-2xl bg-white border border-slate-200 shadow-lg p-6 md:p-8 space-y-6";
  const successClass = bare
    ? "p-6 text-center"
    : "rounded-2xl bg-white border border-slate-200 shadow-lg p-8 md:p-10 text-center";

  if (submittedEmail) {
    return (
      <>
        <div className={successClass}>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
            <CheckCircle2 className="h-8 w-8" style={{ color: BRAND }} />
          </div>
          <h2 className="mt-6 text-2xl md:text-3xl font-bold text-slate-900">
            Extraction Request Submitted
          </h2>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto">
            Your request has been received. We'll send the completed Google Sheet to your email once processing is complete.
          </p>
          <p className="mt-4 text-sm text-slate-700">
            Confirmation will be sent to <span className="font-semibold">{submittedEmail}</span>
          </p>
          <button
            type="button"
            onClick={resetForm}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
            style={{ backgroundColor: BRAND }}
          >
            Submit Another Request
          </button>
        </div>
        {showTrust && <TrustLabels />}
      </>
    );
  }

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

        <div>
          <label className="text-xs font-bold tracking-wider text-slate-700">
            OUTPUT FORMAT
          </label>
          <p className="mt-1 text-xs text-slate-500">Choose one or more formats.</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {formatOptions.map((option) => {
              const checked = outputFormats.includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggleFormat(option.id)}
                  className={`flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-sm transition ${
                    checked
                      ? "border-blue-200 bg-blue-50 text-slate-900"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border ${
                      checked ? "border-blue-700 bg-blue-700" : "border-slate-300 bg-white"
                    }`}
                  >
                    {checked && (
                      <svg
                        className="h-3 w-3 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  <span className="font-medium">{option.label}</span>
                  {option.ext && (
                    <span className="text-xs text-slate-400 font-normal">{option.ext}</span>
                  )}
                </button>
              );
            })}
          </div>
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
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold text-white hover:opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ backgroundColor: BRAND }}
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting Request...
            </>
          ) : (
            <>
              Start AI Extraction <Zap className="h-4 w-4" />
            </>
          )}
        </button>

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
