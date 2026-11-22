import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Bookmark,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Home,
  Lightbulb,
  Mail,
  Megaphone,
  MessageCircle,
  MessageSquareText,
  Plus,
  Search,
  Settings,
  UserRound,
  Vote,
} from "lucide-react";
import "./App.css";

const navigationItems = [
  { label: "Pagrindinis", icon: Home },
  { label: "Žinutės", icon: MessageCircle },
  { label: "Skelbimai", icon: Megaphone },
  { label: "Problemos", icon: AlertTriangle },
  { label: "Idėjos", icon: Lightbulb },
  { label: "Forumai", icon: Mail },
  { label: "Apklausos", icon: ClipboardList },
];

const forumTopics = [
  {
    title: "Mokyklos aplinka",
    description: "Kalbėkimės apie erdves, kasdienybę ir tai, ką galime pagerinti mokykloje.",
    comments: 34,
    time: "prieš 1 val.",
    posts: [
      { username: "AustejaM", name: "Austėja M.", text: "Gal galėtume prie bibliotekos įrengti daugiau vietų mokytis pertraukų metu?", time: "prieš 1 val." },
      { username: "TomasK", name: "Tomas K.", text: "Pritariu. Taip pat būtų naudinga turėti daugiau lizdų kompiuteriams įkrauti.", time: "prieš 42 min." },
    ],
  },
  {
    title: "Tech naujienos",
    description: "Naujienos, įrankiai ir klausimai apie technologijas bei jų poveikį mokyklai.",
    comments: 27,
    time: "prieš 2 val.",
    posts: [
      { username: "LukasT", name: "Lukas T.", text: "Ar jau išbandėte naują mokyklos bibliotekos katalogą? Paieška tapo daug patogesnė.", time: "prieš 2 val." },
      { username: "GretaV", name: "Greta V.", text: "Taip, ypač patinka, kad galima matyti, kada knyga grįš.", time: "prieš 1 val." },
    ],
  },
  {
    title: "Pasaulio naujienos",
    description: "Dalinkimės svarbiausiomis pasaulio naujienomis ir savo požiūriu į jas.",
    comments: 64,
    time: "prieš 3 val.",
    posts: [
      { username: "EmilijaR", name: "Emilija R.", text: "Kurią šios savaitės pasaulio naujieną laikote svarbiausia?", time: "prieš 3 val." },
    ],
  },
  {
    title: "Lietuvos naujienos",
    description: "Kas vyksta Lietuvoje? Aptarkime aktualijas pagarbiai ir atsakingai.",
    comments: 19,
    time: "prieš 4 val.",
    posts: [
      { username: "MatasP", name: "Matas P.", text: "Kokie sprendimai, jūsų nuomone, labiausiai paveiks mokinius šiais metais?", time: "prieš 4 val." },
    ],
  },
];
const pageContent = {
  Pagrindinis: {
    eyebrow: "MOKYKLOS BENDRUOMENĖ",
    title: "Kas vyksta mokykloje",
    description: "Viena vieta problemoms, idėjoms ir sprendimams matyti.",
  },
  Žinutės: {
    eyebrow: "TIESIOGINĖ INFORMACIJA",
    title: "Žinutės",
    description: "Svarbūs pranešimai, kuriuos verta rasti ir vėliau.",
  },
  Skelbimai: {
    eyebrow: "MOKYKLOS LENTA",
    title: "Skelbimai",
    description: "Renginiai, klubai, veiklos ir galimybės prisijungti.",
  },
  Problemos: {
    eyebrow: "MATOMA IR SEKAMA",
    title: "Problemos",
    description: "Pranešk apie bendrą mokyklos problemą ir matyk, kas vyksta toliau.",
  },
  Idėjos: {
    eyebrow: "BENDRAI KURIAME",
    title: "Idėjos",
    description: "Siūlyk pokyčius, paaiškink jų naudą ir balsuok už svarbiausius.",
  },
  Forumai: {
    eyebrow: "",
    title: "Forumai",
    description: "",
  },
  Apklausos: {
    eyebrow: "TAVO NUOMONĖ",
    title: "Apklausos",
    description: "Trumpi klausimai, padedantys mokyklai priimti geresnius sprendimus.",
  },
};

function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 323 321" role="img" aria-label="Žibėkim logo">
      <path
        d="M101 124 C130 115 158 94 174 62 C180 50 183 37 184 29 C184 52 186 73 195 88 C200 96 205 99 209 101 C192 96 176 99 158 105 C137 112 118 120 101 124 Z"
      />
      <path
        d="M26 122 C43 134 62 136 82 135 C124 134 174 121 220 113 C257 107 291 105 321 105 C288 125 252 145 216 164 C181 183 150 204 128 228 C165 208 204 187 239 170 L280 274 C263 258 247 248 226 243 C190 236 157 240 126 248 C93 257 64 271 36 287 C44 263 53 242 69 225 C88 205 112 190 140 174 C164 160 187 149 207 141 C166 160 124 178 83 191 C56 169 34 141 26 122 Z"
      />
    </svg>
  );
}

function PageContent({ activePage }) {
  const page = pageContent[activePage];
  const [selectedForum, setSelectedForum] = useState(null);
  const [forumQuery, setForumQuery] = useState("");
  const [newPost, setNewPost] = useState("");
  const [recentForumTitle, setRecentForumTitle] = useState(() => localStorage.getItem("zibekim-recent-forum") || "");
  const [forumPosts, setForumPosts] = useState(() => Object.fromEntries(forumTopics.map((forum) => [forum.title, forum.posts])));

  useEffect(() => {
    if (!selectedForum) return undefined;
    const closeWithEscape = (event) => event.key === "Escape" && setSelectedForum(null);
    document.addEventListener("keydown", closeWithEscape);
    return () => document.removeEventListener("keydown", closeWithEscape);
  }, [selectedForum]);

  const openForum = (forum) => {
    setSelectedForum(forum);
    setNewPost("");
    setRecentForumTitle(forum.title);
    localStorage.setItem("zibekim-recent-forum", forum.title);
  };

  const publishPost = (event) => {
    event.preventDefault();
    const text = newPost.trim();
    if (!text || !selectedForum) return;
    setForumPosts((current) => ({
      ...current,
      [selectedForum.title]: [...current[selectedForum.title], { username: "GeltonpilveVarle", name: "Auksė Varlytė", text, time: "ką tik" }],
    }));
    setNewPost("");
  };

  if (activePage === "Pagrindinis") {
    return (
      <main className="content-area">
        <section className="page-intro">
          <div>
            <span className="page-eyebrow">{page.eyebrow}</span>
            <h1>{page.title}</h1>
            <p>{page.description}</p>
          </div>
          <button className="primary-action" type="button"><Plus /> Pradėti</button>
        </section>
        <section className="dashboard-grid">
          <article className="feature-card feature-card--burgundy">
            <span className="card-kicker">SVARBIAUSIA</span>
            <h2>Studentų balsas turi matytis veiksme.</h2>
            <p>Čia rasi, kas pasiūlyta, kas sprendžiama ir kas jau pasikeitė.</p>
            <button className="text-action" type="button">Peržiūrėti veiklą <ArrowUpRight /></button>
          </article>
          <article className="stat-card"><AlertTriangle /><strong>12</strong><span>aktyvių problemų</span><small>3 sprendžiamos dabar</small></article>
          <article className="stat-card"><Lightbulb /><strong>28</strong><span>idėjos bendruomenėje</span><small>5 laukia atsako</small></article>
          <article className="activity-card">
            <div className="card-heading"><h2>Naujausia veikla</h2><Clock3 /></div>
            <div className="activity-row"><CheckCircle2 /><span><strong>Bibliotekos darbo laikas</strong><small>Problema išspręsta · prieš 2 val.</small></span></div>
            <div className="activity-row"><Vote /><span><strong>Daugiau vietų dviračiams</strong><small>Idėja gavo 24 balsus · prieš 5 val.</small></span></div>
          </article>
        </section>
      </main>
    );
  }

  const pageViews = {
    Žinutės: (
      <div className="list-card"><div className="card-heading"><h2>Naujausios žinutės</h2><MessageSquareText /></div>
        <div className="message-row"><span className="message-dot" /><div><strong>Studentų atstovybės susitikimas</strong><p>Susitikimas vyks ketvirtadienį 14:30 aktų salėje.</p><small>Studentų atstovybė · šiandien</small></div></div>
        <div className="message-row"><span className="message-dot" /><div><strong>Savaitės priminimas</strong><p>Iki penktadienio balsuok už idėją, kurią norėtum matyti mokykloje.</p><small>Administracija · vakar</small></div></div>
      </div>
    ),
    Skelbimai: (
      <div className="listing-grid"><article className="listing-card"><span className="tag">RENGINYS</span><h2>Žiemos vakaras mokykloje</h2><p>Susitikime bendruomenės vakare. Laukiami visi mokiniai.</p><small>Gruodžio 12 d. · Aktų salė</small></article><article className="listing-card"><span className="tag tag--gold">GALIMYBĖ</span><h2>Savanorių komanda</h2><p>Padėk organizuoti mokyklos pavasario iniciatyvas.</p><small>Registracija iki gruodžio 8 d.</small></article><article className="listing-card"><span className="tag tag--green">KLUBAS</span><h2>Atvira stalo žaidimų popietė</h2><p>Prisijunk, net jei dar nepažįsti kitų dalyvių.</p><small>Trečiadieniais · 15:00</small></article></div>
    ),
    Problemos: (
      <div className="list-card"><div className="card-heading"><h2>Aktyvios problemos</h2><button className="small-action" type="button"><Plus /> Pranešti</button></div>
        <div className="issue-row"><span className="status status--progress">Sprendžiama</span><div><strong>Šviesa trečiame aukšte</strong><p>Koridoriuje neveikia dalis apšvietimo.</p><small>Pastatas · pateikta prieš 2 d.</small></div><ArrowUpRight /></div>
        <div className="issue-row"><span className="status status--review">Nagrinėjama</span><div><strong>Per mažai vietų valgykloje</strong><p>Pertraukų metu mokiniams trūksta sėdimų vietų.</p><small>Bendros erdvės · pateikta prieš 4 d.</small></div><ArrowUpRight /></div>
        <div className="issue-row"><span className="status status--done">Išspręsta</span><div><strong>Bibliotekos darbo laikas</strong><p>Darbo laikas pratęstas iki 16:30.</p><small>Paslaugos · išspręsta vakar</small></div><CheckCircle2 /></div>
      </div>
    ),
    Idėjos: (
      <div className="list-card"><div className="card-heading"><h2>Idėjos, kurioms reikia tavo balso</h2><button className="small-action" type="button"><Plus /> Pasiūlyti idėją</button></div>
        <div className="idea-row"><div className="vote-box"><Vote /><strong>24</strong><small>balsai</small></div><div><strong>Daugiau vietų dviračiams</strong><p>Įrengti saugią, uždengtą vietą dviračiams prie sporto salės.</p><small>Siūlo Mantas · nagrinėjama</small></div><button className="vote-button" type="button">Balsuoti</button></div>
        <div className="idea-row"><div className="vote-box"><Vote /><strong>18</strong><small>balsų</small></div><div><strong>Ramesnė poilsio erdvė</strong><p>Skirti nedidelį kampą mokiniams, kuriems reikia ramybės pertraukų metu.</p><small>Siūlo Aistė · nagrinėjama</small></div><button className="vote-button" type="button">Balsuoti</button></div>
      </div>
    ),
    Forumai: selectedForum ? (
      <main className="forum-subpage">
        <button className="back-to-forums" type="button" onClick={() => setSelectedForum(null)}>← Atgal į forumus</button>
        <section className="forum-subpage-header">
          <h1>{selectedForum.title}</h1>
          <p>{selectedForum.description}</p>
        </section>
        <section className="discussion-list" aria-label={`Diskusija: ${selectedForum.title}`}>
          {(forumPosts[selectedForum.title] || []).map((post, index) => (
            <article className="discussion-post" key={`${post.username}-${index}`}>
              <div className="post-avatar" aria-hidden="true"><UserRound /></div>
              <div className="post-content">
                <div className="post-author"><strong>{post.name}</strong><span>@{post.username}</span><time>{post.time}</time></div>
                <p>{post.text}</p>
              </div>
            </article>
          ))}
        </section>
        <form className="new-post-form" onSubmit={publishPost}>
          <div className="post-avatar post-avatar--current" aria-hidden="true"><UserRound /></div>
          <div className="new-post-fields">
            <label htmlFor="new-forum-post">Rašyti kaip <strong>@GeltonpilveVarle</strong></label>
            <textarea id="new-forum-post" value={newPost} onChange={(event) => setNewPost(event.target.value)} placeholder="Parašyk ką nors diskusijoje..." rows="3" />
            <div className="new-post-actions"><small>Būk pagarbus kitiems bendruomenės nariams.</small><button className="primary-action" type="submit" disabled={!newPost.trim()}><MessageCircle /> Siųsti</button></div>
          </div>
        </form>
      </main>
    ) : (
      <div className="forum-layout">
        <div className="forum-toolbar">
          <label className="forum-search">
            <Search aria-hidden="true" />
            <span className="sr-only">Ieškoti forumų temų</span>
            <input value={forumQuery} onChange={(event) => setForumQuery(event.target.value)} placeholder="Ieškoti temų" />
          </label>
        </div>
        <section className="forum-list" aria-label="Forumų temos">
          {forumTopics.filter((forum) => `${forum.title} ${forum.description}`.toLocaleLowerCase().includes(forumQuery.toLocaleLowerCase())).map((forum) => (
            <button className="forum-row" type="button" key={forum.title} onClick={() => openForum(forum)}>
              <span className="forum-row-copy"><strong>{forum.title}</strong><small>{forum.description}</small></span>
              <span className="forum-row-meta"><span><MessageSquareText /> {forumPosts[forum.title].length}</span><small>{forum.time}</small></span>
              <Bookmark className="forum-bookmark" aria-hidden="true" />
            </button>
          ))}
          {forumTopics.filter((forum) => `${forum.title} ${forum.description}`.toLocaleLowerCase().includes(forumQuery.toLocaleLowerCase())).length === 0 && (
            <p className="forum-empty">Temų pagal šią paiešką nerasta.</p>
          )}
        </section>
        <aside className="recent-forum" aria-label="Neseniai peržiūrėta">
          <span className="page-eyebrow">NESENIAI PERŽIŪRĖTA</span>
          {recentForumTitle ? (
            <button type="button" onClick={() => openForum(forumTopics.find((forum) => forum.title === recentForumTitle) || forumTopics[0])}>{recentForumTitle} <ArrowUpRight /></button>
          ) : <span className="recent-forum-empty">Dar nieko neperžiūrėjai</span>}
        </aside>
      </div>
    ),
    Apklausos: (
      <div className="list-card"><div className="card-heading"><h2>Aktyvios apklausos</h2><ClipboardList /></div><div className="poll-card"><div><span className="tag">AKTYVI</span><h2>Kaip pagerinti mokyklos bendras erdves?</h2><p>Pasirink vieną variantą. Apklausa baigsis po 3 dienų.</p></div><div className="poll-options"><button type="button">Daugiau sėdimų vietų <span>42%</span></button><button type="button">Daugiau žalumos <span>31%</span></button><button type="button">Ramesnės zonos <span>27%</span></button></div></div></div>
    ),
  };

  return <main className="content-area">{activePage !== "Forumai" && <section className="page-intro"><div><span className="page-eyebrow">{page.eyebrow}</span><h1>{page.title}</h1><p>{page.description}</p></div><button className="primary-action" type="button"><Search /> Ieškoti</button></section>}{pageViews[activePage]}</main>;
}

function App() {
  const [activePage, setActivePage] = useState("Pagrindinis");

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand-header">
          <LogoMark />
          <div className="brand-copy">
            <div className="brand-name">Žibėkim</div>
            <div className="brand-school">
              | Vytauto Didžiojo universiteto Šakių „Žiburio“ gimnazija|
            </div>
          </div>
        </div>

        <div className="profile-menu">
          <details>
            <summary className="profile-summary">
              <span className="profile-avatar" aria-hidden="true">
                <UserRound />
              </span>
              <span className="profile-copy">
                <strong>GeltonpilveVarle</strong>
                <small>Profilis</small>
              </span>
            </summary>
            <div className="profile-details">
              <span>GeltonpilveVarle</span>
              <strong>Auksė Varlytė</strong>
            </div>
          </details>
        </div>
      </header>

      <aside className="sidebar" aria-label="Navigacija">
        {navigationItems.map(({ label, icon: Icon }) => (
          <button
            className={`navigation-button ${activePage === label ? "navigation-button--active" : ""}`}
            type="button"
            aria-label={label}
            aria-current={activePage === label ? "page" : undefined}
            key={label}
            onClick={() => setActivePage(label)}
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}

        <button className="navigation-button settings-button" type="button" aria-label="Nustatymai">
          <Settings aria-hidden="true" />
          <span>Nustatymai</span>
        </button>

        <div className="sidebar-version">v.RETRO.2026.11.21.01</div>
      </aside>

      <PageContent activePage={activePage} />
    </div>
  );
}

export default App;
