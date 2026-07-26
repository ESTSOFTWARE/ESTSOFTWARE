"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ContactChannel {
  icon: "mail" | "whatsapp" | "location";
  label: string;
  value: string;
  href?: string;
}

interface ContactSectionProps {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  heroImageSrc?: string;
  heroImageAlt?: string;
  channels?: ContactChannel[];
  /** Correo destino del fallback `mailto:` cuando no se pasa `onSubmit`. */
  mailto?: string;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
}

const services = [
  "Desarrollo Web",
  "App Móvil",
  "Software a la Medida",
  "Tienda en Línea",
  "APIs e Integraciones",
  "Soporte y Mantenimiento",
  "Aún no lo tengo claro",
];

const defaultChannels: ContactChannel[] = [
  {
    icon: "mail",
    label: "Correo",
    value: "contacto@estsoftware.com",
    href: "mailto:contacto@estsoftware.com",
  },
  {
    icon: "whatsapp",
    label: "WhatsApp",
    value: "+52 961 303 7813",
    href: "https://wa.me/529613037813",
  },
  {
    icon: "location",
    label: "Ubicación",
    value: "Tuxtla Gutiérrez, Chiapas",
  },
];

const CHANNEL_ICONS = {
  mail: Mail,
  whatsapp: MessageCircle,
  location: MapPin,
};

const GlassInputWrapper = ({ children }: { children: ReactNode }) => (
  <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-brand/70 focus-within:bg-brand/5">
    {children}
  </div>
);

const ChannelCard = ({ channel }: { channel: ContactChannel }) => {
  const Icon = CHANNEL_ICONS[channel.icon];

  const content = (
    <>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="text-sm leading-snug">
        <span className="block text-white/70">{channel.label}</span>
        <span className="block font-medium text-white">{channel.value}</span>
      </span>
    </>
  );

  const base =
    "flex items-center gap-3 rounded-3xl border border-white/15 bg-black/35 p-4 backdrop-blur-xl";

  return channel.href ? (
    <a
      href={channel.href}
      target={channel.href.startsWith("http") ? "_blank" : undefined}
      rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn(base, "transition-colors hover:bg-black/50")}
    >
      {content}
    </a>
  ) : (
    <div className={base}>{content}</div>
  );
};

export default function ContactSection({
  id = "contacto",
  eyebrow = "Contacto",
  title = "Cuéntanos qué quieres construir",
  description = "Escríbenos con lo que tienes en mente. Te respondemos en menos de 24 horas hábiles con los siguientes pasos y un estimado.",
  heroImageSrc = "https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80",
  heroImageAlt = "",
  channels = defaultChannels,
  mailto = "contacto@estsoftware.com",
  onSubmit,
  className,
}: ContactSectionProps) {
  const [sent, setSent] = useState(false);

  // Sin backend, el envío abre el cliente de correo con todo prellenado.
  // Pasa `onSubmit` para conectarlo a una API real.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (onSubmit) {
      onSubmit(event);
      return;
    }

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Nuevo proyecto: ${data.get("servicio")}`;
    const body = [
      `Nombre: ${data.get("nombre")}`,
      `Correo: ${data.get("email")}`,
      `Empresa: ${data.get("empresa") || "—"}`,
      `Servicio: ${data.get("servicio")}`,
      "",
      `${data.get("mensaje")}`,
    ].join("\n");

    window.location.href = `mailto:${mailto}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section
      id={id}
      className={cn("relative w-full bg-background py-24 md:py-32", className)}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 md:flex-row md:gap-8">
        {/* Columna izquierda: formulario */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="w-full max-w-xl">
            <p className="text-sm font-semibold tracking-wide text-brand">{eyebrow}</p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-balance md:text-[2.4rem]">
              {title}
            </h2>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
              {description}
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nombre" className="text-sm font-medium text-muted-foreground">
                  Nombre completo
                </label>
                <GlassInputWrapper>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="¿Cómo te llamas?"
                    className="w-full rounded-2xl bg-transparent p-4 text-sm focus:outline-none"
                  />
                </GlassInputWrapper>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                    Correo electrónico
                  </label>
                  <GlassInputWrapper>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="tu@correo.com"
                      className="w-full rounded-2xl bg-transparent p-4 text-sm focus:outline-none"
                    />
                  </GlassInputWrapper>
                </div>

                <div>
                  <label htmlFor="empresa" className="text-sm font-medium text-muted-foreground">
                    Empresa <span className="font-normal">(opcional)</span>
                  </label>
                  <GlassInputWrapper>
                    <input
                      id="empresa"
                      name="empresa"
                      type="text"
                      autoComplete="organization"
                      placeholder="Nombre de tu empresa"
                      className="w-full rounded-2xl bg-transparent p-4 text-sm focus:outline-none"
                    />
                  </GlassInputWrapper>
                </div>
              </div>

              <div>
                <label htmlFor="servicio" className="text-sm font-medium text-muted-foreground">
                  ¿Qué necesitas?
                </label>
                <GlassInputWrapper>
                  <select
                    id="servicio"
                    name="servicio"
                    defaultValue={services[0]}
                    className="w-full appearance-none rounded-2xl bg-transparent p-4 text-sm focus:outline-none"
                  >
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </GlassInputWrapper>
              </div>

              <div>
                <label htmlFor="mensaje" className="text-sm font-medium text-muted-foreground">
                  Cuéntanos del proyecto
                </label>
                <GlassInputWrapper>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={4}
                    placeholder="¿Qué problema quieres resolver? ¿Tienes fecha límite o presupuesto en mente?"
                    className="w-full resize-y rounded-2xl bg-transparent p-4 text-sm focus:outline-none"
                  />
                </GlassInputWrapper>
              </div>

              <label className="flex cursor-pointer items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  name="acepto"
                  required
                  className="mt-0.5 size-4 shrink-0 accent-brand"
                />
                <span className="text-foreground/90">
                  Acepto que ESTSoftware me contacte sobre esta solicitud.
                </span>
              </label>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand py-4 font-medium text-white transition-colors hover:bg-brand-dark"
              >
                <Send className="size-4" aria-hidden="true" />
                Enviar mensaje
              </button>

              <p aria-live="polite" className="min-h-5 text-center text-sm text-muted-foreground">
                {sent && "Abrimos tu cliente de correo con el mensaje listo para enviar."}
              </p>
            </form>
          </div>
        </motion.div>

        {/* Columna derecha: imagen y canales directos */}
        {heroImageSrc && (
          <motion.div
            className="relative hidden min-h-[560px] flex-1 md:block"
            initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <img
                src={heroImageSrc}
                alt={heroImageAlt}
                loading="lazy"
                className="size-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                aria-hidden="true"
              />
            </div>

            {channels.length > 0 && (
              <ul className="absolute inset-x-6 bottom-6 flex flex-col gap-3">
                {channels.map((channel) => (
                  <motion.li
                    key={channel.label}
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + channels.indexOf(channel) * 0.12,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                  >
                    <ChannelCard channel={channel} />
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
