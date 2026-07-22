import { motion } from 'framer-motion';
import { NICHES, ACCENT_HEX } from '../data/content';
import { scrollToId } from '../hooks/useLenis';
import { useLang } from '../lib/i18n';

export default function ServicesIndex() {
  const { t } = useLang();
  return (
    <section id="services" className="relative bg-ink-black text-white">
      {/* marquee ribbon */}
      <div className="overflow-hidden border-y border-white/10 py-4" aria-hidden>
        <div className="animate-marquee flex w-max whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {NICHES.map((n) => (
                <span key={n.id + dup} className="mx-6 flex items-center gap-6 text-sm font-bold uppercase tracking-[0.3em] text-white/40">
                  {n.name}
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: ACCENT_HEX[n.accent] }} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-4 flex items-center gap-4">
              <span className="h-[2px] w-12 bg-ink-yellow" />
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-white/60">{t.services_kicker}</span>
            </div>
            <h2 className="font-display leading-[0.95]" style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}>
              {t.services_title1}
              <br />
              <span className="text-ink-blue">{t.services_title2}</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/55">
            {t.services_sub}
          </p>
        </motion.div>

        {/* Index rows */}
        <div className="border-t border-white/10">
          {NICHES.map((n, i) => (
            <motion.button
              key={n.id}
              onClick={() => scrollToId(`niche-${n.id}`)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group relative block w-full overflow-hidden border-b border-white/10 text-left"
              data-cursor
            >
              {/* hover fill */}
              <span
                className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-&lsqb;cubic-bezier(0.22,1,0.36,1)&rsqb; group-hover:scale-y-100"
                style={{ background: ACCENT_HEX[n.accent] }}
              />
              <span className="relative flex items-center gap-5 px-2 py-6 md:gap-10 md:px-6 md:py-8">
                <span className="font-display text-sm md:text-lg text-white/40 transition-colors duration-300 group-hover:text-black/60">
                  {n.index}
                </span>
                <span
                  className="flex-1 font-display leading-tight transition-colors duration-300 group-hover:text-black"
                  style={{ fontSize: 'clamp(1.25rem, 3.4vw, 2.6rem)' }}
                >
                  {n.name}
                </span>
                <span className="hidden md:block text-xs font-semibold uppercase tracking-widest text-white/40 transition-colors duration-300 group-hover:text-black/70">
                  {n.services.length}{n.expectedTotal ? ` / ${n.expectedTotal}` : ''} services
                </span>
                <span className="grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-full border border-white/25 transition-all duration-300 group-hover:rotate-45 group-hover:border-black/40">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="stroke-white transition-colors duration-300 group-hover:stroke-black" fill="none" strokeWidth="2">
                    <path d="M2 14 L14 2 M5 2 h9 v9" />
                  </svg>
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
