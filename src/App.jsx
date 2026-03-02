import { useState } from 'react';
import './index.css';
import {
  GREETINGS, HERO_SUBS, HERO_BGS,
  ANU_VERSES, ANU_NOTES,
  K_QUOTES, K_NOTES,
  BALA_CRIES, PHASES,
  anuPlan, kPlan, bPlan,
} from './data';
import './App.css';
/* ─── GLOBAL KEYFRAMES ───────────────────────────────────────────────────────*/
function GS() {
  return (
    <style>{`
      @keyframes cFall{0%{transform:translateY(-8px) rotate(0deg);opacity:1}100%{transform:translateY(110px) rotate(540deg);opacity:0}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
      @keyframes popIn{0%{transform:scale(.5);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
      @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
      @keyframes pulse2{0%,100%{opacity:.6}50%{opacity:1}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes firework{0%{transform:scale(0) rotate(0deg);opacity:1}100%{transform:scale(1.8) rotate(720deg);opacity:0}}
      .fu{animation:fadeUp .55s ease-out both}
      .pi{animation:popIn .4s cubic-bezier(.2,1.4,.6,1) both}
      .bb{animation:bob 4s ease-in-out infinite}
      .fi{animation:fadeIn .4s ease-out both}
      input::placeholder{color:rgba(255,255,255,0.35)}
    `}</style>
  );
}

/* ─── UTILITIES ──────────────────────────────────────────────────────────────*/
const rnd = arr => arr[Math.floor(Math.random() * arr.length)];

function buildChecked(plan) {
  const o = {};
  plan.forEach((d, di) => d.tasks.forEach((_, ti) => { o[`${di}-${ti}`] = false; }));
  return o;
}

function loadChecked(key, plan) {
  try {
    const s = localStorage.getItem(key);
    if (s) return JSON.parse(s);
  } catch (_) { }
  return buildChecked(plan);
}

function saveChecked(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch (_) { }
}

function calcPct(plan, checked) {
  const total = plan.reduce((s, d) => s + d.tasks.length, 0);
  const done = Object.values(checked).filter(Boolean).length;
  return total ? Math.round((done / total) * 100) : 0;
}

function daysLeft(isoTarget) {
  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(isoTarget);
  const diff = Math.ceil((target - todayMidnight) / 86400000);
  return Math.max(0, diff);
}

function todayCardIndex(plan) {
  const todayStr = new Date().toISOString().slice(0, 10);
  return plan.findIndex(d => d.isoDate === todayStr);
}

function buildShareText(name, pct, done, total, driveDate) {
  return `📚 Victory Vault — ${name}'s Progress\n` +
    `✅ ${done}/${total} tasks done (${pct}%)\n` +
    `🎯 Drive date: ${driveDate}\n` +
    `💪 Prepared by a brother with love. Keep going!\n` +
    `— The Victory Vault`;
}

/* ─── SHARED COMPONENTS ──────────────────────────────────────────────────────*/
function PBar({ pct, cls }) {
  return (
    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-700 ease-out ${cls}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function BackBtn({ onClick }) {
  return (
    <button onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-sm font-medium transition-all duration-200 border border-white/10">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to Home
    </button>
  );
}

function Countdown({ days, accentCls, labelCls }) {
  if (days <= 0) return <span className={`text-xs font-bold ${accentCls}`}>Drive Day is here! 🎉</span>;
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 ${labelCls} text-xs font-semibold`}>
      <span className="text-lg font-bold">{days}</span>
      {days === 1 ? 'day to go' : 'days to go'} · Stay focused 🔒
    </div>
  );
}

function ShareBtn({ text, accentCls }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => { });
  };
  return (
    <button onClick={copy}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border
        ${copied ? 'bg-green-500/20 border-green-400/40 text-green-300' : `bg-white/5 border-white/10 hover:bg-white/10 ${accentCls}`}`}>
      {copied ? '✅ Copied for WhatsApp!' : '📤 Share Progress'}
    </button>
  );
}

function DayConfetti() {
  const cols = ['#fbbf24', '#60a5fa', '#a78bfa', '#34d399', '#f87171', '#fb923c', '#e879f9', '#2dd4bf'];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="absolute w-2 h-2 rounded-sm"
          style={{
            left: `${4 + i * 5.8}%`, top: '2%', backgroundColor: cols[i % cols.length],
            animation: `cFall ${0.7 + (i % 4) * 0.22}s ease-in ${(i % 6) * 0.07}s both`, transform: `rotate(${i * 30}deg)`
          }} />
      ))}
    </div>
  );
}

function CelebrationOverlay({ name, onClose, accentCls }) {
  const emojis = ['🎉', '🏆', '⭐', '✨', '🎊', '💫', '🌟', '🎈'];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm fi"
      onClick={onClose}>
      <div className="relative text-center p-10 rounded-3xl border border-white/20 bg-white/5 max-w-sm mx-4 shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <div className="text-5xl mb-4">🏆</div>
        <h2 className={`text-3xl font-bold mb-2 ${accentCls}`} style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
          100% Complete!
        </h2>
        <p className="text-white/70 text-base mb-1">{name}, you did it!</p>
        <p className="text-white/40 text-sm mb-6">God saw every late night. Every formula. Every effort. Proud of you. 🙏</p>
        <div className="flex flex-wrap justify-center gap-2 mb-6 text-2xl">
          {emojis.map((e, i) => <span key={i} style={{ animation: `firework ${0.8 + i * 0.1}s ease-out ${i * 0.08}s both` }}>{e}</span>)}
        </div>
        <button onClick={onClose}
          className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all duration-200 border border-white/20">
          Close
        </button>
      </div>
    </div>
  );
}

function DayCard({ day, dayIdx, checked, onToggle, bc, cc, badge, phase, withConfetti, todayIdx }) {
  const done = day.tasks.filter((_, ti) => checked[ti]).length;
  const total = day.tasks.length;
  const allDone = done === total;
  const isToday = dayIdx === todayIdx;
  return (
    <div className={`relative rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden backdrop-blur-sm
      ${allDone
        ? 'bg-white/10 border-white/25'
        : isToday
          ? `bg-white/8 ${bc.replace('border-', 'border-')}`
          : 'bg-white/5 border-white/10'
      }`}>
      {allDone && withConfetti && <DayConfetti />}
      {isToday && !allDone && (
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 border border-green-400/30 text-green-400 font-semibold">Today 📍</span>
        </div>
      )}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-1">
        <div className="flex items-center gap-2 flex-wrap pr-14">
          <span className={`text-xs font-bold uppercase tracking-widest ${badge}`}>{day.day}</span>
          <span className="text-white/40 text-xs">{day.date}</span>
          {phase && <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/40">{phase}</span>}
        </div>
        <span className={`text-xs font-semibold flex-shrink-0 ${allDone ? 'text-green-400' : 'text-white/35'}`}>{done}/{total}</span>
      </div>
      {allDone && <p className="text-center text-green-400 text-xs font-bold mb-2 pi">Day Complete! 🎉</p>}
      <ul className="space-y-3">
        {day.tasks.map((task, ti) => (
          <li key={ti} onClick={() => onToggle(ti)} className="flex items-start gap-3 cursor-pointer group">
            <div className={`mt-0.5 w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center border-2 transition-all duration-200
              ${checked[ti] ? `${bc} bg-gradient-to-br ${cc}` : 'border-white/20 group-hover:border-white/40'}`}>
              {checked[ti] && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className={`text-xs sm:text-sm leading-relaxed transition-all duration-150 break-words min-w-0
              ${checked[ti] ? 'line-through text-white/30' : 'text-white/70 group-hover:text-white/90'}`}>{task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── LANDING ────────────────────────────────────────────────────────────────*/
function Landing({ setView }) {
  const [greeting] = useState(() => rnd(GREETINGS));
  const [sub] = useState(() => rnd(HERO_SUBS));
  const [bg] = useState(() => rnd(HERO_BGS));
  const [name, setName] = useState('');
  const [focused, setFocused] = useState(false);
  const [shake, setShake] = useState(false);

  const handleChange = e => {
    const val = e.target.value;
    setName(val);
    const v = val.toLowerCase().trim();
    if (v === 'anu') { setView('anu'); return; }
    if (v === 'kruthika') { setView('kruthika'); return; }
    if (v === 'bala') { setView('bala'); return; }
  };

  const handleKey = e => {
    if (e.key === 'Enter' && name.trim()) { setShake(true); setTimeout(() => setShake(false), 500); }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 relative overflow-hidden" style={{ background: bg }}>
      <div className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-indigo-900/20 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-purple-900/15 blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center w-full max-w-lg fu">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium tracking-widest uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: 'pulse2 2s ease-in-out infinite' }} />
          Placement Season 2026
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight mb-4 bb"
          style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
          The Victory
          <span className="block bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-300 bg-clip-text text-transparent">Vault</span>
        </h1>

        <p className="text-base sm:text-xl text-white/70 mb-2 font-medium">{greeting}</p>
        <p className="text-white/35 text-sm mb-10">{sub}</p>

        <div className="relative mx-auto max-w-sm">
          <input
            value={name}
            onChange={handleChange}
            onKeyDown={handleKey}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Type your name here…"
            className={`w-full px-5 py-4 rounded-2xl border text-center text-base sm:text-lg font-medium focus:outline-none transition-all duration-200 ${shake ? 'border-amber-400/70' : 'border-white/20'}`}
            style={{
              background: 'rgba(255,255,255,0.07)',
              color: '#fff',
              letterSpacing: '0.04em',
              boxShadow: focused ? '0 0 0 3px rgba(251,191,36,0.22), 0 0 20px rgba(251,191,36,0.1)' : 'none',
            }}
          />
          <p className="mt-3 text-white/25 text-xs">Type: Anu · Kruthika · Bala</p>
        </div>

        <p className="mt-14 text-white/20 text-xs italic">"With God, all things are possible." — Matthew 19:26</p>
      </div>
    </div>
  );
}

/* ─── ANU DASHBOARD ──────────────────────────────────────────────────────────*/
function AnuDB({ setView }) {
  const [checked, setChecked] = useState(() => loadChecked('vv_anu', anuPlan));
  const [scripture] = useState(() => rnd(ANU_VERSES));
  const [note] = useState(() => rnd(ANU_NOTES));
  const [showCelebration, setShowCelebration] = useState(false);

  const toggle = (di, ti) => {
    setChecked(prev => {
      const next = { ...prev, [`${di}-${ti}`]: !prev[`${di}-${ti}`] };
      saveChecked('vv_anu', next);
      if (calcPct(anuPlan, next) === 100) setShowCelebration(true);
      return next;
    });
  };

  const pct = calcPct(anuPlan, checked);
  const done = Object.values(checked).filter(Boolean).length;
  const total = anuPlan.reduce((s, d) => s + d.tasks.length, 0);
  const days = daysLeft('2026-03-13');
  const todayIdx = todayCardIndex(anuPlan);
  const shareText = buildShareText('Anu', pct, done, total, 'March 13 · Cadence Drive');

  return (
    <div className="min-h-screen relative overflow-x-hidden fi"
      style={{ background: 'linear-gradient(135deg,#1a0e00,#0f0900,#1a0800,#0a0500)' }}>
      {showCelebration && <CelebrationOverlay name="Anu" accentCls="text-amber-300" onClose={() => setShowCelebration(false)} />}
      <div className="fixed top-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-amber-700/15 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[10%] left-[-5%] w-[35vw] h-[35vw] rounded-full bg-orange-800/10 blur-[80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center justify-between py-6 gap-3 flex-wrap">
          <BackBtn onClick={() => setView('home')} />
          <Countdown days={days} accentCls="text-amber-300" labelCls="text-amber-300/70" />
        </div>

        <div className="text-center mb-10 fu">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300/70 text-xs font-semibold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" style={{ animation: 'pulse2 2s ease-in-out infinite' }} />
            10-Day Sprint · EEE Core & Aptitude
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2"
            style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
            {"Anu's Cadence"}
            <span className="block bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-300 bg-clip-text text-transparent">Preparation Sanctuary</span>
          </h1>
        </div>

        {/* Scripture */}
        <div className="rounded-2xl p-6 border border-amber-400/25 mb-5 text-center"
          style={{ background: 'linear-gradient(135deg,rgba(251,191,36,.08),rgba(251,146,60,.05))' }}>
          <div className="text-amber-300/30 text-4xl font-serif mb-2">"</div>
          <p className="text-amber-100/80 text-base sm:text-lg italic mb-3"
            style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>{scripture.v}</p>
          <p className="text-amber-400/60 text-sm font-medium">— {scripture.r}</p>
        </div>

        <div className="text-center mb-8">
          <span className="inline-block px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/15 text-amber-300/70 text-sm italic">
            {note} — Your Brother 💛
          </span>
        </div>

        {/* Progress */}
        <div className="rounded-2xl p-5 mb-8 border border-amber-400/15 bg-white/3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 font-semibold">Overall Progress</p>
              <p className="text-white/35 text-xs mt-0.5">{done} of {total} tasks completed</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-amber-300">{pct}%</span>
              <p className="text-amber-400/50 text-xs">Victory Meter</p>
            </div>
          </div>
          <PBar pct={pct} cls="bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400" />
          {pct === 100 && <p className="text-center text-amber-300 text-xs font-bold mt-3 pi">✨ All done! Go conquer Cadence, Anu! ✨</p>}
          <div className="flex justify-end mt-4">
            <ShareBtn text={shareText} accentCls="text-amber-400/70 hover:text-amber-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {anuPlan.map((day, di) => (
            <DayCard key={di} day={day} dayIdx={di}
              checked={Object.fromEntries(day.tasks.map((_, ti) => [ti, checked[`${di}-${ti}`]]))}
              onToggle={ti => toggle(di, ti)}
              bc="border-amber-400" cc="from-amber-400 to-orange-500" badge="text-amber-400"
              todayIdx={todayIdx} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <span className="inline-block px-5 py-2.5 rounded-2xl bg-amber-400/8 border border-amber-400/15 text-amber-300/55 text-sm italic">
            God walks with you. I am cheering — Your Brother 💛
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── KRUTHIKA DASHBOARD ─────────────────────────────────────────────────────*/
function KDB({ setView }) {
  const [checked, setChecked] = useState(() => loadChecked('vv_kruthika', kPlan));
  const [quote] = useState(() => rnd(K_QUOTES));
  const [note] = useState(() => rnd(K_NOTES));
  const [showCelebration, setShowCelebration] = useState(false);

  const toggle = (di, ti) => {
    setChecked(prev => {
      const next = { ...prev, [`${di}-${ti}`]: !prev[`${di}-${ti}`] };
      saveChecked('vv_kruthika', next);
      if (calcPct(kPlan, next) === 100) setShowCelebration(true);
      return next;
    });
  };

  const pct = calcPct(kPlan, checked);
  const done = Object.values(checked).filter(Boolean).length;
  const total = kPlan.reduce((s, d) => s + d.tasks.length, 0);
  const days = daysLeft('2026-03-15');
  const todayIdx = todayCardIndex(kPlan);
  const shareText = buildShareText('Kruthika', pct, done, total, 'March 15 · Mr. Cooper Drive');

  return (
    <div className="min-h-screen relative overflow-x-hidden fi"
      style={{ background: 'linear-gradient(135deg,#00091a,#000d24,#001233,#000610)' }}>
      {showCelebration && <CelebrationOverlay name="Kruthika" accentCls="text-sky-300" onClose={() => setShowCelebration(false)} />}
      <div className="fixed top-[-10%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-sky-800/15 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[10%] right-[-5%] w-[35vw] h-[35vw] rounded-full bg-cyan-900/12 blur-[80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center justify-between py-6 gap-3 flex-wrap">
          <BackBtn onClick={() => setView('home')} />
          <Countdown days={days} accentCls="text-sky-300" labelCls="text-sky-300/70" />
        </div>

        <div className="text-center mb-10 fu">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-400/10 border border-sky-400/20 text-sky-300/70 text-xs font-semibold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" style={{ animation: 'pulse2 2s ease-in-out infinite' }} />
            12-Day Command Plan · Software & Aptitude
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2"
            style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
            {"Kruthika's Comfort"}
            <span className="block bg-gradient-to-r from-sky-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent">Command Center</span>
          </h1>
        </div>

        <div className="rounded-2xl p-6 border border-sky-400/20 mb-5 text-center"
          style={{ background: 'linear-gradient(135deg,rgba(14,165,233,.07),rgba(6,182,212,.04))' }}>
          <div className="text-sky-300/30 text-4xl font-serif mb-2">"</div>
          <p className="text-sky-100/80 text-base sm:text-lg italic mb-3"
            style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>{quote.q}</p>
          <p className="text-sky-400/60 text-sm font-medium">— {quote.a}</p>
        </div>

        <div className="text-center mb-8">
          <span className="inline-block px-4 py-2 rounded-full bg-sky-400/10 border border-sky-400/15 text-sky-300/70 text-sm italic">
            {note} — Your Brother 💙
          </span>
        </div>

        <div className="rounded-2xl p-5 mb-8 border border-sky-400/15 bg-white/3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 font-semibold">Overall Progress</p>
              <p className="text-white/35 text-xs mt-0.5">{done} of {total} tasks completed</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-sky-300">{pct}%</span>
              <p className="text-sky-400/50 text-xs">Command Level</p>
            </div>
          </div>
          <PBar pct={pct} cls="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400" />
          {pct === 100 && <p className="text-center text-sky-300 text-xs font-bold mt-3 pi">💙 All done! Go claim your offer, Kruthika!</p>}
          <div className="flex justify-end mt-4">
            <ShareBtn text={shareText} accentCls="text-sky-400/70 hover:text-sky-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {kPlan.map((day, di) => (
            <DayCard key={di} day={day} dayIdx={di}
              checked={Object.fromEntries(day.tasks.map((_, ti) => [ti, checked[`${di}-${ti}`]]))}
              onToggle={ti => toggle(di, ti)}
              bc="border-sky-400" cc="from-sky-400 to-cyan-500" badge="text-sky-400"
              withConfetti todayIdx={todayIdx} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <span className="inline-block px-5 py-2.5 rounded-2xl bg-sky-400/8 border border-sky-400/15 text-sky-300/55 text-sm italic">
            God is with you. I am with you — Your Brother 💙
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── BALA DASHBOARD ─────────────────────────────────────────────────────────*/
function BalaDB({ setView }) {
  const [checked, setChecked] = useState(() => loadChecked('vv_bala', bPlan));
  const [warcry] = useState(() => rnd(BALA_CRIES));
  const [filter, setFilter] = useState('All');
  const [showCelebration, setShowCelebration] = useState(false);

  const toggle = (di, ti) => {
    setChecked(prev => {
      const next = { ...prev, [`${di}-${ti}`]: !prev[`${di}-${ti}`] };
      saveChecked('vv_bala', next);
      if (calcPct(bPlan, next) === 100) setShowCelebration(true);
      return next;
    });
  };

  const pct = calcPct(bPlan, checked);
  const done = Object.values(checked).filter(Boolean).length;
  const total = bPlan.reduce((s, d) => s + d.tasks.length, 0);
  const todayIdx = todayCardIndex(bPlan);
  const shown = bPlan.map((d, i) => ({ ...d, origIdx: i })).filter(d => filter === 'All' || d.phase === filter);
  const shareText = buildShareText('Bala', pct, done, total, 'Mr. Cooper Selection');

  return (
    <div className="min-h-screen relative overflow-x-hidden fi"
      style={{ background: 'linear-gradient(135deg,#04020f,#070314,#0b0522,#020108)' }}>
      {showCelebration && <CelebrationOverlay name="Bala" accentCls="text-violet-300" onClose={() => setShowCelebration(false)} />}
      <div className="fixed top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-violet-900/18 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[5%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-indigo-900/15 blur-[90px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center justify-between py-6 gap-3 flex-wrap">
          <BackBtn onClick={() => setView('home')} />
          <span className="text-violet-400/60 text-xs font-medium tracking-widest uppercase">Mr. Cooper · 15-Day Execution</span>
        </div>

        <div className="text-center mb-10 fu">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-400/10 border border-violet-400/20 text-violet-300/70 text-xs font-semibold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" style={{ animation: 'pulse2 2s ease-in-out infinite' }} />
            Extra Edge Strategy
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2"
            style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
            {"Bala's Execution"}
            <span className="block bg-gradient-to-r from-violet-300 via-purple-200 to-indigo-300 bg-clip-text text-transparent">Dashboard</span>
          </h1>
          <p className="text-white/35 text-sm italic mt-2">Rise in discipline. Execute with clarity. Win with humility.</p>
        </div>

        <div className="rounded-2xl p-5 border border-violet-500/20 mb-6 flex items-center gap-4"
          style={{ background: 'linear-gradient(135deg,rgba(139,92,246,.08),rgba(99,102,241,.05))' }}>
          <span className="text-3xl">{warcry.e}</span>
          <div>
            <p className="text-violet-100/80 font-semibold text-sm sm:text-base">{warcry.l}</p>
            <p className="text-violet-400/50 text-xs mt-0.5">God gives strength. I build the effort.</p>
          </div>
        </div>

        <div className="rounded-2xl p-5 mb-6 border border-violet-400/15 bg-white/3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 font-semibold">Execution Progress</p>
              <p className="text-white/35 text-xs mt-0.5">{done} of {total} targets completed</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-violet-300">{pct}%</span>
              <p className="text-violet-400/50 text-xs">Domination Level</p>
            </div>
          </div>
          <PBar pct={pct} cls="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400" />
          {pct === 100 && <p className="text-center text-violet-300 text-xs font-bold mt-3 pi">⚡ 15 days. Zero excuses. Now go dominate, Bala.</p>}
          <div className="flex justify-end mt-4">
            <ShareBtn text={shareText} accentCls="text-violet-400/70 hover:text-violet-300" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {PHASES.map(ph => (
            <button key={ph} onClick={() => setFilter(ph)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border
                ${filter === ph ? 'bg-violet-500/30 border-violet-400/60 text-violet-200' : 'bg-white/5 border-white/10 text-white/40 hover:text-white/60 hover:border-white/20'}`}>
              {ph}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-7">
          {[{ i: '🧠', v: '5–7', u: 'problems/day' }, { i: '⏱️', v: '4', u: 'mock sessions' }, { i: '🔧', v: '1', u: 'CRUD project' }].map((s, i) => (
            <div key={i} className="rounded-xl p-4 bg-white/4 border border-white/8 text-center">
              <div className="text-xl sm:text-2xl mb-1">{s.i}</div>
              <div className="text-lg sm:text-xl font-bold text-violet-300">{s.v}</div>
              <div className="text-white/30 text-xs">{s.u}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {shown.map(day => (
            <DayCard key={day.origIdx} day={day} dayIdx={day.origIdx}
              checked={Object.fromEntries(day.tasks.map((_, ti) => [ti, checked[`${day.origIdx}-${ti}`]]))}
              onToggle={ti => toggle(day.origIdx, ti)}
              bc="border-violet-400" cc="from-violet-400 to-indigo-500" badge="text-violet-400"
              phase={day.phase} todayIdx={todayIdx} />
          ))}
        </div>

        <div className="mt-10 rounded-2xl p-5 border border-violet-400/20"
          style={{ background: 'linear-gradient(135deg,rgba(139,92,246,.06),rgba(99,102,241,.04))' }}>
          <h3 className="text-white/80 font-semibold text-sm mb-4">🏆 Stand-Out Tactics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { e: '🗣️', t: 'Think Aloud', d: 'Say your approach before coding. Interviewers score communication.' },
              { e: '⚡', t: 'Optimize Proactively', d: 'After solving: "This is O(n²), I can bring it to O(n) using…"' },
              { e: '✍️', t: 'Clean Variable Names', d: 'windowStart, maxLen, freqMap — not i, j, temp.' },
              { e: '🔍', t: 'Edge Case Statement', d: '"Checking empty input, single element, overflow" — shows structure.' },
              { e: '📦', t: 'Own Your Project', d: 'Know every design decision in your CRUD project inside out.' },
              { e: '🎯', t: 'Humility + Hunger', d: 'Confident voice. "I do not know, but based on logic I would..."' },
            ].map((t, i) => (
              <div key={i} className="rounded-xl p-3 bg-white/4 border border-white/8 hover:border-violet-400/30 transition-colors duration-200">
                <div className="text-lg mb-1">{t.e}</div>
                <p className="text-white/75 text-xs font-semibold mb-0.5">{t.t}</p>
                <p className="text-white/35 text-xs leading-relaxed">{t.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <span className="inline-block px-5 py-2.5 rounded-2xl bg-violet-400/8 border border-violet-400/15 text-violet-300/55 text-sm italic font-medium">
            Discipline today. Victory tomorrow — Your Brother ⚡
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── APP ROOT ───────────────────────────────────────────────────────────────*/
export default function App() {
  const [view, setView] = useState('home');
  return (
    <>
      <GS />
      {view === 'home' && <Landing setView={setView} />}
      {view === 'anu' && <AnuDB setView={setView} />}
      {view === 'kruthika' && <KDB setView={setView} />}
      {view === 'bala' && <BalaDB setView={setView} />}
    </>
  );
}
