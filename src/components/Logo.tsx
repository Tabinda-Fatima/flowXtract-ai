import type { CSSProperties } from "react";
import logoAsset from "@/assets/flowxtract-logo.png.asset.json";

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
        src={logoAsset.url}
        alt="flowXtract"
        className={imgClassName || "h-7 w-auto"}
        draggable={false}
      />
    </div>
  );
}
