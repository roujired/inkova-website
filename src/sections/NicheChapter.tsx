import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ACCENT_HEX, type Niche } from '../data/content';
import NicheArt from '../components/NicheArt';
import TechniquesRail from './TechniquesRail';

export default function NicheChapter({ niche }: { niche: Niche }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const accent = ACCENT_HEX[niche.accent];
  const dark = niche.dark;

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const numY = useTransform(scrollYProgress, [0, 1], ['12%', '-18%']);

  const fg = dark ? 'text-white' : 'text-black';
  const sub = dark ? 'text-white/60' : 'text-black/60';
  const cardBase = dark
    ? 'bg-white/[0.04] border-white/10 hover:border-white/0'
    : 'bg-black/[0.03] border-black/10 hover:border-black/0';

  return (
    <section
      ref={ref}
      id={`niche-${niche.id}`}
      className={`relative overflow-hidden ${dark ? 'bg-ink-black' : 'bg-ink-white'} ${fg}`}
    >
      {/* glow orb */}
      <div
        className="pointer-events-none absolute -right-40 top-24 h-[28rem] w-[28rem] rounded-full blur-[140px]"
        style={{ background: accent, opacity: dark ? 0.14 : 0.1 }}
      />

      {/* giant parallax numeral */}
      <motion.span
        aria-hidden
        style={reduce ? {} : { y: numY }}
        className={`pointer-events-none absolute -top-8 left-0 select-none font-display leading-none ${dark ? 'text-stroke-white' : 'text-stroke-black'} opacity-[0.16]`}
      >
        <span style={{ fontSize: 'clamp(10rem, 30vw, 26rem)' }}>{niche.index}</span>
      </motion.span>

      <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          {/* Sticky chapter header */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7 }}
              >
                <div className="mb-5 flex items-center gap-4">
                  <span className="font-display text-lg" style={{ color: accent }}>{niche.index}</span>
                  <span className="h-[2px] w-14" style={{ background: accent }} />
                  <span className={`text-[11px] font-bold uppercase tracking-[0.32em] ${sub}`}>Pôle {niche.index} / 07</span>
                </div>
                <h2 className="font-display leading-[0.98]" style={{ fontSize: 'clamp(1.9rem, 4.2vw, 3.4rem)' }}>
                  {niche.name}
                </h2>
                <p className="mt-4 text-lg font-semibold" style={{ color: accent }}>
                  {niche.tagline}
                </p>
                {niche.intro && (
                  <p className={`mt-5 max-w-md text-sm md:text-base leading-relaxed ${sub}`}>{niche.intro}</p>
                )}
              </motion.div>

              {/* Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative mt-10 overflow-hidden rounded-2xl border"
                style={{ borderColor: dark ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.1)' }}
              >
                {niche.art && (
                  <div className="aspect-[4/3]">
                    <NicheArt kind={niche.art} accent={niche.accent} />
                  </div>
                )}
                <span
                  className="absolute bottom-3 left-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em]"
                  style={{ background: accent, color: niche.accent === 'yellow' ? '#000' : '#fff' }}
                >
                  {niche.index} — {niche.services.length}{niche.expectedTotal ? `/${niche.expectedTotal}` : ''} services
                </span>
              </motion.div>
            </div>
          </div>

          {/* Service cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {niche.services.map((s, i) => (
                <motion.article
                  key={s.title}
                  initial={{ opacity: 0, y: 44, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.25, margin: '0px 0px -8% 0px' }}
                  transition={{ duration: 0.65, delay: (i % 4) * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative overflow-hidden rounded-2xl border p-6 transition-colors duration-300 ${cardBase} ${i % 2 === 1 ? 'sm:translate-y-6' : ''}`}
                  data-cursor
                >
                  <span
                    className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                    style={{ background: accent }}
                  />
                  <span className="font-display text-xs opacity-40">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 font-display text-lg leading-snug md:text-xl">{s.title}</h3>
                  {s.desc && <p className={`mt-3 text-sm leading-relaxed ${sub}`}>{s.desc}</p>}
                </motion.article>
              ))}

              {/* Extensible slot — niche 7 grows to 11 */}
              {niche.expectedTotal && niche.expectedTotal > niche.services.length && (
                <motion.article
                  initial={{ opacity: 0, y: 44, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.65, delay: 0.3 }}
                  className={`grid place-items-center rounded-2xl border border-dashed p-6 text-center ${dark ? 'border-white/20' : 'border-black/20'}`}
                >
                  <p className={`text-sm font-semibold ${sub}`}>
                    + {niche.expectedTotal - niche.services.length} autres services
                    <br />
                    <span className="text-xs font-normal">au catalogue — demandez la liste complète</span>
                  </p>
                </motion.article>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Niche 06 signature move — horizontal technique rail */}
      {niche.techniques && <TechniquesRail techniques={niche.techniques} accent={accent} dark={dark} />}
    </section>
  );
}
