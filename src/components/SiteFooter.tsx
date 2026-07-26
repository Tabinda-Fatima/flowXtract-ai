import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { ComingSoonModal } from "@/components/ComingSoonModal";

const BRAND = "#1e40af";

function LinkItem({ children, ...rest }: { children: ReactNode } & React.ComponentProps<"a">) {
  return (
    <a
      {...rest}
      className="text-slate-600 hover:text-slate-900 transition-colors"
      style={{ color: BRAND }}
    >
      {children}
    </a>
  );
}

export function SiteFooter({ onScrollFeatures }: { onScrollFeatures?: () => void }) {
  const [modal, setModal] = useState(false);

  const soon = (e: React.MouseEvent) => {
    e.preventDefault();
    setModal(true);
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <Logo imgClassName="h-9 w-auto" />
          <p className="mt-4 text-sm text-slate-600 max-w-xs leading-relaxed">
            Precision data extraction for the modern web. Turn any website into
            structured intelligence in minutes with AI.
          </p>
          <p className="mt-6 text-xs text-slate-500">
            © 2026 flowXtract. All rights reserved.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold tracking-wider text-slate-700">PRODUCT</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              {onScrollFeatures ? (
                <LinkItem
                  href="/features"
                  onClick={(e) => {
                    e.preventDefault();
                    onScrollFeatures();
                  }}
                >
                  Features
                </LinkItem>
              ) : (
                <Link to="/features" className="hover:opacity-70" style={{ color: BRAND }}>
                  Features
                </Link>
              )}
            </li>
            <li><LinkItem href="#" onClick={soon}>Pricing</LinkItem></li>
            <li><LinkItem href="#" onClick={soon}>API Access</LinkItem></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold tracking-wider text-slate-700">SUPPORT</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/documentation" className="hover:opacity-70" style={{ color: BRAND }}>
                Documentation
              </Link>
            </li>
            <li><LinkItem href="#" onClick={soon}>Help Center</LinkItem></li>
            <li>
              <Link to="/contact" className="hover:opacity-70" style={{ color: BRAND }}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <ComingSoonModal open={modal} onClose={() => setModal(false)} />
    </footer>
  );
}
