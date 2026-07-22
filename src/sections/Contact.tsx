import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
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
  ACCENT_HEX,
} from '../data/content';
import Magnetic from '../components/Magnetic';
import { useLang } from '../lib/i18n';

const BUDGETS = ['< 100 000 DZD', '100 000 – 500 000 DZD', '500 000 – 2 000 000 DZD', '> 2 000 000 DZD', 'À définir'];

export default function Contact() {
  const { t } = useLang();
  const [selected, setSelected] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const services = selected
      .map((id) => NICHES.find((n) => n.id === id)?.name)
      .filter(Boolean)
      .join(', ');
    const body = [
      `Nom : ${f.get('name')}`,
      `Société : ${f.get('company') || '—'}`,
      `Email : ${f.get('email')}`,
      `Téléphone : ${f.get('phone') || '—'}`,
      `Services souhaités : ${services || '—'}`,
      `Budget : ${f.get('budget') || '—'}`,
      '',
      'Message :',
      `${f.get('message')}`,
    ].join('\n');
    const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `Nouveau projet — ${f.get('name')}`,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setSent(true);
  };

  const inputCls =
    'w-full rounded-xl border border-black/15 bg-white px-4 py-3.5 text-sm text-black placeholder-black/35 outline-none transition-all focus:border-ink-blue focus:ring-2 focus:ring-ink-blue/25';

  return (
    <section id="contact" className="relative bg-ink-white text-ink-black">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          {/* Left: heading + direct info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-4 flex items-center gap-4">
              <span className="h-[2px] w-12 bg-ink-yellow" />
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-black/60">{t.contact_kicker}</span>
            </div>
            <h2 className="font-display leading-[0.95]" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.4rem)' }}>
              {t.contact_title1}
              <br />
              <span className="text-ink-blue">{t.contact_title2}</span>
            </h2>
            <p className="mt-6 max-w-md text-sm md:text-base leading-relaxed text-black/60">
              Un brief, une idée, un simple doute sur un support d’impression —
              écrivez-nous, on répond vite (et avec le sourire).
            </p>

            <div className="mt-10 space-y-5">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-center gap-4 text-lg font-bold"
                data-cursor
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-ink-blue text-white transition-transform duration-300 group-hover:scale-110">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="3" />
                    <path d="m2 7 10 6 10-6" />
                  </svg>
                </span>
                <span className="underline-offset-4 group-hover:underline">{CONTACT_EMAIL}</span>
              </a>

              {[
                { label: 'Téléphone', value: CONTACT_PHONE, href: `tel:${CONTACT_PHONE_TEL}` },
                { label: 'Adresse', value: CONTACT_ADDRESS, href: CONTACT_MAP_URL },
                { label: 'Instagram', value: INSTAGRAM_HANDLE, href: INSTAGRAM_URL },
                { label: 'LinkedIn', value: LINKEDIN_HANDLE, href: LINKEDIN_URL },
              ].map(({ label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group flex items-center gap-4 text-sm"
                  data-cursor
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-black/15 text-black/50 transition-colors group-hover:border-ink-blue group-hover:text-ink-blue">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 8v4m0 4h.01" />
                    </svg>
                  </span>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-widest text-black/40">{label}</span>
                    <span className="text-black/60 group-hover:text-ink-blue">{value}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] md:p-9"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required name="name" placeholder="Nom *" className={inputCls} />
              <input name="company" placeholder="Société" className={inputCls} />
              <input required type="email" name="email" placeholder="Email *" className={inputCls} />
              <input name="phone" placeholder="Téléphone" className={inputCls} />
            </div>

            <div className="mt-5">
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-black/50">
                Service(s) souhaité(s)
              </span>
              <div className="flex flex-wrap gap-2">
                {NICHES.map((n) => {
                  const active = selected.includes(n.id);
                  return (
                    <button
                      type="button"
                      key={n.id}
                      onClick={() => toggle(n.id)}
                      data-cursor
                      className="rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200"
                      style={
                        active
                          ? { background: ACCENT_HEX[n.accent], borderColor: ACCENT_HEX[n.accent], color: n.accent === 'yellow' ? '#000' : '#fff' }
                          : { borderColor: 'rgba(0,0,0,.18)', color: 'rgba(0,0,0,.6)' }
                      }
                    >
                      {n.index} · {n.name.split(' & ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5">
              <select name="budget" className={`${inputCls} appearance-none`} defaultValue="">
                <option value="" disabled>
                  Budget estimé (optionnel)
                </option>
                {BUDGETS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>

            <textarea
              required
              name="message"
              rows={4}
              placeholder="Votre message *"
              className={`${inputCls} mt-5 resize-none`}
            />

            <Magnetic strength={0.2}>
              <button
                type="submit"
                data-cursor
                className="group relative mt-6 w-full overflow-hidden rounded-full bg-ink-blue px-8 py-4 text-sm font-bold uppercase tracking-widest text-white"
              >
                <span className="absolute inset-0 translate-y-full bg-ink-magenta transition-transform duration-400 ease-out group-hover:translate-y-0" />
                <span className="relative">Envoyer le message</span>
              </button>
            </Magnetic>
            {sent && (
              <p className="mt-3 text-center text-xs font-semibold text-ink-blue">
                Votre logiciel e-mail va s’ouvrir — le message est pré-rempli.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
