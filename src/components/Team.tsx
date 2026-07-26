import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Text3DFlip from "@/components/ui/text-3d-flip";
import { TiltedCard } from "@/components/ui/tilted-card";

type ContactType = "github" | "linkedin" | "web" | "whatsapp" | "facebook";

type ContactLink = {
  type: ContactType;
  url: string;
};

type TeamMember = {
  name: string;
  role: string;
  photo: string;
  bg: string;
  links?: ContactLink[];
};

const CONTACT_ICONS: Record<ContactType, string> = {
  github:   "/assets/icons/github.svg",
  linkedin: "/assets/icons/linkedin.svg",
  whatsapp: "/assets/icons/whatsapp.svg",
  facebook: "/assets/icons/facebook.svg",
  web:      "/assets/icons/web.svg",
};

const CONTACT_LABELS: Record<ContactType, string> = {
  github:   "GitHub",
  linkedin: "LinkedIn",
  whatsapp: "WhatsApp",
  facebook: "Facebook",
  web:      "Sitio web",
};

const TEAM: TeamMember[] = [
  {
    name: "Ing. Ameth Toledo",
    role: "FullStack & IoT",
    photo: "/assets/devs/amethdev.png",
    bg: "from-sky-950 to-sky-800",
    links: [
      { type: "github", url: "https://github.com/Ameth-Toledo" },
      { type: "web", url: "https://www.amethdev.com/" },
      { type: "linkedin", url: "https://www.linkedin.com/in/ameth-de-jes%C3%BAs-m%C3%A9ndez-toledo/" },
      { type: "whatsapp", url: "https://wa.me/529613037813" },
    ],
  },
  {
    name: "Ing. Victor Pérez",
    role: "FullStack Developer",
    photo: "/assets/devs/fabriciodev.png",
    bg: "from-sky-950 to-sky-800",
    links: [
      { type: "github",   url: "https://github.com/FabricioPRZ" },
      { type: "web",      url: "https://fabricio-prz-dev.vercel.app/" },
      { type: "linkedin", url: "https://linkedin.com/in/fabricio-prz" },
      { type: "whatsapp", url: "https://wa.me/529619009651" },
    ],
  },
  {
    name: "Ing. Melissa Corral",
    role: "Frontend Developer",
    photo: "/assets/devs/melissadev.png",
    bg: "from-sky-950 to-sky-800",
    links: [
      { type: "github",   url: "https://github.com/MelissaZarate08" },
      { type: "web",      url: "https://melissazarate08.github.io/Portafolio-KMCZ/" },
      { type: "linkedin", url: "https://www.linkedin.com/in/karla-melissa-corral-z%C3%A1rate-274b5529b" },
    ],
  },
];

const TECHS = [
  { icon: "python",     path: "/assets/icons/python.svg" },
  { icon: "arduino",    path: "/assets/icons/arduino.svg" },
  { icon: "react",      path: "/assets/icons/react.svg" },
  { icon: "flutter",    path: "/assets/icons/flutter.svg" },
  { icon: "nodejs",     path: "/assets/icons/nodejs.svg" },
  { icon: "tailwind",   path: "/assets/icons/tailwindcss.svg" },
  { icon: "postgresql", path: "/assets/icons/postgresql.svg" },
  { icon: "docker",     path: "/assets/icons/docker.svg" },
  { icon: "railway",    path: "/assets/icons/railway.svg" },
  { icon: "supabase",   path: "/assets/icons/supabase.svg" },
  { icon: "nginx",      path: "/assets/icons/nginx.svg" },
];

const TechStack = () => (
  <ul className="flex flex-wrap justify-center gap-6">
    {TECHS.map((tech) => (
      <li key={tech.icon} className="group flex flex-col items-center gap-3">
        {/* El chip se queda oscuro a propósito: varios logos del stack
            (railway, nodejs) son blancos y desaparecerían sobre claro. */}
        <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-neutral-900 transition-all duration-300 group-hover:scale-110 group-hover:brightness-125">
          <img src={tech.path} alt="" aria-hidden="true" className="w-6 h-6 object-contain" />
        </div>
        <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200 font-medium capitalize">
          {tech.icon}
        </span>
      </li>
    ))}
  </ul>
);

const ContactIcon = ({ link, memberName }: { link: ContactLink; memberName: string }) => (
  <a
    href={link.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${CONTACT_LABELS[link.type]} de ${memberName}`}
    className="w-9 h-9 flex items-center justify-center rounded-md opacity-50 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
  >
    <img
      src={CONTACT_ICONS[link.type]}
      alt=""
      aria-hidden="true"
      className="w-5 h-5 object-contain"
      style={{ filter: "brightness(0)" }}
    />
  </a>
);

const MemberCard = ({ member }: { member: TeamMember }) => (
  <div className="flex flex-col gap-5 items-start w-[300px]">
    <TiltedCard
      imageSrc={member.photo}
      altText={`Retrato de ${member.name}`}
      containerHeight="300px"
      containerWidth="300px"
      imageHeight="100%"
      imageWidth="100%"
      rotateAmplitude={12}
      scaleOnHover={1.06}
      showTooltip={false}
      imageClassName={cn("object-top", `bg-gradient-to-br ${member.bg}`)}
    />

    <div className="flex flex-col gap-3 pt-2 w-full">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-black text-foreground tracking-tight">{member.name}</h3>
        <p className="text-xs font-medium text-muted-foreground">{member.role}</p>
      </div>

      {member.links && member.links.length > 0 && (
        <div className="flex items-center gap-1">
          {member.links.map((link) => (
            <ContactIcon key={link.type} link={link} memberName={member.name} />
          ))}
        </div>
      )}
    </div>
  </div>
);

const Team = () => (
  <section id="nosotros" className="relative w-full overflow-hidden bg-muted">
    <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32 flex flex-col gap-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="text-sm font-semibold tracking-wide text-brand">Nosotros</span>
          <h2 className="mt-4 text-4xl md:text-[2.4rem] font-semibold leading-tight tracking-tight">
            <Text3DFlip
              className="bg-transparent justify-start"
              textClassName="bg-transparent bg-linear-to-b from-foreground to-foreground/60 bg-clip-text text-transparent"
              flipTextClassName="bg-transparent bg-linear-to-b from-foreground/60 to-foreground/25 bg-clip-text text-transparent"
              rotateDirection="top"
              staggerDuration={0.03}
              staggerFrom="first"
              transition={{ type: "spring", damping: 25, stiffness: 160 }}
            >
              Quiénes somos
            </Text3DFlip>
          </h2>
        </motion.div>

        <div className="flex flex-col items-end gap-4">
          <TechStack />
          <p className="max-w-sm text-muted-foreground text-sm leading-relaxed md:text-right">
            Ingenieros en software enfocados en construir productos que aguanten
            producción: web, móvil e integraciones a la medida.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-x-8 gap-y-14">
        {TEAM.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <MemberCard member={member} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
