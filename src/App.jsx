import { useEffect, useRef, useState } from "react";
import { AlertTriangle, BarChart3, Bookmark, CalendarDays, ChevronRight, Home, Lightbulb, MessageCircle, MessagesSquare, Plus, Send, Settings, ShieldQuestion } from "lucide-react";
import { announcements, currentUser, forumTopics, ideaStages, ideaStatusLabels, initialIdeas, initialProblems, messageConversations, messagePeople, problemStages, statusLabels } from "./data.js";
import { IdeasView, ProblemsView } from "./Trackers.jsx";
import { Avatar, BackButton, CategoryTile, EmptyState, Field, IconTile, PageHeader, Photo, PhotoBanner, SearchField, Segmented, Sheet, StatusBadge, StatusTrack, Switch, VoteButton, VoteGoal, initials, plural } from "./ui.jsx";
import "./App.css";

const navigationItems = [
  { label: "Pagrindinis", short: "Pradžia", icon: Home },
  { label: "Problemos", short: "Problemos", icon: AlertTriangle },
  { label: "Idėjos", short: "Idėjos", icon: Lightbulb },
  { label: "Apklausos", short: "Apklausos", icon: BarChart3 },
  { label: "Forumai", short: "Forumai", icon: MessagesSquare },
  { label: "Žinutės", short: "Žinutės", icon: MessageCircle },
];

function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 323 321" aria-hidden="true">
      <path d="M101 124 C130 115 158 94 174 62 C180 50 183 37 184 29 C184 52 186 73 195 88 C200 96 205 99 209 101 C192 96 176 99 158 105 C137 112 118 120 101 124 Z" />
      <path d="M26 122 C43 134 62 136 82 135 C124 134 174 121 220 113 C257 107 291 105 321 105 C288 125 252 145 216 164 C181 183 150 204 128 228 C165 208 204 187 239 170 L280 274 C263 258 247 248 226 243 C190 236 157 240 126 248 C93 257 64 271 36 287 C44 263 53 242 69 225 C88 205 112 190 140 174 C164 160 187 149 207 141 C166 160 124 178 83 191 C56 169 34 141 26 122 Z" />
    </svg>
  );
}

/* ───────────────────────── Home ───────────────────────── */

function HomeView({ problems, ideas, setIdeas, open }) {
  const answered = [
    ...problems.filter((item) => item.response).map((item) => ({ ...item, kind: "Problemos", stages: problemStages, labels: statusLabels })),
    ...ideas.filter((item) => item.response && item.status !== "done" && item.status !== "declined").map((item) => ({ ...item, kind: "Idėjos", stages: ideaStages, labels: ideaStatusLabels })),
  ].sort((a, b) => a.rank - b.rank).slice(0, 3);
  const voting = ideas.filter((item) => item.status === "submitted" || item.status === "review").sort((a, b) => b.votes - a.votes).slice(0, 3);
  const resolved = problems.filter((item) => item.status === "resolved").length;
  const approved = ideas.filter((item) => item.status === "approved" || item.status === "done").length;
  const toggleVote = (id) => setIdeas((current) => current.map((item) => (item.id === id ? { ...item, voted: !item.voted, votes: item.votes + (item.voted ? -1 : 1) } : item)));
  const firstName = currentUser.name.split(" ")[0];

  return (
    <div className="home">
      <header className="hero">
        <Photo name="main" className="hero-img" position="50% 30%" sizes="(min-width: 769px) 1120px, 100vw" alt="Gimnazijos mokiniai rugsėjo 1-osios šventėje" eager />
        <div className="hero-content">
          <p className="hero-kicker">Pirmadienis, lapkričio 23 d.</p>
          <h1 className="hero-title">Labas, {firstName}!</h1>
          <p className="hero-text">Ką šiandien pakeisim mokykloje?</p>
          <ul className="hero-stats" aria-label="Šio rudens rezultatai">
            <li><strong>{resolved}</strong> {plural(resolved, ["problema išspręsta", "problemos išspręstos", "problemų išspręsta"])}</li>
            <li><strong>{approved}</strong> {plural(approved, ["idėja patvirtinta", "idėjos patvirtintos", "idėjų patvirtinta"])}</li>
          </ul>
        </div>
      </header>

      <div className="quick-actions">
        <button type="button" className="quick-action quick-action--problem" onClick={() => open("Problemos")}>
          <span className="quick-action-icon" aria-hidden="true"><AlertTriangle /></span>
          <span className="quick-action-text"><strong>Pranešti apie problemą</strong><small>Kas neveikia ar trukdo?</small></span>
          <ChevronRight className="quick-action-chevron" aria-hidden="true" />
        </button>
        <button type="button" className="quick-action quick-action--idea" onClick={() => open("Idėjos")}>
          <span className="quick-action-icon" aria-hidden="true"><Lightbulb /></span>
          <span className="quick-action-text"><strong>Siūlyti idėją</strong><small>Ką būtų smagu pakeisti?</small></span>
          <ChevronRight className="quick-action-chevron" aria-hidden="true" />
        </button>
      </div>

      <section className="home-section" aria-labelledby="answered-title">
        <div className="section-head">
          <h2 id="answered-title" className="title-2">Mokykla atsakė</h2>
        </div>
        <ul className="card-list card-list--scroll">
          {answered.map((item) => (
            <li key={item.id}>
              <button type="button" className="update-row" onClick={() => open(item.kind, item.id)}>
                <span className="update-top"><CategoryTile category={item.category} /><span className="update-kind">{item.kind === "Problemos" ? "Problema" : "Idėja"}</span><StatusBadge status={item.status} labels={item.labels} /></span>
                <span className="update-title">{item.title}</span>
                <span className="update-quote">„{item.response.text}“</span>
                <span className="update-from"><Avatar name={item.response.from} size="small" />{item.response.from} · {item.response.date}</span>
                <StatusTrack stages={item.stages} status={item.status} compact />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-section" aria-labelledby="voting-title">
        <div className="section-head">
          <h2 id="voting-title" className="title-2">Laukia tavo balso</h2>
          <button type="button" className="btn-link" onClick={() => open("Idėjos")}>Visos idėjos<ChevronRight aria-hidden="true" /></button>
        </div>
        <ul className="inset-list">
          {voting.map((item) => (
            <li key={item.id} className="vote-row">
              <VoteButton voted={item.voted} votes={item.votes} title={item.title} onToggle={() => toggleVote(item.id)} size="small" />
              <button type="button" className="vote-row-link" onClick={() => open("Idėjos", item.id)}>
                <span className="row-title">{item.title}</span>
                <span className="row-meta">{item.category} · {item.author}</span>
                <VoteGoal votes={item.votes} />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-section" aria-labelledby="news-title">
        <div className="section-head"><h2 id="news-title" className="title-2">Skelbimai</h2></div>
        <ul className="news-grid">
          {announcements.map((item) => (
            <li key={item.id} className="news-card">
              <Photo name={item.photo} position={item.position} className="news-card-img" sizes="(min-width: 769px) 360px, 80vw" />
              <div className="news-card-body">
                <span className="news-tag">{item.tag}</span>
                <span className="news-title">{item.title}</span>
                <span className="news-text">{item.text}</span>
                <span className="news-date"><CalendarDays aria-hidden="true" />{item.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* ───────────────────────── Polls ───────────────────────── */

const initialPolls = [
  { id: "spaces", question: "Ką pirmiausia pagerinti bendrose erdvėse?", ends: "Baigiasi po 3 d.", options: [{ label: "Daugiau sėdimų vietų", votes: 126 }, { label: "Daugiau žalumos", votes: 93 }, { label: "Ramios zonos", votes: 81 }], choice: null },
  { id: "event", question: "Koks turėtų būti žiemos vakaro formatas?", ends: "Baigiasi po 6 d.", options: [{ label: "Koncertas ir šokiai", votes: 74 }, { label: "Kino vakaras", votes: 58 }, { label: "Talentų šou", votes: 49 }, { label: "Stalo žaidimų turnyras", votes: 22 }], choice: null },
];

function PollsView() {
  const [polls, setPolls] = useState(initialPolls);
  const choose = (pollId, index) => setPolls((current) => current.map((poll) => {
    if (poll.id !== pollId || poll.choice !== null) return poll;
    return { ...poll, choice: index, options: poll.options.map((option, i) => (i === index ? { ...option, votes: option.votes + 1 } : option)) };
  }));
  const undo = (pollId) => setPolls((current) => current.map((poll) => (poll.id === pollId && poll.choice !== null ? { ...poll, options: poll.options.map((option, i) => (i === poll.choice ? { ...option, votes: option.votes - 1 } : option)), choice: null } : poll)));

  return (
    <div className="page-narrow">
      <PhotoBanner photo="photo-4" position="50% 45%" title="Apklausos" subtitle={`${polls.length} aktyvios · tavo nuomonė lemia sprendimus`} />
      <div className="stack">
        {polls.map((poll) => {
          const total = poll.options.reduce((sum, option) => sum + option.votes, 0);
          const answered = poll.choice !== null;
          return (
            <section key={poll.id} className="card poll" aria-labelledby={`poll-${poll.id}`}>
              <p className="poll-meta">{poll.ends} · {total} {plural(total, ["balsas", "balsai", "balsų"])}</p>
              <h2 id={`poll-${poll.id}`} className="title-3">{poll.question}</h2>
              <div className="poll-options" role={answered ? undefined : "group"} aria-label="Atsakymų variantai">
                {poll.options.map((option, index) => {
                  const percent = Math.round((option.votes / total) * 100);
                  return answered ? (
                    <div key={option.label} className={`poll-result ${poll.choice === index ? "is-chosen" : ""}`}>
                      <span className="poll-bar" style={{ width: `${percent}%` }} aria-hidden="true" />
                      <span className="poll-label">{option.label}{poll.choice === index && <span className="sr-only"> (tavo pasirinkimas)</span>}</span>
                      <span className="poll-percent">{percent}%</span>
                    </div>
                  ) : (
                    <button key={option.label} type="button" className="poll-option" onClick={() => choose(poll.id, index)}>{option.label}</button>
                  );
                })}
              </div>
              {answered && <p className="poll-footer">Tavo balsas įskaitytas. <button type="button" className="btn-link" onClick={() => undo(poll.id)}>Keisti atsakymą</button></p>}
            </section>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────────────── Forums ───────────────────────── */

function ForumsView({ onOpenMessages }) {
  const [topics, setTopics] = useState(forumTopics);
  const [posts, setPosts] = useState(() => Object.fromEntries(forumTopics.map((topic) => [topic.title, topic.posts])));
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem("zibekim-saved-topics") || "[]"));
  const [composing, setComposing] = useState(false);
  const [draft, setDraft] = useState({ title: "", description: "" });
  const [newPost, setNewPost] = useState("");
  const selected = topics.find((topic) => topic.title === selectedTitle);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [selectedTitle]);

  const toggleSaved = (title) => setSaved((current) => {
    const next = current.includes(title) ? current.filter((item) => item !== title) : [...current, title];
    localStorage.setItem("zibekim-saved-topics", JSON.stringify(next));
    return next;
  });

  const publish = (event) => {
    event.preventDefault();
    const text = newPost.trim();
    if (!text) return;
    setPosts((current) => ({ ...current, [selected.title]: [...current[selected.title], { username: currentUser.username, name: currentUser.name, text, time: "ką tik" }] }));
    setNewPost("");
  };

  const addTopic = () => {
    const topic = { title: draft.title.trim(), description: draft.description.trim(), time: "ką tik", posts: [] };
    setTopics((current) => [topic, ...current]);
    setPosts((current) => ({ ...current, [topic.title]: [] }));
    setDraft({ title: "", description: "" });
    setComposing(false);
  };

  if (selected) {
    const list = posts[selected.title] || [];
    return (
      <div className="page-narrow">
        <BackButton label="Forumai" onClick={() => setSelectedTitle(null)} />
        <header className="thread-head">
          <h1 className="title-1">{selected.title}</h1>
          <p className="muted">{selected.description}</p>
        </header>
        {list.length ? (
          <ul className="thread">
            {list.map((post, index) => (
              <li key={`${post.username}-${index}`} className="post">
                <Avatar name={post.name} />
                <div className="post-body">
                  <p className="post-head"><strong>{post.name}</strong> <span>@{post.username} · {post.time}</span></p>
                  <p>{post.text}</p>
                  {post.username !== currentUser.username && <button type="button" className="btn-link btn-link--quiet" onClick={onOpenMessages}><ShieldQuestion aria-hidden="true" />Parašyti anonimiškai</button>}
                </div>
              </li>
            ))}
          </ul>
        ) : <EmptyState title="Įrašų dar nėra" text="Pradėk pokalbį pirmuoju įrašu." />}
        <form className="composer-card" onSubmit={publish}>
          <label htmlFor="forum-post" className="field-label">Rašai kaip @{currentUser.username}</label>
          <textarea id="forum-post" rows={3} value={newPost} onChange={(event) => setNewPost(event.target.value)} placeholder="Tavo mintis šioje temoje" />
          <div className="composer-foot">
            <small className="muted">Rašyk pagarbiai. Įrašus mato visa mokykla.</small>
            <button type="submit" className="btn btn--primary" disabled={!newPost.trim()}>Skelbti</button>
          </div>
        </form>
      </div>
    );
  }

  const visible = topics.filter((topic) => (filter === "saved" ? saved.includes(topic.title) : true) && `${topic.title} ${topic.description}`.toLocaleLowerCase("lt").includes(query.trim().toLocaleLowerCase("lt")));
  return (
    <div className="page-narrow">
      <PhotoBanner photo="photo-3" position="50% 60%" title="Forumai" subtitle="Diskusijos visai mokyklai">
        <button type="button" className="btn btn--on-photo" onClick={() => setComposing(true)}><Plus aria-hidden="true" />Nauja tema</button>
      </PhotoBanner>
      <div className="list-tools">
        <SearchField value={query} onChange={setQuery} placeholder="Ieškoti temų" label="Ieškoti temų" />
        <Segmented label="Rodyti" value={filter} onChange={setFilter} options={[{ value: "all", label: "Visos" }, { value: "saved", label: "Išsaugotos", count: saved.length }]} />
      </div>
      {visible.length ? (
        <ul className="rows">
          {visible.map((topic) => {
            const count = posts[topic.title]?.length || 0;
            const isSaved = saved.includes(topic.title);
            return (
              <li key={topic.title} className="row-with-trailing">
                <button type="button" className="row" onClick={() => setSelectedTitle(topic.title)}>
                  <IconTile icon={topic.icon || "Sparkles"} tone={topic.tone || "gray"} />
                  <span className="row-main">
                    <span className="row-title">{topic.title}</span>
                    <span className="row-meta">{topic.description}</span>
                  </span>
                  <span className="row-side row-side--plain">
                    <span className="row-count">{count} {plural(count, ["įrašas", "įrašai", "įrašų"])}</span>
                    <span className="row-meta">{topic.time}</span>
                  </span>
                </button>
                <button type="button" className={`icon-button ${isSaved ? "is-on" : ""}`} aria-pressed={isSaved} aria-label={isSaved ? `Pašalinti „${topic.title}“ iš išsaugotų` : `Išsaugoti „${topic.title}“`} onClick={() => toggleSaved(topic.title)}>
                  <Bookmark aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
      ) : <EmptyState title={filter === "saved" && !query ? "Išsaugotų temų nėra" : "Nieko nerasta"} text={filter === "saved" && !query ? "Paspausk žymeklį prie temos, kad ją rastum čia." : "Pabandyk kitą paieškos žodį."} />}
      {composing && (
        <Sheet title="Nauja tema" submitLabel="Kurti" canSubmit={draft.title.trim().length >= 3 && draft.description.trim().length >= 5 && !topics.some((topic) => topic.title === draft.title.trim())} onClose={() => setComposing(false)} onSubmit={addTopic}>
          <Field label="Pavadinimas"><input autoFocus value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="Pvz. Mokyklos renginiai" /></Field>
          <Field label="Apie ką ši tema?"><textarea rows={3} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} placeholder="Vienu sakiniu" /></Field>
        </Sheet>
      )}
    </div>
  );
}

/* ───────────────────────── Messages ───────────────────────── */

function MessagesView() {
  const [conversations, setConversations] = useState(messageConversations);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Visi");
  const [composer, setComposer] = useState("");
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [group, setGroup] = useState({ name: "", description: "", type: "Grupė" });
  const [rooms, setRooms] = useState({});
  const [activeRoom, setActiveRoom] = useState("pagrindinis");
  const [roomMessages, setRoomMessages] = useState({});
  const [addingRoom, setAddingRoom] = useState(false);
  const [roomName, setRoomName] = useState("");
  const historyRef = useRef(null);

  const isWide = useMediaQuery("(min-width: 900px)");
  const selected = conversations.find((item) => item.id === selectedId) || (isWide ? conversations[0] : null);
  const filters = { Visi: () => true, Asmeniniai: (c) => c.type === "Asmeninis", Grupės: (c) => c.type === "Grupė" || c.type === "Klasė" || c.type === "Pamoka", Anoniminiai: (c) => c.type === "Anoniminis" };
  const q = query.trim().toLocaleLowerCase("lt");
  const visible = conversations.filter((c) => filters[filter](c) && `${c.name} ${c.username || ""}`.toLocaleLowerCase("lt").includes(q));
  const people = q ? messagePeople.filter((p) => !conversations.some((c) => c.id === p.id) && `${p.name} ${p.username}`.toLocaleLowerCase("lt").includes(q)) : [];
  const roomList = selected ? ["pagrindinis", ...(rooms[selected.id] || [])] : [];
  const roomKey = selected ? `${selected.id}/${activeRoom}` : "";
  const shown = !selected ? [] : activeRoom === "pagrindinis" ? selected.messages : roomMessages[roomKey] || [];

  useEffect(() => { historyRef.current?.scrollTo({ top: historyRef.current.scrollHeight }); }, [shown.length, selected?.id, activeRoom]);

  const openConversation = (id) => { setSelectedId(id); setActiveRoom("pagrindinis"); setAddingRoom(false); };
  const startWith = (person) => {
    setConversations((current) => [{ id: person.id, name: person.name, username: person.username.replace("@", ""), type: "Asmeninis", preview: "Naujas pokalbis", time: "dabar", avatar: initials(person.name), messages: [] }, ...current]);
    setQuery("");
    openConversation(person.id);
  };
  const send = (event) => {
    event.preventDefault();
    const text = composer.trim();
    if (!text || !selected) return;
    const message = { from: "me", text, time: "ką tik" };
    if (activeRoom === "pagrindinis") setConversations((current) => current.map((c) => (c.id === selected.id ? { ...c, preview: text, time: "ką tik", messages: [...c.messages, message] } : c)));
    else setRoomMessages((current) => ({ ...current, [roomKey]: [...(current[roomKey] || []), message] }));
    setComposer("");
  };
  const addRoom = (event) => {
    event.preventDefault();
    const name = roomName.trim().replace(/^#\s*/, "").toLocaleLowerCase("lt").replace(/\s+/g, "-");
    if (!name || roomList.includes(name)) return;
    setRooms((current) => ({ ...current, [selected.id]: [...(current[selected.id] || []), name] }));
    setActiveRoom(name);
    setRoomName("");
    setAddingRoom(false);
  };
  const createGroup = () => {
    const id = `group-${Date.now()}`;
    setConversations((current) => [{ id, name: group.name.trim(), type: group.type, preview: "Grupė sukurta", time: "dabar", avatar: initials(group.name.trim()).toUpperCase(), messages: [] }, ...current]);
    setGroup({ name: "", description: "", type: "Grupė" });
    setCreatingGroup(false);
    openConversation(id);
  };

  const avatar = (c) => (c.anonymous ? <span className="avatar avatar--anon" aria-hidden="true"><ShieldQuestion /></span> : <Avatar name={c.name} label={c.avatar} />);

  return (
    <div className={`messages ${selected && !isWide ? "messages--thread" : ""}`}>
      <aside className="messages-list" aria-label="Pokalbiai">
        <PageHeader title="Žinutės">
          <button type="button" className="icon-button icon-button--filled" aria-label="Sukurti grupę" onClick={() => setCreatingGroup(true)}><Plus aria-hidden="true" /></button>
        </PageHeader>
        <SearchField value={query} onChange={setQuery} placeholder="Ieškoti žmonių ir pokalbių" label="Ieškoti pokalbių" />
        <div className="chip-scroll" role="group" aria-label="Rodyti">
          {Object.keys(filters).map((item) => <button key={item} type="button" className="chip" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <ul className="conversation-list">
          {visible.map((c) => (
            <li key={c.id}>
              <button type="button" className={`conversation ${selected?.id === c.id ? "is-selected" : ""}`} aria-current={selected?.id === c.id && isWide ? "true" : undefined} onClick={() => openConversation(c.id)}>
                {avatar(c)}
                <span className="conversation-text">
                  <span className="conversation-top"><strong>{c.name}</strong><time>{c.time}</time></span>
                  <span className="conversation-preview">{c.preview}</span>
                </span>
              </button>
            </li>
          ))}
          {people.map((p) => (
            <li key={p.id}>
              <button type="button" className="conversation" onClick={() => startWith(p)}>
                <Avatar name={p.name} />
                <span className="conversation-text"><span className="conversation-top"><strong>{p.name}</strong></span><span className="conversation-preview">Pradėti pokalbį · {p.detail}</span></span>
              </button>
            </li>
          ))}
        </ul>
        {!visible.length && !people.length && <EmptyState title="Nieko nerasta" text="Pabandyk kitą vardą arba filtrą." />}
      </aside>

      <section className="thread-pane" aria-label="Pokalbis">
        {selected ? (
          <>
            <header className="thread-pane-head">
              {!isWide && <BackButton label="Žinutės" onClick={() => setSelectedId(null)} />}
              <div className="thread-pane-title">
                {avatar(selected)}
                <div><h2 className="title-3">{selected.name}</h2><p className="row-meta">{selected.username ? `@${selected.username}` : selected.type}</p></div>
              </div>
              <div className="chip-scroll" role="group" aria-label="Kambariai">
                {roomList.map((room) => <button key={room} type="button" className="chip chip--small" aria-pressed={activeRoom === room} onClick={() => setActiveRoom(room)}># {room}</button>)}
                {addingRoom ? (
                  <form className="room-form" onSubmit={addRoom}>
                    <input autoFocus value={roomName} onChange={(event) => setRoomName(event.target.value)} onBlur={() => !roomName && setAddingRoom(false)} placeholder="kambario pavadinimas" aria-label="Naujo kambario pavadinimas" />
                  </form>
                ) : <button type="button" className="chip chip--small chip--add" onClick={() => setAddingRoom(true)}><Plus aria-hidden="true" />Kambarys</button>}
              </div>
            </header>
            <div className="bubbles" ref={historyRef}>
              {shown.map((m, index) => (
                <div key={`${m.time}-${index}`} className={`bubble-row bubble-row--${m.from}`}><div className="bubble"><p>{m.text}</p><time>{m.time}</time></div></div>
              ))}
              {!shown.length && <EmptyState title="Žinučių dar nėra" text="Parašyk pirmą žinutę." />}
            </div>
            <form className="message-composer" onSubmit={send}>
              <label htmlFor="message-input" className="sr-only">Žinutė</label>
              <textarea id="message-input" rows={1} value={composer} onChange={(event) => setComposer(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) send(event); }} placeholder="Žinutė" />
              <button type="submit" className="send-button" aria-label="Siųsti" disabled={!composer.trim()}><Send aria-hidden="true" /></button>
            </form>
          </>
        ) : null}
      </section>

      {creatingGroup && (
        <Sheet title="Nauja grupė" submitLabel="Kurti" canSubmit={group.name.trim().length >= 2} onClose={() => setCreatingGroup(false)} onSubmit={createGroup}>
          <Field label="Pavadinimas"><input autoFocus value={group.name} onChange={(event) => setGroup({ ...group, name: event.target.value })} placeholder="Pvz. Biologijos projektas" /></Field>
          <Field label="Aprašymas" hint="Neprivaloma"><textarea rows={3} value={group.description} onChange={(event) => setGroup({ ...group, description: event.target.value })} placeholder="Kam skirta ši grupė?" /></Field>
          <fieldset className="field"><legend className="field-label">Tipas</legend><div className="chips">{["Grupė", "Pamoka"].map((type) => <button key={type} type="button" className="chip" aria-pressed={group.type === type} onClick={() => setGroup({ ...group, type })}>{type}</button>)}</div></fieldset>
        </Sheet>
      )}
    </div>
  );
}

function useMediaQuery(query) {
  const [value, setValue] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setValue(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);
  return value;
}

/* ───────────────────────── Settings ───────────────────────── */

function SettingsView({ reducedMotion, setReducedMotion }) {
  const [prefs, setPrefs] = useState({ messages: true, replies: true, status: true });
  const set = (key) => (value) => setPrefs((current) => ({ ...current, [key]: value }));
  return (
    <div className="page-narrow">
      <PageHeader title="Nustatymai" />
      <div className="settings-profile card">
        <Photo name="photo-5" className="settings-cover" sizes="760px" position="50% 40%" />
        <div className="settings-profile-row">
          <Avatar name={currentUser.name} size="large" />
          <div><p className="title-3">{currentUser.name}</p><p className="muted">@{currentUser.username}</p><p className="muted">{currentUser.role.replace(", ", ",\u00a0")}</p></div>
        </div>
      </div>
      <h2 className="group-title">Pranešimai</h2>
      <div className="grouped">
        <Switch label="Naujos žinutės" checked={prefs.messages} onChange={set("messages")} />
        <Switch label="Atsakymai mano temose" checked={prefs.replies} onChange={set("replies")} />
        <Switch label="Mano problemų ir idėjų eiga" detail="Kai pasikeičia būsena arba mokykla atsako." checked={prefs.status} onChange={set("status")} />
      </div>
      <h2 className="group-title">Prieinamumas</h2>
      <div className="grouped">
        <Switch label="Mažiau judesio" detail="Išjungia animacijas ir perėjimus." checked={reducedMotion} onChange={setReducedMotion} />
      </div>
      <h2 className="group-title">Privatumas</h2>
      <div className="grouped grouped--text">
        <p><strong>Anonimiški pranešimai.</strong> Kiti mokiniai nemato tavo vardo. Moderatoriai jį mato, kad galėtų apsaugoti bendruomenę nuo piktnaudžiavimo.</p>
        <p><strong>Moderavimas.</strong> Įžeidžiantys ar asmenis įvardijantys įrašai pašalinami per 24 valandas.</p>
      </div>
      <p className="settings-version">Žibėkim · versija 2026.11.24</p>
    </div>
  );
}

/* ───────────────────────── Shell ───────────────────────── */

function App() {
  const [activePage, setActivePage] = useState("Pagrindinis");
  const [focusId, setFocusId] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(() => localStorage.getItem("zibekim-reduced-motion") === "1");
  const [problems, setProblems] = useState(initialProblems);
  const [ideas, setIdeas] = useState(initialIdeas);

  useEffect(() => {
    document.documentElement.classList.toggle("user-reduced-motion", reducedMotion);
    localStorage.setItem("zibekim-reduced-motion", reducedMotion ? "1" : "0");
  }, [reducedMotion]);

  const open = (page, id = null) => {
    setActivePage(page);
    setFocusId(id);
    window.scrollTo({ top: 0 });
  };

  const views = {
    Pagrindinis: <HomeView problems={problems} ideas={ideas} setIdeas={setIdeas} open={open} />,
    Problemos: <ProblemsView key={`p-${focusId}`} problems={problems} setProblems={setProblems} initialId={focusId} />,
    Idėjos: <IdeasView key={`i-${focusId}`} ideas={ideas} setIdeas={setIdeas} initialId={focusId} />,
    Apklausos: <PollsView />,
    Forumai: <ForumsView onOpenMessages={() => open("Žinutės")} />,
    Žinutės: <MessagesView />,
    Nustatymai: <SettingsView reducedMotion={reducedMotion} setReducedMotion={setReducedMotion} />,
  };

  return (
    <div className="app">
      <a className="skip-link" href="#main">Pereiti prie turinio</a>
      <header className="mobile-header">
        <div className="brand"><LogoMark /><span className="brand-name">Žibėkim</span></div>
        <button type="button" className="avatar-button" aria-label="Nustatymai ir profilis" aria-current={activePage === "Nustatymai" ? "page" : undefined} onClick={() => open("Nustatymai")}>
          <Avatar name={currentUser.name} />
        </button>
      </header>

      <nav className="sidebar" aria-label="Pagrindinė navigacija">
        <div className="brand brand--sidebar">
          <LogoMark />
          <span className="brand-text"><span className="brand-name">Žibėkim</span><span className="brand-school">Šakių „Žiburio“ gimnazija</span></span>
        </div>
        <ul className="nav-list">
          {navigationItems.map(({ label, short, icon: Icon }) => (
            <li key={label}>
              <button type="button" className="nav-item" aria-current={activePage === label ? "page" : undefined} onClick={() => open(label)}>
                <Icon aria-hidden="true" />
                <span className="nav-label nav-label--long">{label}</span>
                <span className="nav-label nav-label--short">{short}</span>
              </button>
            </li>
          ))}
        </ul>
        <button type="button" className="sidebar-profile" aria-current={activePage === "Nustatymai" ? "page" : undefined} onClick={() => open("Nustatymai")}>
          <Avatar name={currentUser.name} />
          <span className="sidebar-profile-text"><strong>{currentUser.name}</strong><small>@{currentUser.username}</small></span>
          <Settings aria-hidden="true" />
          <span className="sr-only">Nustatymai</span>
        </button>
      </nav>

      <main id="main" className={`main main--${activePage === "Žinutės" ? "messages" : "page"}`} tabIndex={-1}>
        {views[activePage]}
      </main>
    </div>
  );
}

export default App;
