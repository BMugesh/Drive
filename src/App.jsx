import { useState } from 'react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const anuPlan = [
  {
    day: 'Day 1', date: 'Mar 3',
    tasks: [
      "Boolean Algebra: Laws, De Morgan's, Canonical forms (SOP/POS)",
      "K-Map simplification: 2, 3 & 4-variable with don't cares",
      'Aptitude: Time & Work (LCM method) \u2014 15 problems',
      'Whiteboard: Draw CMOS Inverter + label pull-up/pull-down network',
    ],
  },
  {
    day: 'Day 2', date: 'Mar 4',
    tasks: [
      'Sequential Circuits: SR, JK, D, T Flip-flops — truth & excitation tables',
      'Counters: Synchronous vs Asynchronous, Ring & Johnson',
      'Shift Registers: SISO, SIPO, PISO, PIPO operation',
      'Aptitude: Permutations & Combinations (nCr, nPr, circular)',
    ],
  },
  {
    day: 'Day 3', date: 'Mar 5',
    tasks: [
      'Verilog: module, port types, wire vs reg, assign vs always',
      'Blocking (=) vs Non-blocking (<=): critical difference with examples',
      'Write from scratch: AND gate, Half Adder, 4:1 MUX in Verilog',
      'Aptitude: Number Series, Letter Series — 20 problems',
    ],
  },
  {
    day: 'Day 4', date: 'Mar 6',
    tasks: [
      'MOSFET: Cutoff, Linear (Triode), Saturation regions & I-V equations',
      'CMOS Logic: NAND, NOR, XOR — pull-up & pull-down network design',
      'CMOS Power: static vs dynamic, short channel effects (DIBL)',
      'Aptitude: Profit & Loss — marked price, successive discounts',
    ],
  },
  {
    day: 'Day 5', date: 'Mar 7',
    tasks: [
      'PN Junction: depletion region, built-in potential, I-V characteristics',
      'Zener diode: avalanche vs Zener breakdown, applications',
      'BJT: NPN/PNP modes, CE/CB/CC — key parameters comparison',
      'Full Aptitude Mock #1: 30 questions in 35 minutes',
    ],
  },
  {
    day: 'Day 6', date: 'Mar 8',
    tasks: [
      'Timing Analysis: Setup time, Hold time — definitions & violations',
      'Clock Skew: positive vs negative, its impact on timing',
      'Critical Path: longest path analysis, slack = required − arrival',
      'Aptitude: Seating Arrangement (linear & circular) — 10 problems',
    ],
  },
  {
    day: 'Day 7', date: 'Mar 9',
    tasks: [
      'FSM Design: Mealy vs Moore, state diagram to state table to circuit',
      'Design a 2-bit sequence detector FSM end-to-end on paper',
      'Verilog FSM: code a traffic light controller with 3 states',
      'Aptitude: Data Sufficiency — 15 problems',
    ],
  },
  {
    day: 'Day 8', date: 'Mar 10',
    tasks: [
      'Op-Amps: virtual short, inverting & non-inverting configurations',
      'Feedback: types (series-shunt, shunt-series), effect on impedance',
      'Network Theory: Thevenin & Norton theorem — 3 circuit problems',
      'RC Transients: τ = RC, step response formula, time constant intuition',
    ],
  },
  {
    day: 'Day 9', date: 'Mar 11',
    tasks: [
      'AI in Semiconductors: EDA AI tools, Cadence Cerebrus & Verisium',
      'Technical HR: "Tell me about yourself" — record & polish (90 sec)',
      'Technical HR: "Why Cadence?", "Strengths/Weaknesses", "5-year goal"',
      'Full Aptitude Mock #2: 40 questions in 50 minutes — review all errors',
    ],
  },
  {
    day: 'Day 10', date: 'Mar 12',
    tasks: [
      'Full Mock Day: 30 Digital Logic MCQs (timed 35 min)',
      'Verilog: Write FSM, 3-bit counter, shift register from memory',
      'Timing Analysis: 2 slack calculation problems, identify violations',
      'Final Whiteboard: CMOS NAND transistor-level from memory',
    ],
  },
];

const kruthikaPlan = [
  {
    day: 'Day 1', date: 'Mar 3',
    tasks: [
      'DSA: Arrays — Two Pointers: Two Sum II, Valid Palindrome, 3Sum',
      'OOP: Encapsulation & Abstraction — write BankAccount class',
      'SQL: SELECT, WHERE, ORDER BY — write 10 queries from scratch',
      'Aptitude: 20 verbal reasoning problems',
    ],
  },
  {
    day: 'Day 2', date: 'Mar 4',
    tasks: [
      'DSA: Sliding Window — Max sum subarray K, Longest substring no repeat',
      'OOP: Inheritance & Polymorphism — extend Shape hierarchy in code',
      'SQL: GROUP BY, HAVING, COUNT/SUM/AVG — 8 aggregate queries',
      'DBMS: Normalization — identify 1NF, 2NF, 3NF violations in examples',
    ],
  },
  {
    day: 'Day 3', date: 'Mar 5',
    tasks: [
      'DSA: Strings — Anagram detection, Group Anagrams, String compression',
      'OOP: Overloading vs Overriding — write code examples for both',
      'DBMS: Keys — Primary, Foreign, Candidate, Composite, Super key',
      'SQL: INNER JOIN, LEFT JOIN, RIGHT JOIN — 6 join queries',
    ],
  },
  {
    day: 'Day 4', date: 'Mar 6',
    tasks: [
      'DSA: HashMap — Two Sum, Subarray Sum = K, Longest Consecutive',
      'OOP: Interface vs Abstract Class — decision rule + examples',
      'DBMS: ACID Properties — explain each with a real-world example',
      'SQL: Subqueries — correlated & non-correlated — 5 problems',
    ],
  },
  {
    day: 'Day 5', date: 'Mar 7',
    tasks: [
      'DSA: Stack — Valid Parentheses, Min Stack, Next Greater Element',
      'DBMS: Indexing (B-tree, Hash), clustered vs non-clustered',
      'DBMS: DELETE vs TRUNCATE vs DROP — when to use each',
      'SQL: Mixed practice — 15 queries covering all previous topics',
    ],
  },
  {
    day: 'Day 6', date: 'Mar 8',
    tasks: [
      'DSA: Recursion — Fibonacci, Power(x,n), Subsets generation',
      'OOP: Constructors — default, parameterized, copy constructor rules',
      'DBMS: Joins deep dive — NATURAL, CROSS, SELF joins',
      'Mock MCQ #1: 25 OOP + DBMS MCQs in 30 minutes',
    ],
  },
  {
    day: 'Day 7', date: 'Mar 9',
    tasks: [
      'DSA: Binary Search — Classic, First/Last Position, Rotated Array',
      'DSA: Binary Search on Answer — minimize max, kth smallest',
      'SQL: Complex queries — nested subqueries, multi-table joins',
      'Aptitude: Data Sufficiency + Series — 20 problems',
    ],
  },
  {
    day: 'Day 8', date: 'Mar 10',
    tasks: [
      'Full DSA Mock: 7 problems in 90 minutes (timed)',
      'OOP Revision: All 8 concepts — quick verbal explanation of each',
      'DBMS Revision: Normalization + ACID + Keys — one-pager revision',
      'SQL Active Practice: 10 queries from memory, no reference',
    ],
  },
  {
    day: 'Day 9', date: 'Mar 11',
    tasks: [
      'Round 2 Simulation: 2-hour coding session — 2 medium-hard problems',
      'Edge cases checklist: empty, single element, negatives, overflow',
      'Optimize solutions after brute force — explain time/space complexity',
      'Code review: clean variable names, add inline comments',
    ],
  },
  {
    day: 'Day 10', date: 'Mar 12',
    tasks: [
      'Sliding Window Hard: Minimum Window Substring, Fruit Into Baskets',
      'HashMap Advanced: Top K Frequent Elements, LRU Cache concept',
      'SQL Final Mock: 12 queries including complex joins & subqueries',
      'Mock MCQ #2: 30 OOP + DBMS + SQL MCQs in 35 minutes',
    ],
  },
  {
    day: 'Day 11', date: 'Mar 13',
    tasks: [
      'DSA: String Hard — Longest Palindromic Substring, Word Break',
      'Array Transforms: Rotate Array, Product Except Self, Next Permutation',
      'OOP: Design a mini Library Management System (class diagram + code)',
      'SQL: Write optimized query for employee-department hierarchy',
    ],
  },
  {
    day: 'Day 12', date: 'Mar 14',
    tasks: [
      'Final Full Mock: 8 DSA + 35 MCQs (OOP/DBMS/SQL) — full simulation',
      'Debrief: categorize wrong answers, do targeted 30-min revision',
      "HR prep: Tell me about yourself, Why Mr. Cooper, Strength",
      'Round 2 Final Sim: 2 hard problems in 2 hours — clean code target',
    ],
  },
];

const balaPlan = [
  {
    day: 'Day 1', date: 'Mar 3', phase: 'Foundation',
    tasks: [
      'DSA Warm-up: Two Sum, Best Time Buy/Sell Stock, Max Subarray',
      'OOP: Encapsulation + Abstraction — code BankAccount class with getters/setters',
      'SQL: SELECT + WHERE + ORDER BY — 10 hand-written queries',
      'Goal: Re-activate coding muscle, hands on keyboard',
    ],
  },
  {
    day: 'Day 2', date: 'Mar 4', phase: 'Foundation',
    tasks: [
      'DSA: Valid Anagram, Longest Substring Without Repeat, Group Anagrams',
      'OOP: Overloading vs Overriding — write separate code examples for both',
      'SQL: GROUP BY + HAVING, COUNT/SUM/AVG — 8 aggregate queries',
      'Explain your code out loud after solving — interview habit starts now',
    ],
  },
  {
    day: 'Day 3', date: 'Mar 5', phase: 'Foundation',
    tasks: [
      'DSA: Two Sum (HashMap), Subarray Sum = K, Longest Consecutive Sequence',
      'DBMS: 1NF, 2NF, 3NF — identify violations in 5 practice schemas',
      'SQL: INNER JOIN, LEFT JOIN, RIGHT JOIN — 6 join queries from scratch',
      'After each DSA: state time & space complexity before submitting',
    ],
  },
  {
    day: 'Day 4', date: 'Mar 6', phase: 'Foundation',
    tasks: [
      'DSA: Binary Search — Classic, First/Last Position, Search in Rotated Array',
      'DBMS: ACID, Primary/Foreign/Candidate/Composite Keys',
      'SQL: Subqueries — correlated & non-correlated — 5 problems',
      'OOP: Interface vs Abstract Class — decision tree + code sample',
    ],
  },
  {
    day: 'Day 5', date: 'Mar 7', phase: 'Foundation',
    tasks: [
      'DSA: Valid Parentheses, Min Stack, Evaluate Reverse Polish Notation',
      'Recursion: Fibonacci, Power(x,n), Generate all Subsets',
      'SQL: Mixed session — 15 queries from all topics, no reference sheet',
      'DBMS: Indexing (B-tree vs Hash, Clustered vs Non-clustered)',
    ],
  },
  {
    day: 'Day 6', date: 'Mar 8', phase: 'Speed & Depth',
    tasks: [
      'Full Mock #1: 7 DSA problems in 90 minutes (timed, no hints)',
      '20 OOP + DBMS + SQL MCQs in 25 minutes',
      'Debrief: write WHY you got each wrong answer wrong — 1 sentence each',
      'Identify your 2 weakest topics — plan tomorrow accordingly',
    ],
  },
  {
    day: 'Day 7', date: 'Mar 9', phase: 'Speed & Depth',
    tasks: [
      'Sliding Window: Minimum Window Substring, Fruit Into Baskets, Longest Repeating',
      'Before coding: say approach aloud — I see this as a sliding window because...',
      'SQL Advanced: Write 5 complex queries (nested subqueries, multi-table joins)',
      'DBMS: DELETE vs TRUNCATE vs DROP — when each is appropriate',
    ],
  },
  {
    day: 'Day 8', date: 'Mar 10', phase: 'Speed & Depth',
    tasks: [
      'HashMap: Top K Frequent Elements, Word Pattern, Ransom Note',
      'OOP: Design Library Management System — class diagram + full code',
      'SQL: 8 queries from company-like problems (payroll, orders, inventory)',
      'Code quality check: any deeply nested logic? Clean variable names?',
    ],
  },
  {
    day: 'Day 9', date: 'Mar 11', phase: 'Speed & Depth',
    tasks: [
      'Round 2 Simulation: 2-hour solo session — 2 medium-hard problems',
      'No Google, no hints — pure execution under pressure',
      'Edge case checklist after each: empty, single, negatives, overflow',
      'Debrief: what slowed you? Which edge cases did you miss?',
    ],
  },
  {
    day: 'Day 10', date: 'Mar 12', phase: 'Speed & Depth',
    tasks: [
      'Full Mock #2: 8 DSA problems in 90 minutes + 25 MCQs',
      'Array: Product Except Self, Next Permutation, Rotate Array',
      'SQL Final Practice: 12 queries — joins, aggregates, subqueries',
      'Compile weak area list — inputs for Day 11 targeted revision',
    ],
  },
  {
    day: 'Day 11', date: 'Mar 13', phase: 'Project',
    tasks: [
      'Start CRUD API: Student Record Manager (Node/Express or FastAPI)',
      'Implement: GET /students, POST /students, PUT /:id, DELETE /:id',
      'Connect SQLite or PostgreSQL — write raw SQL queries, not ORM',
      'Target: all 4 endpoints working with proper status codes & error handling',
    ],
  },
  {
    day: 'Day 12', date: 'Mar 14', phase: 'Project',
    tasks: [
      'Add input validation, error responses (404, 400, 500)',
      'Test with Postman or curl — all 4 endpoints must return correct data',
      'Write a 5-sentence project explanation: what, why, how, design choice, outcome',
      'Prepare to walk through the project in an interview — practice it twice',
    ],
  },
  {
    day: 'Day 13', date: 'Mar 15', phase: 'Mock Interview',
    tasks: [
      'Mock Round 1 (45 min): 2 DSA problems + 10 verbal OOP/DBMS MCQs',
      'Mock Round 2 (90 min): 1 hard DSA + walk through CRUD project',
      'Self-review: Was code clean? Edge cases covered? Explained clearly?',
      'HR: Tell me about yourself — time it to 90 seconds exactly',
    ],
  },
  {
    day: 'Day 14', date: 'Mar 16', phase: 'HR & Communication',
    tasks: [
      'HR: Practice STAR method — Describe a challenge you overcame',
      'Why Mr. Cooper? — research fintech angle, mention debt management scale',
      'Strength? Systematic problem-solver who documents logic before coding',
      '3-year goal? Strong backend dev contributing to fintech systems',
    ],
  },
  {
    day: 'Day 15', date: 'Mar 17', phase: 'Confidence Run',
    tasks: [
      'Morning: 3 medium problems — measure time, target under 25 min each',
      'Afternoon: 5 HR answers rehearsed aloud (timed, to mirror)',
      'Walk through CRUD project end-to-end — explain every design decision',
      'Evening: light review, formula glance, sleep early — you are ready',
    ],
  },
];

// ─── UTILITIES ───────────────────────────────────────────────────────────────

function buildChecked(plan) {
  const init = {};
  plan.forEach((d, di) => d.tasks.forEach((_, ti) => { init[`${di}-${ti}`] = false; }));
  return init;
}

function calcProgress(plan, checked) {
  const total = plan.reduce((s, d) => s + d.tasks.length, 0);
  const done = Object.values(checked).filter(Boolean).length;
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

function ProgressBar({ pct, colorClass }) {
  return (
    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur-sm">
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${colorClass}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function DayCard({ day, checked, onToggle, borderColor, checkColor, badgeColor, phase }) {
  const done = day.tasks.filter((_, ti) => checked[ti]).length;
  const totalT = day.tasks.length;
  const allDone = done === totalT;
  return (
    <div
      className={`rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border
        ${allDone ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10'} backdrop-blur-sm`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className={`text-xs font-bold uppercase tracking-widest ${badgeColor} mr-2`}>
            {day.day}
          </span>
          <span className="text-white/40 text-xs">{day.date}</span>
          {phase && (
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50">
              {phase}
            </span>
          )}
        </div>
        <span className={`text-xs font-semibold ${done === totalT ? 'text-green-400' : 'text-white/40'}`}>
          {done}/{totalT}
        </span>
      </div>
      <ul className="space-y-3">
        {day.tasks.map((task, ti) => (
          <li
            key={ti}
            onClick={() => onToggle(ti)}
            className="flex items-start gap-3 cursor-pointer group"
          >
            <div
              className={`mt-0.5 w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center border-2 transition-all duration-200
                ${checked[ti]
                  ? `${borderColor} bg-gradient-to-br ${checkColor}`
                  : 'border-white/20 group-hover:border-white/40'
                }`}
            >
              {checked[ti] && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span
              className={`text-sm leading-relaxed transition-all duration-200
                ${checked[ti] ? 'line-through text-white/30' : 'text-white/70 group-hover:text-white/90'}`}
            >
              {task}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-sm font-medium transition-all duration-200 backdrop-blur-sm border border-white/10"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to Home
    </button>
  );
}

// ─── LANDING ──────────────────────────────────────────────────────────────────

function Landing({ setView }) {
  const cards = [
    {
      view: 'anu',
      emoji: '✨',
      name: 'Anu',
      company: 'Cadence Design Systems',
      role: 'EEE Core Drive',
      date: 'March 13, 2026',
      gradient: 'from-amber-500/20 via-yellow-400/10 to-orange-500/10',
      glow: 'hover:shadow-amber-500/30',
      border: 'hover:border-amber-400/60',
      tag: 'from-amber-400 to-orange-400',
    },
    {
      view: 'kruthika',
      emoji: '💼',
      name: 'Kruthika',
      company: 'Mr. Cooper',
      role: 'Software Drive',
      date: 'March 15, 2026',
      gradient: 'from-sky-500/20 via-blue-400/10 to-cyan-500/10',
      glow: 'hover:shadow-sky-500/30',
      border: 'hover:border-sky-400/60',
      tag: 'from-sky-400 to-cyan-400',
    },
    {
      view: 'bala',
      emoji: '🚀',
      name: 'Bala',
      company: 'Mr. Cooper',
      role: 'Extra Edge Strategy',
      date: '15-Day Roadmap',
      gradient: 'from-violet-500/20 via-purple-400/10 to-indigo-500/10',
      glow: 'hover:shadow-violet-500/30',
      border: 'hover:border-violet-400/60',
      tag: 'from-violet-400 to-purple-400',
    },
  ];

  return (
    <div className="min-h-screen bg-[#080b14] relative overflow-hidden flex flex-col">
      {/* Background orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[40%] w-[30vw] h-[30vw] rounded-full bg-sky-900/10 blur-[100px] pointer-events-none" />

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium tracking-widest uppercase mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Placement Season 2026
        </div>

        <h1
          className="text-5xl sm:text-7xl font-serif font-bold text-white leading-tight mb-6"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          The Victory
          <span className="block bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-300 bg-clip-text text-transparent">
            Vault
          </span>
        </h1>

        <p className="max-w-lg text-white/50 text-lg sm:text-xl leading-relaxed mb-4">
          God walks with you. I stand with you.
        </p>
        <p className="max-w-lg text-white/35 text-base sm:text-lg leading-relaxed mb-16">
          Let's win this together.
        </p>

        <p className="text-white/30 text-sm font-medium tracking-widest uppercase mb-10">
          Choose your battlefield
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-4xl">
          {cards.map((c) => (
            <button
              key={c.view}
              onClick={() => setView(c.view)}
              className={`group relative rounded-2xl p-7 text-left border border-white/10 ${c.border}
                bg-gradient-to-br ${c.gradient} backdrop-blur-sm
                hover:-translate-y-2 hover:shadow-2xl ${c.glow}
                transition-all duration-300 cursor-pointer`}
            >
              {/* Glow ring on hover */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                ring-1 ring-white/20`} />

              <div className="text-4xl mb-5">{c.emoji}</div>
              <div className={`inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full
                bg-gradient-to-r ${c.tag} text-white mb-4`}>
                {c.role}
              </div>
              <h3 className="text-white text-xl font-bold mb-1">{c.name}</h3>
              <p className="text-white/50 text-sm mb-1">{c.company}</p>
              <p className="text-white/30 text-xs">{c.date}</p>

              <div className="mt-6 flex items-center gap-2 text-white/40 group-hover:text-white/70 transition-colors duration-200">
                <span className="text-xs font-medium">Open Dashboard</span>
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Footer quote */}
        <p className="mt-20 text-white/20 text-sm italic">
          "With God, all things are possible." — Matthew 19:26
        </p>
      </div>
    </div>
  );
}

// ─── ANU DASHBOARD ───────────────────────────────────────────────────────────

function AnuDashboard({ setView }) {
  const [checked, setChecked] = useState(() => buildChecked(anuPlan));

  const toggle = (di, ti) => {
    setChecked(prev => ({ ...prev, [`${di}-${ti}`]: !prev[`${di}-${ti}`] }));
  };

  const pct = calcProgress(
    anuPlan,
    Object.fromEntries(Object.entries(checked))
  );

  const totalTasks = anuPlan.reduce((s, d) => s + d.tasks.length, 0);
  const doneTasks = Object.values(checked).filter(Boolean).length;

  return (
    <div className="min-h-screen relative overflow-x-hidden"
      style={{ background: 'linear-gradient(135deg, #1a0e00 0%, #0f0900 40%, #1a0800 70%, #0a0500 100%)' }}>

      {/* Warm glow orbs */}
      <div className="fixed top-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-amber-700/15 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[10%] left-[-5%] w-[35vw] h-[35vw] rounded-full bg-orange-800/10 blur-[80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        {/* Top bar */}
        <div className="flex items-center justify-between py-6">
          <BackButton onClick={() => setView('home')} />
          <div className="text-amber-400/60 text-xs font-medium tracking-widest uppercase">
            Cadence Drive · March 13
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300/70 text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse-slow" />
            10-Day Sprint Plan
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Anu's Cadence
            <span className="block bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-300 bg-clip-text text-transparent">
              Preparation Sanctuary
            </span>
          </h1>
        </div>

        {/* Scripture card */}
        <div className="relative mb-8 rounded-2xl p-7 border border-amber-400/25 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(251,146,60,0.05) 100%)' }}>
          <div className="absolute inset-0 rounded-2xl" style={{
            boxShadow: 'inset 0 1px 0 rgba(251,191,36,0.15), 0 0 40px rgba(251,191,36,0.06)'
          }} />
          <div className="relative text-center">
            <div className="text-amber-300/40 text-4xl font-serif mb-3">"</div>
            <p
              className="text-amber-100/80 text-lg sm:text-xl leading-relaxed italic mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              For I can do everything through Christ, who gives me strength.
            </p>
            <p className="text-amber-400/60 text-sm font-medium">— Philippians 4:13</p>
          </div>
        </div>

        {/* Personal note */}
        <p className="text-center text-white/35 text-sm italic mb-10">
          God is guiding you. I am cheering for you. You are never alone. 🙏
        </p>

        {/* Progress panel */}
        <div className="rounded-2xl p-6 mb-10 border border-amber-400/15 bg-white/3 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 font-semibold text-base">Overall Progress</p>
              <p className="text-white/35 text-xs mt-0.5">{doneTasks} of {totalTasks} tasks completed</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-amber-300">{pct}%</span>
              <p className="text-amber-400/50 text-xs mt-0.5">Victory Meter</p>
            </div>
          </div>
          <ProgressBar pct={pct} colorClass="bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400" />
          {pct === 100 && (
            <p className="text-center text-amber-300 text-sm font-semibold mt-4 animate-pulse-slow">
              ✨ All done! Go conquer Cadence, Anu! ✨
            </p>
          )}
        </div>

        {/* Day cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {anuPlan.map((day, di) => (
            <DayCard
              key={di}
              day={day}
              checked={Object.fromEntries(day.tasks.map((_, ti) => [ti, checked[`${di}-${ti}`]]))}
              onToggle={(ti) => toggle(di, ti)}
              borderColor="border-amber-400"
              checkColor="from-amber-400 to-orange-500"
              badgeColor="text-amber-400"
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-14 text-center">
          <div className="inline-block px-6 py-3 rounded-2xl bg-amber-400/8 border border-amber-400/15">
            <p className="text-amber-300/60 text-sm italic">
              With God, all things are possible. — Your Brother 💛
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── KRUTHIKA DASHBOARD ──────────────────────────────────────────────────────

function KruthikaDashboard({ setView }) {
  const [checked, setChecked] = useState(() => buildChecked(kruthikaPlan));

  const toggle = (di, ti) => {
    setChecked(prev => ({ ...prev, [`${di}-${ti}`]: !prev[`${di}-${ti}`] }));
  };

  const pct = calcProgress(kruthikaPlan, checked);
  const totalTasks = kruthikaPlan.reduce((s, d) => s + d.tasks.length, 0);
  const doneTasks = Object.values(checked).filter(Boolean).length;

  return (
    <div className="min-h-screen relative overflow-x-hidden"
      style={{ background: 'linear-gradient(135deg, #00091a 0%, #000d24 40%, #001233 70%, #000610 100%)' }}>

      {/* Blue glow orbs */}
      <div className="fixed top-[-10%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-sky-800/15 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[10%] right-[-5%] w-[35vw] h-[35vw] rounded-full bg-cyan-900/12 blur-[80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        {/* Top bar */}
        <div className="flex items-center justify-between py-6">
          <BackButton onClick={() => setView('home')} />
          <div className="text-sky-400/60 text-xs font-medium tracking-widest uppercase">
            Mr. Cooper · March 15
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-400/10 border border-sky-400/20 text-sky-300/70 text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse-slow" />
            12-Day Command Plan
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Kruthika's Preparation
            <span className="block bg-gradient-to-r from-sky-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              Command Center
            </span>
          </h1>
        </div>

        {/* Quote card */}
        <div className="relative mb-8 rounded-2xl p-7 border border-sky-400/20 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.07) 0%, rgba(6,182,212,0.04) 100%)' }}>
          <div className="absolute inset-0 rounded-2xl" style={{
            boxShadow: 'inset 0 1px 0 rgba(14,165,233,0.12), 0 0 40px rgba(14,165,233,0.05)'
          }} />
          <div className="relative text-center">
            <div className="text-sky-300/40 text-4xl font-serif mb-3">"</div>
            <p
              className="text-sky-100/80 text-lg sm:text-xl leading-relaxed italic mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              The only way to do great work is to love what you do.
            </p>
            <p className="text-sky-400/60 text-sm font-medium">— Steve Jobs</p>
          </div>
        </div>

        {/* Personal note */}
        <p className="text-center text-white/35 text-sm italic mb-10">
          God strengthens you. I believe in you. You will rise. 💙
        </p>

        {/* Progress panel */}
        <div className="rounded-2xl p-6 mb-10 border border-sky-400/15 bg-white/3 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 font-semibold text-base">Overall Progress</p>
              <p className="text-white/35 text-xs mt-0.5">{doneTasks} of {totalTasks} tasks completed</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-sky-300">{pct}%</span>
              <p className="text-sky-400/50 text-xs mt-0.5">Command Level</p>
            </div>
          </div>
          <ProgressBar pct={pct} colorClass="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400" />
          {pct === 100 && (
            <p className="text-center text-sky-300 text-sm font-semibold mt-4 animate-pulse-slow">
              💙 All done! You are ready. Go claim your offer, Kruthika!
            </p>
          )}
        </div>

        {/* Day cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {kruthikaPlan.map((day, di) => (
            <DayCard
              key={di}
              day={day}
              checked={Object.fromEntries(day.tasks.map((_, ti) => [ti, checked[`${di}-${ti}`]]))}
              onToggle={(ti) => toggle(di, ti)}
              borderColor="border-sky-400"
              checkColor="from-sky-400 to-cyan-500"
              badgeColor="text-sky-400"
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-14 text-center">
          <div className="inline-block px-6 py-3 rounded-2xl bg-sky-400/8 border border-sky-400/15">
            <p className="text-sky-300/60 text-sm italic">
              I am always proud of you. — Your Brother 💙
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BALA DASHBOARD ──────────────────────────────────────────────────────────

function BalaDashboard({ setView }) {
  const [checked, setChecked] = useState(() => buildChecked(balaPlan));
  const [activePhaseFilter, setActivePhaseFilter] = useState('All');

  const toggle = (di, ti) => {
    setChecked(prev => ({ ...prev, [`${di}-${ti}`]: !prev[`${di}-${ti}`] }));
  };

  const pct = calcProgress(balaPlan, checked);
  const totalTasks = balaPlan.reduce((s, d) => s + d.tasks.length, 0);
  const doneTasks = Object.values(checked).filter(Boolean).length;

  const phases = ['All', 'Foundation', 'Speed & Depth', 'Project', 'Mock Interview', 'HR & Communication', 'Confidence Run'];

  const filteredPlan = activePhaseFilter === 'All'
    ? balaPlan.map((d, i) => ({ ...d, origIdx: i }))
    : balaPlan.map((d, i) => ({ ...d, origIdx: i })).filter(d => d.phase === activePhaseFilter);

  return (
    <div className="min-h-screen relative overflow-x-hidden"
      style={{ background: 'linear-gradient(135deg, #04020f 0%, #070314 40%, #0b0522 70%, #020108 100%)' }}>

      {/* Indigo glow orbs */}
      <div className="fixed top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-violet-900/18 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[5%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-indigo-900/15 blur-[90px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        {/* Top bar */}
        <div className="flex items-center justify-between py-6">
          <BackButton onClick={() => setView('home')} />
          <div className="text-violet-400/60 text-xs font-medium tracking-widest uppercase">
            Mr. Cooper · 15-Day Execution
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-400/10 border border-violet-400/20 text-violet-300/70 text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse-slow" />
            Extra Edge Strategy
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Bala's Execution
            <span className="block bg-gradient-to-r from-violet-300 via-purple-200 to-indigo-300 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-white/35 text-base mt-4 italic">
            Rise in discipline. Execute with clarity. Win with humility.
          </p>
        </div>

        {/* Mission statement */}
        <div className="relative mb-8 rounded-2xl p-6 border border-violet-500/20 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(99,102,241,0.05) 100%)' }}>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">⚡</span>
            </div>
            <div>
              <p className="text-violet-100/70 text-sm leading-relaxed">
                God gives strength. I build the effort.
              </p>
              <p className="text-violet-400/50 text-xs mt-1">
                Not just clearing rounds — <span className="text-violet-300/70 font-semibold">standing out technically and confidently.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Progress panel */}
        <div className="rounded-2xl p-6 mb-8 border border-violet-400/15 bg-white/3 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 font-semibold text-base">Execution Progress</p>
              <p className="text-white/35 text-xs mt-0.5">{doneTasks} of {totalTasks} targets completed</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-violet-300">{pct}%</span>
              <p className="text-violet-400/50 text-xs mt-0.5">Domination Level</p>
            </div>
          </div>
          <ProgressBar pct={pct} colorClass="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400" />
          {pct === 100 && (
            <p className="text-center text-violet-300 text-sm font-semibold mt-4 animate-pulse-slow">
              ⚡ 15 days. Zero excuses. Now go dominate, Bala.
            </p>
          )}
        </div>

        {/* Phase filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {phases.map(ph => (
            <button
              key={ph}
              onClick={() => setActivePhaseFilter(ph)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border
                ${activePhaseFilter === ph
                  ? 'bg-violet-500/30 border-violet-400/60 text-violet-200'
                  : 'bg-white/5 border-white/10 text-white/40 hover:text-white/60 hover:border-white/20'
                }`}
            >
              {ph}
            </button>
          ))}
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'DSA Focus', value: '5–7', unit: 'problems/day', icon: '🧠' },
            { label: 'Mock Sessions', value: '4', unit: 'full simulations', icon: '⏱️' },
            { label: 'Mini Project', value: '1', unit: 'CRUD API', icon: '🔧' },
          ].map((s, i) => (
            <div key={i} className="rounded-xl p-4 bg-white/4 border border-white/8 text-center">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-xl font-bold text-violet-300">{s.value}</div>
              <div className="text-white/30 text-xs">{s.unit}</div>
              <div className="text-white/20 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Day cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filteredPlan.map((day) => (
            <DayCard
              key={day.origIdx}
              day={day}
              checked={Object.fromEntries(day.tasks.map((_, ti) => [ti, checked[`${day.origIdx}-${ti}`]]))}
              onToggle={(ti) => toggle(day.origIdx, ti)}
              borderColor="border-violet-400"
              checkColor="from-violet-400 to-indigo-500"
              badgeColor="text-violet-400"
              phase={day.phase}
            />
          ))}
        </div>

        {/* Stand-out tactics */}
        <div className="mt-12 rounded-2xl p-6 border border-violet-400/20"
          style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.06) 0%, rgba(99,102,241,0.04) 100%)' }}>
          <h3 className="text-white/80 font-semibold text-base mb-5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-violet-500/30 flex items-center justify-center text-xs">🏆</span>
            Stand-Out Tactics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🗣️', title: 'Think Aloud', desc: 'Say your approach before coding. Interviewers score communication.' },
              { icon: '⚡', title: 'Optimize Proactively', desc: 'After solving: "This is O(n²), I can bring it to O(n) using…"' },
              { icon: '✍️', title: 'Clean Variable Names', desc: 'windowStart, maxLen, freqMap — not i, j, temp.' },
              { icon: '🔍', title: 'Edge Case Statement', desc: '"Checking empty input, single element, overflow" — shows structure.' },
              { icon: '📦', title: 'Own Your Project', desc: 'Know every design decision in your CRUD project inside out.' },
              { icon: '🎯', title: 'Humility + Hunger', desc: 'Confident voice. Open mind. "I don\'t know, but I\'d reason..."' },
            ].map((t, i) => (
              <div key={i} className="rounded-xl p-4 bg-white/4 border border-white/8 hover:border-violet-400/30 transition-colors duration-200">
                <div className="text-xl mb-2">{t.icon}</div>
                <p className="text-white/75 text-sm font-semibold mb-1">{t.title}</p>
                <p className="text-white/35 text-xs leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-14 text-center">
          <div className="inline-block px-6 py-3 rounded-2xl bg-violet-400/8 border border-violet-400/15">
            <p className="text-violet-300/60 text-sm italic font-medium">
              Discipline today. Victory tomorrow. ⚡
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── APP ROOT ────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState('home');

  return (
    <div className="min-h-screen">
      {view === 'home' && <Landing setView={setView} />}
      {view === 'anu' && <AnuDashboard setView={setView} />}
      {view === 'kruthika' && <KruthikaDashboard setView={setView} />}
      {view === 'bala' && <BalaDashboard setView={setView} />}
    </div>
  );
}
