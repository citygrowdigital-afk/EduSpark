/* =============================================
   EduSpark — script.js
   Modular client-side app · LocalStorage powered
   ============================================= */

/* ──────────────── DATA ──────────────── */
const SUBJECTS = [
  {id:'maths',  name:'Maths',            ic:'📐', bg:'var(--m-bg)', acc:'var(--m-acc)'},
  {id:'science',name:'Science',          ic:'🔬', bg:'var(--s-bg)', acc:'var(--s-acc)'},
  {id:'english',name:'English',          ic:'📖', bg:'var(--e-bg)', acc:'var(--e-acc)'},
  {id:'geo',    name:'Geography',        ic:'🌍', bg:'var(--g-bg)', acc:'var(--g-acc)'},
  {id:'cs',     name:'Computer Science', ic:'💻', bg:'var(--c-bg)', acc:'var(--c-acc)'},
  {id:'history',name:'History',          ic:'🏺', bg:'var(--h-bg)', acc:'var(--h-acc)'}
];
const subMap = Object.fromEntries(SUBJECTS.map(s=>[s.id,s]));

/* 50+ flashcards */
const FLASHCARDS = [
  ['maths','Pythagoras Theorem','a² + b² = c² for right-angled triangles','easy'],
  ['maths','Area of circle','π × r²','easy'],
  ['maths','Quadratic formula','x = (-b ± √(b²-4ac)) / 2a','med'],
  ['maths','sin² + cos²','= 1 (Pythagorean identity)','easy'],
  ['maths','Derivative of xⁿ','n·xⁿ⁻¹','med'],
  ['maths','Integral of 1/x','ln|x| + C','med'],
  ['maths','Sum of n natural nums','n(n+1)/2','easy'],
  ['maths','Slope formula','(y₂-y₁)/(x₂-x₁)','easy'],
  ['maths','Volume of sphere','(4/3)πr³','med'],
  ['maths','Logarithm rule','log(ab) = log a + log b','hard'],

  ['science','Newton\'s 2nd Law','F = m × a','easy'],
  ['science','Speed of light','3 × 10⁸ m/s','easy'],
  ['science','Photosynthesis','6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂','med'],
  ['science','Ohm\'s Law','V = I × R','easy'],
  ['science','Density formula','ρ = m / V','easy'],
  ['science','Acceleration due to gravity','9.8 m/s² on Earth','easy'],
  ['science','Atomic number of Carbon','6','easy'],
  ['science','pH of pure water','7 (neutral)','easy'],
  ['science','Cell powerhouse','Mitochondria','easy'],
  ['science','Plant reproduction unit','Flower / seed','med'],
  ['science','Hooke\'s Law','F = k × x (spring force)','med'],
  ['science','Avogadro\'s number','6.022 × 10²³','hard'],

  ['english','Metaphor','Direct comparison without "like" or "as"','easy'],
  ['english','Simile','Comparison using "like" or "as"','easy'],
  ['english','Onomatopoeia','Word that imitates a sound (bang, hiss)','med'],
  ['english','Alliteration','Repetition of initial consonant sounds','easy'],
  ['english','Personification','Giving human traits to non-human things','med'],
  ['english','Active voice','Subject performs the verb action','easy'],
  ['english','Iambic pentameter','Five iambs per line (Shakespearean)','hard'],
  ['english','Synonym for "happy"','Elated, cheerful, content, joyful','easy'],

  ['geo','Largest ocean','Pacific Ocean','easy'],
  ['geo','Longest river','Nile (or Amazon by some measures)','med'],
  ['geo','Tropic of Cancer','23.5° N latitude','med'],
  ['geo','Capital of Australia','Canberra','easy'],
  ['geo','Highest mountain','Mt Everest — 8,849 m','easy'],
  ['geo','Driest desert','Atacama, Chile','hard'],
  ['geo','Country with most timezones','France (12, incl. territories)','hard'],
  ['geo','Tectonic plates','Earth\'s crust split into ~15 major plates','med'],

  ['cs','Binary of 10','1010','easy'],
  ['cs','Time complexity of binary search','O(log n)','med'],
  ['cs','HTML stands for','HyperText Markup Language','easy'],
  ['cs','CSS stands for','Cascading Style Sheets','easy'],
  ['cs','Smallest data unit','Bit','easy'],
  ['cs','RAM means','Random Access Memory','easy'],
  ['cs','Recursion','A function that calls itself','med'],
  ['cs','Sorting: Bubble vs Quick','Quick O(n log n) avg, Bubble O(n²)','hard'],
  ['cs','JavaScript ===','Strict equality, no type coercion','med'],

  ['history','WWII years','1939 – 1945','easy'],
  ['history','First Indian PM','Jawaharlal Nehru','easy'],
  ['history','French Revolution','Began 1789','med'],
  ['history','Indus Valley civilisation','~3300 – 1300 BCE','med'],
  ['history','Mahatma Gandhi born','2 October 1869','easy'],
  ['history','Renaissance origin','14th-century Italy','hard']
];

/* 30+ quiz questions */
const QUESTIONS = [
  {sub:'maths',q:'In a right triangle with sides 3 and 4, what is the hypotenuse?',opts:['5','6','7','12'],ans:0,diff:'easy'},
  {sub:'maths',q:'Which of these is a prime number?',opts:['1','9','13','21'],ans:2,diff:'easy'},
  {sub:'maths',q:'Value of π to two decimals?',opts:['3.12','3.14','3.16','3.18'],ans:1,diff:'easy'},
  {sub:'maths',q:'Derivative of x³?',opts:['3x²','x²','3x','x⁴/4'],ans:0,diff:'med'},
  {sub:'maths',q:'log₁₀(1000) = ?',opts:['2','3','4','10'],ans:1,diff:'med'},
  {sub:'maths',q:'Solve: 2x + 6 = 18',opts:['4','6','8','12'],ans:1,diff:'easy'},
  {sub:'maths',q:'Integral of cos(x)?',opts:['sin(x)+C','-sin(x)+C','tan(x)+C','sec(x)+C'],ans:0,diff:'hard'},

  {sub:'science',q:'What gas do plants release during photosynthesis?',opts:['CO₂','Nitrogen','Oxygen','Hydrogen'],ans:2,diff:'easy'},
  {sub:'science',q:'Which of Newton\'s Laws states F = ma?',opts:['First','Second','Third','Fourth'],ans:1,diff:'easy'},
  {sub:'science',q:'Chemical symbol for Gold?',opts:['Go','Gd','Au','Ag'],ans:2,diff:'easy'},
  {sub:'science',q:'Speed of light in vacuum (m/s)?',opts:['3 × 10⁶','3 × 10⁸','3 × 10¹⁰','3 × 10⁴'],ans:1,diff:'med'},
  {sub:'science',q:'Powerhouse of the cell?',opts:['Ribosome','Nucleus','Mitochondria','Lysosome'],ans:2,diff:'easy'},
  {sub:'science',q:'pH of a strong acid is closest to?',opts:['0','7','10','14'],ans:0,diff:'med'},
  {sub:'science',q:'Unit of electric current?',opts:['Volt','Ohm','Ampere','Watt'],ans:2,diff:'easy'},

  {sub:'english',q:'"Time is a thief" — this is a:',opts:['Simile','Metaphor','Hyperbole','Onomatopoeia'],ans:1,diff:'easy'},
  {sub:'english',q:'Identify the noun: "The quick fox jumped."',opts:['Quick','Fox','Jumped','The'],ans:1,diff:'easy'},
  {sub:'english',q:'Past tense of "run"?',opts:['Runned','Ran','Run','Running'],ans:1,diff:'easy'},
  {sub:'english',q:'Antonym of "abundant"?',opts:['Plentiful','Scarce','Wealthy','Eager'],ans:1,diff:'med'},
  {sub:'english',q:'A 14-line poem is called a:',opts:['Haiku','Sonnet','Ode','Ballad'],ans:1,diff:'med'},

  {sub:'geo',q:'Largest desert in the world?',opts:['Sahara','Gobi','Antarctic','Kalahari'],ans:2,diff:'hard'},
  {sub:'geo',q:'Capital of Japan?',opts:['Osaka','Tokyo','Kyoto','Seoul'],ans:1,diff:'easy'},
  {sub:'geo',q:'Which river flows through Egypt?',opts:['Amazon','Nile','Ganga','Yangtze'],ans:1,diff:'easy'},
  {sub:'geo',q:'Continent of Brazil?',opts:['Africa','Asia','South America','Europe'],ans:2,diff:'easy'},
  {sub:'geo',q:'Tropic of Capricorn latitude?',opts:['23.5°N','23.5°S','45°N','0°'],ans:1,diff:'med'},

  {sub:'cs',q:'Binary of decimal 5?',opts:['100','101','110','111'],ans:1,diff:'easy'},
  {sub:'cs',q:'Which is NOT a JS data type?',opts:['Number','String','Float','Boolean'],ans:2,diff:'med'},
  {sub:'cs',q:'CSS property for text colour?',opts:['font-color','color','text-color','foreground'],ans:1,diff:'easy'},
  {sub:'cs',q:'Big-O of binary search?',opts:['O(n)','O(log n)','O(n²)','O(1)'],ans:1,diff:'med'},
  {sub:'cs',q:'HTML tag for largest heading?',opts:['<h6>','<h1>','<head>','<heading>'],ans:1,diff:'easy'},
  {sub:'cs',q:'Which keyword declares a constant in JS?',opts:['let','var','const','final'],ans:2,diff:'easy'},

  {sub:'history',q:'Year India gained independence?',opts:['1942','1945','1947','1950'],ans:2,diff:'easy'},
  {sub:'history',q:'Who painted the Mona Lisa?',opts:['Van Gogh','Picasso','Da Vinci','Michelangelo'],ans:2,diff:'easy'},
  {sub:'history',q:'WWII ended in?',opts:['1942','1944','1945','1948'],ans:2,diff:'easy'},
  {sub:'history',q:'Who was the first Mughal emperor?',opts:['Akbar','Babur','Aurangzeb','Humayun'],ans:1,diff:'med'}
];

/* Revision packs — chapter notes/concepts/MCQs/flashcards */
const REVISION = {
  maths:{
    'Algebra':{
      notes:['Variables represent unknown numbers','Equations balance both sides','Solve by isolating the variable','Like terms can be combined'],
      concepts:['Linear equations: ax + b = 0','Quadratic equations: ax² + bx + c = 0','Polynomials: sum of terms with whole powers','Identities: (a+b)² = a² + 2ab + b²'],
      mcqs:[{q:'Solve 3x = 12',a:'x = 4'},{q:'Expand (x+2)²',a:'x² + 4x + 4'},{q:'Roots of x²-5x+6=0',a:'2 and 3'}],
      flash:[['What is a coefficient?','Number multiplying a variable'],['Degree of x³+2x','3 — highest exponent']]
    },
    'Trigonometry':{
      notes:['sin, cos, tan are ratios in a right triangle','Angles are usually in degrees or radians','sin²θ + cos²θ = 1','tan θ = sin θ / cos θ'],
      concepts:['SOH-CAH-TOA','Unit circle','Trig identities','Heights & distances'],
      mcqs:[{q:'sin 30°',a:'1/2'},{q:'cos 60°',a:'1/2'},{q:'tan 45°',a:'1'}],
      flash:[['Pythagorean identity','sin² + cos² = 1'],['cos 0°','1']]
    },
    'Calculus':{
      notes:['Derivatives measure rate of change','Integrals measure accumulated area','Power rule: d/dx xⁿ = n·xⁿ⁻¹','Fundamental theorem links derivative and integral'],
      concepts:['Limits','Continuity','Differentiation rules','Definite vs indefinite integrals'],
      mcqs:[{q:'d/dx x²',a:'2x'},{q:'∫ 2x dx',a:'x² + C'},{q:'d/dx sin x',a:'cos x'}],
      flash:[['Limit of sin x / x as x→0','1'],['∫ 1/x dx','ln|x| + C']]
    }
  },
  science:{
    'Force & Motion':{
      notes:['Newton\'s 3 laws govern motion','Force = mass × acceleration','Friction opposes motion','Momentum = mass × velocity'],
      concepts:['Inertia','Action-Reaction pairs','Free fall under gravity','Conservation of momentum'],
      mcqs:[{q:'Unit of force?',a:'Newton (N)'},{q:'g on Earth?',a:'9.8 m/s²'},{q:'F = ?',a:'m × a'}],
      flash:[['Define inertia','Tendency to resist motion change'],['1 N equals','1 kg·m/s²']]
    },
    'Cells & Life':{
      notes:['Cells are the basic unit of life','Plant cells have a cell wall','Animal cells don\'t have chloroplasts','DNA carries genetic information'],
      concepts:['Cell organelles','Mitosis vs Meiosis','Photosynthesis','Cellular respiration'],
      mcqs:[{q:'Powerhouse of cell?',a:'Mitochondria'},{q:'Site of protein synthesis?',a:'Ribosome'},{q:'Genetic material?',a:'DNA'}],
      flash:[['What is osmosis?','Water movement across membrane'],['Chlorophyll role','Captures light energy']]
    },
    'Electricity':{
      notes:['Current is the flow of charge','Voltage drives current through resistance','Series circuits share current','Parallel circuits share voltage'],
      concepts:['Ohm\'s Law: V = IR','Power: P = VI','Resistance in series and parallel','Conductors vs insulators'],
      mcqs:[{q:'Unit of resistance?',a:'Ohm (Ω)'},{q:'V = IR is whose law?',a:'Ohm\'s'},{q:'Unit of charge?',a:'Coulomb'}],
      flash:[['Symbol for resistor','Zigzag line'],['P = V × ?','I (current)']]
    }
  },
  english:{
    'Figures of Speech':{
      notes:['Metaphor: direct comparison','Simile: uses "like" or "as"','Personification: human traits to non-humans','Hyperbole: deliberate exaggeration'],
      concepts:['Imagery','Symbolism','Tone & mood','Allusion'],
      mcqs:[{q:'"Brave as a lion"',a:'Simile'},{q:'"Time flies"',a:'Personification'},{q:'"I told you a million times"',a:'Hyperbole'}],
      flash:[['Alliteration','Repeated initial sounds'],['Onomatopoeia','Word imitates sound']]
    },
    'Grammar Basics':{
      notes:['8 parts of speech','Subject-verb agreement','Tense consistency','Active vs passive voice'],
      concepts:['Nouns, pronouns, verbs','Adjectives & adverbs','Prepositions','Conjunctions'],
      mcqs:[{q:'Past of "go"',a:'Went'},{q:'Plural of "child"',a:'Children'},{q:'Verb in "She runs"',a:'Runs'}],
      flash:[['Active voice','Subject does the action'],['Article types','a, an, the']]
    }
  },
  geo:{
    'Earth & Climate':{
      notes:['Earth has 4 layers','Tectonic plates move slowly','Climate ≠ weather','Atmosphere has 5 layers'],
      concepts:['Latitude & longitude','Equator & poles','Greenhouse effect','Monsoons'],
      mcqs:[{q:'Hottest layer?',a:'Inner core'},{q:'Tropic of Cancer?',a:'23.5°N'},{q:'Layer we live in?',a:'Troposphere'}],
      flash:[['Equator latitude','0°'],['Earth\'s tilt','23.5°']]
    },
    'World Geography':{
      notes:['7 continents','5 oceans','Asia is the largest continent','Russia is the largest country'],
      concepts:['Capital cities','Major rivers','Mountain ranges','Climate zones'],
      mcqs:[{q:'Largest country?',a:'Russia'},{q:'Smallest continent?',a:'Australia'},{q:'Longest river?',a:'Nile'}],
      flash:[['Capital of France','Paris'],['Mt Everest height','8,849 m']]
    }
  },
  cs:{
    'Web Fundamentals':{
      notes:['HTML structures content','CSS styles content','JS makes pages interactive','Browsers render HTML/CSS/JS'],
      concepts:['Semantic HTML','Box model','Flex & grid','DOM manipulation'],
      mcqs:[{q:'HTML stands for?',a:'HyperText Markup Language'},{q:'CSS stands for?',a:'Cascading Style Sheets'},{q:'Largest heading tag?',a:'<h1>'}],
      flash:[['Inline vs block','Inline flows in text, block on its own line'],['== vs ===','=== checks type too']]
    },
    'Data Structures':{
      notes:['Arrays store ordered data','Stacks are LIFO','Queues are FIFO','Trees are hierarchical'],
      concepts:['Time complexity (Big-O)','Linked lists','Hash maps','Sorting algorithms'],
      mcqs:[{q:'Stack order?',a:'LIFO'},{q:'Queue order?',a:'FIFO'},{q:'Binary search Big-O?',a:'O(log n)'}],
      flash:[['LIFO meaning','Last In First Out'],['Bubble sort Big-O','O(n²)']]
    }
  },
  history:{
    'Ancient Civilisations':{
      notes:['Egypt: pyramids, pharaohs','Indus Valley: planned cities','Greece: democracy roots','Rome: empire & law'],
      concepts:['River valley civilisations','Bronze & iron age','Trade routes','Cultural exchange'],
      mcqs:[{q:'Egyptian writing?',a:'Hieroglyphics'},{q:'Indus city?',a:'Mohenjo-daro'},{q:'Greek democracy origin?',a:'Athens'}],
      flash:[['Roman senate','Governing assembly'],['Pyramid use','Tombs for pharaohs']]
    },
    'Modern India':{
      notes:['British rule ended 1947','Gandhi led non-violent movement','Constitution adopted 1950','Five Year Plans for growth'],
      concepts:['Freedom struggle','Partition','Republic Day','Green Revolution'],
      mcqs:[{q:'First PM?',a:'Nehru'},{q:'Quit India year?',a:'1942'},{q:'Constitution day?',a:'26 Nov'}],
      flash:[['Father of nation','Mahatma Gandhi'],['Republic Day','26 January 1950']]
    }
  }
};

/* Exams */
const EXAMS = (()=>{ const d=new Date(); const add=n=>{const x=new Date(d);x.setDate(x.getDate()+n);return x.toISOString().slice(0,10)};
  return [
    {name:'Science Term Exam', date:add(5),  ic:'🔬', bg:'var(--s-bg)'},
    {name:'Maths Half-Yearly', date:add(12), ic:'📐', bg:'var(--m-bg)'},
    {name:'English Essay Test',date:add(20), ic:'📖', bg:'var(--e-bg)'},
    {name:'History Quiz',      date:add(28), ic:'🏺', bg:'var(--h-bg)'},
    {name:'CS Practical',      date:add(34), ic:'💻', bg:'var(--c-bg)'}
  ];
})();

/* Dummy homework */
const DUMMY_HW = [
  {sub:'maths',  title:'Chapter 4 — Algebra exercises 4.1 to 4.3', due:7,  pri:'high', stat:'pending'},
  {sub:'science',title:'Lab report: Pendulum experiment',          due:3,  pri:'high', stat:'progress'},
  {sub:'english',title:'Read Act 1 of Julius Caesar',              due:2,  pri:'med',  stat:'progress'},
  {sub:'cs',     title:'Build a To-Do list in JS',                 due:10, pri:'med',  stat:'pending'},
  {sub:'history',title:'Essay: French Revolution causes',          due:14, pri:'low',  stat:'pending'},
  {sub:'geo',    title:'Map work: River systems of India',         due:5,  pri:'med',  stat:'pending'},
  {sub:'maths',  title:'Solve 20 trigonometry MCQs',               due:1,  pri:'high', stat:'progress'},
  {sub:'science',title:'Read Chapter 6 — Electricity',             due:6,  pri:'med',  stat:'done'},
  {sub:'english',title:'Vocabulary list (50 words)',               due:-2, pri:'low',  stat:'done'},
  {sub:'cs',     title:'Submit HTML/CSS portfolio',                due:21, pri:'low',  stat:'pending'}
];

/* Badges */
const BADGES = [
  {id:'quiz_master', ic:'🏆', name:'Quiz Master',    desc:'Score 100% on a quiz',          test:s=>s.perfectQuiz>=1},
  {id:'streak',      ic:'🔥', name:'Study Streak',   desc:'3 days of activity',             test:s=>s.streak>=3},
  {id:'hw_hero',     ic:'📚', name:'Homework Hero',  desc:'Complete 5 homework tasks',      test:s=>s.hwDone>=5},
  {id:'focus_champ', ic:'⚡', name:'Focus Champion', desc:'120 minutes of focus time',      test:s=>s.focusMin>=120},
  {id:'perfect',     ic:'🎯', name:'Perfect Score',  desc:'10 correct answers in a row',    test:s=>s.bestStreak>=10},
  {id:'level5',      ic:'👑', name:'Level 5 Master', desc:'Reach Level 5',                  test:s=>s.level>=5},
  {id:'card_flipper',ic:'🃏', name:'Card Flipper',   desc:'Flip 20 flashcards',             test:s=>s.flipped>=20},
  {id:'planner',     ic:'🗓️', name:'Master Planner', desc:'Save your first study plan',    test:s=>s.plans>=1},
  {id:'analyst',     ic:'📊', name:'Data Analyst',   desc:'Save marks in analytics',        test:s=>s.marksSaved>=1},
  {id:'first_step',  ic:'🌱', name:'First Step',     desc:'Visit EduSpark',                 test:_=>true}
];

const LEVELS = ['Scholar','Explorer','Achiever','Genius','Master','Legend'];

/* ──────────────── STATE ──────────────── */
const LS = {
  get:(k,d)=>{try{const v=localStorage.getItem('es_'+k);return v?JSON.parse(v):d}catch{return d}},
  set:(k,v)=>localStorage.setItem('es_'+k,JSON.stringify(v))
};

function defaultState(){
  return {
    xp:0, level:1, levelName:'Scholar',
    streak:1, lastActive:new Date().toISOString().slice(0,10),
    hwDone:0, focusMin:0, focusSessions:0, focusToday:0, focusTodayDate:'',
    focusWeek:0, focusWeekStart:'',
    quizzes:0, perfectQuiz:0, bestStreak:0,
    flipped:0, plans:0, marksSaved:0,
    unlocked:[], lastBadge:null
  };
}
let STATE = LS.get('state', defaultState());

let HW    = LS.get('hw', null);
if(!HW){ HW = DUMMY_HW.map((h,i)=>({id:'hw'+i,...h, due:offsetDate(h.due)})); LS.set('hw',HW); }

let PLANS = LS.get('plans', []);
let MARKS = LS.get('marks', {maths:'',science:'',english:'',cs:'',history:''});
let MARKS_HIST = LS.get('marksHist', []);
let QUIZ_HIST = LS.get('quizHist', []);

function offsetDate(days){const d=new Date();d.setDate(d.getDate()+days);return d.toISOString().slice(0,10);}
function daysUntil(date){const d=new Date(date);const t=new Date();t.setHours(0,0,0,0);return Math.ceil((d-t)/86400000);}
function fmtDate(d){return new Date(d).toLocaleDateString(undefined,{day:'numeric',month:'short'})}
function saveState(){LS.set('state',STATE); updateNavXp();}
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(window._tT);window._tT=setTimeout(()=>t.classList.remove('show'),2200)}

/* ──────────────── XP & LEVELS ──────────────── */
function addXp(amount, reason){
  STATE.xp += amount;
  const newLvl = Math.min(LEVELS.length, Math.floor(STATE.xp/100)+1);
  if(newLvl > STATE.level){ STATE.level = newLvl; STATE.levelName = LEVELS[newLvl-1]; toast(`🎉 Levelled up to ${STATE.levelName}!`); }
  saveState();
  checkBadges();
  if(reason) toast(`+${amount} XP · ${reason}`);
}
function updateNavXp(){
  document.getElementById('navLevel').textContent = 'Lv ' + STATE.level;
  document.getElementById('navXp').textContent    = STATE.xp + ' XP';
}
function checkBadges(){
  BADGES.forEach(b=>{
    if(!STATE.unlocked.includes(b.id) && b.test(STATE)){
      STATE.unlocked.push(b.id); STATE.lastBadge = b.id;
      toast(`🏅 Badge unlocked — ${b.name}`);
    }
  });
  saveState();
}

/* ──────────────── NAV ──────────────── */
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const el=document.getElementById(id); if(!el)return;
  el.classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active', b.dataset.nav===id));
  window.scrollTo({top:0,behavior:'smooth'});
  document.getElementById('navList').classList.remove('open');
  if(id==='dashboard') renderDashboard();
  if(id==='homework')  renderHomework();
  if(id==='resources') renderFlashcards();
  if(id==='revision')  renderRevision();
  if(id==='quiz')      renderQuizSetup();
  if(id==='analytics') renderAnalytics();
  if(id==='achievements') renderAchievements();
  if(id==='planner')   renderPlannerSaved();
  if(id==='focus')     renderFocusStats();
}
function toggleNav(){document.getElementById('navList').classList.toggle('open')}

/* ──────────────── DASHBOARD ──────────────── */
function renderDashboard(){
  // streak update
  const today = new Date().toISOString().slice(0,10);
  if(STATE.lastActive !== today){
    const diff = daysUntil(STATE.lastActive)*-1;
    STATE.streak = diff===1 ? STATE.streak+1 : 1;
    STATE.lastActive = today; saveState();
  }
  const nextExam = [...EXAMS].sort((a,b)=>daysUntil(a.date)-daysUntil(b.date)).find(e=>daysUntil(e.date)>=0);
  const pending = HW.filter(h=>h.stat!=='done').length;
  const avgMark = (()=>{const v=Object.values(MARKS).map(Number).filter(n=>!isNaN(n)&&n>0);return v.length?Math.round(v.reduce((a,b)=>a+b)/v.length):'—'})();

  const stats = [
    {ic:'📝', num:pending,                    lbl:'Homework Pending', pct:HW.length?Math.round(100-pending/HW.length*100)+'%':'0%'},
    {ic:'🔥', num:STATE.streak,               lbl:'Day Study Streak'},
    {ic:'📅', num:nextExam?daysUntil(nextExam.date):'—', lbl:nextExam?`Days to ${nextExam.name.split(' ')[0]}`:'No exams'},
    {ic:'⏱️', num:Math.round(STATE.focusMin/60*10)/10+'h', lbl:'Focus Time'},
    {ic:'⭐', num:STATE.xp,                   lbl:'XP Earned'},
    {ic:'📊', num:avgMark+(avgMark!=='—'?'%':''), lbl:'Average Score'}
  ];
  const grid = document.getElementById('statGrid');
  grid.innerHTML = stats.map((s,i)=>`
    <div class="stat-card" style="animation-delay:${i*60}ms">
      <div class="ic">${s.ic}</div>
      <div class="num counter" data-end="${parseFloat(s.num)||0}">${s.num}</div>
      <div class="lbl">${s.lbl}</div>
      ${s.pct?`<div class="pct">${s.pct}</div>`:''}
    </div>`).join('');

  // exam list
  document.getElementById('examList').innerHTML = EXAMS.slice(0,4).map(e=>{
    const d = daysUntil(e.date);
    return `<div class="exam-row">
      <div class="ex-ic" style="background:${e.bg}">${e.ic}</div>
      <div class="ex-info"><div class="ex-name">${e.name}</div><div class="ex-date">${fmtDate(e.date)}</div></div>
      <div class="ex-days">${d<=0?'Today':d+'d'}</div>
    </div>`;
  }).join('');

  // today focus ring
  const todayMin = STATE.focusTodayDate===today ? STATE.focusToday : 0;
  const pct = Math.min(100, Math.round(todayMin/60*100));
  const ring = document.getElementById('tfRing'); ring.style.setProperty('--p', pct+'%');
  document.getElementById('tfRingTxt').textContent = (Math.round(todayMin/6)/10)+'h';

  // latest badge
  const b = BADGES.find(x=>x.id===STATE.lastBadge) || BADGES.find(x=>STATE.unlocked.includes(x.id)) || BADGES[BADGES.length-1];
  document.getElementById('latestBadge').innerHTML = `
    <div class="lb-ic">${b.ic}</div>
    <div><div class="lb-name">${b.name}</div><div class="lb-desc">${b.desc}</div></div>`;
}

/* ──────────────── PLANNER ──────────────── */
function initPlanner(){
  const sub = document.getElementById('plSubs');
  sub.innerHTML = SUBJECTS.map(s=>`<span class="chip" data-id="${s.id}" onclick="this.classList.toggle('on')">${s.ic} ${s.name}</span>`).join('');
  document.getElementById('plExam').value = offsetDate(14);
  renderPlannerSaved();
}
function generatePlan(){
  const exam = document.getElementById('plExam').value;
  const hrs  = Math.max(1, +document.getElementById('plHours').value || 3);
  const name = document.getElementById('plName').value.trim() || 'Plan '+(PLANS.length+1);
  const subs = [...document.querySelectorAll('#plSubs .chip.on')].map(c=>c.dataset.id);
  if(subs.length<2){ toast('Pick at least 2 subjects'); return; }
  if(!exam){ toast('Pick an exam date'); return; }

  // distribute hrs across 7 days, weighted
  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const totalMins = hrs*60;
  const plan = days.map(d=>{
    const tasks = subs.map((sid,i)=>{
      const share = (i%subs.length===0)? .35 : .65/(subs.length-1);
      return {sub:sid, min: Math.round(totalMins*share/5)*5};
    });
    return {day:d, tasks};
  });

  const planObj = {id:'pl'+Date.now(), name, exam, hrs, subs, plan, created:Date.now()};
  PLANS.unshift(planObj); LS.set('plans', PLANS);
  STATE.plans++; saveState(); checkBadges();
  showPlan(planObj);
  renderPlannerSaved();
  addXp(15,'plan generated');
}
function showPlan(p){
  const d = daysUntil(p.exam);
  document.getElementById('plCountdown').textContent = d>0?`${d} days to exam`:'Exam day!';
  document.getElementById('plOutput').innerHTML = p.plan.map(day=>`
    <div class="plan-day">
      <h5>${day.day}</h5>
      ${day.tasks.map(t=>`<div class="plan-task"><span>${subMap[t.sub].ic} ${subMap[t.sub].name}</span><b>${t.min} min</b></div>`).join('')}
    </div>`).join('');
}
function renderPlannerSaved(){
  const el = document.getElementById('plSaved');
  if(!PLANS.length){ el.innerHTML = '<p class="muted">No saved plans yet.</p>'; return; }
  el.innerHTML = PLANS.map(p=>`
    <div class="sp-card" onclick="showPlan(${JSON.stringify(p).replace(/"/g,'&quot;')})">
      <span class="sp-del" onclick="event.stopPropagation();deletePlan('${p.id}')">✕</span>
      <h6>${p.name}</h6>
      <div class="sp-meta">${p.subs.length} subjects · ${p.hrs}h/day</div>
      <div class="sp-meta">Exam: ${fmtDate(p.exam)}</div>
    </div>`).join('');
}
function deletePlan(id){PLANS = PLANS.filter(p=>p.id!==id); LS.set('plans',PLANS); renderPlannerSaved();}

/* ──────────────── HOMEWORK ──────────────── */
let _hwEdit = null;
function renderHomework(){
  const q = (document.getElementById('hwSearch')?.value || '').toLowerCase();
  const f = document.getElementById('hwFilter')?.value || 'all';
  const list = HW.filter(h=>(f==='all'||h.stat===f) && (!q || h.title.toLowerCase().includes(q)));
  const done = HW.filter(h=>h.stat==='done').length;
  document.getElementById('hwBar').style.width = (HW.length?done/HW.length*100:0)+'%';
  document.getElementById('hwMeta').textContent = `${done} of ${HW.length} completed`;
  const el = document.getElementById('hwList');
  if(!list.length){ el.innerHTML='<p class="muted">No homework matches.</p>'; return; }
  el.innerHTML = list.map(h=>{
    const s = subMap[h.sub];
    const d = daysUntil(h.due);
    return `<div class="hw-card ${h.stat==='done'?'done':''}">
      <span class="hw-sub-tag" style="background:${s.bg};color:${s.acc}">${s.ic} ${s.name}</span>
      <div class="hw-title">${h.title}</div>
      <div class="hw-meta"><span>Due ${fmtDate(h.due)} · ${d<0?'overdue '+(-d)+'d':d===0?'today':d+'d left'}</span></div>
      <div class="d-flex gap-2 align-items-center mb-2">
        <span class="hw-pri ${h.pri}">${h.pri.toUpperCase()}</span>
        <span class="hw-stat ${h.stat}">${h.stat==='progress'?'In progress':h.stat[0].toUpperCase()+h.stat.slice(1)}</span>
      </div>
      <div class="hw-actions">
        ${h.stat!=='done'?`<button onclick="completeHw('${h.id}')">✓ Complete</button>`:`<button onclick="reopenHw('${h.id}')">↺ Reopen</button>`}
        <button onclick="editHw('${h.id}')">Edit</button>
        <button class="del" onclick="delHw('${h.id}')">Delete</button>
      </div>
    </div>`;
  }).join('');
}
function openHwModal(){
  _hwEdit = null;
  document.getElementById('hwModalTitle').textContent = 'Add Homework';
  document.getElementById('hwSub').innerHTML = SUBJECTS.map(s=>`<option value="${s.id}">${s.ic} ${s.name}</option>`).join('');
  document.getElementById('hwTitle').value=''; document.getElementById('hwDue').value=offsetDate(3);
  document.getElementById('hwPri').value='med'; document.getElementById('hwStat').value='pending';
  document.getElementById('hwModal').classList.add('open');
}
function closeHwModal(){document.getElementById('hwModal').classList.remove('open')}
function editHw(id){
  const h = HW.find(x=>x.id===id); if(!h) return;
  _hwEdit = id; openHwModal();
  document.getElementById('hwModalTitle').textContent = 'Edit Homework';
  document.getElementById('hwSub').value=h.sub; document.getElementById('hwTitle').value=h.title;
  document.getElementById('hwDue').value=h.due; document.getElementById('hwPri').value=h.pri;
  document.getElementById('hwStat').value=h.stat;
}
function saveHw(){
  const title = document.getElementById('hwTitle').value.trim();
  if(!title){ toast('Add a title'); return; }
  const obj = {
    sub: document.getElementById('hwSub').value,
    title, due: document.getElementById('hwDue').value || offsetDate(3),
    pri: document.getElementById('hwPri').value, stat: document.getElementById('hwStat').value
  };
  if(_hwEdit){ Object.assign(HW.find(h=>h.id===_hwEdit), obj); }
  else { HW.unshift({id:'hw'+Date.now(),...obj}); }
  LS.set('hw',HW); closeHwModal(); renderHomework(); toast(_hwEdit?'Homework updated':'Homework added');
}
function completeHw(id){ const h=HW.find(x=>x.id===id); if(!h||h.stat==='done')return; h.stat='done'; LS.set('hw',HW); STATE.hwDone++; saveState(); checkBadges(); renderHomework(); addXp(5,'homework done'); }
function reopenHw(id){ const h=HW.find(x=>x.id===id); h.stat='pending'; LS.set('hw',HW); renderHomework(); }
function delHw(id){ HW=HW.filter(h=>h.id!==id); LS.set('hw',HW); renderHomework(); }

/* ──────────────── REVISION ──────────────── */
let _revSub = 'maths', _revChap = null;
function renderRevision(){
  document.getElementById('revSubBar').innerHTML = SUBJECTS.filter(s=>REVISION[s.id]).map(s=>
    `<button class="rev-sub ${s.id===_revSub?'on':''}" onclick="pickRevSub('${s.id}')">${s.ic} ${s.name}</button>`).join('');
  const chaps = Object.keys(REVISION[_revSub]||{});
  if(!_revChap || !chaps.includes(_revChap)) _revChap = chaps[0];
  document.getElementById('revChapBar').innerHTML = chaps.map(c=>
    `<button class="rev-chap ${c===_revChap?'on':''}" onclick="pickRevChap('${c}')">${c}</button>`).join('');
  const pack = REVISION[_revSub][_revChap];
  document.getElementById('revPack').innerHTML = `
    <div class="rev-block"><h4>Quick Notes</h4><ul>${pack.notes.map(n=>`<li>${n}</li>`).join('')}</ul></div>
    <div class="rev-block"><h4>Key Concepts</h4><ul>${pack.concepts.map(n=>`<li>${n}</li>`).join('')}</ul></div>
    <div class="rev-block"><h4>Important MCQs</h4>${pack.mcqs.map(m=>`<div class="rev-mcq"><div class="rev-mcq-q">Q. ${m.q}</div><div class="rev-mcq-a">→ ${m.a}</div></div>`).join('')}</div>
    <div class="rev-block"><h4>Flashcards</h4>${pack.flash.map(f=>`<div class="rev-fc" onclick="this.querySelector('b').classList.toggle('hidden')">${f[0]}<b>${f[1]}</b></div>`).join('')}</div>`;
}
function pickRevSub(id){_revSub=id;_revChap=null;renderRevision()}
function pickRevChap(c){_revChap=c;renderRevision()}

/* ──────────────── FLASHCARDS ──────────────── */
function initFlashcards(){
  const sub = document.getElementById('fcSub');
  sub.innerHTML = '<option value="all">All subjects</option>' + SUBJECTS.map(s=>`<option value="${s.id}">${s.ic} ${s.name}</option>`).join('');
}
function renderFlashcards(){
  const q = (document.getElementById('fcSearch')?.value||'').toLowerCase();
  const sf = document.getElementById('fcSub')?.value||'all';
  const df = document.getElementById('fcDiff')?.value||'all';
  const list = FLASHCARDS.filter(c=>(sf==='all'||c[0]===sf)&&(df==='all'||c[3]===df)&&(!q||c[1].toLowerCase().includes(q)||c[2].toLowerCase().includes(q)));
  const el = document.getElementById('fcGrid');
  if(!list.length){ el.innerHTML='<p class="muted">No flashcards found.</p>'; return; }
  el.innerHTML = list.map((c,i)=>{
    const s = subMap[c[0]];
    return `<div class="fc" onclick="flipFc(this)" style="animation-delay:${i*30}ms">
      <div class="fc-inner">
        <div class="fc-face">
          <span class="fc-sub" style="background:${s.bg};color:${s.acc}">${s.ic} ${s.name}</span>
          <div class="fc-q">${c[1]}</div>
          <div class="fc-meta"><span>Tap to flip</span><span class="fc-diff ${c[3]}">${c[3]}</span></div>
        </div>
        <div class="fc-face fc-back">
          <span class="fc-sub" style="background:${s.bg};color:${s.acc}">${s.ic} ${s.name}</span>
          <div class="fc-q">${c[2]}</div>
          <div class="fc-meta"><span>${c[1]}</span><span class="fc-diff ${c[3]}">${c[3]}</span></div>
        </div>
      </div>
    </div>`;
  }).join('');
}
function flipFc(el){ el.classList.toggle('flipped'); if(el.classList.contains('flipped')){STATE.flipped++; saveState(); checkBadges();} }

/* ──────────────── QUIZ ──────────────── */
let _qSet=[], _qIdx=0, _qScore=0, _qStreak=0, _qWrong=0, _qTimer=null, _qStart=0, _qCfg={};
function renderQuizSetup(){
  document.getElementById('quizSetup').classList.remove('hidden');
  document.getElementById('quizPlay').classList.add('hidden');
  document.getElementById('quizResult').classList.add('hidden');
  document.getElementById('qSub').innerHTML = '<option value="all">All subjects</option>' + SUBJECTS.map(s=>`<option value="${s.id}">${s.ic} ${s.name}</option>`).join('');
  const h = document.getElementById('quizHistory');
  h.innerHTML = QUIZ_HIST.length ? QUIZ_HIST.slice(0,5).map(x=>`<div class="qh"><span>${x.sub} · ${x.diff} · ${x.len}Q</span><b>${x.score}/${x.len} (${x.acc}%)</b></div>`).join('') : '<p class="muted">No attempts yet.</p>';
}
function startQuiz(cfg){
  _qCfg = cfg || {sub:document.getElementById('qSub').value, diff:document.getElementById('qDiff').value, len:+document.getElementById('qLen').value};
  let pool = QUESTIONS.filter(q=>(_qCfg.sub==='all'||q.sub===_qCfg.sub)&&(_qCfg.diff==='all'||q.diff===_qCfg.diff));
  if(pool.length<3){ toast('Not enough questions — try different filters'); return; }
  pool = pool.sort(()=>Math.random()-.5).slice(0, Math.min(_qCfg.len, pool.length));
  _qSet=pool; _qIdx=0; _qScore=0; _qStreak=0; _qWrong=0; _qStart=Date.now();
  document.getElementById('quizSetup').classList.add('hidden');
  document.getElementById('quizResult').classList.add('hidden');
  document.getElementById('quizPlay').classList.remove('hidden');
  if(_qTimer)clearInterval(_qTimer);
  _qTimer = setInterval(()=>{ const s=Math.floor((Date.now()-_qStart)/1000); document.getElementById('qTimer').textContent = String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0'); },500);
  showQ();
}
function startQuizSame(){ startQuiz(_qCfg); }
function showQ(){
  if(_qIdx>=_qSet.length){ endQuiz(); return; }
  const q = _qSet[_qIdx]; const s = subMap[q.sub];
  document.getElementById('qProgBar').style.width = (_qIdx/_qSet.length*100)+'%';
  document.getElementById('qSubLabel').textContent = `${s.ic} ${s.name} · ${q.diff}`;
  document.getElementById('qText').textContent = q.q;
  document.getElementById('qCounter').textContent = `Question ${_qIdx+1} of ${_qSet.length}`;
  document.getElementById('qOpts').innerHTML = q.opts.map((o,i)=>`<button class="qopt" onclick="answerQ(${i})"><span class="qo-mark">${'ABCD'[i]}</span>${o}</button>`).join('');
}
function answerQ(i){
  const q = _qSet[_qIdx];
  document.querySelectorAll('.qopt').forEach((b,idx)=>{
    b.disabled = true;
    if(idx===q.ans) b.classList.add('correct');
    else if(idx===i) b.classList.add('wrong');
  });
  if(i===q.ans){ _qScore++; _qStreak++; if(_qStreak>STATE.bestStreak){STATE.bestStreak=_qStreak;} }
  else { _qWrong++; _qStreak=0; }
  setTimeout(()=>{ _qIdx++; showQ(); }, 900);
}
function skipQuestion(){ _qWrong++; _qStreak=0; _qIdx++; showQ(); }
function endQuiz(){
  if(_qTimer)clearInterval(_qTimer);
  document.getElementById('quizPlay').classList.add('hidden');
  document.getElementById('quizResult').classList.remove('hidden');
  const acc = Math.round(_qScore/_qSet.length*100);
  const xp = _qScore*2 + (acc===100?10:0);
  document.getElementById('resultRing').style.setProperty('--p', acc+'%');
  document.getElementById('resultRing').innerHTML = `<span>${acc}%</span>`;
  document.getElementById('resultTitle').textContent = acc===100?'Perfect!':acc>=70?'Great work!':acc>=40?'Keep going':'Time to revise';
  document.getElementById('resultSub').textContent = `${_qScore} of ${_qSet.length} correct`;
  document.getElementById('rgCorrect').textContent = _qScore;
  document.getElementById('rgWrong').textContent = _qWrong;
  document.getElementById('rgAcc').textContent = acc+'%';
  document.getElementById('rgXp').textContent = '+'+xp;
  STATE.quizzes++; if(acc===100)STATE.perfectQuiz++; saveState();
  QUIZ_HIST.unshift({sub:_qCfg.sub==='all'?'All':subMap[_qCfg.sub].name, diff:_qCfg.diff, len:_qSet.length, score:_qScore, acc}); QUIZ_HIST=QUIZ_HIST.slice(0,20); LS.set('quizHist',QUIZ_HIST);
  addXp(xp,'quiz complete'); checkBadges();
}
function resetQuiz(){ renderQuizSetup(); }

/* ──────────────── FOCUS ──────────────── */
let _fW=45,_fB=10,_fLeft=45*60,_fRun=false,_fInt=null,_fIsBreak=false;
const FOCUS_TOTAL = ()=>(_fIsBreak?_fB:_fW)*60;
function setFocusMode(w,b,el){
  _fW=w;_fB=b;_fIsBreak=false;_fLeft=w*60;
  document.querySelectorAll('.fp').forEach(x=>x.classList.remove('active')); el.classList.add('active');
  updateFocusUI(); if(_fRun)toggleFocus();
}
function updateFocusUI(){
  const m=Math.floor(_fLeft/60),s=_fLeft%60;
  document.getElementById('focusTime').textContent = String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
  document.getElementById('focusMode').textContent = _fIsBreak?'Break':'Work session';
  const arc = document.getElementById('focusArc');
  const C = 2*Math.PI*88; const p = _fLeft/FOCUS_TOTAL();
  arc.setAttribute('stroke-dasharray', C);
  arc.setAttribute('stroke-dashoffset', C*(1-p));
  arc.setAttribute('stroke', _fIsBreak?'#00885A':'#FF5C35');
}
function toggleFocus(){
  _fRun = !_fRun;
  document.getElementById('focusStart').textContent = _fRun?'Pause':'Start';
  if(_fRun){
    _fInt = setInterval(()=>{
      _fLeft--; if(_fLeft<=0){
        if(!_fIsBreak){
          STATE.focusMin += _fW; STATE.focusSessions++;
          const today = new Date().toISOString().slice(0,10);
          if(STATE.focusTodayDate!==today){STATE.focusTodayDate=today;STATE.focusToday=0;}
          STATE.focusToday += _fW;
          saveState(); checkBadges(); addXp(15,'focus session');
          _fIsBreak=true; _fLeft=_fB*60; toast('Work done — take a break ☕');
        } else { _fIsBreak=false; _fLeft=_fW*60; toast('Break over — back to it 💪'); }
      }
      updateFocusUI(); renderFocusStats();
    },1000);
  } else { clearInterval(_fInt); }
}
function resetFocus(){ if(_fRun)toggleFocus(); _fIsBreak=false; _fLeft=_fW*60; updateFocusUI(); }
function renderFocusStats(){
  const today = new Date().toISOString().slice(0,10);
  const todayMin = STATE.focusTodayDate===today ? STATE.focusToday : 0;
  document.getElementById('fsToday').textContent = todayMin+' min';
  document.getElementById('fsWeek').textContent  = STATE.focusMin+' min';
  document.getElementById('fsAll').textContent   = STATE.focusSessions;
}

/* ──────────────── ANALYTICS ──────────────── */
let _charts = {};
function renderAnalytics(){
  const wrap = document.getElementById('anInputs');
  const subs = ['maths','science','english','cs','history'];
  wrap.innerHTML = subs.map(id=>{
    const s = subMap[id];
    return `<div class="an-row"><label>${s.ic} ${s.name}</label><input class="inp" type="number" min="0" max="100" id="mk_${id}" value="${MARKS[id]||''}" placeholder="0-100"/></div>`;
  }).join('');
  drawCharts();
  computeOverview();
}
function saveMarks(){
  ['maths','science','english','cs','history'].forEach(id=>{ MARKS[id] = document.getElementById('mk_'+id).value; });
  LS.set('marks',MARKS);
  MARKS_HIST.push({date:new Date().toISOString().slice(0,10), ...MARKS}); MARKS_HIST=MARKS_HIST.slice(-10); LS.set('marksHist',MARKS_HIST);
  STATE.marksSaved++; saveState(); checkBadges();
  drawCharts(); computeOverview();
  toast('Marks saved ✓'); addXp(5,'marks updated');
}
function computeOverview(){
  const subs = ['maths','science','english','cs','history'];
  const vals = subs.map(id=>+MARKS[id]).filter(v=>!isNaN(v)&&v>0);
  if(!vals.length){
    document.getElementById('anAvg').textContent='—';
    document.getElementById('anStrong').textContent='—';
    document.getElementById('anWeak').textContent='—';
    document.getElementById('anRec').textContent='Save marks to see recommendations.';
    return;
  }
  const avg = Math.round(vals.reduce((a,b)=>a+b)/vals.length);
  let max=-1,min=101,maxId='',minId='';
  subs.forEach(id=>{const v=+MARKS[id]; if(isNaN(v)||v<=0)return; if(v>max){max=v;maxId=id} if(v<min){min=v;minId=id}});
  document.getElementById('anAvg').textContent = avg+'%';
  document.getElementById('anStrong').textContent = subMap[maxId].name;
  document.getElementById('anWeak').textContent = subMap[minId].name;
  document.getElementById('anRec').textContent = `Spend 30% more revision time on ${subMap[minId].name}. Keep practising ${subMap[maxId].name} to stay sharp.`;
}
function drawCharts(){
  const subs = ['maths','science','english','cs','history'];
  const labels = subs.map(id=>subMap[id].name);
  const data = subs.map(id=>+MARKS[id]||0);
  const col = ['#FF5C35','#0077CC','#CC7700','#6633CC','#CC2244'];

  Object.values(_charts).forEach(c=>c&&c.destroy());
  _charts.bar = new Chart(document.getElementById('chartBar'), {
    type:'bar', data:{labels, datasets:[{label:'Marks', data, backgroundColor:col, borderRadius:8}]},
    options:{plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true,max:100}}, animation:{duration:800}}
  });
  _charts.doughnut = new Chart(document.getElementById('chartDoughnut'), {
    type:'doughnut', data:{labels, datasets:[{data:data.map(v=>v||1), backgroundColor:col}]},
    options:{plugins:{legend:{position:'bottom',labels:{boxWidth:10,font:{size:11}}}}, cutout:'62%'}
  });
  const histLabels = MARKS_HIST.length ? MARKS_HIST.map(h=>h.date.slice(5)) : ['—'];
  const histAvg = MARKS_HIST.length ? MARKS_HIST.map(h=>{const v=subs.map(s=>+h[s]).filter(x=>!isNaN(x)&&x>0);return v.length?Math.round(v.reduce((a,b)=>a+b)/v.length):0}) : [0];
  _charts.line = new Chart(document.getElementById('chartLine'), {
    type:'line', data:{labels:histLabels, datasets:[{label:'Average', data:histAvg, borderColor:'#FF5C35', backgroundColor:'rgba(255,92,53,.1)', tension:.3, fill:true, pointRadius:5}]},
    options:{plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true,max:100}}}
  });
}

/* ──────────────── ACHIEVEMENTS ──────────────── */
function renderAchievements(){
  document.getElementById('lvlNum').textContent = STATE.level;
  document.getElementById('lvlName').textContent = STATE.levelName;
  document.getElementById('lvlXp').textContent = STATE.xp;
  const next = STATE.level*100;
  const inLvl = STATE.xp - (STATE.level-1)*100;
  document.getElementById('lvlNext').textContent = (next-STATE.xp)+' XP to next level';
  document.getElementById('lvlBar').style.width = Math.min(100, inLvl)+'%';
  document.getElementById('badgesGrid').innerHTML = BADGES.map(b=>{
    const got = STATE.unlocked.includes(b.id);
    return `<div class="badge-card ${got?'':'locked'}">
      ${got?'<span class="unlocked">UNLOCKED</span>':''}
      <div class="badge-ic">${b.ic}</div>
      <div class="badge-name">${b.name}</div>
      <div class="badge-desc">${b.desc}</div>
    </div>`;
  }).join('');
}

/* ──────────────── BOOT ──────────────── */
window.addEventListener('load',()=>{
  setTimeout(()=>document.getElementById('loader').classList.add('gone'), 1800);
  document.getElementById('ftYear').textContent = new Date().getFullYear();
  updateNavXp();
  checkBadges();
  initPlanner();
  initFlashcards();
  renderDashboard();
});
