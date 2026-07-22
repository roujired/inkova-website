import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'fr' | 'en' | 'ar' | 'de';

export const LANGS: { code: Lang; label: string }[] = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
  { code: 'de', label: 'DE' },
];

/**
 * Site "chrome" copy — nav, hero, section headers, buttons, form labels.
 * Long-form content (the 49 service descriptions) stays in French for now;
 * translating that full catalog is a separate follow-up task.
 */
export const T = {
  fr: {
    nav_agence: 'L\u2019agence', nav_services: 'Services', nav_process: 'Process', nav_pourquoi: 'Pourquoi Inkova', nav_contact: 'Contact',
    nav_devis: 'Devis gratuit', nav_back: '\u2190 Retour au site',
    hero_kicker: 'Agence de publicit\u00e9 \u2014 Alg\u00e9rie',
    hero_headline: ['DES', 'ID\u00c9ES', 'QUI', 'LAISSENT', 'UNE', 'TRACE.'],
    hero_sub: 'Strat\u00e9gie, design, production, \u00e9v\u00e9nementiel \u2014 nous cr\u00e9ons des exp\u00e9riences de communication uniques et impactantes, avec une bonne dose de fun.',
    hero_cta1: 'D\u00e9couvrir nos services', hero_cta2: 'Nous contacter', hero_scroll: 'Scroll',
    services_kicker: 'Nos expertises', services_title1: '7 P\u00d4LES.', services_title2: '49 SERVICES.',
    services_sub: 'De la premi\u00e8re id\u00e9e \u00e0 l\u2019installation physique, un pipeline complet sous un m\u00eame toit. Choisissez un p\u00f4le \u2014 laissez-vous scroller.',
    why_kicker: 'Pourquoi Inkova', why_title1: 'UNE AGENCE QUI', why_title_hl: 'FABRIQUE', why_title2: 'CE QU\u2019ELLE IMAGINE.',
    process_kicker: 'Comment nous travaillons', process_title1: 'DE L\u2019ID\u00c9E', process_title_hl: '\u00c0 LA POSE.',
    contact_kicker: 'Contact', contact_title1: 'UN PROJET ?', contact_title2: 'PARLONS-EN.',
    devis_kicker: 'Devis gratuit \u2014 r\u00e9ponse sous 24 \u00e0 48h', devis_title1: 'PARLEZ-NOUS DE', devis_title2: 'VOTRE PROJET.',
    devis_cta: 'D\u00e9crire mon projet', devis_form_title1: '3 MINUTES POUR NOUS', devis_form_title2: 'DIRE L\u2019ESSENTIEL.',
    footer_tagline: 'Agence de publicit\u00e9 active sur le march\u00e9 alg\u00e9rien \u2014 strat\u00e9gie, cr\u00e9ation, production et \u00e9v\u00e9nementiel sous un m\u00eame toit.',
  },
  en: {
    nav_agence: 'Agency', nav_services: 'Services', nav_process: 'Process', nav_pourquoi: 'Why Inkova', nav_contact: 'Contact',
    nav_devis: 'Free quote', nav_back: '\u2190 Back to site',
    hero_kicker: 'Advertising agency \u2014 Algeria',
    hero_headline: ['IDEAS', 'THAT', 'LEAVE', 'A', 'MARK.'],
    hero_sub: 'Strategy, design, production, events \u2014 we craft unique, high-impact communication experiences, with a good dose of fun.',
    hero_cta1: 'Discover our services', hero_cta2: 'Get in touch', hero_scroll: 'Scroll',
    services_kicker: 'Our expertise', services_title1: '7 FIELDS.', services_title2: '49 SERVICES.',
    services_sub: 'From first idea to physical install, one complete pipeline under one roof. Pick a field \u2014 scroll away.',
    why_kicker: 'Why Inkova', why_title1: 'AN AGENCY THAT', why_title_hl: 'BUILDS', why_title2: 'WHAT IT IMAGINES.',
    process_kicker: 'How we work', process_title1: 'FROM IDEA', process_title_hl: 'TO INSTALL.',
    contact_kicker: 'Contact', contact_title1: 'GOT A PROJECT?', contact_title2: 'LET\u2019S TALK.',
    devis_kicker: 'Free quote \u2014 reply within 24\u201148h', devis_title1: 'TELL US ABOUT', devis_title2: 'YOUR PROJECT.',
    devis_cta: 'Describe my project', devis_form_title1: '3 MINUTES TO TELL US', devis_form_title2: 'THE ESSENTIALS.',
    footer_tagline: 'An advertising agency active in Algeria \u2014 strategy, creative, production and events under one roof.',
  },
  ar: {
    nav_agence: '\u0627\u0644\u0648\u0643\u0627\u0644\u0629', nav_services: '\u0627\u0644\u062e\u062f\u0645\u0627\u062a', nav_process: '\u0627\u0644\u0645\u0646\u0647\u062c\u064a\u0629', nav_pourquoi: '\u0644\u0645\u0627\u0630\u0627 \u0625\u0646\u0643\u0648\u0641\u0627', nav_contact: '\u0627\u062a\u0635\u0644 \u0628\u0646\u0627',
    nav_devis: '\u0639\u0631\u0636 \u0633\u0639\u0631 \u0645\u062c\u0627\u0646\u064a', nav_back: '\u0627\u0644\u0639\u0648\u062f\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u0648\u0642\u0639 \u2192',
    hero_kicker: '\u0648\u0643\u0627\u0644\u0629 \u0625\u0634\u0647\u0627\u0631\u064a\u0629 \u2014 \u0627\u0644\u062c\u0632\u0627\u0626\u0631',
    hero_headline: ['\u0623\u0641\u0643\u0627\u0631', '\u062a\u062a\u0631\u0643', '\u0623\u062b\u0631\u064b\u0627', '\u0644\u0627 \u064a\u064f\u0645\u062d\u0649.'],
    hero_sub: '\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629\u060c \u062a\u0635\u0645\u064a\u0645\u060c \u0625\u0646\u062a\u0627\u062c\u060c \u0641\u0639\u0627\u0644\u064a\u0627\u062a \u2014 \u0646\u0635\u0646\u0639 \u062a\u062c\u0627\u0631\u0628 \u062a\u0648\u0627\u0635\u0644 \u0641\u0631\u064a\u062f\u0629 \u0648\u0630\u0627\u062a \u062a\u0623\u062b\u064a\u0631\u060c \u0645\u0639 \u0642\u062f\u0631 \u0648\u0627\u0641\u0631 \u0645\u0646 \u0627\u0644\u0645\u0631\u062d.',
    hero_cta1: '\u0627\u0643\u062a\u0634\u0641 \u062e\u062f\u0645\u0627\u062a\u0646\u0627', hero_cta2: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627', hero_scroll: '\u0645\u0631\u0631',
    services_kicker: '\u062e\u0628\u0631\u0627\u062a\u0646\u0627', services_title1: '7 \u0623\u0642\u0637\u0627\u0628.', services_title2: '49 \u062e\u062f\u0645\u0629.',
    services_sub: '\u0645\u0646 \u0627\u0644\u0641\u0643\u0631\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \u0625\u0644\u0649 \u0627\u0644\u062a\u0631\u0643\u064a\u0628 \u0627\u0644\u0641\u0639\u0644\u064a\u060c \u0645\u0633\u0627\u0631 \u0645\u062a\u0643\u0627\u0645\u0644 \u062a\u062d\u062a \u0633\u0642\u0641 \u0648\u0627\u062d\u062f. \u0627\u062e\u062a\u0631 \u0642\u0637\u0628\u064b\u0627 \u2014 \u0648\u062a\u0627\u0628\u0639 \u0627\u0644\u062a\u0645\u0631\u064a\u0631.',
    why_kicker: '\u0644\u0645\u0627\u0630\u0627 \u0625\u0646\u0643\u0648\u0641\u0627', why_title1: '\u0648\u0643\u0627\u0644\u0629', why_title_hl: '\u062a\u0635\u0646\u0639', why_title2: '\u0645\u0627 \u062a\u062a\u062e\u064a\u0644\u0647.',
    process_kicker: '\u0643\u064a\u0641 \u0646\u0639\u0645\u0644', process_title1: '\u0645\u0646 \u0627\u0644\u0641\u0643\u0631\u0629', process_title_hl: '\u0625\u0644\u0649 \u0627\u0644\u062a\u0631\u0643\u064a\u0628.',
    contact_kicker: '\u0627\u062a\u0635\u0644 \u0628\u0646\u0627', contact_title1: '\u0644\u062f\u064a\u0643 \u0645\u0634\u0631\u0648\u0639\u061f', contact_title2: '\u0644\u0646\u062a\u062d\u062f\u062b.',
    devis_kicker: '\u0639\u0631\u0636 \u0633\u0639\u0631 \u0645\u062c\u0627\u0646\u064a \u2014 \u0631\u062f \u062e\u0644\u0627\u0644 24 \u0625\u0644\u0649 48 \u0633\u0627\u0639\u0629', devis_title1: '\u062d\u062f\u0651\u062b\u0646\u0627 \u0639\u0646', devis_title2: '\u0645\u0634\u0631\u0648\u0639\u0643.',
    devis_cta: '\u0648\u0635\u0641 \u0645\u0634\u0631\u0648\u0639\u064a', devis_form_title1: '3 \u062f\u0642\u0627\u0626\u0642 \u0644\u0625\u062e\u0628\u0627\u0631\u0646\u0627', devis_form_title2: '\u0628\u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0627\u062a.',
    footer_tagline: '\u0648\u0643\u0627\u0644\u0629 \u0625\u0634\u0647\u0627\u0631\u064a\u0629 \u0646\u0634\u0637\u0629 \u0641\u064a \u0627\u0644\u0633\u0648\u0642 \u0627\u0644\u062c\u0632\u0627\u0626\u0631\u064a \u2014 \u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629\u060c \u0625\u0628\u062f\u0627\u0639\u060c \u0625\u0646\u062a\u0627\u062c \u0648\u0641\u0639\u0627\u0644\u064a\u0627\u062a \u062a\u062d\u062a \u0633\u0642\u0641 \u0648\u0627\u062d\u062f.',
  },
  de: {
    nav_agence: 'Agentur', nav_services: 'Services', nav_process: 'Prozess', nav_pourquoi: 'Warum Inkova', nav_contact: 'Kontakt',
    nav_devis: 'Kostenloses Angebot', nav_back: '\u2190 Zur\u00fcck zur Website',
    hero_kicker: 'Werbeagentur \u2014 Algerien',
    hero_headline: ['IDEEN,', 'DIE', 'SPUREN', 'HINTERLASSEN.'],
    hero_sub: 'Strategie, Design, Produktion, Events \u2014 wir schaffen einzigartige, wirkungsvolle Kommunikationserlebnisse, mit einer guten Portion Spa\u00df.',
    hero_cta1: 'Unsere Leistungen', hero_cta2: 'Kontaktieren Sie uns', hero_scroll: 'Scrollen',
    services_kicker: 'Unsere Expertise', services_title1: '7 BEREICHE.', services_title2: '49 LEISTUNGEN.',
    services_sub: 'Von der ersten Idee bis zur physischen Installation \u2014 eine komplette Pipeline unter einem Dach. W\u00e4hlen Sie einen Bereich.',
    why_kicker: 'Warum Inkova', why_title1: 'EINE AGENTUR, DIE', why_title_hl: 'BAUT', why_title2: 'WAS SIE SICH VORSTELLT.',
    process_kicker: 'Wie wir arbeiten', process_title1: 'VON DER IDEE', process_title_hl: 'ZUR MONTAGE.',
    contact_kicker: 'Kontakt', contact_title1: 'EIN PROJEKT?', contact_title2: 'SPRECHEN WIR DAR\u00dcBER.',
    devis_kicker: 'Kostenloses Angebot \u2014 Antwort innerhalb von 24\u201348h', devis_title1: 'ERZ\u00c4HLEN SIE UNS VON', devis_title2: 'IHREM PROJEKT.',
    devis_cta: 'Mein Projekt beschreiben', devis_form_title1: '3 MINUTEN, UM UNS', devis_form_title2: 'DAS WESENTLICHE ZU SAGEN.',
    footer_tagline: 'Eine Werbeagentur auf dem algerischen Markt \u2014 Strategie, Kreation, Produktion und Events unter einem Dach.',
  },
} as const satisfies Record<Lang, Record<string, string | readonly string[]>>;

type ChromeStrings = Record<string, string> & { hero_headline: readonly string[] };
interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: ChromeStrings; dir: 'ltr' | 'rtl'; }
const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('inkova-lang') as Lang) || 'fr');

  useEffect(() => {
    localStorage.setItem('inkova-lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  return <LangContext.Provider value={{ lang, setLang, t: T[lang] as unknown as ChromeStrings, dir }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
