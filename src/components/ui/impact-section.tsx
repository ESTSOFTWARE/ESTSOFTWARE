"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ImpactCard {
  id: number;
  metric: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  bg: string;
  text: string;
  isFeature?: boolean;
}

const defaultCards: ImpactCard[] = [
  {
    id: 0,
    metric: "01",
    title: "Desarrollo Web",
    description:
      "Sitios y plataformas rápidas, accesibles y listas para posicionar. Del landing page al panel administrativo completo.",
    image:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Pantalla mostrando código fuente a color",
    href: "#contacto",
    bg: "bg-brand",
    text: "text-white",
    isFeature: true,
  },
  {
    id: 1,
    metric: "02",
    title: "Apps Móviles",
    description:
      "Aplicaciones nativas y multiplataforma para iOS y Android, con una sola base de código y publicación en tiendas incluida.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Persona trabajando en una computadora portátil",
    href: "#contacto",
    bg: "bg-white",
    text: "text-neutral-900",
  },
  {
    id: 2,
    metric: "03",
    title: "Software a la Medida",
    description:
      "Sistemas internos que se ajustan a cómo trabaja tu empresa, no al revés. Inventarios, CRM, facturación y más.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Equipo de desarrollo revisando código en conjunto",
    href: "#contacto",
    bg: "bg-neutral-900",
    text: "text-white",
  },
  {
    id: 3,
    metric: "04",
    title: "Tiendas en Línea",
    description:
      "E-commerce con pasarelas de pago, control de inventario y métricas de venta. Optimizado para convertir en móvil.",
    image:
      "https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Panel de métricas de ventas en una pantalla",
    href: "#contacto",
    bg: "bg-neutral-200",
    text: "text-neutral-900",
  },
  {
    id: 4,
    metric: "05",
    title: "APIs e Integraciones",
    description:
      "Conectamos tus sistemas entre sí y con servicios de terceros. APIs documentadas, versionadas y seguras.",
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Desarrolladora escribiendo código frente a dos monitores",
    href: "#contacto",
    bg: "bg-brand-dark",
    text: "text-white",
  },
  {
    id: 5,
    metric: "06",
    title: "Soporte y Mantenimiento",
    description:
      "No desaparecemos al entregar. Monitoreo, actualizaciones de seguridad y mejoras continuas sobre lo que ya tienes.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Reunión de equipo revisando avances de un proyecto",
    href: "#contacto",
    bg: "bg-white",
    text: "text-neutral-900",
  },
];

interface ImpactSectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  footnote?: string;
  cards?: ImpactCard[];
  className?: string;
}

export default function ImpactSection({
  id = "servicios",
  eyebrow = "Servicios",
  title = "Todo lo que tu producto digital necesita",
  description = "Cubrimos el ciclo completo: descubrimiento, diseño, desarrollo y operación. Puedes contratar una pieza suelta o el proceso entero.",
  footnote = "¿No sabes por dónde empezar? Agenda una llamada de 15 minutos y lo definimos juntos.",
  cards = defaultCards,
  className,
}: ImpactSectionProps) {
  const [openCard, setOpenCard] = useState(0);

  const step = (direction: -1 | 1) =>
    setOpenCard((current) => (current + direction + cards.length) % cards.length);

  return (
    <section
      id={id}
      className={cn("w-full bg-muted py-24 md:py-32", className)}
    >
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="flex items-start justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-[620px]">
            <p className="text-sm font-semibold tracking-wide text-brand">{eyebrow}</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-foreground text-balance md:text-[2.4rem]">
              {title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground max-w-[560px] text-pretty md:text-lg">
              {description}
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Servicio anterior"
              className="w-9 h-9 rounded-full border border-border bg-background text-foreground flex items-center justify-center transition-colors hover:bg-secondary"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Servicio siguiente"
              className="w-9 h-9 rounded-full border border-border bg-background text-foreground flex items-center justify-center transition-colors hover:bg-secondary"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-0">
          {cards.map((card, idx) => {
            const isOpen = openCard === idx;
            const targetHeight = isOpen ? 520 : 280 + idx * 30;

            return (
              <motion.div
                key={card.id}
                onMouseEnter={() => setOpenCard(idx)}
                onFocus={() => setOpenCard(idx)}
                onClick={() => setOpenCard(idx)}
                tabIndex={0}
                animate={{ flex: isOpen ? 4.8 : 1.5 }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                className={cn(
                  card.bg,
                  card.text,
                  "relative overflow-hidden border border-black/5 h-[360px] md:h-auto cursor-pointer",
                  "focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-current"
                )}
              >
                <motion.div
                  animate={{ height: targetHeight }}
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  className="h-full"
                >
                  {isOpen ? (
                    <div className="h-full p-6 sm:p-8 md:p-10 flex flex-col">
                      <div className="max-w-[300px]">
                        <p className="text-[10px] tracking-[1.3px] uppercase font-semibold opacity-80">
                          Servicio
                        </p>
                        <h3 className="mt-2 text-[22px] sm:text-[26px] md:text-[30px] leading-[1.08] font-semibold">
                          {card.title}
                        </h3>
                        <p className="mt-3 text-[13px] sm:text-[14px] leading-[1.6] opacity-90">
                          {card.description}
                        </p>
                        <a
                          href={card.href}
                          className="mt-4 inline-flex items-center gap-2 text-[11px] tracking-[1.4px] uppercase font-semibold hover:underline"
                        >
                          Solicitar cotización <ArrowRight size={14} aria-hidden="true" />
                        </a>
                      </div>

                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-[1.05fr_1fr] gap-4 flex-1 items-start">
                        <div className="self-start sm:self-end">
                          <p className="text-[56px] sm:text-[62px] md:text-[72px] font-semibold leading-none">
                            {card.metric}
                          </p>
                          <p className="mt-2 text-[11px] tracking-[1.2px] uppercase font-semibold">
                            {card.title}
                          </p>
                        </div>

                        <div
                          className={cn(
                            "relative w-full rounded-sm overflow-hidden border border-black/10",
                            card.isFeature
                              ? "h-[180px] sm:h-[200px] md:h-[220px]"
                              : "h-[160px] sm:h-[180px] md:h-[200px]"
                          )}
                        >
                          <img
                            src={card.image}
                            alt={card.imageAlt}
                            loading="lazy"
                            className="absolute inset-0 size-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full p-5 sm:p-6 md:p-7 flex flex-col justify-between">
                      <div />
                      <div>
                        <p className="text-[28px] sm:text-[32px] md:text-[36px] font-semibold leading-none">
                          {card.metric}
                        </p>
                        <p className="mt-2 text-[11px] tracking-[1.2px] uppercase font-semibold max-w-[120px]">
                          {card.title}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 bg-foreground text-background rounded-full px-5 sm:px-8 py-4 flex items-center justify-center text-center">
          <p className="text-[13px] sm:text-[14px] leading-[1.4]">{footnote}</p>
        </div>
      </div>
    </section>
  );
}
