import { useState } from 'react';
import './App.css';
import './index.css';
/* ─────────────────────────────────────────────────────────────────────────────
   GLOBAL KEYFRAMES
──────────────────────────────────────────────────────────────────────────────*/
function GS() {
  return (
    <style>{`
      @keyframes cFall{0%{transform:translateY(-8px) rotate(0deg);opacity:1}100%{transform:translateY(110px) rotate(540deg);opacity:0}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
      @keyframes popIn{0%{transform:scale(.5);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
      @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
      @keyframes pulse2{0%,100%{opacity:.6}50%{opacity:1}}
      .fu{animation:fadeUp .6s ease-out forwards}
      .pi{animation:popIn .4s cubic-bezier(.2,1.4,.6,1) forwards}
      .bb{animation:bob 4s ease-in-out infinite}
    `}</style>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CONSTANTS
──────────────────────────────────────────────────────────────────────────────*/
const GREETINGS = [
  "Hey genius! Who's prepping today? 🔥",
  "Which warrior is ready to conquer? ⚡",
  "Tell me who's logging in — let's crush it! 🚀",
  "The Victory Vault awaits. Who enters today? 🏛️",
  "Ready to make your brother proud? Type your name! 💪",
  "God's favourite student is here! Who are you? ✨",
];
const HERO_SUBS = [
  "Type your name and the journey begins.",
  "Your dashboard is one name away.",
  "Anu · Kruthika · Bala — whose battlefield today?",
  "Three warriors. One vault. Begin.",
];
const HERO_BGS = [
  'linear-gradient(135deg,#080b14,#0d1022,#060910)',
  'linear-gradient(135deg,#0a0500,#160900,#060200)',
  'linear-gradient(135deg,#00050f,#000c20,#000408)',
  'linear-gradient(135deg,#080010,#100020,#040008)',
];
const ANU_VERSES = [
  { v: "For I can do everything through Christ, who gives me strength.", r: "Philippians 4:13" },
  { v: "Commit to the Lord whatever you do, and He will establish your plans.", r: "Proverbs 16:3" },
  { v: "The Lord your God is with you, the Mighty Warrior who saves.", r: "Zephaniah 3:17" },
  { v: "Trust in the Lord with all your heart — He will make your paths straight.", r: "Proverbs 3:5-6" },
  { v: "She is clothed with strength and dignity, and she laughs without fear.", r: "Proverbs 31:25" },
];
const ANU_NOTES = [
  "Golden warrior, I am right here cheering 😏",
  "You will walk into Cadence like you own the place 👑",
  "God has already written your victory. Just show up 🙏",
  "EEE queen incoming — Cadence does not know what is coming 💥",
  "Every formula you memorise is a step closer 💛",
];
const K_QUOTES = [
  { q: "The only way to do great work is to love what you do.", a: "Steve Jobs" },
  { q: "Believe you can and you are halfway there.", a: "Theodore Roosevelt" },
  { q: "Success is the sum of small efforts repeated day in and day out.", a: "Robert Collier" },
  { q: "Every expert was once a beginner. You are closer than you think.", a: "Unknown" },
  { q: "She believed she could, so she did.", a: "R.S. Grey" },
];
const K_NOTES = [
  "God strengthens you. I am with you always 💙",
  "Blue thunder incoming — Mr. Cooper is lucky to have you 🌊",
  "Do it scared, do it tired, just do it. I have got your back 💪",
  "You are not just preparing — you are transforming 🦋",
  "One more day, one more victory. You are almost there 🌟",
];
const BALA_CRIES = [
  { l: "Discipline today. Domination tomorrow.", e: "⚡" },
  { l: "Every problem you solve is a rep. Keep lifting.", e: "🏋️" },
  { l: "God gives strength. Effort wins battles.", e: "🔥" },
  { l: "War-room mode activated. No distractions. Execute.", e: "🎯" },
  { l: "Not preparing to pass — preparing to stand out.", e: "🚀" },
];

/* ─────────────────────────────────────────────────────────────────────────────
   PLAN DATA
──────────────────────────────────────────────────────────────────────────────*/
const anuPlan = [
  { day: 'Day 1', date: 'Mar 3', tasks: ["Boolean Algebra: Laws, De Morgan's, Canonical forms (SOP/POS)", "K-Map simplification: 2,3,4-variable with don't cares", 'Aptitude: Time & Work (LCM method) — 15 problems', 'Whiteboard: Draw CMOS Inverter + label pull-up/pull-down'] },
  { day: 'Day 2', date: 'Mar 4', tasks: ['Sequential: SR, JK, D, T Flip-flops — truth & excitation tables', 'Counters: Synchronous vs Asynchronous, Ring & Johnson', 'Shift Registers: SISO, SIPO, PISO, PIPO operation', 'Aptitude: Permutations & Combinations (nCr, nPr, circular)'] },
  { day: 'Day 3', date: 'Mar 5', tasks: ['Verilog: module, port types, wire vs reg, assign vs always', 'Blocking (=) vs Non-blocking (<=) — critical difference with examples', 'Write from scratch: AND gate, Half Adder, 4:1 MUX in Verilog', 'Aptitude: Number Series, Letter Series — 20 problems'] },
  { day: 'Day 4', date: 'Mar 6', tasks: ['MOSFET: Cutoff, Linear, Saturation regions & I-V equations', 'CMOS Logic: NAND, NOR, XOR — pull-up & pull-down network design', 'CMOS Power: static vs dynamic, short channel effects (DIBL)', 'Aptitude: Profit & Loss — marked price, successive discounts'] },
  { day: 'Day 5', date: 'Mar 7', tasks: ['PN Junction: depletion region, built-in potential, I-V characteristics', 'Zener diode: avalanche vs Zener breakdown, applications', 'BJT: NPN/PNP modes, CE/CB/CC — key parameters comparison', 'Full Aptitude Mock #1: 30 questions in 35 minutes'] },
  { day: 'Day 6', date: 'Mar 8', tasks: ['Timing Analysis: Setup time, Hold time — definitions & violations', 'Clock Skew: positive vs negative, its impact on timing', 'Critical Path: longest path, slack = required minus arrival', 'Aptitude: Seating Arrangement (linear & circular) — 10 problems'] },
  { day: 'Day 7', date: 'Mar 9', tasks: ['FSM Design: Mealy vs Moore — state diagram to circuit', 'Design a 2-bit sequence detector FSM end-to-end on paper', 'Verilog FSM: code a traffic light controller with 3 states', 'Aptitude: Data Sufficiency — 15 problems'] },
  { day: 'Day 8', date: 'Mar 10', tasks: ['Op-Amps: virtual short, inverting & non-inverting configurations', 'Feedback: types (series-shunt, shunt-series), effect on impedance', 'Network Theory: Thevenin & Norton theorem — 3 circuit problems', 'RC Transients: tau=RC, step response formula, time constant'] },
  { day: 'Day 9', date: 'Mar 11', tasks: ['AI in Semiconductors: EDA AI tools, Cadence Cerebrus & Verisium', 'Technical HR: Tell me about yourself — record & polish (90 sec)', 'Technical HR: Why Cadence, Strengths/Weaknesses, 5-year goal', 'Full Aptitude Mock #2: 40 questions in 50 minutes'] },
  { day: 'Day 10', date: 'Mar 12', tasks: ['Full Mock Day: 30 Digital Logic MCQs timed 35 min', 'Verilog: Write FSM, 3-bit counter, shift register from memory', 'Timing Analysis: 2 slack calculation problems, identify violations', 'Final Whiteboard: CMOS NAND transistor-level from memory'] },
];

const kPlan = [
  { day: 'Day 1', date: 'Mar 3', tasks: ['DSA: Arrays — Two Pointers: Two Sum II, Valid Palindrome, 3Sum', 'OOP: Encapsulation & Abstraction — write BankAccount class', 'SQL: SELECT, WHERE, ORDER BY — write 10 queries from scratch', 'Aptitude: 20 verbal reasoning problems'] },
  { day: 'Day 2', date: 'Mar 4', tasks: ['DSA: Sliding Window — Max sum subarray K, Longest substring no repeat', 'OOP: Inheritance & Polymorphism — extend Shape hierarchy in code', 'SQL: GROUP BY, HAVING, COUNT/SUM/AVG — 8 aggregate queries', 'DBMS: Normalization — identify 1NF, 2NF, 3NF violations'] },
  { day: 'Day 3', date: 'Mar 5', tasks: ['DSA: Strings — Anagram detection, Group Anagrams, String compression', 'OOP: Overloading vs Overriding — write code examples for both', 'DBMS: Keys — Primary, Foreign, Candidate, Composite, Super key', 'SQL: INNER JOIN, LEFT JOIN, RIGHT JOIN — 6 join queries'] },
  { day: 'Day 4', date: 'Mar 6', tasks: ['DSA: HashMap — Two Sum, Subarray Sum = K, Longest Consecutive', 'OOP: Interface vs Abstract Class — decision rule + examples', 'DBMS: ACID Properties — explain each with a real-world example', 'SQL: Subqueries — correlated & non-correlated — 5 problems'] },
  { day: 'Day 5', date: 'Mar 7', tasks: ['DSA: Stack — Valid Parentheses, Min Stack, Next Greater Element', 'DBMS: Indexing (B-tree, Hash), clustered vs non-clustered', 'DBMS: DELETE vs TRUNCATE vs DROP — when to use each', 'SQL: Mixed practice — 15 queries covering all previous topics'] },
  { day: 'Day 6', date: 'Mar 8', tasks: ['DSA: Recursion — Fibonacci, Power(x,n), Subsets generation', 'OOP: Constructors — default, parameterized, copy constructor rules', 'DBMS: Joins deep dive — NATURAL, CROSS, SELF joins', 'Mock MCQ #1: 25 OOP + DBMS MCQs in 30 minutes'] },
  { day: 'Day 7', date: 'Mar 9', tasks: ['DSA: Binary Search — Classic, First/Last Position, Rotated Array', 'DSA: Binary Search on Answer — minimize max, kth smallest', 'SQL: Complex queries — nested subqueries, multi-table joins', 'Aptitude: Data Sufficiency + Series — 20 problems'] },
  { day: 'Day 8', date: 'Mar 10', tasks: ['Full DSA Mock: 7 problems in 90 minutes (timed)', 'OOP Revision: All 8 concepts — quick verbal explanation of each', 'DBMS Revision: Normalization + ACID + Keys — one-pager revision', 'SQL Active Practice: 10 queries from memory, no reference'] },
  { day: 'Day 9', date: 'Mar 11', tasks: ['Round 2 Simulation: 2-hour session — 2 medium-hard problems', 'Edge cases: empty, single element, negatives, overflow', 'Optimize solutions after brute force — explain time/space complexity', 'Code review: clean variable names, add inline comments'] },
  { day: 'Day 10', date: 'Mar 12', tasks: ['Sliding Window Hard: Minimum Window Substring, Fruit Into Baskets', 'HashMap Advanced: Top K Frequent Elements, LRU Cache concept', 'SQL Final Mock: 12 queries including complex joins & subqueries', 'Mock MCQ #2: 30 OOP + DBMS + SQL MCQs in 35 minutes'] },
  { day: 'Day 11', date: 'Mar 13', tasks: ['DSA: String Hard — Longest Palindromic Substring, Word Break', 'Array Transforms: Rotate Array, Product Except Self, Next Permutation', 'OOP: Design a mini Library Management System (class diagram + code)', 'SQL: Write optimized query for employee-department hierarchy'] },
  { day: 'Day 12', date: 'Mar 14', tasks: ['Final Full Mock: 8 DSA + 35 MCQs (OOP/DBMS/SQL) — full simulation', 'Debrief: categorize wrong answers, targeted 30-min revision', 'HR prep: Tell me about yourself, Why Mr. Cooper, Strength', 'Round 2 Final Sim: 2 hard problems in 2 hours — clean code target'] },
];

const bPlan = [
  { day: 'Day 1', date: 'Mar 3', phase: 'Foundation', tasks: ['DSA Warm-up: Two Sum, Best Time Buy/Sell Stock, Max Subarray', 'OOP: Encapsulation + Abstraction — code BankAccount class with getters/setters', 'SQL: SELECT + WHERE + ORDER BY — 10 hand-written queries', 'Goal: Re-activate coding muscle, hands on keyboard'] },
  { day: 'Day 2', date: 'Mar 4', phase: 'Foundation', tasks: ['DSA: Valid Anagram, Longest Substring Without Repeat, Group Anagrams', 'OOP: Overloading vs Overriding — write separate code examples for both', 'SQL: GROUP BY + HAVING, COUNT/SUM/AVG — 8 aggregate queries', 'Explain your code out loud after solving — interview habit starts now'] },
  { day: 'Day 3', date: 'Mar 5', phase: 'Foundation', tasks: ['DSA: Two Sum (HashMap), Subarray Sum = K, Longest Consecutive Sequence', 'DBMS: 1NF, 2NF, 3NF — identify violations in 5 practice schemas', 'SQL: INNER JOIN, LEFT JOIN, RIGHT JOIN — 6 join queries from scratch', 'After each DSA: state time & space complexity before submitting'] },
  { day: 'Day 4', date: 'Mar 6', phase: 'Foundation', tasks: ['DSA: Binary Search — Classic, First/Last Position, Search in Rotated Array', 'DBMS: ACID, Primary/Foreign/Candidate/Composite Keys', 'SQL: Subqueries — correlated & non-correlated — 5 problems', 'OOP: Interface vs Abstract Class — decision tree + code sample'] },
  { day: 'Day 5', date: 'Mar 7', phase: 'Foundation', tasks: ['DSA: Valid Parentheses, Min Stack, Evaluate Reverse Polish Notation', 'Recursion: Fibonacci, Power(x,n), Generate all Subsets', 'SQL: Mixed session — 15 queries from all topics, no reference sheet', 'DBMS: Indexing (B-tree vs Hash, Clustered vs Non-clustered)'] },
  { day: 'Day 6', date: 'Mar 8', phase: 'Speed & Depth', tasks: ['Full Mock #1: 7 DSA problems in 90 minutes (timed, no hints)', '20 OOP + DBMS + SQL MCQs in 25 minutes', 'Debrief: write WHY you got each wrong answer wrong — 1 sentence each', 'Identify your 2 weakest topics — plan tomorrow accordingly'] },
  { day: 'Day 7', date: 'Mar 9', phase: 'Speed & Depth', tasks: ['Sliding Window: Minimum Window Substring, Fruit Into Baskets, Longest Repeating', 'Before coding: say approach aloud — I see this as a sliding window because...', 'SQL Advanced: 5 complex queries (nested subqueries, multi-table joins)', 'DBMS: DELETE vs TRUNCATE vs DROP — when each is appropriate'] },
  { day: 'Day 8', date: 'Mar 10', phase: 'Speed & Depth', tasks: ['HashMap: Top K Frequent Elements, Word Pattern, Ransom Note', 'OOP: Design Library Management System — class diagram + full code', 'SQL: 8 queries from company-like problems (payroll, orders, inventory)', 'Code quality check: clean variable names? Any deeply nested logic?'] },
  { day: 'Day 9', date: 'Mar 11', phase: 'Speed & Depth', tasks: ['Round 2 Simulation: 2-hour solo session — 2 medium-hard problems', 'No Google, no hints — pure execution under pressure', 'Edge case checklist: empty, single, negatives, overflow', 'Debrief: what slowed you? Which edge cases did you miss?'] },
  { day: 'Day 10', date: 'Mar 12', phase: 'Speed & Depth', tasks: ['Full Mock #2: 8 DSA problems in 90 minutes + 25 MCQs', 'Array: Product Except Self, Next Permutation, Rotate Array', 'SQL Final Practice: 12 queries — joins, aggregates, subqueries', 'Compile weak area list — inputs for Day 11 targeted revision'] },
  { day: 'Day 11', date: 'Mar 13', phase: 'Project', tasks: ['Start CRUD API: Student Record Manager (Node/Express or FastAPI)', 'Implement: GET /students, POST /students, PUT /:id, DELETE /:id', 'Connect SQLite or PostgreSQL — write raw SQL queries, not ORM', 'Target: all 4 endpoints working with proper status codes & error handling'] },
  { day: 'Day 12', date: 'Mar 14', phase: 'Project', tasks: ['Add input validation, error responses (404, 400, 500)', 'Test with Postman or curl — all 4 endpoints must return correct data', 'Write a 5-sentence project explanation: what, why, how, design choice, outcome', 'Prepare to walk through the project in an interview — practice twice'] },
  { day: 'Day 13', date: 'Mar 15', phase: 'Mock Interview', tasks: ['Mock Round 1 (45 min): 2 DSA problems + 10 verbal OOP/DBMS MCQs', 'Mock Round 2 (90 min): 1 hard DSA + walk through CRUD project', 'Self-review: Was code clean? Edge cases covered? Explained clearly?', 'HR: Tell me about yourself — time it to 90 seconds exactly'] },
  { day: 'Day 14', date: 'Mar 16', phase: 'HR & Communication', tasks: ['HR: Practice STAR method — Describe a challenge you overcame', 'Why Mr. Cooper? — research fintech angle, mention debt management scale', 'Strength? Systematic problem-solver who documents logic before coding', '3-year goal? Strong backend dev contributing to fintech systems'] },
  { day: 'Day 15', date: 'Mar 17', phase: 'Confidence Run', tasks: ['Morning: 3 medium problems — measure time, target under 25 min each', 'Afternoon: 5 HR answers rehearsed aloud (timed, to mirror)', 'Walk through CRUD project end-to-end — explain every design decision', 'Evening: light review, formula glance, sleep early — you are ready'] },
];

/* ─────────────────────────────────────────────────────────────────────────────
   UTILITIES
──────────────────────────────────────────────────────────────────────────────*/
const rnd = arr => arr[Math.floor(Math.random() * arr.length)];

function buildChecked(plan) {
  const o = {};
  plan.forEach((d, di) => d.tasks.forEach((_, ti) => { o[`${di}-${ti}`] = false; }));
  return o;
}
function calcPct(plan, checked) {
  const total = plan.reduce((s, d) => s + d.tasks.length, 0);
  const done = Object.values(checked).filter(Boolean).length;
  return total ? Math.round((done / total) * 100) : 0;
}

/* ─────────────────────────────────────────────────────────────────────────────
   SHARED COMPONENTS
──────────────────────────────────────────────────────────────────────────────*/
function PBar({ pct, cls }) {
  return (
    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-700 ${cls}`} style={{ width: `${pct}%` }} />
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

function Confetti() {
  const cols = ['#fbbf24', '#60a5fa', '#a78bfa', '#34d399', '#f87171', '#fb923c', '#e879f9', '#2dd4bf'];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="absolute w-2 h-2 rounded-sm"
          style={{
            left: `${4 + i * 5.8}%`, top: '0%',
            backgroundColor: cols[i % cols.length],
            animation: `cFall ${0.7 + (i % 4) * 0.22}s ease-in ${(i % 6) * 0.07}s both`,
            transform: `rotate(${i * 30}deg)`,
          }} />
      ))}
    </div>
  );
}

function DayCard({ day, checked, onToggle, bc, cc, badge, phase, withConfetti }) {
  const done = day.tasks.filter((_, ti) => checked[ti]).length;
  const total = day.tasks.length;
  const allDone = done === total;
  return (
    <div className={`relative rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden backdrop-blur-sm
      ${allDone ? 'bg-white/10 border-white/25' : 'bg-white/5 border-white/10'}`}>
      {allDone && withConfetti && <Confetti />}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-bold uppercase tracking-widest ${badge}`}>{day.day}</span>
          <span className="text-white/40 text-xs">{day.date}</span>
          {phase && <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/40">{phase}</span>}
        </div>
        <span className={`text-xs font-semibold ${allDone ? 'text-green-400' : 'text-white/35'}`}>{done}/{total}</span>
      </div>
      {allDone && (
        <p className="text-center text-green-400 text-xs font-bold mb-2 pi">Day Complete! 🎉</p>
      )}
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
            <span className={`text-sm leading-relaxed transition-all duration-150
              ${checked[ti] ? 'line-through text-white/30' : 'text-white/70 group-hover:text-white/90'}`}>{task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   LANDING
──────────────────────────────────────────────────────────────────────────────*/
function Landing({ setView }) {
  const [greeting] = useState(() => rnd(GREETINGS));
  const [sub] = useState(() => rnd(HERO_SUBS));
  const [bg] = useState(() => rnd(HERO_BGS));
  const [name, setName] = useState('');
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
    if (e.key === 'Enter' && name.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden" style={{ background: bg }}>
      {/* Orbs */}
      <div className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-indigo-900/20 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-purple-900/15 blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-xl w-full fu">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium tracking-widest uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: 'pulse2 2s ease-in-out infinite' }} />
          Placement Season 2026
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight mb-4 bb"
          style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
          The Victory
          <span className="block bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-300 bg-clip-text text-transparent">
            Vault
          </span>
        </h1>

        {/* Dynamic greeting */}
        <p className="text-lg sm:text-xl text-white/70 mb-2 font-medium">{greeting}</p>
        <p className="text-white/35 text-sm mb-10">{sub}</p>

        {/* Name input */}
        <div className="relative mx-auto max-w-sm">
          <input
            value={name}
            onChange={handleChange}
            onKeyDown={handleKey}
            placeholder="Type your name here…"
            className={`w-full px-5 py-4 rounded-2xl border ${shake ? 'border-amber-400/70' : 'border-white/20'} text-center text-lg font-medium focus:outline-none focus:border-white/50 transition-all duration-200`}
            style={{ background: 'rgba(255,255,255,0.07)', color: '#fff', letterSpacing: '0.03em' }}
          />
          {name && (
            <div className="mt-3 text-white/30 text-xs">
              {['anu', 'kruthika', 'bala'].some(n => name.toLowerCase().trim().startsWith(n.slice(0, 3)))
                ? '⚡ Redirecting…'
                : 'Type: Anu · Kruthika · Bala'}
            </div>
          )}
        </div>

        {/* Hint tip */}
        <p className="mt-5 text-white/30 text-xs">Type: Anu · Kruthika · Bala</p>

        <p className="mt-12 text-white/20 text-xs italic">
          "With God, all things are possible." — Matthew 19:26
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ANU DASHBOARD
──────────────────────────────────────────────────────────────────────────────*/
function AnuDB({ setView }) {
  const [checked, setChecked] = useState(() => buildChecked(anuPlan));
  const [scripture] = useState(() => rnd(ANU_VERSES));
  const [note] = useState(() => rnd(ANU_NOTES));
  const toggle = (di, ti) => setChecked(p => ({ ...p, [`${di}-${ti}`]: !p[`${di}-${ti}`] }));
  const pct = calcPct(anuPlan, checked);
  const done = Object.values(checked).filter(Boolean).length;
  const total = anuPlan.reduce((s, d) => s + d.tasks.length, 0);

  return (
    <div className="min-h-screen relative overflow-x-hidden"
      style={{ background: 'linear-gradient(135deg,#1a0e00,#0f0900,#1a0800,#0a0500)' }}>
      <div className="fixed top-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-amber-700/15 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[10%] left-[-5%] w-[35vw] h-[35vw] rounded-full bg-orange-800/10 blur-[80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center justify-between py-6">
          <BackBtn onClick={() => setView('home')} />
          <span className="text-amber-400/60 text-xs font-medium tracking-widest uppercase">Cadence Drive · March 13</span>
        </div>

        {/* Header */}
        <div className="text-center mb-10 fu">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300/70 text-xs font-semibold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" style={{ animation: 'pulse2 2s ease-in-out infinite' }} />
            10-Day Sprint · EEE Core & Aptitude
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2"
            style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
            {"Anu's Cadence"}
            <span className="block bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-300 bg-clip-text text-transparent">
              Preparation Sanctuary
            </span>
          </h1>
        </div>

        {/* Scripture */}
        <div className="rounded-2xl p-6 border border-amber-400/25 mb-5 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,rgba(251,191,36,.08),rgba(251,146,60,.05))' }}>
          <div className="text-amber-300/30 text-4xl font-serif mb-2">"</div>
          <p className="text-amber-100/80 text-lg italic mb-3"
            style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>{scripture.v}</p>
          <p className="text-amber-400/60 text-sm font-medium">— {scripture.r}</p>
        </div>

        {/* Bro note */}
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/15 text-amber-300/70 text-sm italic">
            {note} — Your Brother 💛
          </span>
        </div>

        {/* Progress */}
        <div className="rounded-2xl p-5 mb-8 border border-amber-400/15 bg-white/3 backdrop-blur-sm">
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
          {pct === 100 && <p className="text-center text-amber-300 text-sm font-bold mt-3 pi">✨ All done! Go conquer Cadence, Anu! ✨</p>}
        </div>

        {/* Day cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {anuPlan.map((day, di) => (
            <DayCard key={di} day={day}
              checked={Object.fromEntries(day.tasks.map((_, ti) => [ti, checked[`${di}-${ti}`]]))}
              onToggle={ti => toggle(di, ti)}
              bc="border-amber-400" cc="from-amber-400 to-orange-500" badge="text-amber-400" />
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

/* ─────────────────────────────────────────────────────────────────────────────
   KRUTHIKA DASHBOARD
──────────────────────────────────────────────────────────────────────────────*/
function KDB({ setView }) {
  const [checked, setChecked] = useState(() => buildChecked(kPlan));
  const [quote] = useState(() => rnd(K_QUOTES));
  const [note] = useState(() => rnd(K_NOTES));
  const toggle = (di, ti) => setChecked(p => ({ ...p, [`${di}-${ti}`]: !p[`${di}-${ti}`] }));
  const pct = calcPct(kPlan, checked);
  const done = Object.values(checked).filter(Boolean).length;
  const total = kPlan.reduce((s, d) => s + d.tasks.length, 0);

  return (
    <div className="min-h-screen relative overflow-x-hidden"
      style={{ background: 'linear-gradient(135deg,#00091a,#000d24,#001233,#000610)' }}>
      <div className="fixed top-[-10%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-sky-800/15 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[10%] right-[-5%] w-[35vw] h-[35vw] rounded-full bg-cyan-900/12 blur-[80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center justify-between py-6">
          <BackBtn onClick={() => setView('home')} />
          <span className="text-sky-400/60 text-xs font-medium tracking-widest uppercase">Mr. Cooper · March 15</span>
        </div>

        <div className="text-center mb-10 fu">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-400/10 border border-sky-400/20 text-sky-300/70 text-xs font-semibold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" style={{ animation: 'pulse2 2s ease-in-out infinite' }} />
            12-Day Command Plan · Software & Aptitude
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2"
            style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
            {"Kruthika's Comfort"}
            <span className="block bg-gradient-to-r from-sky-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              Command Center
            </span>
          </h1>
        </div>

        {/* Quote */}
        <div className="rounded-2xl p-6 border border-sky-400/20 mb-5 text-center"
          style={{ background: 'linear-gradient(135deg,rgba(14,165,233,.07),rgba(6,182,212,.04))' }}>
          <div className="text-sky-300/30 text-4xl font-serif mb-2">"</div>
          <p className="text-sky-100/80 text-lg italic mb-3"
            style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>{quote.q}</p>
          <p className="text-sky-400/60 text-sm font-medium">— {quote.a}</p>
        </div>

        {/* Bro note */}
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-2 rounded-full bg-sky-400/10 border border-sky-400/15 text-sky-300/70 text-sm italic">
            {note} — Your Brother 💙
          </span>
        </div>

        {/* Progress */}
        <div className="rounded-2xl p-5 mb-8 border border-sky-400/15 bg-white/3 backdrop-blur-sm">
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
          {pct === 100 && <p className="text-center text-sky-300 text-sm font-bold mt-3 pi">💙 All done! Go claim your offer, Kruthika!</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {kPlan.map((day, di) => (
            <DayCard key={di} day={day}
              checked={Object.fromEntries(day.tasks.map((_, ti) => [ti, checked[`${di}-${ti}`]]))}
              onToggle={ti => toggle(di, ti)}
              bc="border-sky-400" cc="from-sky-400 to-cyan-500" badge="text-sky-400"
              withConfetti />
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

/* ─────────────────────────────────────────────────────────────────────────────
   BALA DASHBOARD
──────────────────────────────────────────────────────────────────────────────*/
const PHASES = ['All', 'Foundation', 'Speed & Depth', 'Project', 'Mock Interview', 'HR & Communication', 'Confidence Run'];

function BalaDB({ setView }) {
  const [checked, setChecked] = useState(() => buildChecked(bPlan));
  const [warcry] = useState(() => rnd(BALA_CRIES));
  const [filter, setFilter] = useState('All');
  const toggle = (di, ti) => setChecked(p => ({ ...p, [`${di}-${ti}`]: !p[`${di}-${ti}`] }));
  const pct = calcPct(bPlan, checked);
  const done = Object.values(checked).filter(Boolean).length;
  const total = bPlan.reduce((s, d) => s + d.tasks.length, 0);
  const shown = bPlan.map((d, i) => ({ ...d, origIdx: i })).filter(d => filter === 'All' || d.phase === filter);

  return (
    <div className="min-h-screen relative overflow-x-hidden"
      style={{ background: 'linear-gradient(135deg,#04020f,#070314,#0b0522,#020108)' }}>
      <div className="fixed top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-violet-900/18 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[5%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-indigo-900/15 blur-[90px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center justify-between py-6">
          <BackBtn onClick={() => setView('home')} />
          <span className="text-violet-400/60 text-xs font-medium tracking-widest uppercase">Mr. Cooper · 15-Day Execution</span>
        </div>

        <div className="text-center mb-10 fu">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-400/10 border border-violet-400/20 text-violet-300/70 text-xs font-semibold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" style={{ animation: 'pulse2 2s ease-in-out infinite' }} />
            Extra Edge Strategy
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2"
            style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
            {"Bala's Execution"}
            <span className="block bg-gradient-to-r from-violet-300 via-purple-200 to-indigo-300 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-white/35 text-sm italic mt-3">Rise in discipline. Execute with clarity. Win with humility.</p>
        </div>

        {/* War cry */}
        <div className="rounded-2xl p-5 border border-violet-500/20 mb-6 flex items-center gap-4"
          style={{ background: 'linear-gradient(135deg,rgba(139,92,246,.08),rgba(99,102,241,.05))' }}>
          <span className="text-3xl">{warcry.e}</span>
          <div>
            <p className="text-violet-100/80 font-semibold">{warcry.l}</p>
            <p className="text-violet-400/50 text-xs mt-0.5">God gives strength. I build the effort.</p>
          </div>
        </div>

        {/* Progress */}
        <div className="rounded-2xl p-5 mb-6 border border-violet-400/15 bg-white/3 backdrop-blur-sm">
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
          {pct === 100 && <p className="text-center text-violet-300 text-sm font-bold mt-3 pi">⚡ 15 days. Zero excuses. Now go dominate, Bala.</p>}
        </div>

        {/* Phase filters */}
        <div className="flex flex-wrap gap-2 mb-7">
          {PHASES.map(ph => (
            <button key={ph} onClick={() => setFilter(ph)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border
                ${filter === ph ? 'bg-violet-500/30 border-violet-400/60 text-violet-200' : 'bg-white/5 border-white/10 text-white/40 hover:text-white/60 hover:border-white/20'}`}>
              {ph}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-7">
          {[{ i: '🧠', v: '5–7', u: 'problems/day' }, { i: '⏱️', v: '4', u: 'mock sessions' }, { i: '🔧', v: '1', u: 'CRUD project' }].map((s, i) => (
            <div key={i} className="rounded-xl p-4 bg-white/4 border border-white/8 text-center">
              <div className="text-2xl mb-1">{s.i}</div>
              <div className="text-xl font-bold text-violet-300">{s.v}</div>
              <div className="text-white/30 text-xs">{s.u}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {shown.map(day => (
            <DayCard key={day.origIdx} day={day}
              checked={Object.fromEntries(day.tasks.map((_, ti) => [ti, checked[`${day.origIdx}-${ti}`]]))}
              onToggle={ti => toggle(day.origIdx, ti)}
              bc="border-violet-400" cc="from-violet-400 to-indigo-500" badge="text-violet-400"
              phase={day.phase} />
          ))}
        </div>

        {/* Stand-out tactics */}
        <div className="mt-10 rounded-2xl p-5 border border-violet-400/20"
          style={{ background: 'linear-gradient(135deg,rgba(139,92,246,.06),rgba(99,102,241,.04))' }}>
          <h3 className="text-white/80 font-semibold text-sm mb-4 flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-violet-500/30 flex items-center justify-center text-xs">🏆</span>
            Stand-Out Tactics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { e: '🗣️', t: 'Think Aloud', d: 'Say your approach before coding. Interviewers score communication.' },
              { e: '⚡', t: 'Optimize Proactively', d: 'After solving: "This is O(n²), I can bring it to O(n) using…"' },
              { e: '✍️', t: 'Clean Variable Names', d: 'windowStart, maxLen, freqMap — not i, j, temp.' },
              { e: '🔍', t: 'Edge Case Statement', d: '"Checking empty input, single element, overflow" — shows structure.' },
              { e: '📦', t: 'Own Your Project', d: 'Know every design decision in your CRUD project inside out.' },
              { e: '🎯', t: 'Humility + Hunger', d: 'Confident voice. "I do not know, but based on first principles..."' },
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

/* ─────────────────────────────────────────────────────────────────────────────
   APP ROOT
──────────────────────────────────────────────────────────────────────────────*/
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
