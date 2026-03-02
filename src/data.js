/* ─── HERO CONTENT ─────────────────────────────────────────────────────────── */
export const GREETINGS = [
    "Hey genius! Who's prepping today? 🔥",
    "Which warrior is ready to conquer? ⚡",
    "Tell me who's logging in — let's crush it! 🚀",
    "The Victory Vault awaits. Who enters today? 🏛️",
    "Ready to make your brother proud? Type your name! 💪",
    "God's favourite student is here! Who are you? ✨",
];
export const HERO_SUBS = [
    "Type your name and the journey begins.",
    "Your dashboard is one name away.",
    "Anu · Kruthika · Bala — whose battlefield today?",
    "Three warriors. One vault. Begin.",
];
export const HERO_BGS = [
    'linear-gradient(135deg,#080b14,#0d1022,#060910)',
    'linear-gradient(135deg,#0a0500,#160900,#060200)',
    'linear-gradient(135deg,#00050f,#000c20,#000408)',
    'linear-gradient(135deg,#080010,#100020,#040008)',
];

/* ─── ANU CONTENT ──────────────────────────────────────────────────────────── */
export const ANU_VERSES = [
    { v: "For I can do everything through Christ, who gives me strength.", r: "Philippians 4:13" },
    { v: "Commit to the Lord whatever you do, and He will establish your plans.", r: "Proverbs 16:3" },
    { v: "The Lord your God is with you, the Mighty Warrior who saves.", r: "Zephaniah 3:17" },
    { v: "Trust in the Lord with all your heart — He will make your paths straight.", r: "Proverbs 3:5-6" },
    { v: "She is clothed with strength and dignity, and she laughs without fear.", r: "Proverbs 31:25" },
];
export const ANU_NOTES = [
    "Golden warrior, I am right here cheering for you 😏",
    "You will walk into Cadence like you own the place 👑",
    "God has already written your victory. Just show up 🙏",
    "EEE queen incoming — Cadence does not know what is coming 💥",
    "Every formula you memorise is a step closer 💛",
];

/* ─── KRUTHIKA CONTENT ─────────────────────────────────────────────────────── */
export const K_QUOTES = [
    { q: "The only way to do great work is to love what you do.", a: "Steve Jobs" },
    { q: "Believe you can and you are halfway there.", a: "Theodore Roosevelt" },
    { q: "Success is the sum of small efforts repeated day in and day out.", a: "Robert Collier" },
    { q: "Every expert was once a beginner. You are closer than you think.", a: "Unknown" },
    { q: "She believed she could, so she did.", a: "R.S. Grey" },
];
export const K_NOTES = [
    "God strengthens you. I am with you always 💙",
    "Blue thunder incoming — Mr. Cooper is lucky to have you 🌊",
    "Do it scared, do it tired, just do it. I have got your back 💪",
    "You are not just preparing — you are transforming 🦋",
    "One more day, one more victory. You are almost there 🌟",
];

/* ─── BALA CONTENT ─────────────────────────────────────────────────────────── */
export const BALA_CRIES = [
    { l: "Discipline today. Domination tomorrow.", e: "⚡" },
    { l: "Every problem you solve is a rep. Keep lifting.", e: "🏋️" },
    { l: "God gives strength. Effort wins battles.", e: "🔥" },
    { l: "War-room mode activated. No distractions. Execute.", e: "🎯" },
    { l: "Not preparing to pass — preparing to stand out.", e: "🚀" },
];
export const PHASES = ['All', 'Foundation', 'Speed & Depth', 'Project', 'Mock Interview', 'HR & Communication', 'Confidence Run'];

/* ─── PLAN DATA ────────────────────────────────────────────────────────────── */
export const anuPlan = [
    { day: 'Day 1', date: 'Mar 3', isoDate: '2026-03-03', tasks: ["Boolean Algebra: Laws, De Morgan's, Canonical forms (SOP/POS)", "K-Map simplification: 2,3,4-variable with don't cares", 'Aptitude: Time & Work (LCM method) — 15 problems', 'Whiteboard: Draw CMOS Inverter + label pull-up/pull-down'] },
    { day: 'Day 2', date: 'Mar 4', isoDate: '2026-03-04', tasks: ['Sequential: SR, JK, D, T Flip-flops — truth & excitation tables', 'Counters: Synchronous vs Asynchronous, Ring & Johnson', 'Shift Registers: SISO, SIPO, PISO, PIPO operation', 'Aptitude: Permutations & Combinations (nCr, nPr, circular)'] },
    { day: 'Day 3', date: 'Mar 5', isoDate: '2026-03-05', tasks: ['Verilog: module, port types, wire vs reg, assign vs always', 'Blocking (=) vs Non-blocking (<=) — critical difference with examples', 'Write from scratch: AND gate, Half Adder, 4:1 MUX in Verilog', 'Aptitude: Number Series, Letter Series — 20 problems'] },
    { day: 'Day 4', date: 'Mar 6', isoDate: '2026-03-06', tasks: ['MOSFET: Cutoff, Linear, Saturation regions & I-V equations', 'CMOS Logic: NAND, NOR, XOR — pull-up & pull-down network design', 'CMOS Power: static vs dynamic, short channel effects (DIBL)', 'Aptitude: Profit & Loss — marked price, successive discounts'] },
    { day: 'Day 5', date: 'Mar 7', isoDate: '2026-03-07', tasks: ['PN Junction: depletion region, built-in potential, I-V characteristics', 'Zener diode: avalanche vs Zener breakdown, applications', 'BJT: NPN/PNP modes, CE/CB/CC — key parameters comparison', 'Full Aptitude Mock #1: 30 questions in 35 minutes'] },
    { day: 'Day 6', date: 'Mar 8', isoDate: '2026-03-08', tasks: ['Timing Analysis: Setup time, Hold time — definitions & violations', 'Clock Skew: positive vs negative, its impact on timing', 'Critical Path: longest path, slack = required minus arrival', 'Aptitude: Seating Arrangement (linear & circular) — 10 problems'] },
    { day: 'Day 7', date: 'Mar 9', isoDate: '2026-03-09', tasks: ['FSM Design: Mealy vs Moore — state diagram to circuit', 'Design a 2-bit sequence detector FSM end-to-end on paper', 'Verilog FSM: code a traffic light controller with 3 states', 'Aptitude: Data Sufficiency — 15 problems'] },
    { day: 'Day 8', date: 'Mar 10', isoDate: '2026-03-10', tasks: ['Op-Amps: virtual short, inverting & non-inverting configurations', 'Feedback: types (series-shunt, shunt-series), effect on impedance', 'Network Theory: Thevenin & Norton theorem — 3 circuit problems', 'RC Transients: tau=RC, step response formula, time constant'] },
    { day: 'Day 9', date: 'Mar 11', isoDate: '2026-03-11', tasks: ['AI in Semiconductors: EDA AI tools, Cadence Cerebrus & Verisium', 'Technical HR: Tell me about yourself — record & polish (90 sec)', 'Technical HR: Why Cadence, Strengths/Weaknesses, 5-year goal', 'Full Aptitude Mock #2: 40 questions in 50 minutes'] },
    { day: 'Day 10', date: 'Mar 12', isoDate: '2026-03-12', tasks: ['Full Mock Day: 30 Digital Logic MCQs timed 35 min', 'Verilog: Write FSM, 3-bit counter, shift register from memory', 'Timing Analysis: 2 slack calculation problems, identify violations', 'Final Whiteboard: CMOS NAND transistor-level from memory'] },
];

export const kPlan = [
    { day: 'Day 1', date: 'Mar 3', isoDate: '2026-03-03', tasks: ['DSA: Arrays — Two Pointers: Two Sum II, Valid Palindrome, 3Sum', 'OOP: Encapsulation & Abstraction — write BankAccount class', 'SQL: SELECT, WHERE, ORDER BY — write 10 queries from scratch', 'Aptitude: 20 verbal reasoning problems'] },
    { day: 'Day 2', date: 'Mar 4', isoDate: '2026-03-04', tasks: ['DSA: Sliding Window — Max sum subarray K, Longest substring no repeat', 'OOP: Inheritance & Polymorphism — extend Shape hierarchy in code', 'SQL: GROUP BY, HAVING, COUNT/SUM/AVG — 8 aggregate queries', 'DBMS: Normalization — identify 1NF, 2NF, 3NF violations'] },
    { day: 'Day 3', date: 'Mar 5', isoDate: '2026-03-05', tasks: ['DSA: Strings — Anagram detection, Group Anagrams, String compression', 'OOP: Overloading vs Overriding — write code examples for both', 'DBMS: Keys — Primary, Foreign, Candidate, Composite, Super key', 'SQL: INNER JOIN, LEFT JOIN, RIGHT JOIN — 6 join queries'] },
    { day: 'Day 4', date: 'Mar 6', isoDate: '2026-03-06', tasks: ['DSA: HashMap — Two Sum, Subarray Sum = K, Longest Consecutive', 'OOP: Interface vs Abstract Class — decision rule + examples', 'DBMS: ACID Properties — explain each with a real-world example', 'SQL: Subqueries — correlated & non-correlated — 5 problems'] },
    { day: 'Day 5', date: 'Mar 7', isoDate: '2026-03-07', tasks: ['DSA: Stack — Valid Parentheses, Min Stack, Next Greater Element', 'DBMS: Indexing (B-tree, Hash), clustered vs non-clustered', 'DBMS: DELETE vs TRUNCATE vs DROP — when to use each', 'SQL: Mixed practice — 15 queries covering all previous topics'] },
    { day: 'Day 6', date: 'Mar 8', isoDate: '2026-03-08', tasks: ['DSA: Recursion — Fibonacci, Power(x,n), Subsets generation', 'OOP: Constructors — default, parameterized, copy constructor rules', 'DBMS: Joins deep dive — NATURAL, CROSS, SELF joins', 'Mock MCQ #1: 25 OOP + DBMS MCQs in 30 minutes'] },
    { day: 'Day 7', date: 'Mar 9', isoDate: '2026-03-09', tasks: ['DSA: Binary Search — Classic, First/Last Position, Rotated Array', 'DSA: Binary Search on Answer — minimize max, kth smallest', 'SQL: Complex queries — nested subqueries, multi-table joins', 'Aptitude: Data Sufficiency + Series — 20 problems'] },
    { day: 'Day 8', date: 'Mar 10', isoDate: '2026-03-10', tasks: ['Full DSA Mock: 7 problems in 90 minutes (timed)', 'OOP Revision: All 8 concepts — quick verbal explanation of each', 'DBMS Revision: Normalization + ACID + Keys — one-pager revision', 'SQL Active Practice: 10 queries from memory, no reference'] },
    { day: 'Day 9', date: 'Mar 11', isoDate: '2026-03-11', tasks: ['Round 2 Simulation: 2-hour session — 2 medium-hard problems', 'Edge cases: empty, single element, negatives, overflow', 'Optimize solutions after brute force — explain time/space complexity', 'Code review: clean variable names, add inline comments'] },
    { day: 'Day 10', date: 'Mar 12', isoDate: '2026-03-12', tasks: ['Sliding Window Hard: Minimum Window Substring, Fruit Into Baskets', 'HashMap Advanced: Top K Frequent Elements, LRU Cache concept', 'SQL Final Mock: 12 queries including complex joins & subqueries', 'Mock MCQ #2: 30 OOP + DBMS + SQL MCQs in 35 minutes'] },
    { day: 'Day 11', date: 'Mar 13', isoDate: '2026-03-13', tasks: ['DSA: String Hard — Longest Palindromic Substring, Word Break', 'Array Transforms: Rotate Array, Product Except Self, Next Permutation', 'OOP: Design a mini Library Management System (class diagram + code)', 'SQL: Write optimized query for employee-department hierarchy'] },
    { day: 'Day 12', date: 'Mar 14', isoDate: '2026-03-14', tasks: ['Final Full Mock: 8 DSA + 35 MCQs (OOP/DBMS/SQL) — full simulation', 'Debrief: categorize wrong answers, targeted 30-min revision', 'HR prep: Tell me about yourself, Why Mr. Cooper, Strength', 'Round 2 Final Sim: 2 hard problems in 2 hours — clean code target'] },
];

export const bPlan = [
    { day: 'Day 1', date: 'Mar 3', isoDate: '2026-03-03', phase: 'Foundation', tasks: ['DSA Warm-up: Two Sum, Best Time Buy/Sell Stock, Max Subarray', 'OOP: Encapsulation + Abstraction — code BankAccount class with getters/setters', 'SQL: SELECT + WHERE + ORDER BY — 10 hand-written queries', 'Goal: Re-activate coding muscle, hands on keyboard'] },
    { day: 'Day 2', date: 'Mar 4', isoDate: '2026-03-04', phase: 'Foundation', tasks: ['DSA: Valid Anagram, Longest Substring Without Repeat, Group Anagrams', 'OOP: Overloading vs Overriding — write separate code examples for both', 'SQL: GROUP BY + HAVING, COUNT/SUM/AVG — 8 aggregate queries', 'Explain your code out loud after solving — interview habit starts now'] },
    { day: 'Day 3', date: 'Mar 5', isoDate: '2026-03-05', phase: 'Foundation', tasks: ['DSA: Two Sum (HashMap), Subarray Sum = K, Longest Consecutive Sequence', 'DBMS: 1NF, 2NF, 3NF — identify violations in 5 practice schemas', 'SQL: INNER JOIN, LEFT JOIN, RIGHT JOIN — 6 join queries from scratch', 'After each DSA: state time & space complexity before submitting'] },
    { day: 'Day 4', date: 'Mar 6', isoDate: '2026-03-06', phase: 'Foundation', tasks: ['DSA: Binary Search — Classic, First/Last Position, Search in Rotated Array', 'DBMS: ACID, Primary/Foreign/Candidate/Composite Keys', 'SQL: Subqueries — correlated & non-correlated — 5 problems', 'OOP: Interface vs Abstract Class — decision tree + code sample'] },
    { day: 'Day 5', date: 'Mar 7', isoDate: '2026-03-07', phase: 'Foundation', tasks: ['DSA: Valid Parentheses, Min Stack, Evaluate Reverse Polish Notation', 'Recursion: Fibonacci, Power(x,n), Generate all Subsets', 'SQL: Mixed session — 15 queries from all topics, no reference sheet', 'DBMS: Indexing (B-tree vs Hash, Clustered vs Non-clustered)'] },
    { day: 'Day 6', date: 'Mar 8', isoDate: '2026-03-08', phase: 'Speed & Depth', tasks: ['Full Mock #1: 7 DSA problems in 90 minutes (timed, no hints)', '20 OOP + DBMS + SQL MCQs in 25 minutes', 'Debrief: write WHY you got each wrong answer wrong — 1 sentence each', 'Identify your 2 weakest topics — plan tomorrow accordingly'] },
    { day: 'Day 7', date: 'Mar 9', isoDate: '2026-03-09', phase: 'Speed & Depth', tasks: ['Sliding Window: Min Window Substring, Fruit Into Baskets, Longest Repeating', 'Before coding: say approach aloud — I see this as a sliding window because...', 'SQL Advanced: 5 complex queries (nested subqueries, multi-table joins)', 'DBMS: DELETE vs TRUNCATE vs DROP — when each is appropriate'] },
    { day: 'Day 8', date: 'Mar 10', isoDate: '2026-03-10', phase: 'Speed & Depth', tasks: ['HashMap: Top K Frequent Elements, Word Pattern, Ransom Note', 'OOP: Design Library Management System — class diagram + full code', 'SQL: 8 queries from company-like problems (payroll, orders, inventory)', 'Code quality check: clean variable names? Any deeply nested logic?'] },
    { day: 'Day 9', date: 'Mar 11', isoDate: '2026-03-11', phase: 'Speed & Depth', tasks: ['Round 2 Simulation: 2-hour solo session — 2 medium-hard problems', 'No Google, no hints — pure execution under pressure', 'Edge case checklist: empty, single, negatives, overflow', 'Debrief: what slowed you? Which edge cases did you miss?'] },
    { day: 'Day 10', date: 'Mar 12', isoDate: '2026-03-12', phase: 'Speed & Depth', tasks: ['Full Mock #2: 8 DSA problems in 90 minutes + 25 MCQs', 'Array: Product Except Self, Next Permutation, Rotate Array', 'SQL Final Practice: 12 queries — joins, aggregates, subqueries', 'Compile weak area list — inputs for Day 11 targeted revision'] },
    { day: 'Day 11', date: 'Mar 13', isoDate: '2026-03-13', phase: 'Project', tasks: ['Start CRUD API: Student Record Manager (Node/Express or FastAPI)', 'Implement: GET /students, POST /students, PUT /:id, DELETE /:id', 'Connect SQLite or PostgreSQL — write raw SQL queries, not ORM', 'Target: all 4 endpoints working with proper status codes & error handling'] },
    { day: 'Day 12', date: 'Mar 14', isoDate: '2026-03-14', phase: 'Project', tasks: ['Add input validation, error responses (404, 400, 500)', 'Test with Postman or curl — all 4 endpoints must return correct data', 'Write a 5-sentence project explanation: what, why, how, design choice, outcome', 'Prepare to walk through the project in an interview — practice twice'] },
    { day: 'Day 13', date: 'Mar 15', isoDate: '2026-03-15', phase: 'Mock Interview', tasks: ['Mock Round 1 (45 min): 2 DSA problems + 10 verbal OOP/DBMS MCQs', 'Mock Round 2 (90 min): 1 hard DSA + walk through CRUD project', 'Self-review: Was code clean? Edge cases covered? Explained clearly?', 'HR: Tell me about yourself — time it to 90 seconds exactly'] },
    { day: 'Day 14', date: 'Mar 16', isoDate: '2026-03-16', phase: 'HR & Communication', tasks: ['HR: Practice STAR method — Describe a challenge you overcame', 'Why Mr. Cooper? — research fintech angle, mention debt management scale', 'Strength? Systematic problem-solver who documents logic before coding', '3-year goal? Strong backend dev contributing to fintech systems'] },
    { day: 'Day 15', date: 'Mar 17', isoDate: '2026-03-17', phase: 'Confidence Run', tasks: ['Morning: 3 medium problems — measure time, target under 25 min each', 'Afternoon: 5 HR answers rehearsed aloud (timed, to mirror)', 'Walk through CRUD project end-to-end — explain every design decision', 'Evening: light review, formula glance, sleep early — you are ready'] },
];
