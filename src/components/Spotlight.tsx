import { cn } from "@/lib/utils";

interface SpotlightProps {
  className?: string;
}

/**
 * Halo radial decorativo, centrado en la parte superior de su contenedor.
 * El contenedor padre debe ser `relative`.
 */
export default function Spotlight({ className }: SpotlightProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-0 h-[38rem] overflow-hidden",
        className
      )}
    >
      {/* Halo amplio */}
      <div className="absolute left-1/2 top-[-18rem] h-[34rem] w-[68rem] max-w-[150vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(184,11,11,0.18),rgba(184,11,11,0.05)_45%,transparent_70%)] blur-3xl" />

      {/* Núcleo más intenso */}
      <div className="absolute left-1/2 top-[-12rem] h-[22rem] w-[36rem] max-w-[110vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(184,11,11,0.26),transparent_65%)] blur-2xl" />
    </div>
  );
}
