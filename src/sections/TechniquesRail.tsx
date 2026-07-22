import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import type { Service } from '../data/content';

/**
 * Signature horizontal-scroll rail (desktop only) for the three flagship
 * printing techniques. Falls back to a vertical stack on touch devices
 * and when the user prefers reduced motion.
 */
export default function TechniquesRail({
  techniques,
  accent,
  dark,
}: {
  techniques: Service[];
  accent: string;
  dark: boolean;
}) {
  const reduce = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-58%']);

  const useRail = isDesktop && !reduce;
  const fg = dark ? 'text-white' : 'text-black';
  const sub = dark ? 'text-white/60' : 'text-black/60';

  const heading = (
    <div className={`mb-10 flex items-center gap-4 ${fg}`}>
      <span className="h-[2px] w-12" style={{ background: accent }} />
      <span className={`text-xs font-bold uppercase tracking-[0.35em] ${sub}`}>
        Techniques d’impression signature
      </span>
    </div>
  );

  if (!useRail) {
    // Stacked fallback (mobile / reduced motion)
    return (
      <div className="relative mx-auto max-w-7xl px-6 pb-28">
        {heading}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {techniques.map((t) => (
            <article
              key={t.title}
              className={`rounded-2xl border p-6 ${dark ? 'border-white/10 bg-white/[0.04]' : 'border-black/10 bg-black/[0.03]'}`}
            >
              <h3 className="font-display text-xl" style={{ color: accent }}>{t.title}</h3>
              <p className={`mt-3 text-sm leading-relaxed ${sub}`}>{t.desc}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: '260vh' }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6">{heading}</div>
        <motion.div style={{ x }} className="flex gap-8 pl-6 will-change-transform">
          {techniques.map((t, i) => (
            <article
              key={t.title}
              className={`relative flex h-[52vh] w-[38rem] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border p-10 ${
                dark ? 'border-white/10 bg-white/[0.04]' : 'border-black/10 bg-black/[0.03]'
              }`}
              data-cursor
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-10 -right-4 select-none font-display leading-none opacity-[0.08]"
                style={{ fontSize: '12rem', color: accent }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <span
                  className="inline-block rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em]"
                  style={{ background: accent, color: '#fff' }}
                >
                  Technique {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={`mt-6 font-display ${fg}`} style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
                  {t.title}
                </h3>
              </div>
              <p className={`max-w-md text-base leading-relaxed ${sub}`}>{t.desc}</p>
            </article>
          ))}
          {/* end card */}
          <div className={`flex h-[52vh] w-[26rem] shrink-0 items-center justify-center rounded-3xl border border-dashed ${dark ? 'border-white/20' : 'border-black/20'}`}>
            <p className={`px-10 text-center text-sm font-semibold ${sub}`}>
              Offset, numérique, grand format…
              <br />
              <span style={{ color: accent }}>tous supports, tous formats.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
