import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { MANIFESTO } from '../data/content';

/** One word, revealed by scroll progress. */
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = MANIFESTO.split(' ');

  // highlight the fun part in brand colors
  const decorate = (w: string) => {
    const clean = w.replace(/[.,’'!]/g, '').toLowerCase();
    if (clean === 'fun') return 'text-ink-magenta font-bold';
    if (clean === 'stratégies') return 'text-ink-blue font-bold';
    if (clean === 'impactantes') return 'font-bold underline decoration-ink-yellow decoration-4 underline-offset-4';
    return '';
  };

  return (
    <section id="agence" className="relative bg-ink-white text-ink-black">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
        <div className="mb-10 flex items-center gap-4">
          <span className="h-[2px] w-12 bg-ink-blue" />
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-black/60">Qui sommes-nous</span>
        </div>
        <p
          ref={ref}
          className="font-extrabold leading-[1.28]"
          style={{ fontSize: 'clamp(1.5rem, 3.6vw, 3rem)' }}
        >
          {words.map((w, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <span key={i} className={decorate(w)}>
                <Word progress={scrollYProgress} range={[start, end]}>
                  {w}
                </Word>
              </span>
            );
          })}
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { k: 'Stratégie', v: 'La fondation de chaque projet', c: 'bg-ink-blue' },
            { k: 'Création', v: 'Le fun comme moteur d’idées', c: 'bg-ink-yellow' },
            { k: 'Production', v: 'La matière comme émotion', c: 'bg-ink-magenta' },
          ].map((item, i) => (
            <motion.div
              key={item.k}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group border-t-2 border-black/10 pt-5"
              data-cursor
            >
              <div className={`mb-3 h-1.5 w-10 ${item.c} transition-all duration-500 group-hover:w-full`} />
              <h3 className="font-display text-xl">{item.k}</h3>
              <p className="mt-1 text-sm text-black/55">{item.v}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
