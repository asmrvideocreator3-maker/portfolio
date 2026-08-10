import { useEffect, useRef, useState } from 'react'

/* ────────────────────────────────────────────────────────────────────
   Palette — mirrors the tokens in index.css
   ──────────────────────────────────────────────────────────────────── */
const CYAN = '#3DDCEB'
const TEXT = '#E8F3F7'
const BODY = '#B7C9D6'
const MUTED = '#8497A7'
const DIM = '#6D8496'

const EMAIL = 'keanujohn.adrales02@gmail.com'

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/* ────────────────────────────────────────────────────────────────────
   Buttons
   ──────────────────────────────────────────────────────────────────── */
function CyanButton({
  href,
  children,
  type,
  onClick,
}: {
  href?: string
  children: React.ReactNode
  type?: 'submit'
  onClick?: () => void
}) {
  const style: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.86rem',
    fontWeight: 600,
    padding: '0.72rem 1.5rem',
    borderRadius: 999,
    background: 'linear-gradient(180deg, #6FF0FA, #29C5D6)',
    color: '#04121A',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 8px 26px rgba(61,220,235,0.28)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  }
  const over = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = 'translateY(-2px)'
    e.currentTarget.style.boxShadow = '0 14px 34px rgba(61,220,235,0.45)'
  }
  const out = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = 'translateY(0)'
    e.currentTarget.style.boxShadow = '0 8px 26px rgba(61,220,235,0.28)'
  }

  if (type === 'submit') {
    return (
      <button type="submit" style={style} onMouseEnter={over} onMouseLeave={out} onClick={onClick}>
        {children}
      </button>
    )
  }
  return (
    <a href={href} style={style} onMouseEnter={over} onMouseLeave={out}>
      {children}
    </a>
  )
}

function OutlineButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.86rem',
        fontWeight: 500,
        padding: '0.72rem 1.5rem',
        borderRadius: 999,
        color: TEXT,
        textDecoration: 'none',
        display: 'inline-block',
        border: '1px solid rgba(120,190,215,0.25)',
        background: 'rgba(255,255,255,0.02)',
        transition: 'border-color 0.22s, background 0.22s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(61,220,235,0.5)'
        e.currentTarget.style.background = 'rgba(61,220,235,0.07)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(120,190,215,0.25)'
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
      }}
    >
      {children}
    </a>
  )
}

/* ────────────────────────────────────────────────────────────────────
   Navigation
   ──────────────────────────────────────────────────────────────────── */
const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Results', href: '#results' },
  { label: 'About', href: '#about' },
  { label: 'Industries', href: '#industries' },
]

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? 'rgba(4,8,14,0.86)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'rgba(120,190,215,0.12)' : 'transparent'}`,
        transition: 'background 0.3s, border-color 0.3s',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between" style={{ height: 72 }}>
        <a href="#top" className="flex items-center gap-2.5" style={{ textDecoration: 'none' }}>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 9,
              background: 'linear-gradient(150deg, #6FF0FA, #1A93A8)',
              display: 'grid',
              placeItems: 'center',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 700,
              fontSize: '0.85rem',
              color: '#04121A',
              boxShadow: '0 0 20px rgba(61,220,235,0.4)',
            }}
          >
            K
          </span>
          <span
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 600,
              fontSize: '1.02rem',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              color: TEXT,
            }}
          >
            Kean Adrales
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.86rem', color: MUTED, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = CYAN)}
              onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <CyanButton href="#contact">Get in Touch</CyanButton>
          </div>
          <button
            type="button"
            className="lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            style={{
              width: 40,
              height: 40,
              display: 'grid',
              placeItems: 'center',
              borderRadius: 10,
              border: '1px solid rgba(120,190,215,0.2)',
              background: 'rgba(255,255,255,0.03)',
              color: TEXT,
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="lg:hidden"
          style={{ background: 'rgba(4,8,14,0.97)', borderTop: '1px solid rgba(120,190,215,0.12)', padding: '1rem 1.25rem 1.5rem' }}
        >
          <div style={{ display: 'grid', gap: '0.15rem' }}>
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: BODY, textDecoration: 'none', padding: '0.7rem 0' }}
              >
                {l.label}
              </a>
            ))}
            <div style={{ marginTop: '0.75rem' }}>
              <CyanButton href="#contact">Get in Touch</CyanButton>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

/* ────────────────────────────────────────────────────────────────────
   Hero wireframe globe — the reference's signature graphic.
   Points are distributed with a Fibonacci spiral, edges connect close
   neighbours, and the whole mesh spins on the Y axis.
   ──────────────────────────────────────────────────────────────────── */
const SPHERE = (() => {
  const N = 58
  const golden = Math.PI * (3 - Math.sqrt(5))
  const pts: [number, number, number][] = []
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const th = golden * i
    pts.push([Math.cos(th) * r, y, Math.sin(th) * r])
  }
  const edges: [number, number][] = []
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const dx = pts[i][0] - pts[j][0]
      const dy = pts[i][1] - pts[j][1]
      const dz = pts[i][2] - pts[j][2]
      if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 0.62) edges.push([i, j])
    }
  }
  return { pts, edges }
})()

function WireGlobe() {
  const [angle, setAngle] = useState(0)
  const raf = useRef(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let start = performance.now()
    const tick = (t: number) => {
      setAngle(((t - start) / 1000) * 0.34)
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [])

  const R = 148
  const cx = 200
  const cy = 200
  const tilt = 0.42
  const sinT = Math.sin(tilt)
  const cosT = Math.cos(tilt)

  const proj = SPHERE.pts.map(([x, y, z]) => {
    // yaw
    const x1 = x * Math.cos(angle) - z * Math.sin(angle)
    const z1 = x * Math.sin(angle) + z * Math.cos(angle)
    // tilt
    const y1 = y * cosT - z1 * sinT
    const z2 = y * sinT + z1 * cosT
    return { x: cx + x1 * R, y: cy + y1 * R, depth: (z2 + 1) / 2 }
  })

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 440, margin: '0 auto' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '8%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(61,220,235,0.22), transparent 68%)',
          filter: 'blur(30px)',
        }}
      />
      <svg viewBox="0 0 400 400" style={{ width: '100%', display: 'block', position: 'relative' }} aria-hidden="true">
        <defs>
          <radialGradient id="core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#BFF7FF" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#3DDCEB" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#3DDCEB" stopOpacity="0" />
          </radialGradient>
          <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Orbit rings */}
        <ellipse cx={cx} cy={cy} rx={R + 22} ry={(R + 22) * 0.3} fill="none" stroke="rgba(61,220,235,0.16)" strokeWidth="1" />
        <ellipse cx={cx} cy={cy} rx={R + 42} ry={(R + 42) * 0.24} fill="none" stroke="rgba(61,220,235,0.09)" strokeWidth="1" />

        {/* Inner glow core */}
        <circle cx={cx} cy={cy} r={R * 0.62} fill="url(#core)" />

        {/* Mesh */}
        <g>
          {SPHERE.edges.map(([a, b], i) => {
            const d = (proj[a].depth + proj[b].depth) / 2
            return (
              <line
                key={i}
                x1={proj[a].x}
                y1={proj[a].y}
                x2={proj[b].x}
                y2={proj[b].y}
                stroke="#3DDCEB"
                strokeWidth={0.5 + d * 0.8}
                opacity={0.1 + d * 0.5}
              />
            )
          })}
        </g>

        {/* Nodes */}
        <g filter="url(#soft)">
          {proj.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={1 + p.depth * 2.3} fill={p.depth > 0.62 ? '#CFF9FF' : '#3DDCEB'} opacity={0.25 + p.depth * 0.75} />
          ))}
        </g>
      </svg>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────────
   Hero
   ──────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="top" className="relative" style={{ paddingTop: '8.5rem', paddingBottom: '4rem' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-6 items-center">
          <div>
            <div className="reveal" style={{ marginBottom: '1.6rem' }}>
              <span className="chip">Automation Specialist</span>
            </div>

            <h1
              className="reveal reveal-delay-1 display"
              style={{ fontSize: 'clamp(2.4rem, 5.6vw, 4.4rem)', marginBottom: '1.8rem' }}
            >
              Unlock the future
              <br />
              of your business
              <br />
              <span style={{ color: CYAN }}>with automation</span>
            </h1>

            <div className="reveal reveal-delay-2 flex flex-wrap items-center gap-3" style={{ marginBottom: '3rem' }}>
              <CyanButton href="#contact">Book a free audit</CyanButton>
              <OutlineButton href="#services">See what I automate</OutlineButton>
            </div>

            <div
              className="reveal reveal-delay-3 grid grid-cols-3"
              style={{ gap: '1rem', borderTop: '1px solid rgba(120,190,215,0.13)', paddingTop: '1.6rem', maxWidth: 520 }}
            >
              {[
                { v: '40+', k: 'Hours saved monthly' },
                { v: '12+', k: 'Workflows shipped' },
                { v: '0', k: 'Missed follow-ups' },
              ].map((s) => (
                <div key={s.k}>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', fontWeight: 600, color: TEXT, lineHeight: 1 }}>
                    {s.v}
                  </div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.76rem', color: MUTED, marginTop: '0.45rem', lineHeight: 1.4 }}>
                    {s.k}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-2 relative">
            <WireGlobe />
            <p
              className="hidden lg:block"
              style={{
                position: 'absolute',
                top: 8,
                right: 0,
                maxWidth: 230,
                textAlign: 'right',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.87rem',
                lineHeight: 1.7,
                color: MUTED,
              }}
            >
              I connect the tools you already use so the repetitive work runs itself — quietly, reliably, in the background.
            </p>
          </div>
        </div>

        <p
          className="reveal lg:hidden"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', lineHeight: 1.75, color: MUTED, marginTop: '2rem', maxWidth: 460 }}
        >
          I connect the tools you already use so the repetitive work runs itself — quietly, reliably, in the background.
        </p>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────
   Tool marquee
   ──────────────────────────────────────────────────────────────────── */
const tools = ['Gmail', 'Slack', 'Airtable', 'Notion', 'HubSpot', 'Zapier', 'Google Sheets', 'Make', 'Calendly', 'Stripe']

function ToolBar() {
  return (
    <section className="relative z-10" style={{ padding: '3rem 0 4rem' }}>
      <p className="reveal mono-label" style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
        Built on the tools your business already runs on
      </p>
      <div className="marquee-mask overflow-hidden">
        <div className="marquee">
          {[...tools, ...tools].map((t, i) => (
            <span
              key={`${t}-${i}`}
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '1.1rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'rgba(183,201,214,0.4)',
                padding: '0 2.2rem',
                whiteSpace: 'nowrap',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────
   Shared heading
   ──────────────────────────────────────────────────────────────────── */
function Heading({
  eyebrow,
  title,
  accent,
  body,
  align = 'center',
}: {
  eyebrow: string
  title: string
  accent?: string
  body?: string
  align?: 'center' | 'left'
}) {
  const centered = align === 'center'
  return (
    <div
      className="reveal"
      style={{ textAlign: centered ? 'center' : 'left', maxWidth: centered ? 660 : 560, margin: centered ? '0 auto 3.4rem' : '0 0 3rem' }}
    >
      <span className="chip">{eyebrow}</span>
      <h2 className="display" style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', marginTop: '1.3rem' }}>
        {title}
        {accent && <span style={{ color: CYAN }}> {accent}</span>}
      </h2>
      {body && (
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.98rem',
            lineHeight: 1.8,
            color: MUTED,
            marginTop: '1.1rem',
            maxWidth: 560,
            marginLeft: centered ? 'auto' : 0,
            marginRight: centered ? 'auto' : 0,
          }}
        >
          {body}
        </p>
      )}
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────────
   Services — the reference's "What We Offer" grid
   ──────────────────────────────────────────────────────────────────── */
const services = [
  {
    icon: '⟳',
    title: 'Lead & Follow-up Automation',
    desc: 'Every enquiry captured, routed and followed up on schedule. No lead goes cold because someone forgot.',
  },
  {
    icon: '◈',
    title: 'Tool & Data Integration',
    desc: 'Forms, inboxes, spreadsheets and CRMs wired together so data moves once and stays in sync.',
    featured: true,
  },
  {
    icon: '▣',
    title: 'Admin & Reporting Workflows',
    desc: 'Recurring data entry, reminders and reports handled automatically and delivered where you already work.',
  },
  {
    icon: '⟡',
    title: 'Custom Internal Systems',
    desc: 'Lightweight trackers, dashboards and approval flows shaped around how your team actually operates.',
  },
  {
    icon: '✦',
    title: 'AI-Assisted Processing',
    desc: 'Summarise enquiries, draft replies and classify incoming work with AI slotted into your existing pipeline.',
  },
  {
    icon: '◎',
    title: 'Monitoring & Maintenance',
    desc: 'Automations that are watched, alerted on and fixed fast — so a silent failure never costs you a customer.',
  },
]

function Services() {
  return (
    <section id="services" className="relative z-10" style={{ padding: '5rem 0' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Heading
          eyebrow="What I Offer"
          title="Systems that remove"
          accent="the busywork"
          body="Six ways I take repetitive work off your plate — picked and combined around whatever is actually slowing you down."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '1.1rem' }}>
          {services.map((s, i) => (
            <article
              key={s.title}
              className={`reveal reveal-delay-${(i % 3) + 1} panel panel-hover ${s.featured ? 'panel-lit' : ''}`}
              style={{ padding: '1.9rem' }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '1.25rem',
                  color: s.featured ? '#04121A' : CYAN,
                  background: s.featured ? 'linear-gradient(160deg, #6FF0FA, #29C5D6)' : 'rgba(61,220,235,0.1)',
                  border: `1px solid ${s.featured ? 'transparent' : 'rgba(61,220,235,0.26)'}`,
                  marginBottom: '1.5rem',
                }}
              >
                {s.icon}
              </div>
              <h3
                className="display"
                style={{ fontSize: '1.02rem', letterSpacing: '0.01em', lineHeight: 1.3, marginBottom: '0.75rem' }}
              >
                {s.title}
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', lineHeight: 1.75, color: MUTED }}>{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────
   Process band — heading + imagery + big percentages
   ──────────────────────────────────────────────────────────────────── */
const processSteps = [
  { n: '01', t: 'Audit', d: 'We map where your hours actually go — the repeated clicks, the copy-paste, the chasing.' },
  { n: '02', t: 'Design', d: 'I propose the smallest system that fixes it, using tools you already pay for.' },
  { n: '03', t: 'Build', d: 'The workflow is built, tested against real data, and handed over documented.' },
  { n: '04', t: 'Watch', d: 'Alerts, monitoring and tweaks so it keeps running as your business changes.' },
]

function Process() {
  return (
    <section id="process" className="relative z-10" style={{ padding: '5rem 0' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 items-center" style={{ gap: '3rem' }}>
          <div>
            <Heading
              eyebrow="How It Works"
              title="Intelligent systems driving growth,"
              accent="efficiency and calm"
              align="left"
              body="No six-month transformation project. A focused build, shipped in weeks, that quietly gives you your week back."
            />
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {processSteps.map((s, i) => (
                <div
                  key={s.n}
                  className={`reveal reveal-delay-${i + 1} panel`}
                  style={{ padding: '1.2rem 1.35rem', display: 'flex', gap: '1.1rem', alignItems: 'flex-start' }}
                >
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.78rem',
                      color: CYAN,
                      paddingTop: '0.15rem',
                      flexShrink: 0,
                    }}
                  >
                    {s.n}
                  </span>
                  <div>
                    <div className="display" style={{ fontSize: '0.95rem', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>
                      {s.t}
                    </div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.86rem', lineHeight: 1.7, color: MUTED }}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(120,190,215,0.14)', background: '#0A141F' }}>
              <img
                src="https://images.unsplash.com/photo-1562813733-b31f71025d54?w=1000&h=700&fit=crop&auto=format"
                alt="Automation dashboards running on a screen in a dim office"
                style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block', filter: 'saturate(0.85) brightness(0.8)' }}
                loading="lazy"
              />
            </div>
            <div className="grid grid-cols-2" style={{ gap: '1.1rem', marginTop: '1.1rem' }}>
              {[
                { v: '100%', k: 'Of routine follow-ups handled without a human touching them' },
                { v: '300%', k: 'More enquiries processed with the same size team' },
              ].map((s) => (
                <div key={s.v} className="panel" style={{ padding: '1.5rem' }}>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 600, color: CYAN, lineHeight: 1 }}>
                    {s.v}
                  </div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', lineHeight: 1.6, color: MUTED, marginTop: '0.7rem' }}>{s.k}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────
   Results — case studies, the reference's "In Action" block
   ──────────────────────────────────────────────────────────────────── */
const cases = [
  {
    tag: 'Property Services',
    title: 'Cutting enquiry response time from 9 hours to under 2 minutes',
    body: 'Every web enquiry now routes itself, replies instantly, books into the calendar and lands in the CRM already tagged.',
    img: 'https://images.unsplash.com/photo-1782177597552-dca3ac1f5683?w=1000&h=620&fit=crop&auto=format',
    alt: 'Blue-lit hardware representing an always-on automated system',
    stats: [
      { v: '9h → 2m', k: 'First response' },
      { v: '3×', k: 'Booked calls' },
    ],
  },
  {
    tag: 'Professional Services',
    title: 'Retiring a spreadsheet that ate six hours every week',
    body: 'Client data flows straight from intake forms into a single source of truth, with a Monday summary sent automatically.',
    img: 'https://images.unsplash.com/photo-1782155789492-3ea097e779cf?w=1000&h=620&fit=crop&auto=format',
    alt: 'Close-up of a circuit board with gold contacts',
    stats: [
      { v: '6 hrs', k: 'Saved weekly' },
      { v: '0', k: 'Manual entries' },
    ],
  },
]

function Results() {
  return (
    <section id="results" className="relative z-10" style={{ padding: '5rem 0' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Heading eyebrow="In Action" title="Real builds," accent="real hours back" />

        <div className="grid lg:grid-cols-2" style={{ gap: '1.2rem' }}>
          {cases.map((c, i) => (
            <article key={c.title} className={`reveal reveal-delay-${i + 1} panel panel-hover`} style={{ overflow: 'hidden' }}>
              <img
                src={c.img}
                alt={c.alt}
                style={{ width: '100%', height: 230, objectFit: 'cover', display: 'block', filter: 'saturate(0.8) brightness(0.75)' }}
                loading="lazy"
              />
              <div style={{ padding: '1.8rem' }}>
                <span className="mono-label" style={{ color: CYAN }}>
                  {c.tag}
                </span>
                <h3 className="display" style={{ fontSize: '1.2rem', lineHeight: 1.3, margin: '0.85rem 0 0.8rem' }}>
                  {c.title}
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.89rem', lineHeight: 1.75, color: MUTED, marginBottom: '1.5rem' }}>
                  {c.body}
                </p>
                <div className="flex gap-8" style={{ borderTop: '1px solid rgba(120,190,215,0.13)', paddingTop: '1.2rem' }}>
                  {c.stats.map((s) => (
                    <div key={s.k}>
                      <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: 600, color: TEXT, lineHeight: 1 }}>{s.v}</div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.76rem', color: DIM, marginTop: '0.4rem' }}>{s.k}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────
   About — portrait left, copy right (unchanged treatment of the photo)
   ──────────────────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="relative z-10" style={{ padding: '5rem 0' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="reveal flex flex-col md:flex-row items-center" style={{ gap: '2.5rem' }}>
          {/* Robot shot sits on true black — mask its edges so it dissolves into
              the page instead of reading as a boxed photo. */}
          <div style={{ flexShrink: 0, position: 'relative', width: 'min(380px, 80vw)' }}>
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '12%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(61,220,235,0.16), transparent 68%)',
                filter: 'blur(38px)',
              }}
            />
            <img
              src="https://images.unsplash.com/photo-1737644467636-6b0053476bb2?w=760&h=950&fit=crop&auto=format"
              alt="Close-up of a humanoid robot in profile, its face and shoulder plating exposed"
              loading="lazy"
              style={{
                position: 'relative',
                width: '100%',
                display: 'block',
                maskImage: 'radial-gradient(ellipse 74% 66% at 52% 46%, #000 52%, transparent 88%)',
                WebkitMaskImage: 'radial-gradient(ellipse 74% 66% at 52% 46%, #000 52%, transparent 88%)',
              }}
            />
          </div>

          <div style={{ maxWidth: 560 }}>
            <span className="chip">About Me</span>
            <h2 className="display" style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.6rem)', margin: '1.3rem 0 1.4rem' }}>
              Practical systems, built <span style={{ color: CYAN }}>without the complexity</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', lineHeight: 1.85, color: BODY, marginBottom: '1.1rem' }}>
              I'm Kean Adrales. I help business owners and small teams set up practical automations that save time and reduce manual
              work — without unnecessary complexity.
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', lineHeight: 1.85, color: MUTED, marginBottom: '2rem' }}>
              I work directly with you to find exactly where time is being lost, then build clean, reliable systems to fix it. No
              bloated software. No overcomplicated setups. Just automation that works.
            </p>

            <div className="grid sm:grid-cols-3" style={{ gap: '0.75rem' }}>
              {[
                { v: 'Direct', k: 'You work with me, not a team of account managers' },
                { v: 'Documented', k: 'Every build handed over with clear instructions' },
                { v: 'Yours', k: 'Built in your own tools — nothing locked behind mine' },
              ].map((s) => (
                <div key={s.v} className="panel" style={{ padding: '1.1rem 1.2rem' }}>
                  <div className="display" style={{ fontSize: '0.88rem', letterSpacing: '0.06em', color: CYAN, marginBottom: '0.45rem' }}>
                    {s.v}
                  </div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', lineHeight: 1.6, color: MUTED }}>{s.k}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────
   Testimonials
   ──────────────────────────────────────────────────────────────────── */
const testimonials = [
  {
    quote:
      'Our enquiries used to sit in an inbox until someone had a spare moment. Now they get answered instantly and nothing slips. It paid for itself in the first month.',
    name: 'Marisa Tolentino',
    role: 'Owner, Northside Lettings',
  },
  {
    quote:
      'Kean actually watched how we worked before suggesting anything. What he built fits the way our team already operates instead of forcing us onto new software.',
    name: 'Daniel Reyes',
    role: 'Operations Lead, Vantage Consulting',
  },
  {
    quote:
      'The Monday report I used to spend half a day assembling now arrives on its own at 8am. Clear handover, quick fixes when we needed a change.',
    name: 'Priya Raman',
    role: 'Practice Manager, Kestrel Legal',
  },
]

function Testimonials() {
  return (
    <section className="relative z-10" style={{ padding: '5rem 0' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Heading eyebrow="Client Feedback" title="Real results," accent="real feedback" />

        <div className="grid md:grid-cols-3" style={{ gap: '1.1rem' }}>
          {testimonials.map((t, i) => (
            <figure key={t.name} className={`reveal reveal-delay-${i + 1} panel panel-hover`} style={{ padding: '1.9rem', margin: 0 }}>
              <div style={{ color: CYAN, letterSpacing: '0.22em', fontSize: '0.8rem', marginBottom: '1.2rem' }} aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <blockquote style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', lineHeight: 1.8, color: BODY, margin: 0 }}>
                “{t.quote}”
              </blockquote>
              <figcaption
                style={{ marginTop: '1.6rem', paddingTop: '1.2rem', borderTop: '1px solid rgba(120,190,215,0.13)' }}
              >
                <div className="display" style={{ fontSize: '0.88rem', letterSpacing: '0.05em' }}>
                  {t.name}
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: DIM, marginTop: '0.3rem' }}>{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────
   Industries
   ──────────────────────────────────────────────────────────────────── */
const industries = [
  'Real Estate',
  'Professional Services',
  'E-commerce',
  'Healthcare Clinics',
  'Recruitment',
  'Legal',
  'Education',
  'Construction',
  'Hospitality',
  'Logistics',
  'Finance',
  'Agencies',
]

function Industries() {
  return (
    <section id="industries" className="relative z-10" style={{ padding: '5rem 0' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Heading
          eyebrow="Industries"
          title="Businesses I'm"
          accent="transforming"
          body="Different industries, same problem — good people spending their week on work a system should be doing."
        />
        <div className="reveal flex flex-wrap justify-center" style={{ gap: '0.7rem' }}>
          {industries.map((n) => (
            <span
              key={n}
              className="panel panel-hover"
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '0.88rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: BODY,
                padding: '0.75rem 1.4rem',
                borderRadius: 999,
              }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────
   Contact — form left, expectations right
   ──────────────────────────────────────────────────────────────────── */
function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (website) return
    setStatus('sending')
    try {
      const res = await fetch(import.meta.env.VITE_N8N_WEBHOOK_URL as string, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, message }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative z-10" style={{ padding: '5rem 0 6rem' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="reveal panel" style={{ padding: 'clamp(1.75rem, 4vw, 3.2rem)', borderRadius: 24 }}>
          <div className="grid lg:grid-cols-2" style={{ gap: '3rem' }}>
            <div>
              <span className="chip">Get in Touch</span>
              <h2 className="display" style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.7rem)', margin: '1.3rem 0 1.1rem' }}>
                Start a conversation
                <br />
                <span style={{ color: CYAN }}>about your time</span>
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', lineHeight: 1.8, color: MUTED, marginBottom: '2.2rem' }}>
                Tell me what's eating your week. I'll come back with where automation would save the most hours — free, no pitch deck.
              </p>

              <form onSubmit={submit} style={{ display: 'grid', gap: '0.8rem' }}>
                {/* Honeypot — hidden from real users, catches bots */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ display: 'none' }}
                />
                <div className="grid sm:grid-cols-2" style={{ gap: '0.8rem' }}>
                  <div>
                    <label htmlFor="cf-name" className="mono-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                      Name
                    </label>
                    <input
                      id="cf-name"
                      className="field"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cf-email" className="mono-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                      Email
                    </label>
                    <input
                      id="cf-email"
                      className="field"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="cf-company" className="mono-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                    Company
                  </label>
                  <input
                    id="cf-company"
                    className="field"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label htmlFor="cf-message" className="mono-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                    What's eating the time?
                  </label>
                  <textarea
                    id="cf-message"
                    className="field"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. we re-type every enquiry into three different places"
                    style={{ resize: 'vertical' }}
                    required
                  />
                </div>
                <div style={{ marginTop: '0.4rem' }}>
                  <CyanButton type="submit">{status === 'sending' ? 'Sending…' : 'Send enquiry'}</CyanButton>
                </div>
                {status === 'sent' && (
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: CYAN, marginTop: '0.2rem' }}>
                    Message sent — I'll be in touch soon.
                  </p>
                )}
                {status === 'error' && (
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#F87171', marginTop: '0.2rem' }}>
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}
              </form>
            </div>

            <div>
              <span className="mono-label">What happens next</span>
              <div style={{ display: 'grid', gap: '0.75rem', margin: '1.3rem 0 2rem' }}>
                {[
                  { t: 'A short call', d: 'Twenty minutes to understand how your week actually runs.' },
                  { t: 'A written audit', d: 'The three tasks costing you the most hours, ranked, with what each would take to fix.' },
                  { t: 'A fixed quote', d: 'One price, one timeline. No retainers you can’t leave.' },
                ].map((s, i) => (
                  <div key={s.t} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        flexShrink: 0,
                        width: 26,
                        height: 26,
                        borderRadius: 8,
                        display: 'grid',
                        placeItems: 'center',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.7rem',
                        color: CYAN,
                        background: 'rgba(61,220,235,0.1)',
                        border: '1px solid rgba(61,220,235,0.26)',
                      }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <div className="display" style={{ fontSize: '0.9rem', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
                        {s.t}
                      </div>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', lineHeight: 1.7, color: MUTED }}>{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="panel" style={{ padding: '1.5rem', background: 'rgba(61,220,235,0.05)' }}>
                <span className="mono-label">Or reach me directly</span>
                <a
                  href={`mailto:${EMAIL}`}
                  style={{
                    display: 'block',
                    marginTop: '0.7rem',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.95rem',
                    color: CYAN,
                    textDecoration: 'none',
                    wordBreak: 'break-word',
                  }}
                >
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────
   Footer
   ──────────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="relative z-10" style={{ borderTop: '1px solid rgba(120,190,215,0.12)', padding: '3.5rem 0 2rem' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr]" style={{ gap: '2.5rem', marginBottom: '3rem' }}>
          <div>
            <div className="flex items-center gap-2.5" style={{ marginBottom: '1rem' }}>
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  background: 'linear-gradient(150deg, #6FF0FA, #1A93A8)',
                  display: 'grid',
                  placeItems: 'center',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  color: '#04121A',
                }}
              >
                K
              </span>
              <span
                style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.02em', color: TEXT }}
              >
                Kean Adrales
              </span>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', color: MUTED, maxWidth: 320, lineHeight: 1.75 }}>
              Automation specialist helping business owners and small teams save time and reduce manual work.
            </p>
          </div>

          <div>
            <span className="mono-label">Navigate</span>
            <div style={{ display: 'grid', gap: '0.6rem', marginTop: '1.1rem' }}>
              {[...navLinks, { label: 'Contact', href: '#contact' }].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.87rem', color: MUTED, textDecoration: 'none', width: 'fit-content', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = CYAN)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <span className="mono-label">Contact</span>
            <div style={{ display: 'grid', gap: '0.9rem', marginTop: '1.1rem' }}>
              <div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: DIM, display: 'block', marginBottom: '0.2rem' }}>Email</span>
                <a href={`mailto:${EMAIL}`} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.87rem', color: BODY, textDecoration: 'none', wordBreak: 'break-word' }}>
                  {EMAIL}
                </a>
              </div>
              <div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: DIM, display: 'block', marginBottom: '0.2rem' }}>Mobile</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.87rem', color: BODY }}>[placeholder]</span>
              </div>
              <div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: DIM, display: 'block', marginBottom: '0.2rem' }}>Based in</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.87rem', color: BODY }}>[placeholder]</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(120,190,215,0.1)', paddingTop: '1.5rem' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: DIM, textAlign: 'center' }}>
            © 2026 Kean Adrales. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useReveal()

  return (
    <div className="ground gridlines relative" style={{ background: '#04080E', minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />
      <Hero />
      <ToolBar />
      <Services />
      <Process />
      <Results />
      <About />
      <Testimonials />
      <Industries />
      <Contact />
      <Footer />
    </div>
  )
}
