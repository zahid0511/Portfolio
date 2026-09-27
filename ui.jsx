/* Shared UI primitives */
const { useEffect, useRef, useState } = React;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  return (
    <Tag className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

function Arrow({ className = 'w-4 h-4', dir = 'ne' }) {
  const rot = { ne: 0, e: 45, s: 135, se: 90 }[dir] || 0;
  return (
    <svg viewBox="0 0 16 16" className={className} style={{ transform: `rotate(${rot}deg)` }} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

function Btn({ href, children, variant = 'solid', onClick, external, className = '' }) {
  const base = 'group inline-flex items-center gap-2.5 h-12 px-6 rounded-full text-[15px] font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper';
  const v = {
    solid: 'bg-ink text-paper hover:bg-accent',
    ghost: 'border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper',
    light: 'bg-paper text-ink hover:bg-accent hover:text-paper',
    lightGhost: 'border border-paper/25 text-paper hover:border-paper hover:bg-paper hover:text-ink',
  }[variant];
  return (
    <a href={href} onClick={onClick} className={`${base} ${v} ${className}`}
       {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
      <Arrow className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

function SectionHead({ index, label, title, children }) {
  return (
    <div className="grid grid-cols-12 gap-6 mb-14 md:mb-20">
      <Reveal className="col-span-12 md:col-span-3 flex items-start gap-3 font-mono text-[12px] uppercase tracking-[0.14em] text-mute pt-3">
        <span className="text-accent">{index}</span><span className="h-px w-8 bg-line mt-[7px]" /><span>{label}</span>
      </Reveal>
      <div className="col-span-12 md:col-span-9">
        <Reveal as="h2" delay={80} className="font-serif text-[44px] leading-[1.02] sm:text-6xl md:text-7xl tracking-[-0.02em]">{title}</Reveal>
        {children && <Reveal delay={160} className="mt-6 max-w-2xl text-lg text-ink2 leading-relaxed">{children}</Reveal>}
      </div>
    </div>
  );
}

/* Simple, abstract data "glyphs" for project cards: basic shapes only */
function Glyph({ type, active }) {
  const acc = '#C2461B';
  const ink = active ? '#16150F' : '#16150F';
  if (type === 'bars') {
    const h = [38, 52, 44, 66, 58, 80, 72, 94];
    return (
      <div className="flex items-end gap-[6px] h-full w-full">
        {h.map((v, i) => (
          <div key={i} className="flex-1 rounded-t-[2px] transition-all duration-700"
               style={{ height: `${active ? v : v * 0.55}%`, background: i === h.length - 1 ? acc : ink, opacity: i === h.length - 1 ? 1 : 0.14 + i * 0.07, transitionDelay: `${i * 40}ms` }} />
        ))}
      </div>
    );
  }
  if (type === 'grid') {
    const cells = Array.from({ length: 48 });
    const hot = new Set([3, 9, 14, 20, 22, 27, 33, 38, 41, 45]);
    return (
      <div className="grid grid-cols-8 gap-[5px] w-full h-full content-end">
        {cells.map((_, i) => (
          <div key={i} className="aspect-square rounded-[2px] transition-all duration-500"
               style={{ background: hot.has(i) ? acc : ink, opacity: hot.has(i) ? (active ? 1 : 0.5) : 0.1, transform: active && hot.has(i) ? 'scale(1)' : 'scale(.85)', transitionDelay: `${(i % 8) * 30}ms` }} />
        ))}
      </div>
    );
  }
  if (type === 'scatter') {
    const pts = [[8,78],[16,64],[22,70],[30,52],[36,58],[44,40],[50,46],[58,30],[64,36],[72,20],[80,26],[88,12],[20,40],[70,62],[40,80]];
    return (
      <div className="relative w-full h-full">
        <div className="absolute left-[6%] right-[8%] top-1/2 h-px origin-left transition-transform duration-700"
             style={{ background: acc, transform: `rotate(-32deg) scaleX(${active ? 1 : 0})`, top: '82%' }} />
        {pts.map(([x, y], i) => (
          <div key={i} className="absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
               style={{ left: `${x}%`, top: `${y}%`, background: i > 11 ? acc : ink, opacity: i > 11 ? 0.9 : 0.35, transitionDelay: `${i * 25}ms`, transform: `translate(-50%,-50%) scale(${active ? 1.2 : 1})` }} />
        ))}
      </div>
    );
  }
  // table
  return (
    <div className="w-full h-full flex flex-col justify-end gap-[6px]">
      {[0, 1, 2, 3, 4].map((r) => (
        <div key={r} className="flex gap-[6px]">
          {[28, 40, 18, 14].map((w, c) => (
            <div key={c} className="h-[10px] rounded-[2px] transition-all duration-500"
                 style={{ width: `${w}%`, background: r === 0 ? ink : (c === 0 && active ? acc : ink), opacity: r === 0 ? 0.55 : (c === 0 && active ? 0.9 : 0.12), transitionDelay: `${r * 50}ms` }} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Tag({ children, dark }) {
  return (
    <span className={`inline-flex items-center h-7 px-3 rounded-full font-mono text-[11.5px] tracking-wide ${dark ? 'border border-paper/15 text-paper/70' : 'border border-ink/12 text-ink2 bg-paper/60'}`}>
      {children}
    </span>
  );
}

Object.assign(window, { useReveal, Reveal, Arrow, Btn, SectionHead, Glyph, Tag });
