import { useEffect, useRef } from 'react';

/**
 * Custom cursor: dot + trailing ring.
 * Ring morphs on interactive elements ([data-cursor] or links/buttons).
 * Auto-disabled on touch devices via CSS; respects reduced motion.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.body.classList.add('custom-cursor');
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let x = -100, y = -100, rx = -100, ry = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest('a, button, [data-cursor], input, textarea, select, label, [role="button"]');
      ring.classList.toggle('is-hover', !!interactive);
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="ink-cursor-dot" aria-hidden />
      <div ref={ringRef} className="ink-cursor-ring" aria-hidden />
    </>
  );
}
