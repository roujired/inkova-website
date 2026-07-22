import { motion, useReducedMotion } from 'framer-motion';

/**
 * Full-bleed generative "ink drop" mesh — replaces the hero photo.
 * Pure SVG, infinite resolution, brand colors only.
 */
export default function InkBackground() {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        <radialGradient id="ink1" cx="30%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#0391D1" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0391D1" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ink2" cx="75%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#CB056C" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#CB056C" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ink3" cx="55%" cy="85%" r="45%">
          <stop offset="0%" stopColor="#FAE926" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FAE926" stopOpacity="0" />
        </radialGradient>
        <filter id="blurHeavy"><feGaussianBlur stdDeviation="60" /></filter>
      </defs>

      <rect width="1600" height="1000" fill="#000000" />

      <motion.circle cx="480" cy="320" r="380" fill="url(#ink1)" filter="url(#blurHeavy)"
        animate={reduce ? {} : { cx: [480, 520, 480], cy: [320, 360, 320] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.circle cx="1180" cy="560" r="420" fill="url(#ink2)" filter="url(#blurHeavy)"
        animate={reduce ? {} : { cx: [1180, 1120, 1180], cy: [560, 520, 560] }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.circle cx="820" cy="820" r="340" fill="url(#ink3)" filter="url(#blurHeavy)"
        animate={reduce ? {} : { cx: [820, 880, 820] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />

      {/* fine ink-drop droplets for texture */}
      {[
        [220, 140, 3], [1380, 210, 2.4], [90, 700, 2], [1500, 780, 3.2],
        [700, 90, 2.2], [1050, 900, 2.6], [340, 860, 2],
      ].map(([x, y, r], i) => (
        <motion.circle key={i} cx={x} cy={y} r={r as number} fill="#FFFFFF" opacity="0.5"
          animate={reduce ? {} : { opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }} />
      ))}
    </svg>
  );
}
