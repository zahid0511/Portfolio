/* Nav, Hero, About, Skills */
const { useEffect: useEffectT, useState: useStateT, useRef: useRefT } = React;

const NAV_ITEMS = [
  ['about', 'About'], ['skills', 'Skills'], ['work', 'Work'], ['journey', 'Journey'], ['contact', 'Contact'],
];

function Nav({ d }) {
  const [scrolled, setScrolled] = useStateT(false);
  const [open, setOpen] = useStateT(false);
  const [active, setActive] = useStateT('');
  useEffectT(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      let cur = '';
      NAV_ITEMS.forEach(([id]) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id;
      });
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffectT(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-paper/85 backdrop-blur-md border-b border-line/70' : 'border-b border-transparent'}`}>
      <nav className="max-w-[1320px] mx-auto px-5 sm:px-8 h-16 md:h-[72px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group" aria-label="Home">
          <span className="w-9 h-9 rounded-full bg-ink text-paper grid place-items-center font-serif text-[17px] italic transition-colors group-hover:bg-accent">{d.initials}</span>
          <span className="hidden sm:block text-[15px] font-medium tracking-tight">{d.name}</span>
        </a>
        <ul className="hidden md:flex items-center gap-1 font-mono text-[12.5px] uppercase tracking-[0.1em]">
          {NAV_ITEMS.map(([id, label], i) => (
            <li key={id}>
              <a href={`#${id}`} className={`px-3.5 py-2 rounded-full transition-colors ${active === id ? 'text-ink bg-ink/[0.06]' : 'text-mute hover:text-ink'}`}>
                <span className="text-accent/80 mr-1">0{i + 1}</span>{label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href={d.links.resume} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-2 h-10 px-5 rounded-full bg-ink text-paper text-[14px] font-medium hover:bg-accent transition-colors">
            Resume <Arrow className="w-3 h-3" />
          </a>
          <button onClick={() => setOpen(!open)} className="md:hidden w-11 h-11 grid place-items-center rounded-full border border-ink/15" aria-label="Menu" aria-expanded={open}>
            <span className="relative w-4 h-3">
              <span className={`absolute left-0 w-4 h-[1.5px] bg-ink transition-all ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 w-4 h-[1.5px] bg-ink transition-all ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </nav>
      {/* mobile sheet */}
      <div className={`md:hidden fixed inset-x-0 top-16 bottom-0 bg-paper transition-all duration-500 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <ul className="px-6 pt-8 space-y-1">
          {NAV_ITEMS.map(([id, label], i) => (
            <li key={id} className="border-b border-line">
              <a href={`#${id}`} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-5">
                <span className="font-serif text-4xl">{label}</span>
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="px-6 pt-8"><Btn href={d.links.resume} external>Download resume</Btn></div>
      </div>
    </header>
  );
}

/* ---------- Live analysis console ---------- */
const CONSOLE_SCRIPTS = [
  {
    tab: 'query.sql', lang: 'SQL',
    lines: [
      ['k', 'SELECT '], ['t', 'region, '], ['f', 'SUM'], ['t', '(revenue) '], ['k', 'AS '], ['t', 'total'], ['n', '\n'],
      ['k', 'FROM '], ['t', 'orders'], ['n', '\n'],
      ['k', 'GROUP BY '], ['t', 'region '], ['k', 'ORDER BY '], ['t', 'total '], ['k', 'DESC'], ['t', ';'],
    ],
    out: { type: 'bars', label: '4 rows · 38 ms', rows: [['East', 92], ['North', 74], ['West', 58], ['South', 41]] },
  },
  {
    tab: 'model.py', lang: 'Python',
    lines: [
      ['k', 'from '], ['t', 'sklearn.metrics '], ['k', 'import '], ['t', 'accuracy_score'], ['n', '\n'],
      ['t', 'model.'], ['f', 'fit'], ['t', '(X_train, y_train)'], ['n', '\n'],
      ['f', 'accuracy_score'], ['t', '(y_test, model.'], ['f', 'predict'], ['t', '(X_test))'],
    ],
    out: { type: 'metric', label: 'test set · n = 20,000', value: '0.94', caption: 'accuracy · real vs. AI-generated' },
  },
  {
    tab: 'ask.llm', lang: 'LLM',
    lines: [
      ['c', '# plain-English question over sales.csv'], ['n', '\n'],
      ['s', '"Why did revenue dip in Q3,'], ['n', '\n'],
      ['s', ' and which products drove it?"'],
    ],
    out: { type: 'text', label: 'grounded answer', value: 'Q3 revenue fell 8.2%, mostly from two SKUs in the West region. Both had stock-outs in August.' },
  },
];

const tokColor = { k: 'text-[#E07A4F]', f: 'text-[#D9C9A3]', t: 'text-paper/85', s: 'text-[#A9C29A]', c: 'text-paper/40', n: '' };

function AnalysisConsole() {
  const [idx, setIdx] = useStateT(0);
  const [chars, setChars] = useStateT(0);
  const [showOut, setShowOut] = useStateT(false);
  const script = CONSOLE_SCRIPTS[idx];
  const full = script.lines.map((l) => l[1]).join('');

  useEffectT(() => {
    setChars(0); setShowOut(false);
    let c = 0; let t;
    const type = () => {
      c += 1; setChars(c);
      if (c < full.length) t = setTimeout(type, 22 + Math.random() * 30);
      else t = setTimeout(() => { setShowOut(true); t = setTimeout(() => setIdx((i) => (i + 1) % CONSOLE_SCRIPTS.length), 3800); }, 350);
    };
    t = setTimeout(type, 500);
    return () => clearTimeout(t);
  }, [idx]);

  // render tokens up to `chars`
  let remaining = chars;
  const rendered = [];
  script.lines.forEach(([k, txt], i) => {
    if (remaining <= 0) return;
    const part = txt.slice(0, remaining);
    remaining -= txt.length;
    if (k === 'n') rendered.push(<br key={i} />);
    else rendered.push(<span key={i} className={tokColor[k]}>{part}</span>);
  });

  return (
    <div className="relative rounded-2xl bg-night text-paper shadow-[0_30px_80px_-30px_rgba(22,21,15,.55)] overflow-hidden ring-1 ring-ink">
      <div className="flex items-center justify-between px-4 h-11 border-b border-paper/10">
        <div className="flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="w-2.5 h-2.5 rounded-full bg-paper/15" />)}</div>
        <div className="flex gap-1 font-mono text-[11px]">
          {CONSOLE_SCRIPTS.map((s, i) => (
            <button key={s.tab} onClick={() => setIdx(i)} className={`px-2.5 py-1 rounded-md transition-colors ${i === idx ? 'bg-paper/10 text-paper' : 'text-paper/40 hover:text-paper/70'}`}>{s.tab}</button>
          ))}
        </div>
        <span className="font-mono text-[10.5px] text-paper/40 hidden sm:block w-12 text-right">{script.lang}</span>
      </div>
      <div className="px-5 pt-5 pb-4 font-mono text-[12.5px] sm:text-[13px] leading-[1.75] min-h-[108px]">
        {rendered}{!showOut && <span className="caret ml-0.5" />}
      </div>
      <div className="border-t border-paper/10 px-5 py-4 min-h-[150px]">
        <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.12em] text-paper/40 mb-3">
          <span>Output</span><span>{showOut ? script.out.label : 'running…'}</span>
        </div>
        <div className={`transition-all duration-500 ${showOut ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          {script.out.type === 'bars' && (
            <div className="space-y-2">
              {script.out.rows.map(([r, v], i) => (
                <div key={r} className="flex items-center gap-3 font-mono text-[11.5px]">
                  <span className="w-11 text-paper/55">{r}</span>
                  <div className="flex-1 h-[7px] rounded-full bg-paper/[0.06] overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: showOut ? `${v}%` : '0%', background: i === 0 ? '#E07A4F' : 'rgba(243,240,232,.35)', transitionDelay: `${i * 90}ms` }} />
                  </div>
                  <span className="w-8 text-right text-paper/70">{v}k</span>
                </div>
              ))}
            </div>
          )}
          {script.out.type === 'metric' && (
            <div className="flex items-end gap-4">
              <span className="font-serif text-6xl leading-none text-[#E07A4F]">{script.out.value}</span>
              <span className="font-mono text-[11.5px] text-paper/55 pb-1.5">{script.out.caption}</span>
            </div>
          )}
          {script.out.type === 'text' && (
            <p className="text-[14.5px] leading-relaxed text-paper/85"><span className="text-[#E07A4F] font-mono text-[12px] mr-2">→</span>{script.out.value}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function LocalTime({ tz }) {
  const [t, setT] = useStateT('');
  useEffectT(() => {
    const f = () => setT(new Date().toLocaleTimeString('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit' }));
    f(); const i = setInterval(f, 30000); return () => clearInterval(i);
  }, [tz]);
  return <span>{t}</span>;
}

function Hero({ d }) {
  useReveal();
  const [mounted, setMounted] = useStateT(false);
  useEffectT(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);
  const words = `${d.headline.lead}`.split(' ');
  return (
    <section id="top" data-screen-label="Hero" className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)] pointer-events-none" />
      <div className="relative max-w-[1320px] mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-mute mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 text-ink">
            <span className="relative flex w-2 h-2"><span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-60" /><span className="relative w-2 h-2 rounded-full bg-accent" /></span>
            {d.status}
          </span>
          <span>{d.location} · <LocalTime tz={d.timezone} /> IST</span>
        </div>

        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className={`font-mono text-[13px] text-accent mb-5 transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>{d.name} / {d.role}</p>
            <h1 className="font-serif text-[52px] leading-[0.98] sm:text-7xl md:text-[88px] xl:text-[104px] tracking-[-0.025em]">
              {words.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em]">
                  <span className="inline-block transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)]" style={{ transform: mounted ? 'none' : 'translateY(105%)', transitionDelay: `${120 + i * 70}ms` }}>{w}</span>
                </span>
              ))}
              <span className="inline-block overflow-hidden align-bottom">
                <span className="inline-block italic text-accent transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)]" style={{ transform: mounted ? 'none' : 'translateY(105%)', transitionDelay: `${120 + words.length * 70}ms` }}>{d.headline.emphasis}</span>
              </span>
              <span className={`block mt-3 md:mt-4 text-[26px] sm:text-4xl md:text-[44px] leading-[1.1] text-ink2 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '700ms' }}>
                {d.headline.tail}
              </span>
            </h1>
            <p className={`mt-8 max-w-xl text-[17px] md:text-lg leading-relaxed text-ink2 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '850ms' }}>
              {d.intro}
            </p>
            <div className={`mt-10 flex flex-wrap gap-3 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1000ms' }}>
              <Btn href="#work">View projects</Btn>
              <Btn href={d.links.resume} variant="ghost" external>Resume</Btn>
              <Btn href="#contact" variant="ghost">Contact</Btn>
            </div>
          </div>
          <div className={`col-span-12 lg:col-span-5 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '500ms' }}>
            <AnalysisConsole />
            <p className="mt-3 font-mono text-[11px] text-mute text-right">How I work: question → query → model → answer</p>
          </div>
        </div>

        <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 border-t border-line">
          {[['Focus', 'Data Analytics'], ['Building', 'LLM-powered tools'], ['Stack', 'Python · SQL · Power BI'], ['Degree', 'B.Tech, CSE']].map(([k, v], i) => (
            <Reveal key={k} delay={i * 80} className={`py-5 pr-4 ${i % 2 ? 'pl-4 md:pl-6 border-l border-line' : ''} ${i === 2 ? 'md:pl-6 md:border-l border-line' : ''} ${i > 1 ? 'border-t md:border-t-0 border-line' : ''}`}>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute mb-1.5">{k}</div>
              <div className="text-[15px] md:text-base font-medium">{v}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About({ d }) {
  return (
    <section id="about" data-screen-label="About" className="py-24 md:py-36 border-t border-line">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8">
        <SectionHead index="01" label="About" title={<>Curious about the <em className="text-accent">why</em> behind the numbers.</>} />
        <div className="grid grid-cols-12 gap-y-14 md:gap-x-6">
          <div className="hidden md:block md:col-span-3" />
          <div className="col-span-12 md:col-span-9 lg:col-span-5">
            <Reveal as="blockquote" className="font-serif text-[28px] md:text-[34px] leading-[1.22] tracking-[-0.01em] border-l-2 border-accent pl-6">
              {d.about.pull}
            </Reveal>
            <div className="mt-10 space-y-5 text-[17px] leading-[1.75] text-ink2">
              {d.about.paragraphs.map((p, i) => <Reveal as="p" key={i} delay={i * 80}>{p}</Reveal>)}
            </div>
          </div>
          <div className="col-span-12 md:col-span-9 md:col-start-4 lg:col-span-4 lg:col-start-9">
            <Reveal className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-mute mb-4">How I approach work</Reveal>
            <ol className="border-t border-line">
              {d.about.principles.map((p, i) => (
                <Reveal as="li" key={p.k} delay={i * 90} className="group py-6 border-b border-line grid grid-cols-[40px_1fr] gap-2">
                  <span className="font-mono text-[12px] text-accent pt-1.5">{p.k}</span>
                  <div>
                    <h3 className="font-serif text-[26px] leading-tight transition-transform duration-300 group-hover:translate-x-1">{p.t}</h3>
                    <p className="mt-1.5 text-[15px] text-ink2 leading-relaxed">{p.d}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills({ d }) {
  const [sel, setSel] = useStateT(0);
  const s = d.skills[sel];
  const cats = ['Analysis', 'Visualisation', 'AI'];
  return (
    <section id="skills" data-screen-label="Skills" className="py-24 md:py-36 bg-paper2/60 border-t border-line">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8">
        <SectionHead index="02" label="Skills" title={<>A toolkit for going from <em className="text-accent">raw data</em> to working AI.</>}>
          Pick a skill to see the tools behind it and where I've used it.
        </SectionHead>
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-7">
            {cats.map((c) => (
              <Reveal key={c} className="mb-8 last:mb-0">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute mb-3">{c}</div>
                <div className="flex flex-wrap gap-2.5">
                  {d.skills.map((sk, i) => sk.cat === c && (
                    <button key={sk.name} onClick={() => setSel(i)} onMouseEnter={() => window.matchMedia('(hover:hover)').matches && setSel(i)}
                      className={`group relative h-14 md:h-16 px-5 md:px-7 rounded-full border text-[20px] md:text-[26px] font-serif transition-all duration-300 ${sel === i ? 'bg-ink text-paper border-ink' : 'border-ink/15 hover:border-ink bg-paper/40'}`}>
                      {sk.name}
                      <span className={`ml-2 font-mono text-[11px] align-middle ${sel === i ? 'text-accent' : 'text-mute'}`}>{String(i + 1).padStart(2, '0')}</span>
                    </button>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
          <div className="col-span-12 lg:col-span-5">
            <Reveal className="lg:sticky lg:top-28 rounded-2xl bg-paper border border-line p-7 md:p-9 min-h-[340px]">
              <div key={sel} className="animate-[fadeUp_.45s_ease]">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
                  <span>{s.cat}</span><span className="text-accent">{String(sel + 1).padStart(2, '0')} / {String(d.skills.length).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-6 font-serif text-5xl md:text-6xl tracking-[-0.02em]">{s.name}</h3>
                <p className="mt-4 text-[16.5px] leading-relaxed text-ink2">{s.d}</p>
                <div className="mt-6 flex flex-wrap gap-2">{s.tools.map((t) => <Tag key={t}>{t}</Tag>)}</div>
                <div className="mt-8 pt-5 border-t border-line">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute mb-2.5">Used in</div>
                  <ul className="space-y-1.5">
                    {s.used.map((u) => (
                      <li key={u}><a href="#work" className="inline-flex items-center gap-2 text-[15px] font-medium link-u">{u}<Arrow className="w-3 h-3 text-accent" dir="se" /></a></li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}

Object.assign(window, { Nav, Hero, About, Skills });
