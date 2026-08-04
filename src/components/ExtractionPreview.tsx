import { Link as LinkIcon, Mail, Zap, ChevronDown } from "lucide-react";

const BRAND = "#1e40af";

/** Static, non-interactive mockup of the extraction form shown in the landing hero. */
export function ExtractionPreview() {
  return (
    <div aria-hidden className="p-6 space-y-5 select-none">
      <div>
        <span className="text-xs font-bold tracking-wider text-slate-700">WEBSITE URL</span>
        <div className="mt-2 flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2.5 bg-white">
          <LinkIcon className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-400">Example: https://example.com/products</span>
        </div>
      </div>

      <div>
        <span className="text-xs font-bold tracking-wider text-slate-700">
          WHAT DATA DO YOU WANT TO EXTRACT?
        </span>
        <div className="mt-2 rounded-md border border-slate-200 px-3 py-2.5 bg-white h-24">
          <span className="text-sm text-slate-400">
            Example: Extract product names, prices, ratings and availability.
          </span>
        </div>
      </div>

      <div>
        <span className="text-xs font-bold tracking-wider text-slate-700">OUTPUT FORMAT</span>
        <div className="mt-2 flex items-center justify-between rounded-md border border-slate-200 px-3 py-2.5 bg-white">
          <span className="text-sm text-slate-900">Google Sheets</span>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </div>
      </div>

      <div>
        <span className="text-xs font-bold tracking-wider text-slate-700">EMAIL ADDRESS</span>
        <div className="mt-2 flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2.5 bg-white">
          <Mail className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-400">you@example.com</span>
        </div>
      </div>

      <div
        className="w-full inline-flex items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold text-white"
        style={{ backgroundColor: BRAND }}
      >
        Start AI Extraction <Zap className="h-4 w-4" />
      </div>
    </div>
  );
}
