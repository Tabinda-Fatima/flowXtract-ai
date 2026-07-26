import type { CSSProperties } from "react";
import logoUrl from "@/assets/flowxtract-logo.png";

export function Logo({
  className,
  imgClassName,
  style,
}: {
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
  // Accepted for backwards compatibility; no longer used.
  iconClassName?: string;
}) {
  return (
    <div className={`flex items-center ${className || ""}`} style={style}>
      <img
        src={logoUrl}
        alt="flowXtract"
        width={326}
        height={86}
        className={imgClassName || "h-7 w-auto"}
        draggable={false}
      />
    </div>
  );
}
