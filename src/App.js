import { useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import './App.css';

const stages = [
  { name: 'New home', range: 'Days 1–14', state: 'complete' },
  { name: 'Leafing out', range: 'Days 15–35', state: 'complete' },
  { name: 'First flowers', range: 'Days 36–55', state: 'current' },
  { name: 'Little fruits', range: 'Days 56–75', state: 'upcoming' },
  { name: 'Harvest time', range: 'Days 76–90', state: 'upcoming' },
];

const initialTasks = [
  { id: 1, title: 'Check the top inch of soil', detail: 'Keep it just a little damp', done: false },
  { id: 2, title: 'Give stems a gentle tie', detail: 'A little support goes a long way', done: false },
  { id: 3, title: 'Look for new blossoms', detail: 'Those purple petals are a good sign', done: true },
];

function Icon({ name, size = 20, strokeWidth = 1.8 }) {
  const paths = {
    overview: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    plant: <><path d="M12 21v-9" /><path d="M12 12C8 12 5 9.5 5 5c4.5 0 7 2.5 7 7Z" /><path d="M12 15c0-4 2.5-7 7-7 0 4.5-2.5 7-7 7Z" /><path d="M7 21h10" /></>,
    journal: <><path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" /><path d="M8 3v4h4" /><path d="M8 3l4 4" /><path d="M10 12h8" /><path d="M10 16h5" /><path d="m16 5 3-3 3 3-8 8-3 1 1-3 4-4Z" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></>,
    settings: <><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.6.9l-.3 1.8h-2.8l-.4-1.8a8 8 0 0 1-1.6-.9l-1.6.7-1.5-2.4L7.5 15a8 8 0 0 1 0-1.9l-1.4-1.2 1.4-2.4 1.7.7a8 8 0 0 1 1.6-.9l.3-1.8h2.8l.4 1.8a8 8 0 0 1 1.6.9l1.6-.7 1.5 2.4-1.5 1.2c.1.6.1 1.3-.1 1.9Z" transform="translate(-1 -1)" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
    drop: <><path d="M12 22a7 7 0 0 0 7-7c0-4-7-13-7-13S5 11 5 15a7 7 0 0 0 7 7Z" /><path d="M9 16a3 3 0 0 0 3 3" /></>,
    temp: <><path d="M14 14.8V5a3 3 0 0 0-6 0v9.8a5 5 0 1 0 6 0Z" /><path d="M11 12v6" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    leaf: <><path d="M20 4c-9 0-15 4-15 11a5 5 0 0 0 5 5c7 0 11-7 10-16Z" /><path d="M5 20c2-4 5-7 10-10" /></>,
  };
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

function EggplantIllustration() {
  return (
    <svg className="eggplant-illustration" viewBox="0 0 420 340" fill="none" role="img" aria-label="Illustration of an eggplant growing on its leafy plant">
      <circle cx="277" cy="164" r="127" fill="#E4EDDA" />
      <circle cx="90" cy="55" r="24" fill="#F3D28B" opacity=".8" />
      <path d="M227 304c-2-55 1-105-2-152-2-45 8-79 29-112" stroke="#52774F" strokeWidth="7" strokeLinecap="round" />
      <path d="M224 220c-37-37-72-49-110-39 17 31 54 49 109 49" fill="#71916B" />
      <path d="M220 218c-38-16-67-26-100-31" stroke="#53744F" strokeWidth="2" />
      <path d="M225 165c36-46 72-64 111-57-12 35-49 61-107 69" fill="#829D73" />
      <path d="M230 166c37-23 65-42 97-53" stroke="#5C7C55" strokeWidth="2" />
      <path d="M232 133c-8-43-1-76 25-99 18 29 18 64-15 104" fill="#75936C" />
      <path d="M253 42c-8 23-13 51-12 81" stroke="#587A52" strokeWidth="2" />
      <path d="M229 174c-17-25-37-38-63-39 4 27 24 47 64 57" fill="#91A681" />
      <path d="M177 141c18 13 34 29 48 48" stroke="#607D57" strokeWidth="2" />
      <path d="M235 215c20-26 46-38 78-36-8 31-32 49-76 53" fill="#607F59" />
      <path d="M302 183c-23 14-43 29-64 49" stroke="#4F7049" strokeWidth="2" />
      <path d="M247 116c7 9 14 17 22 22-4 14-13 25-29 34-7-11-8-23-4-37l11-19Z" fill="#506F49" />
      <path d="M249 108c-9 20-12 38-9 58" stroke="#425F3F" strokeWidth="2" />
      <path d="M252 121c16-16 32-19 48-10-10 18-25 27-48 24" fill="#9BAA82" />
      <path d="M300 111c-17 6-31 13-45 23" stroke="#677F58" strokeWidth="2" />
      <path d="M249 140c-3 22 0 45 14 70 11 21 24 37 39 48 17 14 43 13 56-3 16-19 18-48 5-72-14-26-42-42-81-49-12-2-25 0-33 6Z" fill="#5C397D" />
      <path d="M254 146c20-4 47 2 72 16 18 10 30 25 36 42-12-18-29-30-52-39-21-9-40-14-56-13Z" fill="#79559A" opacity=".75" />
      <path d="M252 137c3 9 2 16-3 23-6-3-12-9-17-18 6-5 12-7 20-5Z" fill="#58784E" />
      <path d="M257 137c8-8 16-10 24-5-5 9-12 13-23 13" fill="#6F8B60" />
      <path d="M111 264c44-12 94-13 142-5" stroke="#A0B297" strokeWidth="1.5" strokeDasharray="3 7" />
      <path d="M108 279c36-7 63-8 91-6" stroke="#A0B297" strokeWidth="1.5" strokeDasharray="3 7" />
      <path d="M302 88c2-7 7-12 14-14m5 16c5-4 11-5 17-3" stroke="#A0B297" strokeWidth="2" strokeLinecap="round" />
      <path d="M90 105c2-7 7-12 14-14m5 16c5-4 11-5 17-3" stroke="#A0B297" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState('');
  const [showJournal, setShowJournal] = useState(false);
  const completedTasks = tasks.filter((task) => task.done).length;

  const toggleTask = (id) => {
    setTasks((currentTasks) => currentTasks.map((task) => (
      task.id === id ? { ...task, done: !task.done } : task
    )));
  };

  const saveNote = (event) => {
    event.preventDefault();
    const trimmedNote = note.trim();
    if (!trimmedNote) return;
    setSavedNote(trimmedNote);
    setNote('');
    setShowJournal(false);
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#overview" aria-label="Little Plot home">
          <span className="brand-mark"><Icon name="leaf" size={21} /></span>
          <span className="brand-name">little plot<span>.</span></span>
        </a>

        <div className="garden-switcher">
          <span className="garden-avatar">M</span>
          <span className="garden-label"><strong>Maya’s garden</strong><small>Backyard · Zone 9b</small></span>
          <span className="switcher-dots" aria-hidden="true">···</span>
        </div>

        <p className="nav-caption">YOUR SPACE</p>
        <nav className="main-nav" aria-label="Main navigation">
          <a className="nav-link active" href="#overview"><Icon name="overview" /><span>Overview</span></a>
          <a className="nav-link" href="#growth"><Icon name="plant" /><span>My plants</span><span className="nav-count">3</span></a>
          <button className="nav-link nav-button" type="button" onClick={() => setShowJournal(true)}><Icon name="journal" /><span>Garden journal</span></button>
          <a className="nav-link" href="#care"><Icon name="calendar" /><span>Care calendar</span></a>
        </nav>

        <div className="sidebar-tip">
          <span className="tip-sun"><Icon name="sun" size={19} /></span>
          <p>Good things take time.<br /><strong>Your garden is right on track.</strong></p>
          <span className="tip-sparkle">✳</span>
        </div>

        <button className="profile-button" type="button" aria-label="Maya's profile">
          <span className="profile-avatar">M</span>
          <span className="profile-details"><strong>Maya Chen</strong><small>Garden beginner</small></span>
          <span className="switcher-dots" aria-hidden="true">···</span>
        </button>
      </aside>

      <main className="main-content" id="overview">
        <header className="topbar">
          <div className="breadcrumbs"><span>MY GARDEN</span><span className="crumb-slash">/</span><strong>OVERVIEW</strong></div>
          <div className="topbar-actions">
            <button className="icon-button search-button" type="button" aria-label="Search"><Icon name="search" /></button>
            <button className="icon-button notification-button" type="button" aria-label="Notifications"><Icon name="bell" /><span /></button>
            <span className="topbar-divider" />
            <span className="topbar-date"><Icon name="sun" size={16} /> {new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).format(new Date())}</span>
          </div>
        </header>

        <div className="dashboard">
          <motion.section className="welcome-row" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div>
              <p className="eyebrow"><span className="eyebrow-dot" /> YOUR LITTLE PATCH OF GOOD</p>
              <h1>Growing something<br /><em>wonderful.</em></h1>
              <p className="welcome-copy">A little sun, a little water, and look how far you’ve come.</p>
            </div>
            <div className="weather-card">
              <div className="weather-icon"><Icon name="sun" size={22} /></div>
              <div><span className="weather-label">A lovely day to grow</span><strong>24°<small> C</small></strong></div>
              <span className="weather-place">Oakland, CA</span>
            </div>
          </motion.section>

          <motion.section className="hero-card" aria-labelledby="plant-title" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}>
            <div className="hero-copy">
              <span className="stage-pill"><span /> IN THE GROUND FOR 42 DAYS</span>
              <h2 id="plant-title">Meet your<br /><em>Black Beauty.</em></h2>
              <p>Your eggplant is settling into its flowering stage. Those first blooms mean little fruits are just around the corner.</p>
              <a className="text-link" href="#growth">Follow its growth <span>↗</span></a>
            </div>
            <div className="hero-art"><EggplantIllustration /><span className="art-note"><span>✳</span> looking leafy</span></div>
            <div className="hero-index">01 <span>/</span> 03</div>
          </motion.section>

          <section className="stat-grid" aria-label="Plant health summary">
            <motion.article className="stat-card" whileHover={{ y: -3 }} transition={{ duration: 0.18 }}>
              <span className="stat-icon stat-icon-green"><Icon name="plant" size={19} /></span>
              <span className="stat-label">GROWING FOR</span>
              <strong>42 <small>days</small></strong>
              <span className="stat-foot"><span className="tiny-dot green" /> Right on schedule</span>
            </motion.article>
            <motion.article className="stat-card" whileHover={{ y: -3 }} transition={{ duration: 0.18 }}>
              <span className="stat-icon stat-icon-blue"><Icon name="drop" size={19} /></span>
              <span className="stat-label">SOIL MOISTURE</span>
              <strong>Just right</strong>
              <span className="stat-foot">Last watered yesterday</span>
            </motion.article>
            <motion.article className="stat-card harvest-stat" whileHover={{ y: -3 }} transition={{ duration: 0.18 }}>
              <span className="stat-icon stat-icon-lilac"><Icon name="clock" size={19} /></span>
              <span className="stat-label">FIRST HARVEST</span>
              <strong>~ 34 <small>days</small></strong>
              <span className="stat-foot">A little more patience</span>
            </motion.article>
          </section>

          <div className="content-grid">
            <motion.section className="panel growth-panel" id="growth" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15 }}>
              <div className="panel-heading">
                <div><p className="section-kicker">THE LONG AND LOVELY</p><h3>Your growing story</h3></div>
                <button className="more-button" type="button" aria-label="More growth options">···</button>
              </div>
              <div className="growth-progress">
                <div className="progress-caption"><span><strong>Day 42</strong> of about 90</span><span className="progress-percent">47% there</span></div>
                <div className="progress-track"><motion.span initial={{ width: 0 }} animate={{ width: '47%' }} transition={{ duration: 1, delay: 0.45, ease: 'easeOut' }} /></div>
              </div>
              <div className="timeline">
                {stages.map((stage, index) => (
                  <div className={`timeline-stage ${stage.state}`} key={stage.name}>
                    <div className="stage-marker">{stage.state === 'complete' ? <Icon name="check" size={13} strokeWidth={2.5} /> : stage.state === 'current' ? <span className="marker-center" /> : <span className="marker-number">{index + 1}</span>}</div>
                    <strong>{stage.name}</strong>
                    <span>{stage.range}</span>
                    {stage.state === 'current' && <small className="now-label">YOU ARE HERE</small>}
                  </div>
                ))}
              </div>
              <div className="panel-footnote"><span className="footnote-spark">✳</span><span>Eggplants love a warm, sunny spot — <strong>6–8 hours of sun</strong> is their happy place.</span></div>
            </motion.section>

            <motion.section className="panel care-panel" id="care" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.22 }}>
              <div className="panel-heading">
                <div><p className="section-kicker">SMALL THINGS, BIG GROWTH</p><h3>Today in the garden</h3></div>
                <span className="task-count">{completedTasks}/{tasks.length} done</span>
              </div>
              <div className="task-list">
                {tasks.map((task) => (
                  <button className={`task-row ${task.done ? 'task-done' : ''}`} key={task.id} type="button" onClick={() => toggleTask(task.id)} aria-pressed={task.done}>
                    <span className="task-checkbox">{task.done && <Icon name="check" size={13} strokeWidth={2.5} />}</span>
                    <span className="task-text"><strong>{task.title}</strong><small>{task.detail}</small></span>
                    {task.done && <span className="task-complete-label">DONE</span>}
                  </button>
                ))}
              </div>
              <button className="journal-button" type="button" onClick={() => setShowJournal(true)}><Icon name="plus" size={17} /> Add a garden note</button>
            </motion.section>
          </div>

          <motion.section className="guide-section" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.28 }}>
            <div className="guide-heading">
              <div><p className="section-kicker">FROM TINY SEED TO SOMETHING DELICIOUS</p><h3>A little guide for the growing</h3></div>
              <span className="guide-season"><Icon name="sun" size={15} /> Warmth is your friend</span>
            </div>
            <div className="guide-grid">
              <article className="guide-card">
                <span className="guide-number">01</span><span className="guide-icon seed-icon"><Icon name="leaf" size={17} /></span>
                <h4>Start with warmth</h4><span className="guide-days">SOW · 10–14 WEEKS BEFORE LAST FROST</span>
                <p>Sow seeds indoors in a warm, bright spot. They like it cozy — aim for soil around 24–29°C until the first leaves appear.</p>
              </article>
              <article className="guide-card">
                <span className="guide-number">02</span><span className="guide-icon transplant-icon"><Icon name="plant" size={17} /></span>
                <h4>Give them room to grow</h4><span className="guide-days">TRANSPLANT · AFTER NIGHTS WARM UP</span>
                <p>Move sturdy seedlings outdoors once frost has passed. Leave about 45–60 cm between plants and choose your sunniest spot.</p>
              </article>
              <article className="guide-card guide-current">
                <span className="guide-number">03</span><span className="guide-icon flower-icon">✳</span>
                <h4>Flowers become fruit</h4><span className="guide-days">FLOWER & FRUIT · YOU ARE HERE</span>
                <p>Keep soil evenly moist, water at the base, and support heavy stems. A gentle shake can help flowers pollinate.</p>
              </article>
              <article className="guide-card">
                <span className="guide-number">04</span><span className="guide-icon harvest-icon">✂</span>
                <h4>Pick while they shine</h4><span className="guide-days">HARVEST · OFTEN 65–90 DAYS AFTER TRANSPLANT</span>
                <p>Harvest when the skin is glossy and the fruit feels firm. Snip the stem with pruners, leaving a little cap attached.</p>
              </article>
            </div>
          </motion.section>

          <AnimatePresence>
            {savedNote && (
              <motion.section className="saved-note" id="journal" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                <span className="note-icon"><Icon name="journal" size={18} /></span>
                <div><span className="section-kicker">LATEST GARDEN NOTE</span><p>{savedNote}</p></div>
                <button className="icon-button note-close" onClick={() => setSavedNote('')} type="button" aria-label="Dismiss garden note"><Icon name="close" size={17} /></button>
              </motion.section>
            )}
          </AnimatePresence>

          <footer className="page-footer"><span>Made for the joy of growing things</span><span>Take it one leaf at a time <span className="footer-heart">♥</span></span></footer>
        </div>
      </main>

      <AnimatePresence>
        {showJournal && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setShowJournal(false); }}>
            <motion.form className="journal-modal" onSubmit={saveNote} initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} transition={{ duration: 0.2 }}>
              <button className="icon-button modal-close" type="button" onClick={() => setShowJournal(false)} aria-label="Close"><Icon name="close" /></button>
              <span className="modal-icon"><Icon name="leaf" size={22} /></span>
              <p className="section-kicker">A MOMENT IN THE GARDEN</p>
              <h3>What’s growing on?</h3>
              <p className="modal-copy">Jot down a little detail you want to remember.</p>
              <label className="sr-only" htmlFor="garden-note">Your garden note</label>
              <textarea id="garden-note" autoFocus maxLength={240} placeholder="A new flower opened this morning…" value={note} onChange={(event) => setNote(event.target.value)} />
              <div className="modal-footer"><span>{note.length}/240</span><button className="save-button" type="submit" disabled={!note.trim()}>Save note <span>↗</span></button></div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </MotionConfig>
  );
}

export default App;
