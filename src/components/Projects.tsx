import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from "@/components/ui/cta-section-with-gallery";

const projectTypes = [
  "Plataformas SaaS",
  "Sistemas internos",
  "Apps de campo",
  "Portales de clientes",
  "Integraciones ERP",
  "Tableros de datos",
];

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop",
    alt: "Código fuente en la pantalla de un monitor",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    alt: "Equipo de desarrollo trabajando en conjunto en una oficina",
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
    alt: "Persona programando frente a una computadora portátil",
  },
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    alt: "Editor de código abierto sobre un escritorio de trabajo",
  },
];

export default function Projects() {
  return (
    <section id="proyectos" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
        <ContainerStagger>
          <ContainerAnimated className="mb-4 block text-sm font-semibold tracking-wide text-brand">
            Proyectos
          </ContainerAnimated>

          <ContainerAnimated className="mt-4 text-4xl font-semibold tracking-tight text-balance md:text-[2.4rem]">
            Lo que hemos construido
          </ContainerAnimated>

          <ContainerAnimated className="my-4 text-base leading-relaxed text-muted-foreground text-pretty md:my-6 md:text-lg">
            Trabajamos con equipos que necesitan software real en producción, no
            prototipos. Estos son los tipos de proyecto que más entregamos.
          </ContainerAnimated>

          <ContainerAnimated>
            <ul className="mb-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {projectTypes.map((type) => (
                <li key={type} className="flex items-center gap-2.5 text-sm">
                  <Check className="size-4 shrink-0 text-brand" aria-hidden="true" />
                  {type}
                </li>
              ))}
            </ul>
          </ContainerAnimated>

          <ContainerAnimated>
            <Button
              render={<a href="#contacto" />}
              className="bg-brand text-white hover:bg-brand-dark"
              size="lg"
            >
              Conversemos de tu proyecto
            </Button>
          </ContainerAnimated>
        </ContainerStagger>

        <GalleryGrid>
          {gallery.map((image, index) => (
            <GalleryGridCell index={index} key={image.src}>
              <img
                className="size-full object-cover object-center"
                width="100%"
                height="100%"
                loading="lazy"
                src={image.src}
                alt={image.alt}
              />
            </GalleryGridCell>
          ))}
        </GalleryGrid>
      </div>
    </section>
  );
}
