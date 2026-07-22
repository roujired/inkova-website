import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Magnetic from '../components/Magnetic';
import { scrollToId } from '../hooks/useLenis';
import InkBackground from '../components/InkBackground';
import { useLang } from '../lib/i18n';

export default function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.22]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '38%']);
  const headline = t.hero_headline as readonly string[];

  return (
    <section ref={ref} id="hero" className="relative h-[100svh] overflow-hidden bg-ink-black">
      {/* Ink background */}
      <motion.div className="absolute inset-0" style={reduce ? {} : { y: bgY, scale: bgScale }}>
        <InkBackground />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black" />
      <div className="absolute inset-0 noise" />

      {/* Glow accents */}
      <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-ink-blue/25 blur-[130px] animate-floaty" />
      <div className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-ink-magenta/20 blur-[130px] animate-floaty" style={{ animationDelay: '-4s' }} />

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        style={reduce ? {} : { opacity: contentOpacity, y: contentY }}
      >
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.42em] text-white/70"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-ink-yellow" />
          {t.hero_kicker}
          <span className="inline-block h-2 w-2 rounded-full bg-ink-magenta" />
        </motion.p>

        <h1 className="font-display leading-[0.95] text-white" style={{ fontSize: 'clamp(2.6rem, 9.5vw, 8.5rem)' }}>
          {headline.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-top">
              <motion.span
                className="inline-block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.45 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                {i === headline.length - 1 ? (
                  <span className="text-ink-blue">{word}</span>
                ) : (
                  word
                )}
                {i < headline.length - 1 && <span>&nbsp;</span>}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15 }}
          className="mt-7 max-w-xl text-base md:text-lg text-white/75 leading-relaxed"
        >
          {t.hero_sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.35 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <button
              onClick={() => scrollToId('services')}
              data-cursor
              className="group relative overflow-hidden rounded-full bg-ink-blue px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-transform"
            >
              <span className="absolute inset-0 translate-y-full bg-ink-yellow transition-transform duration-400 ease-out group-hover:translate-y-0" />
              <span className="relative transition-colors duration-300 group-hover:text-black">{t.hero_cta1}</span>
            </button>
          </Magnetic>
          <Magnetic>
            <button
              onClick={() => scrollToId('contact')}
              data-cursor
              className="rounded-full border border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-colors duration-300 hover:border-ink-magenta hover:text-ink-magenta"
            >
              {t.hero_cta2}
            </button>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/60">{t.hero_scroll}</span>
        <div className="h-14 w-[2px] overflow-hidden bg-white/15">
          <div className="scrollcue-line h-full w-full bg-ink-yellow" />
        </div>
      </motion.div>
    </section>
  );
}
