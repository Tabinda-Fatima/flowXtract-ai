import { useEffect } from "react";
import { X } from "lucide-react";

export const BRAND = "#1e40af";

export function ComingSoonModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="coming-soon-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-2xl p-8 text-center animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-md p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
        <h2 id="coming-soon-title" className="text-2xl font-bold text-slate-900">
          🚀 Coming Soon
        </h2>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          This feature is currently under development and will be available in a
          future update. Stay tuned!
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-7 w-full rounded-md px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
          style={{ backgroundColor: BRAND }}
        >
          Got it
        </button>
      </div>
    </div>
  );
}
