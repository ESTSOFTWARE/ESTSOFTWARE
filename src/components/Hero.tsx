const stats = [
  { value: '+50', label: 'Proyectos entregados' },
  { value: '+8', label: 'Años de experiencia' },
  { value: '100%', label: 'Clientes satisfechos' },
]

function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[1.1fr_0.9fr]">
      <div className="flex flex-col items-center text-center md:items-start md:text-left">
        <span className="rounded-full border border-brand/25 bg-brand/8 px-4 py-1.5 text-sm font-semibold tracking-wide text-brand">
          Desarrollo de software a la medida
        </span>

        <h1 className="mt-5 text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Construimos el software que tu <span className="text-brand">negocio</span> necesita
        </h1>

        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted text-pretty">
          En ESTSoftware diseñamos, desarrollamos y mantenemos aplicaciones web y móviles
          pensadas para crecer contigo. Tecnología moderna, entregas puntuales y
          acompañamiento real.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
          <a
            href="#contacto"
            className="rounded-lg bg-brand px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-dark"
          >
            Solicitar cotización
          </a>
          <a
            href="#servicios"
            className="rounded-lg border border-gray-200 px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:border-brand hover:text-brand"
          >
            Ver servicios
          </a>
        </div>

        <ul className="mt-10 flex w-full flex-wrap justify-center gap-10 border-t border-gray-200 pt-7 md:justify-start">
          {stats.map((stat) => (
            <li key={stat.label} className="flex flex-col">
              <strong className="text-3xl text-brand">{stat.value}</strong>
              <span className="text-sm text-ink-muted">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="order-first flex justify-center md:order-none">
        <img
          src="/logo.svg"
          alt="Logotipo de ESTSoftware"
          className="w-full max-w-[260px] drop-shadow-[0_18px_40px_rgba(184,11,11,0.18)] md:max-w-[420px]"
        />
      </div>
    </section>
  )
}

export default Hero
