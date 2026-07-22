import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router';
import { useLenis } from './hooks/useLenis';
import Cursor from './components/Cursor';
import PageWipe from './components/PageWipe';
import Home from './pages/Home';
import Devis from './pages/Devis';
import { useLang } from './lib/i18n';

function Preloader({ done }: { done: () => void }) {
  const bars = ['#0391D1', '#FAE926', '#CB056C', '#FFFFFF'];
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={done}
    >
      <div className="flex flex-col items-center gap-8">
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl text-white md:text-6xl"
        >
          INK<span className="text-ink-blue">O</span>VA
        </motion.span>
        <div className="flex gap-2">
          {bars.map((c, i) => (
            <motion.span
              key={c}
              className="h-1.5 w-10 rounded-full"
              style={{ background: c }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function RouteTransition() {
  const { t } = useLang();
  const location = useLocation();
  const prevPath = useRef(location.pathname);
  const [wipe, setWipe] = useState<{ color: string; label: string; key: number } | null>(null);
  const keyRef = useRef(0);

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      const goingToDevis = location.pathname === '/devis';
      keyRef.current += 1;
      setWipe({
        color: goingToDevis ? '#0391D1' : '#CB056C',
        label: goingToDevis ? t.devis_title2 : t.hero_kicker,
        key: keyRef.current,
      });
      prevPath.current = location.pathname;
    }
  }, [location.pathname, t]);

  if (!wipe) return null;
  return <PageWipe key={wipe.key} color={wipe.color} label={wipe.label} onDone={() => setWipe(null)} />;
}

export default function App() {
  useLenis();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-ink-black">
      <AnimatePresence>{loading && <Preloader done={() => undefined} />}</AnimatePresence>
      <Cursor />
      <RouteTransition />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/devis" element={<Devis />} />
      </Routes>
    </div>
  );
}
