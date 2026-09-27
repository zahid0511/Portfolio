/* Projects, Journey, Contact, Footer */
const { useEffect: useEffectB, useState: useStateB } = React;

function ProjectCard({ p, i, onOpen }) {
  const [hover, setHover] = useStateB(false);
  return (
    <Reveal delay={(i % 2) * 100}>
      <button onClick={() => onOpen(p)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)}
        className="group text-left w-full h-full rounded-2xl border border-line bg-paper hover:border-ink/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_rgba(22,21,15,.35)] overflow-hidden flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        <div className="relative h-52 sm:h-60 border-b border-line bg-paper2/50 px-8 pt-10 pb-8 overflow-hidden">
          {p.image
            ? <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            : <Glyph type={p.glyph} active={hover} />}
          <div className="absolute top-4 left-5 right-5 flex justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
            <span>{String(i + 1).padStart(2, '0')} · {p.kind}</span><span>{p.year}</span>
          </div>
        </div>
        <div className="p-6 md:p-8 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-serif text-[30px] md:text-[34px] leading-[1.05] tracking-[-0.01em]">{p.title}</h3>
            <span className="shrink-0 w-11 h-11 rounded-full border border-ink/15 grid place-items-center transition-all duration-300 group-hover:bg-accent group-hover:border-accent group-hover:text-paper">
              <Arrow className="w-4 h-4" />
            </span>
          </div>
          <p className="mt-3 text-[15.5px] leading-relaxed text-ink2">{p.summary}</p>
          <div className="mt-auto pt-6 flex flex-wrap gap-2">{p.stack.slice(0, 4).map((s) => <Tag key={s}>{s}</Tag>)}</div>
        </div>
      </button>
    </Reveal>
  );
}

function ProjectDrawer({ p, onClose, onNav }) {
  useEffectB(() => {
    if (!p) return;
    const k = (e) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') onNav(1); if (e.key === 'ArrowLeft') onNav(-1); };
    window.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [p]);
  return (
    <div className={`fixed inset-0 z-[70] transition-all duration-500 ${p ? 'visible' : 'invisible'}`} aria-hidden={!p}>
      <div onClick={onClose} className={`absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-500 ${p ? 'opacity-100' : 'opacity-0'}`} />
      <aside role="dialog" aria-modal="true" aria-label={p ? p.title : ''}
        className={`absolute right-0 top-0 h-full w-full sm:w-[min(640px,92vw)] bg-paper shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] overflow-y-auto no-scrollbar ${p ? 'translate-x-0' : 'translate-x-full'}`}>
        {p && (
          <div key={p.id}>
            <div className="sticky top-0 z-10 bg-paper/90 backdrop-blur border-b border-line flex items-center justify-between px-6 md:px-10 h-16">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">{p.kind} · {p.year}</span>
              <div className="flex gap-2">
                <button onClick={() => onNav(-1)} className="w-10 h-10 rounded-full border border-ink/15 grid place-items-center hover:bg-ink hover:text-paper transition-colors" aria-label="Previous project"><Arrow dir="s" className="w-3.5 h-3.5 rotate-[-135deg]" /></button>
                <button onClick={() => onNav(1)} className="w-10 h-10 rounded-full border border-ink/15 grid place-items-center hover:bg-ink hover:text-paper transition-colors" aria-label="Next project"><Arrow dir="e" className="w-3.5 h-3.5" /></button>
                <button onClick={onClose} className="w-10 h-10 rounded-full bg-ink text-paper grid place-items-center hover:bg-accent transition-colors" aria-label="Close">
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.6"><path d="M3 3l10 10M13 3 3 13" /></svg>
                </button>
              </div>
            </div>
            <div className="px-6 md:px-10 py-10 animate-[fadeUp_.5s_ease]">
              <h3 className="font-serif text-5xl md:text-6xl leading-[1] tracking-[-0.02em]">{p.title}</h3>
              <p className="mt-5 text-lg leading-relaxed text-ink2">{p.summary}</p>
              <div className="mt-8 h-56 rounded-xl border border-line bg-paper2/60 px-8 pt-8 pb-7 overflow-hidden">
                {p.image ? <img src={p.image} alt="" className="w-full h-full object-cover rounded-lg" /> : <Glyph type={p.glyph} active />}
              </div>
              <dl className="mt-10 space-y-9">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent mb-2.5">The problem</dt>
                  <dd className="text-[16.5px] leading-relaxed">{p.problem}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent mb-3">Approach</dt>
                  <dd>
                    <ol className="space-y-3">
                      {p.approach.map((a, i) => (
                        <li key={i} className="grid grid-cols-[32px_1fr] text-[16px] leading-relaxed text-ink2">
                          <span className="font-mono text-[12px] text-mute pt-1">{String(i + 1).padStart(2, '0')}</span><span>{a}</span>
                        </li>
                      ))}
                    </ol>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent mb-2.5">Outcome</dt>
                  <dd className="font-serif text-[26px] leading-snug">{p.outcome}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent mb-3">Stack</dt>
                  <dd className="flex flex-wrap gap-2">{p.stack.map((s) => <Tag key={s}>{s}</Tag>)}</dd>
                </div>
              </dl>
              <div className="mt-12 pt-8 border-t border-line flex flex-wrap gap-3">
                <Btn href={p.github} external>View on GitHub</Btn>
                {p.demo && <Btn href={p.demo} variant="ghost" external>Live demo</Btn>}
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

function Projects({ d }) {
  const [filter, setFilter] = useStateB('All');
  const [open, setOpen] = useStateB(null);
  const kinds = ['All', ...Array.from(new Set(d.projects.map((p) => p.kind)))];
  const list = d.projects.filter((p) => filter === 'All' || p.kind === filter);
  const nav = (dir) => setOpen((cur) => {
    if (!cur) return cur;
    const i = d.projects.findIndex((p) => p.id === cur.id);
    return d.projects[(i + dir + d.projects.length) % d.projects.length];
  });
  return (
    <section id="work" data-screen-label="Projects" className="py-24 md:py-36 border-t border-line">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8">
        <SectionHead index="03" label="Selected work" title={<>Projects that answer <em className="text-accent">real questions</em>.</>}>
          Each project started with a business or research question. Open one to see the problem, the approach and what came out of it.
        </SectionHead>
        <Reveal className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-1.5 p-1 rounded-full border border-line bg-paper2/50">
            {kinds.map((k) => (
              <button key={k} onClick={() => setFilter(k)} className={`h-9 px-4 rounded-full font-mono text-[12px] uppercase tracking-[0.08em] transition-colors ${filter === k ? 'bg-ink text-paper' : 'text-mute hover:text-ink'}`}>
                {k} <span className="opacity-60">{k === 'All' ? d.projects.length : d.projects.filter((p) => p.kind === k).length}</span>
              </button>
            ))}
          </div>
          <a href={d.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.1em] text-ink2 link-u">All repositories on GitHub <Arrow className="w-3 h-3" /></a>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {list.map((p) => <ProjectCard key={p.id} p={p} i={d.projects.indexOf(p)} onOpen={setOpen} />)}
        </div>
      </div>
      <ProjectDrawer p={open} onClose={() => setOpen(null)} onNav={nav} />
    </section>
  );
}

function Journey({ d }) {
  return (
    <section id="journey" data-screen-label="Experience & Education" className="py-24 md:py-36 border-t border-line bg-paper2/60">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8">
        <SectionHead index="04" label="Experience & Education" title={<>Where the <em className="text-accent">foundations</em> came from.</>} />
        <div className="grid grid-cols-12">
          <div className="hidden md:block md:col-span-3" />
          <ol className="col-span-12 md:col-span-9 border-t border-ink">
            {d.timeline.map((t, i) => (
              <Reveal as="li" key={i} delay={i * 100} className="group grid grid-cols-12 gap-y-4 gap-x-6 py-10 md:py-12 border-b border-line">
                <div className="col-span-12 sm:col-span-4">
                  <div className="font-mono text-[12px] text-accent uppercase tracking-[0.14em]">{t.type}</div>
                  <div className="mt-2 font-serif text-3xl text-mute group-hover:text-ink transition-colors">{t.period}</div>
                </div>
                <div className="col-span-12 sm:col-span-8">
                  <h3 className="font-serif text-[34px] md:text-[42px] leading-[1.05] tracking-[-0.01em]">{t.title}</h3>
                  <div className="mt-2 text-[15px] font-medium text-ink2">{t.org}</div>
                  <p className="mt-4 text-[16.5px] leading-relaxed text-ink2 max-w-2xl">{t.d}</p>
                  <div className="mt-5 flex flex-wrap gap-2">{t.tags.map((x) => <Tag key={x}>{x}</Tag>)}</div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Contact({ d }) {
  const [copied, setCopied] = useStateB(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(d.links.email); } catch (e) {}
    setCopied(true); setTimeout(() => setCopied(false), 1800);
  };
  const rows = [
    ['Email', d.links.email, `mailto:${d.links.email}`, false],
    ['LinkedIn', d.links.linkedin.replace(/^https?:\/\/(www\.)?/, ''), d.links.linkedin, true],
    ['GitHub', d.links.github.replace(/^https?:\/\//, ''), d.links.github, true],
    ['Resume', 'View / download', d.links.resume, true],
  ];
  return (
    <section id="contact" data-screen-label="Contact" className="relative bg-night text-paper py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 relative">
        <Reveal className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.14em] text-paper/50 mb-10">
          <span className="text-accent">05</span><span className="h-px w-8 bg-paper/20" /><span>Contact</span>
        </Reveal>
        <Reveal as="h2" className="font-serif text-[56px] leading-[0.95] sm:text-8xl md:text-[128px] xl:text-[150px] tracking-[-0.03em]">
          Let's build<br />something <em className="text-accent">useful</em>.
        </Reveal>
        <div className="mt-14 md:mt-20 grid grid-cols-12 gap-y-12 lg:gap-x-12">
          <Reveal className="col-span-12 lg:col-span-5">
            <p className="text-lg md:text-xl leading-relaxed text-paper/75 max-w-md">
              I'm looking for roles in Data Analytics, AI/ML and AI product development. If you're hiring, working on something interesting, or just want to talk about data, my inbox is open.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href={`mailto:${d.links.email}?subject=Opportunity%20for%20MD%20Zahid`} variant="light">Send an email</Btn>
              <button onClick={copy} className="inline-flex items-center gap-2.5 h-12 px-6 rounded-full border border-paper/25 text-paper text-[15px] font-medium hover:border-paper transition-colors">
                {copied ? 'Copied ✓' : 'Copy address'}
              </button>
            </div>
          </Reveal>
          <ul className="col-span-12 lg:col-span-7 border-t border-paper/15">
            {rows.map(([k, v, href, ext], i) => (
              <Reveal as="li" key={k} delay={i * 70}>
                <a href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                   className="group grid grid-cols-[90px_1fr_auto] sm:grid-cols-[140px_1fr_auto] items-center gap-4 py-6 md:py-7 border-b border-paper/15 transition-colors hover:bg-paper/[0.03]">
                  <span className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-paper/45">{k}</span>
                  <span className="font-serif text-2xl sm:text-3xl md:text-4xl truncate transition-transform duration-300 group-hover:translate-x-2">{v}</span>
                  <span className="w-11 h-11 rounded-full border border-paper/20 grid place-items-center transition-all duration-300 group-hover:bg-accent group-hover:border-accent">
                    <Arrow className="w-4 h-4" />
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Footer({ d }) {
  return (
    <footer className="bg-night text-paper/45 border-t border-paper/10">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row gap-4 justify-between font-mono text-[11.5px] uppercase tracking-[0.12em]">
        <span>© {new Date().getFullYear()} {d.name} · {d.location}</span>
        <a href="#top" className="inline-flex items-center gap-2 hover:text-paper transition-colors">Back to top <Arrow className="w-3 h-3 -rotate-45" /></a>
      </div>
    </footer>
  );
}

Object.assign(window, { Projects, Journey, Contact, Footer });
