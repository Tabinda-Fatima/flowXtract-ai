import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Linkedin, Github, Mail, Send, CheckCircle2 } from "lucide-react";

const BRAND = "#1e40af";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — flowXtract" },
      {
        name: "description",
        content:
          "Get in touch with the flowXtract team about extractions, feedback, partnerships or support.",
      },
      { property: "og:title", content: "Contact Us — flowXtract" },
      {
        property: "og:description",
        content: "Send the flowXtract team a message about extractions, feedback or support.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [sent, setSent] = useState(false);

  function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) e.name = "Please enter your name.";
    if (!email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = "Please enter a valid email address.";
    if (!message.trim()) e.message = "Please write a short message.";
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setSent(true);
  }

  const inputBase =
    "mt-2 w-full rounded-md border px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-400 bg-white transition-colors";

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <SiteNav />
      <main className="flex-1 bg-gradient-to-br from-blue-50 via-white to-slate-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Contact Us</h1>
            <p className="mt-4 text-slate-600 max-w-xl mx-auto leading-relaxed">
              Questions about an extraction, feedback on the product, or something
              else? Send us a message and we'll get back to you.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start">
            <div className="rounded-2xl bg-white border border-slate-200 shadow-lg p-6 md:p-8">
              {sent ? (
                <div className="text-center py-6">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
                    <CheckCircle2 className="h-8 w-8" style={{ color: BRAND }} />
                  </div>
                  <h2 className="mt-6 text-2xl font-bold text-slate-900">Message Ready to Send</h2>
                  <p className="mt-3 text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thanks, {name.trim()}. Message delivery isn't connected yet — in
                    the meantime you can reach us at the business email listed here.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setName("");
                      setEmail("");
                      setMessage("");
                      setErrors({});
                      setSent(false);
                    }}
                    className="mt-8 inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
                    style={{ backgroundColor: BRAND }}
                  >
                    Write Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-6">
                  <div>
                    <label htmlFor="name" className="text-xs font-bold tracking-wider text-slate-700">
                      NAME
                    </label>
                    <input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className={`${inputBase} ${errors.name ? "border-red-400" : "border-slate-200"}`}
                    />
                    {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="cemail" className="text-xs font-bold tracking-wider text-slate-700">
                      EMAIL
                    </label>
                    <input
                      id="cemail"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={`${inputBase} ${errors.email ? "border-red-400" : "border-slate-200"}`}
                    />
                    {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="cmsg" className="text-xs font-bold tracking-wider text-slate-700">
                      MESSAGE
                    </label>
                    <textarea
                      id="cmsg"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help?"
                      className={`${inputBase} resize-none ${errors.message ? "border-red-400" : "border-slate-200"}`}
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-red-600">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
                    style={{ backgroundColor: BRAND }}
                  >
                    Send <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 md:p-8">
              <h2 className="text-xs font-bold tracking-wider text-slate-700">ELSEWHERE</h2>
              <ul className="mt-5 space-y-4 text-sm">
                {[
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    value: "linkedin.com/in/tabinda-fatima-738451380",
                    href: "https://www.linkedin.com/in/tabinda-fatima-738451380",
                    external: true,
                  },
                  {
                    icon: Github,
                    label: "GitHub",
                    value: "github.com/Tabinda-Fatima",
                    href: "https://github.com/Tabinda-Fatima",
                    external: true,
                  },
                  {
                    icon: Mail,
                    label: "Business Email",
                    value: "tabindafatima5566@gmail.com",
                    href: "mailto:tabindafatima5566@gmail.com",
                    external: false,
                  },
                ].map((c) => (
                  <li key={c.label} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
                      style={{ backgroundColor: `${BRAND}15`, color: BRAND }}
                    >
                      <c.icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-slate-900">{c.label}</span>
                      <a
                        href={c.href}
                        {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="block break-words text-slate-600 hover:underline"
                      >
                        {c.value}
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
