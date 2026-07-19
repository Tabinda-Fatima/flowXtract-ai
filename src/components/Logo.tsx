import type { CSSProperties } from "react";

export function Logo({
  className,
  iconClassName,
  style,
}: {
  className?: string;
  iconClassName?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`flex items-center gap-1.5 ${className || ""}`} style={style}>
      <svg
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={iconClassName || "h-5 w-5"}
        aria-hidden="true"
      >
        <circle cx="5" cy="10" r="2" fill="currentColor" />
        <circle cx="14" cy="6" r="2" fill="currentColor" />
        <circle cx="14" cy="14" r="2" fill="currentColor" />
        <path
          d="M7 10l5.5-3M7 10l5.5 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-bold tracking-tight">flowXtract</span>
    </div>
  );
}
