/**
 * PLACEHOLDER LOGO — SLOT RÉSERVÉ AU LOGO OFFICIEL INKOVA.
 * Remplacer par les fichiers officiels de la charte (primary / icon / bw)
 * dès réception : /assets/logo-primary.svg, /assets/logo-icon.svg, /assets/logo-bw.svg.
 * Ne pas recolorer, déformer ou réinterpréter le logo officiel.
 */
export default function Logo({
  variant = 'color',
  className = '',
}: {
  variant?: 'color' | 'white' | 'black';
  className?: string;
}) {
  const fill = variant === 'white' ? '#FFFFFF' : variant === 'black' ? '#000000' : '#FFFFFF';
  return (
    <span className={`inline-flex items-center gap-2 select-none ${className}`} aria-label="INKOVA Communication">
      <span className="font-display tracking-tight leading-none" style={{ color: fill, fontSize: '1.35em' }}>
        INK<span style={{ color: variant === 'color' ? '#0391D1' : fill }}>O</span>VA
      </span>
      <span
        className="hidden sm:inline-block h-[1.1em] w-[2px] opacity-40"
        style={{ background: fill }}
        aria-hidden
      />
      <span className="hidden sm:block text-[0.5em] font-semibold uppercase tracking-[0.28em] leading-tight opacity-70" style={{ color: fill }}>
        Communi<br />cation
      </span>
    </span>
  );
}
