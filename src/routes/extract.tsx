import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ExtractionForm } from "@/components/ExtractionForm";

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

function ExtractPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-50">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 md:py-20">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Start Your Data Extraction
              </h1>
              <p className="mt-3 text-slate-600 max-w-xl mx-auto">
                Enter a public website URL, describe the information you need, and provide your email address.
              </p>
            </div>
            <ExtractionForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
