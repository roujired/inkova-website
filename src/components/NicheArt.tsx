import { motion, useReducedMotion } from 'framer-motion';
import { ACCENT_HEX, type Accent } from '../data/content';

/**
 * Generative animated art for the niches without photography.
 * Each visual slowly draws / breathes — a living diagram of the service itself.
 */
export type ArtKind = 'strategy' | 'design' | 'content' | 'digital' | 'web' | 'print' | 'events' | 'materials';

export default function NicheArt({ kind, accent }: { kind: ArtKind; accent: Accent }) {
  const reduce = useReducedMotion();
  const c = ACCENT_HEX[accent];
  const other = accent === 'magenta' ? '#0391D1' : '#CB056C';
  const third = '#FAE926';

  if (kind === 'strategy') {
    // Compass / target with a plotted path converging on the goal
    return (
      <svg viewBox="0 0 560 420" className="w-full h-full" role="img" aria-label="Stratégie de marque">
        <rect x="0" y="0" width="560" height="420" rx="24" fill="#0a0a0a" stroke="#222" />
        {[150, 110, 70, 30].map((r, i) => (
          <motion.circle key={r} cx="360" cy="180" r={r} fill="none" stroke={i === 3 ? third : '#2a2a2a'} strokeWidth={i === 3 ? 2.5 : 1.5}
            initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: false, amount: 0.4 }}
            style={{ transformOrigin: '360px 180px' }} transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }} />
        ))}
        <motion.circle cx="360" cy="180" r="6" fill={c}
          animate={reduce ? {} : { r: [6, 9, 6] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.path d="M60 340 C 140 320, 200 260, 250 240 S 320 200, 360 180" fill="none" stroke={c} strokeWidth="3.5" strokeLinecap="round" strokeDasharray="2 10"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false, amount: 0.4 }} transition={{ duration: 1.6, ease: 'easeInOut' }} />
        <motion.circle cx="60" cy="340" r="8" fill={other}
          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: false, amount: 0.4 }} transition={{ delay: 0.3 }} />
        {[0, 1, 2].map((i) => (
          <motion.rect key={i} x={70 + i * 44} y={370} width="30" height="10" rx="5" fill="#2a2a2a"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: false, amount: 0.4 }}
            style={{ transformOrigin: `${70 + i * 44}px 375px` }} transition={{ delay: 1 + i * 0.1 }} />
        ))}
        <text x="44" y="52" fill="#666" fontSize="13" fontFamily="Poppins" letterSpacing="3">POSITIONNEMENT</text>
      </svg>
    );
  }

  if (kind === 'design') {
    // Pen nib drawing a bezier curve through color swatches
    return (
      <svg viewBox="0 0 560 420" className="w-full h-full" role="img" aria-label="Design créatif">
        <rect x="0" y="0" width="560" height="420" rx="24" fill="#0a0a0a" stroke="#222" />
        {[
          { x: 90, fill: '#0391D1' },
          { x: 160, fill: '#FAE926' },
          { x: 230, fill: '#CB056C' },
        ].map((sw, i) => (
          <motion.rect key={sw.x} x={sw.x} y="70" width="46" height="46" rx="10" fill={sw.fill}
            initial={{ opacity: 0, y: 40, rotate: -8 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }} />
        ))}
        <motion.path d="M70 300 C 160 260, 220 340, 300 280 S 420 180, 490 140" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false, amount: 0.4 }} transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.2 }} />
        <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.4 }} transition={{ delay: 1.6 }}>
          <path d="M486 132 L520 118 L502 152 Z" fill={third} />
        </motion.g>
        {[0, 1, 2, 3].map((i) => (
          <motion.circle key={i} cx={70 + i * 140} cy={300 - i * 6} r="4" fill={other}
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: false, amount: 0.4 }} transition={{ delay: 0.4 + i * 0.25 }} />
        ))}
        <text x="44" y="52" fill="#666" fontSize="13" fontFamily="Poppins" letterSpacing="3">IDENTITÉ VISUELLE</text>
      </svg>
    );
  }

  if (kind === 'content') {
    // Story tiles feed with a play button — social content production
    return (
      <svg viewBox="0 0 560 420" className="w-full h-full" role="img" aria-label="Contenu & production média">
        <rect x="0" y="0" width="560" height="420" rx="24" fill="#0a0a0a" stroke="#222" />
        {[0, 1, 2].map((i) => (
          <motion.rect key={i} x={70 + i * 130} y="90" width="100" height="170" rx="14" fill="#141414" stroke={i === 1 ? c : '#2a2a2a'} strokeWidth={i === 1 ? 2.5 : 1.5}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }} />
        ))}
        <motion.circle cx="220" cy="175" r="26" fill={c}
          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: false, amount: 0.4 }} transition={{ type: 'spring', stiffness: 240, damping: 16, delay: 0.4 }} />
        <path d="M212 162 L212 188 L236 175 Z" fill="#fff" />
        {[0, 1].map((i) => (
          <motion.rect key={i} x={90} y={230 + i * 16} width={60 - i * 12} height="6" rx="3" fill="#333"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: false, amount: 0.4 }}
            style={{ transformOrigin: '90px 233px' }} transition={{ delay: 0.7 + i * 0.1 }} />
        ))}
        <motion.g animate={reduce ? {} : { y: [0, -6, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}>
          <circle cx="350" cy="185" r="15" fill="none" stroke={third} strokeWidth="2.5" />
          <path d="M355 178 l8 7 -8 7" fill="none" stroke={third} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
        <motion.circle cx="450" cy="205" r="9" fill={other} opacity="0.85"
          animate={reduce ? {} : { scale: [1, 1.3, 1] }} transition={{ duration: 2.4, repeat: Infinity, delay: 0.5 }} />
        <text x="44" y="52" fill="#666" fontSize="13" fontFamily="Poppins" letterSpacing="3">CONTENU SOCIAL</text>
      </svg>
    );
  }

  if (kind === 'print') {
    // Layered press sheets with CMYK registration dots
    return (
      <svg viewBox="0 0 560 420" className="w-full h-full" role="img" aria-label="Impression & personnalisation">
        <rect x="0" y="0" width="560" height="420" rx="24" fill="#0a0a0a" stroke="#222" />
        {[
          { x: 130, y: 260, fill: '#141414', stroke: '#2a2a2a' },
          { x: 150, y: 230, fill: '#181818', stroke: '#2a2a2a' },
          { x: 170, y: 200, fill: '#1c1c1c', stroke: c },
        ].map((sheet, i) => (
          <motion.rect key={i} x={sheet.x} y={sheet.y} width="260" height="150" rx="8" fill={sheet.fill} stroke={sheet.stroke} strokeWidth={i === 2 ? 2.5 : 1.5}
            initial={{ opacity: 0, x: sheet.x - 30 }} whileInView={{ opacity: 1, x: sheet.x }} viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.7, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }} />
        ))}
        {[
          ['#0391D1', 200, 225], ['#CB056C', 224, 225], ['#FAE926', 248, 225], ['#000', 272, 225],
        ].map(([fill, cx, cy], i) => (
          <motion.circle key={String(fill)} cx={cx as number} cy={cy as number} r="7" fill={fill as string} stroke="#000" strokeWidth="0.5"
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: false, amount: 0.4 }} transition={{ delay: 0.8 + i * 0.08, type: 'spring', stiffness: 260 }} />
        ))}
        {[0, 1, 2].map((i) => (
          <motion.rect key={i} x="200" y={260 + i * 16} width={140 - i * 20} height="6" rx="3" fill="#2f2f2f"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: false, amount: 0.4 }}
            style={{ transformOrigin: '200px 263px' }} transition={{ delay: 1 + i * 0.1 }} />
        ))}
        <motion.g animate={reduce ? {} : { x: [0, 6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
          <rect x="90" y="150" width="18" height="120" rx="9" fill={third} opacity="0.8" />
        </motion.g>
        <text x="44" y="52" fill="#666" fontSize="13" fontFamily="Poppins" letterSpacing="3">GRAND FORMAT</text>
      </svg>
    );
  }

  if (kind === 'materials') {
    // Material swatches — wood, metal, plexi, textile grain
    return (
      <svg viewBox="0 0 560 420" className="w-full h-full" role="img" aria-label="Matériaux et fabrication">
        <rect x="0" y="0" width="560" height="420" rx="24" fill="#0a0a0a" stroke="#222" />
        {[
          { x: 60, fill: '#8a5a34' },
          { x: 200, fill: '#6b7280' },
          { x: 340, fill: '#0391D1', opacity: 0.35 },
          { x: 480 - 100, fill: '#CB056C', opacity: 0.5, w: 100 },
        ].map((m, i) => (
          <motion.rect key={i} x={m.x} y="130" width={m.w ?? 120} height="160" rx="14" fill={m.fill} opacity={m.opacity ?? 1}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: m.opacity ?? 1, y: 0 }} viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }} />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1={70} y1={150 + i * 26} x2={170} y2={150 + i * 26} stroke="#5a3a20" strokeWidth="1.5" opacity="0.6" />
        ))}
        {[0, 1, 2].map((i) => (
          <motion.circle key={i} cx={260} cy={160 + i * 40} r="4" fill="#fff" opacity="0.4"
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: false, amount: 0.4 }} transition={{ delay: 0.6 + i * 0.15 }} />
        ))}
        <motion.circle cx="400" cy="210" r="26" fill="none" stroke={third} strokeWidth="2"
          animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '400px 210px' }} />
        <text x="44" y="52" fill="#666" fontSize="13" fontFamily="Poppins" letterSpacing="3">EXPERTISE MATIÈRE</text>
      </svg>
    );
  }

  if (kind === 'digital') {
    // Growth dashboard: self-drawing curves + rising bars
    return (
      <svg viewBox="0 0 560 420" className="w-full h-full" role="img" aria-label="Croissance digitale">
        <defs>
          <linearGradient id="dg" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={c} stopOpacity=".05" />
            <stop offset="100%" stopColor={c} stopOpacity=".45" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="560" height="420" rx="24" fill="#0a0a0a" stroke="#222" />
        {[80, 150, 220, 290].map((y) => (
          <line key={y} x1="40" y1={y} x2="520" y2={y} stroke="#1c1c1c" strokeWidth="1" />
        ))}
        {/* bars */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <motion.rect
            key={i}
            x={70 + i * 62}
            width="26"
            rx="6"
            fill={i % 3 === 0 ? c : i % 3 === 1 ? other : third}
            initial={{ height: 0, y: 340 }}
            whileInView={{ height: 60 + i * 28, y: 340 - (60 + i * 28) }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.9, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
        {/* main curve */}
        <motion.path
          d="M40 300 C 130 290, 170 220, 240 210 S 380 130, 430 100 S 510 60, 520 50"
          fill="none"
          stroke={c}
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />
        <motion.path
          d="M40 300 C 130 290, 170 220, 240 210 S 380 130, 430 100 S 510 60, 520 50 L 520 340 L 40 340 Z"
          fill="url(#dg)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.4, delay: 0.6 }}
        />
        {/* pulse dot at curve end */}
        <motion.circle
          cx="520" cy="50" r="7" fill={third}
          animate={reduce ? {} : { r: [7, 11, 7], opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text x="44" y="52" fill="#666" fontSize="13" fontFamily="Poppins" letterSpacing="3">CROISSANCE</text>
      </svg>
    );
  }

  if (kind === 'web') {
    // Browser window with blocks assembling themselves
    return (
      <svg viewBox="0 0 560 420" className="w-full h-full" role="img" aria-label="Expérience web">
        <rect x="0" y="0" width="560" height="420" rx="24" fill="#0a0a0a" stroke="#222" />
        {/* window chrome */}
        <motion.g
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <rect x="60" y="50" width="440" height="320" rx="16" fill="#111" stroke="#2a2a2a" />
          <rect x="60" y="50" width="440" height="42" rx="16" fill="#181818" />
          <circle cx="90" cy="71" r="6" fill={other} />
          <circle cx="112" cy="71" r="6" fill={third} />
          <circle cx="134" cy="71" r="6" fill={c} />
          <rect x="170" y="62" width="240" height="18" rx="9" fill="#000" stroke="#2a2a2a" />
        </motion.g>
        {/* hero block */}
        <motion.rect
          x="84" y="116" width="240" height="110" rx="12" fill={c}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          style={{ transformOrigin: '84px 171px' }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.rect
          x="340" y="116" width="136" height="110" rx="12" fill="#1e1e1e" stroke="#333"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        />
        {/* text lines */}
        {[0, 1, 2].map((i) => (
          <motion.rect
            key={i}
            x="84" y={246 + i * 22} width={300 - i * 70} height="10" rx="5" fill="#333"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            style={{ transformOrigin: `84px ${251 + i * 22}px` }}
            transition={{ duration: 0.6, delay: 0.6 + i * 0.12 }}
          />
        ))}
        {/* CTA button */}
        <motion.rect
          x="84" y="322" width="120" height="30" rx="15" fill={third}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          style={{ transformOrigin: '144px 337px' }}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 1 }}
        />
        {/* floating phone */}
        <motion.g
          animate={reduce ? {} : { y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="420" y="180" width="90" height="180" rx="18" fill="#000" stroke="#3a3a3a" strokeWidth="2" />
          <rect x="432" y="200" width="66" height="44" rx="8" fill={other} />
          <rect x="432" y="256" width="66" height="8" rx="4" fill="#333" />
          <rect x="432" y="272" width="44" height="8" rx="4" fill="#333" />
          <rect x="432" y="296" width="40" height="20" rx="10" fill={third} />
        </motion.g>
      </svg>
    );
  }

  // events — exhibition stand wireframe with animated spotlights
  return (
    <svg viewBox="0 0 560 420" className="w-full h-full" role="img" aria-label="Stand événementiel">
      <rect x="0" y="0" width="560" height="420" rx="24" fill="#0a0a0a" stroke="#222" />
      {/* floor grid */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.line
          key={i}
          x1={60 + i * 110} y1="330" x2={30 + i * 125} y2="395"
          stroke="#222"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: i * 0.06 }}
        />
      ))}
      <motion.line x1="40" y1="330" x2="520" y2="330" stroke="#333" strokeWidth="2"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: false, amount: 0.4 }} transition={{ duration: 1 }} />
      {/* stand structure */}
      <motion.g
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        {/* back wall */}
        <rect x="150" y="120" width="260" height="210" rx="8" fill="#141414" stroke={c} strokeWidth="2.5" />
        {/* counter */}
        <rect x="300" y="260" width="120" height="70" rx="8" fill={c} />
        {/* tower */}
        <rect x="120" y="90" width="44" height="240" rx="8" fill="#1b1b1b" stroke={other} strokeWidth="2" />
        <circle cx="142" cy="116" r="14" fill={other} />
        {/* hanging sign */}
        <motion.rect
          x="210" y="70" width="140" height="40" rx="10" fill={third}
          animate={reduce ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <line x1="240" y1="110" x2="240" y2="120" stroke="#444" strokeWidth="2" />
        <line x1="320" y1="110" x2="320" y2="120" stroke="#444" strokeWidth="2" />
      </motion.g>
      {/* spotlights */}
      {[200, 280, 360].map((x, i) => (
        <motion.polygon
          key={i}
          points={`${x - 8},30 ${x + 8},30 ${x + 34},120 ${x - 34},120`}
          fill={i === 1 ? third : c}
          opacity="0.16"
          animate={reduce ? {} : { opacity: [0.1, 0.28, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
        />
      ))}
      <text x="44" y="52" fill="#666" fontSize="13" fontFamily="Poppins" letterSpacing="3">STAND / PLV / ESPACE</text>
    </svg>
  );
}
