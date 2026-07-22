import { useEffect, useState } from 'react';
import { NICHES, ACCENT_HEX } from '../data/content';
import { scrollToId } from '../hooks/useLenis';

/** Persistent mini-nav: numbered dots tracking the current chapter. */
export default function ChapterNav() {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const ids = ['hero', 'services', ...NICHES.map((n) => `niche-${n.id}`), 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Chapitres"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      {NICHES.map((n) => {
        const isActive = active === `niche-${n.id}`;
        return (
          <button
            key={n.id}
            onClick={() => scrollToId(`niche-${n.id}`)}
            className="group relative grid place-items-center"
            aria-label={`${n.index} — ${n.name}`}
            data-cursor
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: isActive ? 10 : 6,
                height: isActive ? 10 : 6,
                background: isActive ? ACCENT_HEX[n.accent] : 'rgba(128,128,128,.55)',
              }}
            />
            <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-full bg-black/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 backdrop-blur transition-all duration-200 group-hover:-translate-x-1 group-hover:opacity-100">
              {n.index} · {n.name}
            </span>
          </button>
        );
      })}
      <span className="my-1 h-4 w-px bg-white/20" />
      <button
        onClick={() => scrollToId('contact')}
        aria-label="Contact"
        data-cursor
        className="group relative grid h-7 w-7 place-items-center rounded-full border transition-colors"
        style={{
          borderColor: active === 'contact' ? '#0391D1' : 'rgba(128,128,128,.55)',
          background: active === 'contact' ? '#0391D1' : 'transparent',
        }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={active === 'contact' ? '#fff' : 'rgba(160,160,160,.9)'} strokeWidth="2.4">
          <rect x="2" y="4" width="20" height="16" rx="3" />
          <path d="m2 7 10 6 10-6" />
        </svg>
        <span className="pointer-events-none absolute right-9 whitespace-nowrap rounded-full bg-black/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 backdrop-blur transition-all duration-200 group-hover:-translate-x-1 group-hover:opacity-100">
          Contact
        </span>
      </button>
    </nav>
  );
}
