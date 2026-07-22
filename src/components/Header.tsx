import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import Logo from './Logo';
import LangSwitcher from './LangSwitcher';
import { scrollToId } from '../hooks/useLenis';
import { useLang } from '../lib/i18n';

export default function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 320 && y > last);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  const LINKS = [
    { id: 'agence', label: t.nav_agence },
    { id: 'services', label: t.nav_services },
    { id: 'process', label: t.nav_process },
    { id: 'pourquoi', label: t.nav_pourquoi },
  ];

  return (
    <>
      <motion.header
        animate={{ y: hidden && !menuOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? 'bg-black/70 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button onClick={() => go('hero')} aria-label="Retour en haut" data-cursor>
            <Logo className="text-xl" />
          </button>

          <nav className="hidden items-center gap-6 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-ink-yellow"
                data-cursor
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => go('contact')}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-ink-yellow"
              data-cursor
            >
              {t.nav_contact}
            </button>
            <LangSwitcher />
            <Link
              to="/devis"
              data-cursor
              className="rounded-full bg-ink-blue px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-ink-magenta"
            >
              {t.nav_devis}
            </Link>
          </nav>

          {/* mobile burger */}
          <div className="flex items-center gap-3 md:hidden">
            <LangSwitcher compact />
            <button
              className="grid h-10 w-10 place-items-center"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
            >
              <div className="space-y-1.5">
                <span className={`block h-[2px] w-6 bg-white transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
                <span className={`block h-[2px] w-6 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-[2px] w-6 bg-white transition-transform ${menuOpen ? '-translate-y-1.5 -rotate-45' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-black/95 backdrop-blur-xl md:hidden"
          >
            {[...LINKS, { id: 'contact', label: t.nav_contact }].map((l, i) => (
              <motion.button
                key={l.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
                onClick={() => go(l.id)}
                className="font-display text-3xl text-white transition-colors hover:text-ink-yellow"
              >
                {l.label}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * (LINKS.length + 1) }}
            >
              <Link
                to="/devis"
                onClick={() => setMenuOpen(false)}
                className="rounded-full bg-ink-blue px-8 py-3.5 font-display text-lg text-white"
              >
                {t.nav_devis}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
