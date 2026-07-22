import { useEffect, useRef } from 'react';
import { useLang } from '../lib/i18n';
import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import NicheArt from '../components/NicheArt';

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1.8, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  useEffect(() => {
    const unsub = spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
    });
    return unsub;
  }, [spring, suffix]);

  return <span ref={ref}>{reduce ? `${to}${suffix}` : `0${suffix}`}</span>;
}

const STATS = [
  { value: 7, suffix: '', label: 'pôles d’expertise', color: '#0391D1' },
  { value: 49, suffix: '', label: 'services au catalogue', color: '#FAE926' },
  { value: 100, suffix: '%', label: 'pipeline intégré, de la stratégie à la pose', color: '#CB056C' },
];

const PILLARS = [
  {
    title: 'Expertise matériaux',
    desc: 'Bois, métal, forex, plexi, verre, carton : nous conseillons la matière juste pour chaque usage — la matière est un vecteur de qualité et d’émotion.',
    color: '#0391D1',
  },
  {
    title: 'Fabrication multi-matériaux',
    desc: 'Sérigraphie, DTF, DTF-UV, grand format : des techniques modernes et un savoir-faire précis pour des rendus durables et esthétiques.',
    color: '#FAE926',
  },
  {
    title: 'Pipeline 100% intégré',
    desc: 'De la stratégie à l’installation physique, un seul interlocuteur. Pas de sous-traitance cachée, pas de perte en route.',
    color: '#CB056C',
  },
];

export default function WhyInkova() {
  const { t } = useLang();
  return (
    <section id="pourquoi" className="relative overflow-hidden bg-ink-black text-white">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[26rem] w-[26rem] rounded-full bg-ink-blue/15 blur-[140px]" />
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="mb-4 flex items-center gap-4">
            <span className="h-[2px] w-12 bg-ink-blue" />
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-white/60">{t.why_kicker}</span>
          </div>
          <h2 className="font-display leading-[0.95]" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            {t.why_title1} <span className="text-ink-yellow">{t.why_title_hl}</span>
            <br />
            {t.why_title2}
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="mb-20 grid grid-cols-1 gap-8 border-y border-white/10 py-10 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="text-center sm:text-left" data-cursor>
              <div className="font-display leading-none" style={{ fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', color: s.color }}>
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/55">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Pillars */}
          <div className="space-y-6">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: -36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.65, delay: i * 0.12 }}
                className="group flex gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-white/25"
                data-cursor
              >
                <span className="mt-1 h-full w-1 shrink-0 rounded-full" style={{ background: p.color }} />
                <div>
                  <h3 className="font-display text-lg">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Materials image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl border border-white/10"
          >
            <div className="aspect-[4/3] w-full"><NicheArt kind="materials" accent="blue" /></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-6 right-6 text-sm font-semibold leading-snug">
              « La matière est un vecteur de qualité et d’émotion. »
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
