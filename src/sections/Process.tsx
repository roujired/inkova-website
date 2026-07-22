import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PROCESS_STEPS } from '../data/content';
import { useLang } from '../lib/i18n';

const COLORS = ['#0391D1', '#FAE926', '#CB056C', '#0391D1'];

export default function Process() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative bg-ink-white text-ink-black">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="mb-4 flex items-center gap-4">
            <span className="h-[2px] w-12 bg-ink-magenta" />
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-black/60">{t.process_kicker}</span>
          </div>
          <h2 className="font-display leading-[0.95]" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            {t.process_title1} <span className="text-ink-magenta">{t.process_title_hl}</span>
          </h2>
        </motion.div>

        <div ref={ref} className="relative">
          {/* progress line */}
          <div className="absolute left-0 right-0 top-7 hidden h-[2px] bg-black/10 md:block" />
          <motion.div
            className="absolute left-0 right-0 top-7 hidden h-[2px] origin-left bg-ink-blue md:block"
            style={{ scaleX: lineScale }}
          />
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            {PROCESS_STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.65, delay: i * 0.12 }}
                className="relative"
                data-cursor
              >
                <div
                  className="relative z-10 mb-6 grid h-14 w-14 place-items-center rounded-full font-display text-sm text-white"
                  style={{ background: COLORS[i], color: i === 1 ? '#000' : '#fff' }}
                >
                  {s.n}
                </div>
                <h3 className="font-display text-lg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/55">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
