import Logo from '../components/Logo';
import {
  NICHES,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  CONTACT_ADDRESS,
  CONTACT_MAP_URL,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  LINKEDIN_URL,
  LINKEDIN_HANDLE,
} from '../data/content';
import { scrollToId } from '../hooks/useLenis';
import { useLang } from '../lib/i18n';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative border-t border-white/10 bg-ink-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <Logo className="text-2xl" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              {t.footer_tagline}
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-white/40">Navigation</h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              <li>
                <button onClick={() => scrollToId('agence')} className="text-sm text-white/65 transition-colors hover:text-ink-yellow" data-cursor>
                  {t.nav_agence}
                </button>
              </li>
              {NICHES.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => scrollToId(`niche-${n.id}`)}
                    className="text-left text-sm text-white/65 transition-colors hover:text-ink-yellow"
                    data-cursor
                  >
                    {n.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-white/40">Contact</h4>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm font-semibold text-ink-blue hover:underline" data-cursor>
              {CONTACT_EMAIL}
            </a>
            <div className="mt-4 space-y-1.5 text-xs text-white/50">
              <a href={`tel:${CONTACT_PHONE_TEL}`} className="block hover:text-ink-yellow" data-cursor>
                {CONTACT_PHONE}
              </a>
              <a
                href={CONTACT_MAP_URL}
                target="_blank"
                rel="noreferrer"
                className="block hover:text-ink-yellow"
                data-cursor
              >
                {CONTACT_ADDRESS}
              </a>
              <p>
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-ink-yellow" data-cursor>
                  {INSTAGRAM_HANDLE}
                </a>
                {' · '}
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="hover:text-ink-yellow" data-cursor>
                  {LINKEDIN_HANDLE}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/35 md:flex-row">
          <p>© 2026 INKOVA Communication. Tous droits réservés.</p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-ink-blue" />
            <span className="inline-block h-2 w-2 rounded-full bg-ink-yellow" />
            <span className="inline-block h-2 w-2 rounded-full bg-ink-magenta" />
            Conçu avec une bonne dose de fun
          </p>
        </div>
      </div>
    </footer>
  );
}
