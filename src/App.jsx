import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Bookmark,
  CheckCircle2,
  ClipboardList,
  Home,
  Lightbulb,
  Mail,
  Megaphone,
  MessageCircle,
  MessageSquareText,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  ChevronDown,
  UserRound,
  ShieldQuestion,
  Send,
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

const messageConversations = [
  { id: "austeja", name: "Austėja M.", username: "AustejaM", type: "Asmeninis", topic: "projektai", preview: "Gal galėtume prie bibliotekos...", time: "10:42", avatar: "AM", messages: [{ from: "them", text: "Gal galėtume prie bibliotekos įrengti daugiau vietų mokytis?", time: "10:40" }, { from: "me", text: "Pritariu, galime pasiūlyti tai forume.", time: "10:42" }] },
  { id: "economics", name: "Ekonomika", type: "Pamoka", topic: "mokslai", preview: "Rytoj aptarsime infliaciją", time: "09:18", avatar: "EK", messages: [{ from: "them", text: "Rytoj aptarsime infliaciją. Nepamirškite pasiimti užrašų.", time: "09:18" }] },
  { id: "3a", name: "3A klasė", type: "Klasė", topic: "bendri", preview: "Mantas: Dėl išvykos...", time: "vakar", avatar: "3A", messages: [{ from: "them", text: "Dėl išvykos susitinkame prie pagrindinio įėjimo.", time: "vakar" }] },
  { id: "robotics", name: "Robotikos komanda", type: "Grupė", topic: "projektai", preview: "Greta: Įkėliau idėjas", time: "pirmadienį", avatar: "RK", messages: [{ from: "them", text: "Įkėliau idėjas mūsų projektui.", time: "pirmadienį" }] },
  { id: "anonymous-school", name: "Unicorn", username: "Unicorn", type: "Anoniminis", topic: "bendri", preview: "Ačiū, kad parašei", time: "sekmadienį", avatar: "?", anonymous: true, messages: [{ from: "them", text: "Ačiū, kad parašei po mano komentaru.", time: "sekmadienį" }] },
];

const messagePeople = [
  { id: "austeja", name: "Austėja M.", username: "@AustejaM", detail: "Mokinė" },
  { id: "tomas", name: "Tomas K.", username: "@TomasK", detail: "Mokinys" },
  { id: "greta", name: "Greta V.", username: "@GretaV", detail: "Mokinė" },
];
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

function MessagesView({ initialConversationId }) {
  const [conversations, setConversations] = useState(messageConversations);
  const [selectedId, setSelectedId] = useState(initialConversationId || messageConversations[0].id);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Visi");
  const [composer, setComposer] = useState("");
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupType, setGroupType] = useState("Grupė");
  const [showGroupPage, setShowGroupPage] = useState(false);
  const [topics, setTopics] = useState({
    austeja: [{ id: "austeja-pagrindinis", label: "# pagrindinis" }, { id: "austeja-mokslai", label: "# mokslai" }],
    tomas: [{ id: "tomas-pagrindinis", label: "# pagrindinis" }, { id: "tomas-projektai", label: "# projektai" }],
    economics: [{ id: "economics-pagrindinis", label: "# pagrindinis" }, { id: "economics-mokslai", label: "# mokslai" }],
    "3a": [{ id: "3a-pagrindinis", label: "# pagrindinis" }, { id: "3a-isvyka", label: "# išvyka" }],
    robotics: [{ id: "robotics-pagrindinis", label: "# pagrindinis" }, { id: "robotics-projektai", label: "# projektai" }],
    "anonymous-school": [{ id: "anonymous-school-pagrindinis", label: "# pagrindinis" }],
  });
  const [activeTopic, setActiveTopic] = useState(`${initialConversationId || messageConversations[0].id}-pagrindinis`);
  const [roomMessages, setRoomMessages] = useState({});
  const [newTopic, setNewTopic] = useState("");
  const [showTopicForm, setShowTopicForm] = useState(false);
  const [profileConversation, setProfileConversation] = useState(null);
  const selectedConversation = conversations.find((conversation) => conversation.id === selectedId) || conversations[0];
  const matchesFilter = (conversation) => {
    if (filter === "Visi") return true;
    if (filter === "Grupės") return conversation.type === "Grupė";
    if (filter === "Pamokos") return conversation.type === "Pamoka" || conversation.type === "Klasė";
    if (filter === "1v1") return conversation.type === "Asmeninis";
    return conversation.type === "Anoniminis";
  };
  const visibleConversations = conversations.filter((conversation) => matchesFilter(conversation) && `${conversation.name} ${conversation.username || ""} ${conversation.preview}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  const peopleToStart = messagePeople.filter((person) => !conversations.some((conversation) => conversation.id === person.id) && `${person.name} ${person.username}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  const canCreateGroup = filter === "Visi" || filter === "Grupės" || filter === "Pamokos";

  const selectedTopics = topics[selectedConversation.id] || [{ id: `${selectedConversation.id}-pagrindinis`, label: "# pagrindinis" }];

  const activeRoom = selectedTopics.find((topic) => topic.id === activeTopic && topic.label !== "# pagrindinis");
  const displayedMessages = activeRoom ? (roomMessages[activeRoom.id] || []) : selectedConversation.messages;

  const createTopic = (event) => {
    event.preventDefault();
    const label = newTopic.trim().replace(/^#\s*/, "");
    if (!label) return;
    const id = `${selectedConversation.id}-${label.toLocaleLowerCase().replace(/\s+/g, "-")}`;
    if (selectedTopics.some((topic) => topic.id === id)) return;
    setTopics((current) => ({ ...current, [selectedConversation.id]: [...(current[selectedConversation.id] || []), { id, label: `# ${label}` }] }));
    setActiveTopic(id);
    setNewTopic("");
    setShowTopicForm(false);
  };
  const openRoom = (topicId) => {
    setActiveTopic(topicId);
  };
  const sendMessage = (event) => {
    event.preventDefault();
    const text = composer.trim();
    if (!text) return;
    if (activeRoom) {
      setRoomMessages((current) => ({ ...current, [activeRoom.id]: [...(current[activeRoom.id] || []), { from: "me", text, time: "ką tik" }] }));
    } else {
      setConversations((current) => current.map((conversation) => conversation.id === selectedId ? { ...conversation, preview: text, time: "ką tik", messages: [...conversation.messages, { from: "me", text, time: "ką tik" }] } : conversation));
    }
    setComposer("");
  };

  const createGroup = (event) => {
    event.preventDefault();
    const name = groupName.trim();
    const description = groupDescription.trim();
    if (!name || !description) return;
    const id = `group-${Date.now()}`;
    setConversations((current) => [{ id, name, type: groupType, description, preview: "Grupė sukurta", time: "dabar", avatar: "GR", messages: [] }, ...current]);
    setTopics((current) => ({ ...current, [id]: [{ id: `${id}-pagrindinis`, label: "# pagrindinis" }] }));
    setSelectedId(id);
    setActiveTopic(`${id}-pagrindinis`);
    setGroupName("");
    setGroupDescription("");
    setGroupType("Grupė");
    setShowGroupPage(false);
    setShowNewMessage(false);
  };
  const startConversation = (person) => {
    const existing = conversations.find((conversation) => conversation.id === person.id);
    if (!existing) setConversations((current) => [{ id: person.id, name: person.name, username: person.username.replace("@", ""), type: "Asmeninis", preview: "Naujas pokalbis", time: "dabar", avatar: person.name.split(" ").map((part) => part[0]).join(""), messages: [] }, ...current]);
    setSelectedId(person.id);
    setActiveTopic(`${person.id}-pagrindinis`);
    setShowNewMessage(false);
  };

  if (showGroupPage) return <section className="messages-app messages-app--profile"><div className="profile-page group-create-page"><button className="profile-back" type="button" onClick={() => setShowGroupPage(false)}>← Grįžti į pokalbius</button><h1>Sukurti grupę</h1><p className="profile-username">Sukurk erdvę bendram mokinių pokalbiui.</p><form className="group-create-form" onSubmit={createGroup}><label>Grupės pavadinimas<input autoFocus value={groupName} onChange={(event) => setGroupName(event.target.value)} placeholder="Pvz. 3A klasė" required /></label><label>Aprašymas<textarea value={groupDescription} onChange={(event) => setGroupDescription(event.target.value)} placeholder="Kam skirta ši grupė?" rows="4" required /></label><label>Grupės tipas<select value={groupType} onChange={(event) => setGroupType(event.target.value)}><option value="Grupė">Grupė</option><option value="Pamoka">Pamoka</option></select></label><button className="primary-action" type="submit"><Plus /> Sukurti grupę</button></form></div></section>;

  if (profileConversation) return <section className="messages-app messages-app--profile"><div className="profile-page"><button className="profile-back" type="button" onClick={() => setProfileConversation(null)}>← Grįžti į pokalbį</button><div className={`profile-avatar message-avatar ${profileConversation.anonymous ? "message-avatar--anonymous" : ""}`}>{profileConversation.anonymous ? <ShieldQuestion /> : profileConversation.avatar}</div><h1>{profileConversation.name}</h1>{profileConversation.username && <p className="profile-username">@{profileConversation.username.replace(/^@/, "")}</p>}<div className="profile-details"><div><span>Tipas</span><strong>{profileConversation.type === "Asmeninis" ? "1v1 pokalbis" : profileConversation.type}</strong></div><div><span>Pokalbio istorija</span><strong>{profileConversation.messages.length} žinutės</strong></div></div>{profileConversation.type === "Grupė" || profileConversation.type === "Klasė" || profileConversation.type === "Pamoka" ? <div className="profile-card"><h2>Apie grupę</h2><p>Ši erdvė skirta bendram pokalbiui ir mokyklos bendruomenei.</p></div> : <div className="profile-card"><h2>Apie žmogų</h2><p>Šis profilis priklauso pokalbio dalyviui.</p></div>}</div></section>;

  return <section className="messages-app">
    <aside className="messages-sidebar">
      <label className="messages-search"><Search aria-hidden="true" /><span className="search-divider" aria-hidden="true" /><span className="sr-only">Paieška</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Paieška" /></label>
      <div className="messages-actions-row"><div className="message-create-row">{canCreateGroup && <button className="icon-action message-create-group" type="button" aria-label="Sukurti grupę" onClick={() => setShowGroupPage(true)}><Plus /></button>}</div><div className="message-filter-wrap"><button className="message-filter-toggle" type="button" aria-label="Filtras"><SlidersHorizontal /> <span>Filtras</span><ChevronDown className="message-filter-chevron" /></button><div className="message-filter-sheet">{["Visi", "Grupės", "Pamokos", "1v1", "Anoniminiai"].map((item) => <button className={filter === item ? "message-filter--active" : ""} type="button" key={item} onClick={() => setFilter(item)}>{item}</button>)}</div></div></div>
      {showNewMessage && <div className="new-message-panel"><strong>Rasti žmogų</strong>{peopleToStart.map((person) => <button className="person-result" type="button" key={person.id} onClick={() => startConversation(person)}><span className="message-avatar">{person.name.split(" ").map((part) => part[0]).join("")}</span><span><strong>{person.name}</strong><small>{person.username} · {person.detail}</small></span></button>)}</div>}
      <div className="conversation-list">{visibleConversations.map((conversation) => <button className={`conversation-row ${conversation.id === selectedId ? "conversation-row--active" : ""}`} type="button" key={conversation.id} onClick={() => { setSelectedId(conversation.id); setActiveTopic(`${conversation.id}-pagrindinis`); }}><span className={`message-avatar ${conversation.anonymous ? "message-avatar--anonymous" : ""}`}>{conversation.anonymous ? <ShieldQuestion /> : conversation.avatar}</span><span className="conversation-copy"><strong>{conversation.name}</strong></span><time>{conversation.time}</time></button>)}{query && peopleToStart.map((person) => <button className="conversation-row conversation-row--new" type="button" key={`new-${person.id}`} onClick={() => startConversation(person)}><span className="message-avatar">{person.name.split(" ").map((part) => part[0]).join("")}</span><span className="conversation-copy"><strong>{person.name}</strong><small>{person.username} · Naujas pokalbis</small></span></button>)}{visibleConversations.length === 0 && peopleToStart.length === 0 && <p className="messages-empty">Pokalbių ar žmonių nerasta.</p>}</div>
    </aside>
    <section className="conversation-view"><header className="conversation-header"><div className="conversation-heading"><span className={`message-avatar ${selectedConversation.anonymous ? "message-avatar--anonymous" : ""}`}>{selectedConversation.anonymous ? <ShieldQuestion /> : selectedConversation.avatar}</span><div><h2>{activeRoom ? `${selectedConversation.name} · ${activeRoom.label}` : selectedConversation.name}</h2>{selectedConversation.username && <small>@{selectedConversation.username.replace(/^@/, "")}</small>}</div></div></header><div className="message-history">{displayedMessages.map((message, index) => <div className={`chat-bubble-row chat-bubble-row--${message.from}`} key={`${message.time}-${index}`}><div className="chat-bubble"><p>{message.text}</p><time>{message.time}</time></div></div>)}{displayedMessages.length === 0 && <p className="messages-empty">Pradėk šį pokalbį parašydamas pirmą žinutę.</p>}</div><form className="message-composer" onSubmit={sendMessage}><textarea value={composer} onChange={(event) => setComposer(event.target.value)} placeholder="Parašyk žinutę..." rows="1" aria-label="Žinutė" /><button className="primary-action" type="submit" disabled={!composer.trim()}><Send /> Siųsti</button></form></section>
    <aside className="message-rooms"><div className="message-topics-heading"><strong># Kambariai</strong><button type="button" aria-label="Sukurti kambarį" onClick={() => setShowTopicForm((current) => !current)}><Plus /></button></div>{showTopicForm && <form className="new-topic-popover" onSubmit={createTopic}><input autoFocus value={newTopic} onChange={(event) => setNewTopic(event.target.value)} placeholder="# kambario pavadinimas" aria-label="Kambario pavadinimas" /><button type="submit" aria-label="Išsaugoti kambarį"><Plus /></button></form>}<div className="message-topic-list">{selectedTopics.map((topic) => <button className={`message-topic ${activeTopic === topic.id ? "message-topic--active" : ""}`} type="button" key={topic.id} onClick={() => openRoom(topic.id)}>{topic.label}</button>)}{selectedTopics.length === 0 && <p className="message-topics-empty">Kambarių dar nėra.</p>}</div></aside>
  </section>;
}
function PageContent({ activePage, onOpenMessages }) {
  const page = pageContent[activePage];
  const [messageStartId, setMessageStartId] = useState(null);
  const [selectedForum, setSelectedForum] = useState(null);
  const [forumQuery, setForumQuery] = useState("");
  const [newPost, setNewPost] = useState("");
  const [recentForumTitle, setRecentForumTitle] = useState(() => localStorage.getItem("zibekim-recent-forum") || "");
  const [forumTopicsList, setForumTopicsList] = useState(forumTopics);
  const [savedTopics, setSavedTopics] = useState(() => JSON.parse(localStorage.getItem("zibekim-saved-topics") || "[]"));
  const [showAddTopic, setShowAddTopic] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicDescription, setNewTopicDescription] = useState("");
  const [newTopicCategory, setNewTopicCategory] = useState("Bendruomenė");
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

  const startAnonymousConversation = () => {
    setMessageStartId("anonymous-school");
    onOpenMessages();
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

  const toggleSavedTopic = (title) => {
    setSavedTopics((current) => {
      const next = current.includes(title) ? current.filter((item) => item !== title) : [...current, title];
      localStorage.setItem("zibekim-saved-topics", JSON.stringify(next));
      return next;
    });
  };

  const addTopic = (event) => {
    event.preventDefault();
    const title = newTopicTitle.trim();
    const description = newTopicDescription.trim();
    if (!title || !description) return;
    const topic = { title, description, comments: 0, time: "ką tik", category: newTopicCategory, posts: [] };
    setForumTopicsList((current) => [topic, ...current]);
    setForumPosts((current) => ({ ...current, [title]: [] }));
    setNewTopicTitle("");
    setNewTopicDescription("");
    setNewTopicCategory("Bendruomenė");
    setShowAddTopic(false);
  };

  if (activePage === "Pagrindinis") {
    return (
      <main className="content-area content-area--home">
        <section className="home-landing" aria-labelledby="home-landing-title">
          <div className="home-photo-collage" aria-label="Žibėkim mokyklos bendruomenė">
            <img className="home-photo home-photo--main" src={`${import.meta.env.BASE_URL}home-gallery/main.jpg`} alt="Mokyklos bendruomenė susibūrusi lauke" />
            <img className="home-photo home-photo--two" src={`${import.meta.env.BASE_URL}home-gallery/photo-2.jpg`} alt="Mokyklos bendruomenė renginyje" />
            <img className="home-photo home-photo--three" src={`${import.meta.env.BASE_URL}home-gallery/photo-3.jpg`} alt="Mokyklos bendruomenė kartu" />
            <img className="home-photo home-photo--four" src={`${import.meta.env.BASE_URL}home-gallery/photo-4.jpg`} alt="Mokyklos bendruomenės veikla" />
            <img className="home-photo home-photo--five" src={`${import.meta.env.BASE_URL}home-gallery/photo-5.jpg`} alt="Mokinių kūrybinė veikla" />
            <img className="home-photo home-photo--six" src={`${import.meta.env.BASE_URL}home-gallery/photo-6.jpg`} alt="Mokinių bendras darbas" />
          </div>
          <div className="home-landing-copy">
            <h1 id="home-landing-title" className="home-landing-title" aria-label="ŽIBĖKIM">ŽIBĖKIM</h1>
            <p className="home-school-name">Vytauto Didžiojo universiteto Šakių „Žiburio“ gimnazija</p>
          </div>
          <span className="home-spark" aria-hidden="true">✦</span>
        </section>
      </main>
    );
  }

  const pageViews = {
    Žinutės: <MessagesView initialConversationId={messageStartId} />,
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
        <section className="forum-subpage-header"><h1>{selectedForum.title}</h1><p>{selectedForum.description}</p></section>
        <section className="discussion-list" aria-label={`Diskusija: ${selectedForum.title}`}>
          {(forumPosts[selectedForum.title] || []).map((post, index) => (
            <article className="discussion-post" key={`${post.username}-${index}`}><div className="post-avatar" aria-hidden="true"><UserRound /></div><div className="post-content"><div className="post-author"><strong>{post.name}</strong><span>@{post.username}</span><time>{post.time}</time></div><p>{post.text}</p><button className="post-message-action" type="button" onClick={startAnonymousConversation}><ShieldQuestion /> Parašyti anonimiškai</button></div></article>
          ))}
          {!(forumPosts[selectedForum.title] || []).length && <p className="forum-empty">Šioje temoje dar nėra įrašų.</p>}
        </section>
        <form className="new-post-form" onSubmit={publishPost}><div className="post-avatar post-avatar--current" aria-hidden="true"><UserRound /></div><div className="new-post-fields"><label htmlFor="new-forum-post">Rašyti kaip <strong>@GeltonpilveVarle</strong></label><textarea id="new-forum-post" value={newPost} onChange={(event) => setNewPost(event.target.value)} placeholder="Parašyk ką nors diskusijoje..." rows="3" /><div className="new-post-actions"><small>Būk pagarbus kitiems bendruomenės nariams.</small><button className="primary-action" type="submit" disabled={!newPost.trim()}><MessageCircle /> Siųsti</button></div></div></form>
      </main>
    ) : (
      <div className="forum-layout">
        <div className="forum-toolbar"><label className="forum-search"><Search aria-hidden="true" /><span className="sr-only">Ieškoti forumų temų</span><input value={forumQuery} onChange={(event) => setForumQuery(event.target.value)} placeholder="Ieškoti temų" /></label><button className="primary-action add-topic-button" type="button" onClick={() => setShowAddTopic((current) => !current)}><Plus /> Pridėti temą</button></div>
        {showAddTopic && <form className="add-topic-form" onSubmit={addTopic}><div className="add-topic-heading"><h2>Pridėti naują temą</h2><button type="button" aria-label="Uždaryti temos formą" onClick={() => setShowAddTopic(false)}>×</button></div><label htmlFor="topic-title">Temos pavadinimas</label><input id="topic-title" value={newTopicTitle} onChange={(event) => setNewTopicTitle(event.target.value)} placeholder="Pvz., Mokyklos renginiai" required /><label htmlFor="topic-description">Trumpas aprašymas</label><textarea id="topic-description" value={newTopicDescription} onChange={(event) => setNewTopicDescription(event.target.value)} placeholder="Apie ką bus ši diskusija?" rows="3" required /><label htmlFor="topic-category">Kategorija</label><select id="topic-category" value={newTopicCategory} onChange={(event) => setNewTopicCategory(event.target.value)}><option>Bendruomenė</option><option>Mokykla</option><option>Naujienos</option><option>Idėjos</option></select><button className="primary-action" type="submit"><Plus /> Sukurti temą</button></form>}
        <aside className="recent-forum" aria-label="Neseniai peržiūrėta"><span className="page-eyebrow">NESENIAI PERŽIŪRĖTA</span>{recentForumTitle ? <button type="button" onClick={() => openForum(forumTopicsList.find((forum) => forum.title === recentForumTitle) || forumTopicsList[0])}>{recentForumTitle} <ArrowUpRight /></button> : <span className="recent-forum-empty">Dar nieko neperžiūrėjai</span>}</aside>
        <div className="forum-columns"><section className="forum-list" aria-label="Forumų temos">{forumTopicsList.filter((forum) => `${forum.title} ${forum.description}`.toLocaleLowerCase().includes(forumQuery.toLocaleLowerCase())).map((forum) => <article className="forum-row" key={forum.title}><button className="forum-row-open" type="button" onClick={() => openForum(forum)}><span className="forum-row-copy"><strong>{forum.title}</strong><small>{forum.description}</small></span><span className="forum-row-meta"><span><MessageSquareText /> {forumPosts[forum.title]?.length || 0}</span><small>{forum.time}</small></span></button><button className={`forum-bookmark-button ${savedTopics.includes(forum.title) ? "forum-bookmark-button--saved" : ""}`} type="button" aria-label={savedTopics.includes(forum.title) ? `Pašalinti ${forum.title} iš išsaugotų` : `Išsaugoti ${forum.title}`} aria-pressed={savedTopics.includes(forum.title)} onClick={() => toggleSavedTopic(forum.title)}><Bookmark /></button></article>)}{forumTopicsList.filter((forum) => `${forum.title} ${forum.description}`.toLocaleLowerCase().includes(forumQuery.toLocaleLowerCase())).length === 0 && <p className="forum-empty">Temų pagal šią paiešką nerasta.</p>}</section><aside className="popular-topics"><div className="popular-heading"><h2>Populiariausios temos</h2><ArrowUpRight /></div>{[...forumTopicsList].sort((a, b) => (forumPosts[b.title]?.length || 0) - (forumPosts[a.title]?.length || 0)).slice(0, 3).map((forum) => <button type="button" key={forum.title} onClick={() => openForum(forum)}><span>{forum.title}</span><small>{forumPosts[forum.title]?.length || 0} komentarai</small></button>)}</aside></div>
      </div>
    ),
    Apklausos: (
      <div className="list-card"><div className="card-heading"><h2>Aktyvios apklausos</h2><ClipboardList /></div><div className="poll-card"><div><span className="tag">AKTYVI</span><h2>Kaip pagerinti mokyklos bendras erdves?</h2><p>Pasirink vieną variantą. Apklausa baigsis po 3 dienų.</p></div><div className="poll-options"><button type="button">Daugiau sėdimų vietų <span>42%</span></button><button type="button">Daugiau žalumos <span>31%</span></button><button type="button">Ramesnės zonos <span>27%</span></button></div></div></div>
    ),
  };

  return <main className={`content-area ${activePage === "Žinutės" ? "content-area--messages" : ""}`}>{activePage !== "Žinutės" && <section className={`page-intro ${activePage === "Forumai" ? "page-intro--forumai" : ""}`}><div><h1>{page.title}</h1>{page.description && <p>{page.description}</p>}</div>{activePage !== "Forumai" && <button className="primary-action" type="button"><Search /> Ieškoti</button>}</section>}{pageViews[activePage]}</main>;
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

      <PageContent activePage={activePage} onOpenMessages={() => setActivePage("Žinutės")} />
    </div>
  );
}

export default App;
