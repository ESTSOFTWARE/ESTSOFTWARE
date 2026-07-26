import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

const HEADER_HEIGHT = 72;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis(({ scroll }) => setScrolled(scroll > 8));

  // Cerrar el menú móvil con Escape.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Con el menú abierto, congelar el scroll de fondo.
  useEffect(() => {
    if (!lenis) return;

    if (menuOpen) lenis.stop();
    else lenis.start();

    return () => lenis.start();
  }, [menuOpen, lenis]);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    setMenuOpen(false);
    lenis?.scrollTo(target as HTMLElement, { offset: -HEADER_HEIGHT });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 font-jakarta transition-colors duration-300",
        scrolled || menuOpen
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        <a
          href="#inicio"
          onClick={(event) => handleNavClick(event, "#inicio")}
          className="flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <img src="/assets/logo.svg" alt="" className="h-9 w-auto" />
          <span className="text-lg font-semibold tracking-tight">
            EST<span className="text-brand">Software</span>
          </span>
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contacto"
            onClick={(event) => handleNavClick(event, "#contacto")}
            className="hidden rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform duration-300 hover:scale-105 md:inline-flex"
          >
            Cotizar proyecto
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-secondary md:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="menu-movil"
        hidden={!menuOpen}
        className="border-t border-border bg-background/95 backdrop-blur-md md:hidden"
      >
        <nav aria-label="Principal (móvil)" className="px-6 py-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  className="block rounded-md px-2 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mt-3">
              <a
                href="#contacto"
                onClick={(event) => handleNavClick(event, "#contacto")}
                className="block rounded-md bg-foreground px-5 py-3 text-center text-base font-medium text-background"
              >
                Cotizar proyecto
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
