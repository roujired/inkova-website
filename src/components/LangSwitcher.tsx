import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LANGS, useLang } from '../lib/i18n';

export default function LangSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        data-cursor
        aria-label="Choisir la langue"
        className={`flex items-center gap-1.5 rounded-full border border-white/20 font-bold uppercase tracking-widest text-white/80 transition-colors hover:border-ink-yellow hover:text-ink-yellow ${
          compact ? 'px-3 py-1.5 text-[10px]' : 'px-3.5 py-1.5 text-[11px]'
        }`}
      >
        {lang}
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-white/15 bg-black/95 backdrop-blur-xl"
          >
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                data-cursor
                className={`block w-full px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest transition-colors ${
                  l.code === lang ? 'bg-ink-blue text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
