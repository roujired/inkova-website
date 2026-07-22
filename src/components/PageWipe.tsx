import { motion } from 'framer-motion';
import { useLang } from '../lib/i18n';

/**
 * Full-screen wipe transition: a colored panel sweeps up over the screen,
 * a white panel follows a beat behind and overtakes it while the destination's
 * title fades in, then both panels sweep off revealing the new page.
 */
export default function PageWipe({
  color = '#0391D1',
  label,
  onDone,
}: {
  color?: string;
  label: string;
  onDone: () => void;
}) {
  const { dir } = useLang();
  return (
    <div className="pointer-events-none fixed inset-0 z-[200] overflow-hidden" dir={dir}>
      {/* colored panel: sweeps in first, holds briefly, then exits */}
      <motion.div
        className="absolute inset-0"
        style={{ background: color }}
        initial={{ y: '100%' }}
        animate={{ y: ['100%', '0%', '0%', '-100%'] }}
        transition={{ duration: 1.1, times: [0, 0.32, 0.55, 1], ease: [0.76, 0, 0.24, 1] }}
      />
      {/* white panel: enters a beat later, carries the label, exits last */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-ink-white"
        initial={{ y: '100%' }}
        animate={{ y: ['100%', '100%', '0%', '-100%'] }}
        transition={{ duration: 1.1, times: [0, 0.3, 0.55, 1], ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={onDone}
      >
        <motion.span
          className="font-display text-3xl text-ink-black md:text-5xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: [0, 0, 1, 1, 0], y: [14, 14, 0, 0, -10] }}
          transition={{ duration: 1.1, times: [0, 0.45, 0.58, 0.85, 1] }}
        >
          {label}
        </motion.span>
      </motion.div>
    </div>
  );
}
