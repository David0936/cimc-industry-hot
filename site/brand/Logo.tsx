// 站点的字标和圆环标记。Wordmark 使用公司提供的正式 Logo，不重绘、不改色。
import { SITE } from "../site.ts";

export function Wordmark({ size = 24, className = "", title = SITE.name }: { size?: number; className?: string; title?: string }) {
  const compact = size < 20;
  return (
    <span className={`inline-flex min-w-0 items-center gap-[0.55em] ${className}`} style={{ fontSize: Math.round(size * 0.88) }} aria-label={title} role="img">
      <span className="relative shrink-0 overflow-hidden rounded-[3px] bg-white ring-1 ring-black/5" style={{ width: compact ? size * 2.2 : size * 2.55, height: compact ? size : size * 1.14 }} aria-hidden="true">
        <img src="/cimc-enric-logo.jpg" alt="" className="absolute inset-0 size-full object-contain" draggable={false} />
      </span>
      <span aria-hidden="true" className={`${compact ? "hidden sm:inline" : "inline"} min-w-0 whitespace-nowrap font-bold leading-none tracking-[-0.035em] text-ink`}>
        {SITE.name}
      </span>
    </span>
  );
}

/** A ring with a dot; spinning, it is the loader. */
export function RingMark({ className = "", spinning = false }: { className?: string; spinning?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g style={spinning ? { transformOrigin: "12px 12px", animation: "spin-slow 1.1s linear infinite" } : undefined}>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="42 15" />
      </g>
      <circle cx="12" cy="12" r="2.6" fill="currentColor" />
    </svg>
  );
}
