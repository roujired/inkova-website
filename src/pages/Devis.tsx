import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { NICHES, ACCENT_HEX, CONTACT_EMAIL } from '../data/content';
import Logo from '../components/Logo';
import Magnetic from '../components/Magnetic';
import LangSwitcher from '../components/LangSwitcher';
import { scrollToId } from '../hooks/useLenis';
import { useLang } from '../lib/i18n';

const BUDGETS = [
  '< 100 000 DZD',
  '100 000 – 500 000 DZD',
  '500 000 – 2 000 000 DZD',
  '> 2 000 000 DZD',
  'À définir',
];

const TIMELINES = ['Urgent (< 1 semaine)', '2 – 4 semaines', '1 – 3 mois', 'À définir'];

const PILLARS = [
  {
    title: 'Un seul interlocuteur',
    desc: 'De la stratégie à la pose sur site, tout est produit sous le même toit — pas de sous-traitance cachée.',
    color: '#0391D1',
  },
  {
    title: 'Expertise matière',
    desc: 'Bois, métal, forex, plexi, verre, carton, grand format : le bon matériau et la bonne technique pour chaque projet.',
    color: '#FAE926',
  },
  {
    title: 'Réponse rapide',
    desc: 'Un brief, une idée, un doute — nous revenons vers vous avec un premier retour sous 24 à 48h.',
    color: '#CB056C',
  },
];

function fmtSubmitTime() {
  return new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function Devis() {
  const { t } = useLang();
  const [selected, setSelected] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
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
      `Demande de devis — ${fmtSubmitTime()}`,
      '',
      `Nom : ${f.get('name')}`,
      `Société : ${f.get('company') || '—'}`,
      `Email : ${f.get('email')}`,
      `Téléphone : ${f.get('phone') || '—'}`,
      `Services souhaités : ${services || '—'}`,
      `Budget estimé : ${budget || '—'}`,
      `Délai souhaité : ${timeline || '—'}`,
      '',
      'Message :',
      `${f.get('message') || '—'}`,
    ].join('\n');
    const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `Demande de devis — ${f.get('name')}`,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setSent(true);
  };

  const inputCls =
    'w-full rounded-xl border border-black/15 bg-white px-4 py-3.5 text-sm text-black placeholder-black/35 outline-none transition-all focus:border-ink-blue focus:ring-2 focus:ring-ink-blue/25';

  return (
    <div className="bg-ink-black text-white">
      {/* Minimal top bar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" aria-label="Retour à l'accueil INKOVA" data-cursor>
            <Logo className="text-lg" />
          </Link>
          <div className="flex items-center gap-5">
            <Link
              to="/"
              className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-ink-yellow sm:block"
              data-cursor
            >
              {t.nav_back}
            </Link>
            <LangSwitcher compact />
            <Magnetic>
              <button
                onClick={() => scrollToId('devis-form')}
                data-cursor
                className="rounded-full bg-ink-yellow px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-ink-blue hover:text-white"
              >
                {t.nav_devis}
              </button>
            </Magnetic>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-40 md:pb-28 md:pt-52">
        <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-ink-blue/25 blur-[130px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-ink-magenta/20 blur-[130px]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/70"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-ink-yellow" />
            {t.devis_kicker}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display leading-[0.98]"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 5.2rem)' }}
          >
            {t.devis_title1}
            <br />
            <span className="text-ink-blue">{t.devis_title2}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg"
          >
            Stratégie, design, production, événementiel — 7 pôles et 49 services sous un même
            toit. Décrivez votre besoin, on revient vers vous avec une proposition claire.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34 }}
            className="mt-10"
          >
            <Magnetic>
              <button
                onClick={() => scrollToId('devis-form')}
                data-cursor
                className="group relative overflow-hidden rounded-full bg-ink-blue px-9 py-4 text-sm font-bold uppercase tracking-widest text-white"
              >
                <span className="absolute inset-0 translate-y-full bg-ink-yellow transition-transform duration-400 ease-out group-hover:translate-y-0" />
                <span className="relative transition-colors duration-300 group-hover:text-black">
                  {t.devis_cta}
                </span>
              </button>
            </Magnetic>
          </motion.div>

          {/* trust stats */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.46 }}
            className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {[
              ['7', 'pôles d’expertise'],
              ['49', 'services au catalogue'],
              ['24-48h', 'délai de réponse'],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-2xl text-ink-yellow md:text-4xl">{v}</div>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-white/50 md:text-xs">
                  {l}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Inkova — condensed */}
      <section className="border-y border-white/10 bg-white/[0.02] px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <span className="mb-4 block h-1.5 w-10 rounded-full" style={{ background: p.color }} />
              <h3 className="font-display text-lg">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lead form */}
      <section id="devis-form" className="bg-ink-white px-6 py-20 text-ink-black md:py-32">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="mb-10 text-center"
          >
            <div className="mb-4 flex items-center justify-center gap-4">
              <span className="h-[2px] w-12 bg-ink-blue" />
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-black/60">
                Formulaire de devis
              </span>
              <span className="h-[2px] w-12 bg-ink-blue" />
            </div>
            <h2 className="font-display leading-[0.98]" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)' }}>
              {t.devis_form_title1}
              <br />
              <span className="text-ink-blue">{t.devis_form_title2}</span>
            </h2>
          </motion.div>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-ink-blue/30 bg-ink-blue/5 p-10 text-center"
            >
              <p className="font-display text-xl text-ink-blue">Merci !</p>
              <p className="mt-3 text-sm leading-relaxed text-black/60">
                Votre client mail devrait s'être ouvert avec votre demande pré-remplie. Il ne
                reste qu'à cliquer sur envoyer — nous revenons vers vous sous 24 à 48h.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              onSubmit={onSubmit}
              className="space-y-8"
            >
              {/* Identity */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input name="name" required placeholder="Nom complet *" className={inputCls} data-cursor />
                <input name="company" placeholder="Société" className={inputCls} data-cursor />
                <input name="email" type="email" required placeholder="Email *" className={inputCls} data-cursor />
                <input name="phone" type="tel" placeholder="Téléphone" className={inputCls} data-cursor />
              </div>

              {/* Services */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-black/50">
                  Quels services vous intéressent ?
                </p>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {NICHES.map((n) => {
                    const isSel = selected.includes(n.id);
                    return (
                      <button
                        type="button"
                        key={n.id}
                        onClick={() => toggle(n.id)}
                        data-cursor
                        className="flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors"
                        style={{
                          borderColor: isSel ? ACCENT_HEX[n.accent] : 'rgba(0,0,0,.12)',
                          background: isSel ? `${ACCENT_HEX[n.accent]}14` : 'transparent',
                        }}
                      >
                        <span
                          className="grid h-5 w-5 shrink-0 place-items-center rounded-md border"
                          style={{
                            borderColor: isSel ? ACCENT_HEX[n.accent] : 'rgba(0,0,0,.25)',
                            background: isSel ? ACCENT_HEX[n.accent] : 'transparent',
                          }}
                        >
                          {isSel && (
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={n.accent === 'yellow' ? '#000' : '#fff'} strokeWidth="3">
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                          )}
                        </span>
                        {n.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget + timeline */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-black/50">Budget estimé</p>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setBudget(b)}
                        data-cursor
                        className="rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors"
                        style={{
                          borderColor: budget === b ? '#0391D1' : 'rgba(0,0,0,.15)',
                          background: budget === b ? '#0391D1' : 'transparent',
                          color: budget === b ? '#fff' : 'rgba(0,0,0,.6)',
                        }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-black/50">Délai souhaité</p>
                  <div className="flex flex-wrap gap-2">
                    {TIMELINES.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setTimeline(t)}
                        data-cursor
                        className="rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors"
                        style={{
                          borderColor: timeline === t ? '#CB056C' : 'rgba(0,0,0,.15)',
                          background: timeline === t ? '#CB056C' : 'transparent',
                          color: timeline === t ? '#fff' : 'rgba(0,0,0,.6)',
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <textarea
                name="message"
                rows={4}
                placeholder="Parlez-nous de votre projet — contexte, objectifs, contraintes…"
                className={inputCls}
                data-cursor
              />

              <Magnetic>
                <button
                  type="submit"
                  data-cursor
                  className="group relative w-full overflow-hidden rounded-full bg-ink-black px-8 py-4 text-sm font-bold uppercase tracking-widest text-white sm:w-auto"
                >
                  <span className="absolute inset-0 translate-y-full bg-ink-yellow transition-transform duration-400 ease-out group-hover:translate-y-0" />
                  <span className="relative transition-colors duration-300 group-hover:text-black">
                    Envoyer ma demande
                  </span>
                </button>
              </Magnetic>
              <p className="text-xs text-black/40">
                * champs obligatoires. L'envoi ouvre votre client mail avec le message
                pré-rempli, à destination de {CONTACT_EMAIL}.
              </p>
            </motion.form>
          )}
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="border-t border-white/10 bg-ink-black px-6 py-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <Logo className="text-base" />
          <div className="flex flex-col items-center gap-1 sm:items-end">
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm font-semibold text-ink-blue hover:underline" data-cursor>
              {CONTACT_EMAIL}
            </a>
            <p className="text-xs text-white/35">© 2026 INKOVA Communication.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
