import { useEffect, useMemo, useState } from "react";
import { Check, Plus } from "lucide-react";
import { ideaCategories, ideaStages, ideaStatusLabels, problemCategories, problemStages, statusLabels } from "./data.js";
import { Avatar, BackButton, CategoryTile, EmptyState, Field, PhotoBanner, SearchField, Segmented, Sheet, StatusBadge, StatusTrack, Switch, VoteButton, VoteGoal, plural } from "./ui.jsx";

const splitQuery = "(min-width: 1100px)";

function useIsSplit() {
  const [isSplit, setIsSplit] = useState(() => window.matchMedia(splitQuery).matches);
  useEffect(() => {
    const media = window.matchMedia(splitQuery);
    const update = () => setIsSplit(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return isSplit;
}

/** Shared list + detail layout. On wide screens both columns show; otherwise the detail replaces the list. */
function SplitView({ list, detail, hasSelection }) {
  return (
    <div className={`split ${hasSelection ? "split--detail" : ""}`}>
      <div className="split-list">{list}</div>
      <div className="split-detail">{detail}</div>
    </div>
  );
}

function useSelection(items, isSplit, initialId) {
  const [selectedId, setSelectedId] = useState(initialId || null);
  const selected = items.find((item) => item.id === selectedId) || (isSplit ? items[0] : null) || null;
  useEffect(() => {
    if (!isSplit && selectedId) window.scrollTo({ top: 0 });
  }, [selectedId, isSplit]);
  return [selected, setSelectedId];
}

const matches = (item, query) => `${item.title} ${item.description} ${item.category}`.toLocaleLowerCase("lt").includes(query.trim().toLocaleLowerCase("lt"));

function ResponseCard({ response, pendingText }) {
  if (!response) return <div className="response response--pending"><p className="response-label">Atsakymo dar nėra</p><p>{pendingText}</p></div>;
  return (
    <div className="response">
      <p className="response-label">Atsakymas · {response.date}</p>
      <p className="response-text">{response.text}</p>
      <p className="response-from"><Avatar name={response.from} size="small" /><span><strong>{response.from}</strong> · {response.role}</span></p>
    </div>
  );
}

/* ───────────────────────── Problems ───────────────────────── */

export function ProblemsView({ problems, setProblems, initialId }) {
  const isSplit = useIsSplit();
  const [filter, setFilter] = useState(() => (problems.find((item) => item.id === initialId)?.status === "resolved" ? "resolved" : "open"));
  const [sort, setSort] = useState("support");
  const [query, setQuery] = useState("");
  const [composing, setComposing] = useState(false);

  const counts = {
    open: problems.filter((item) => item.status !== "resolved").length,
    resolved: problems.filter((item) => item.status === "resolved").length,
    mine: problems.filter((item) => item.supported || item.mine).length,
  };

  const visible = useMemo(() => {
    const filtered = problems.filter((item) => {
      if (filter === "open" && item.status === "resolved") return false;
      if (filter === "resolved" && item.status !== "resolved") return false;
      if (filter === "mine" && !(item.supported || item.mine)) return false;
      return matches(item, query);
    });
    return [...filtered].sort((a, b) => (sort === "support" ? b.supporters - a.supporters : a.rank - b.rank));
  }, [problems, filter, sort, query]);

  const [selected, setSelectedId] = useSelection(visible, isSplit, initialId);

  const toggleSupport = (id) => setProblems((current) => current.map((item) => (item.id === id ? { ...item, supported: !item.supported, supporters: item.supporters + (item.supported ? -1 : 1) } : item)));

  const addProblem = (draft) => {
    const id = `p-${Date.now()}`;
    setProblems((current) => [{ id, ...draft, author: draft.anonymous ? "Anonimiškai" : "Tu", created: "šiandien", updated: "ką tik", rank: 0, status: "submitted", supporters: 1, supported: true, mine: true, response: null, history: [{ status: "submitted", date: "šiandien" }] }, ...current.map((item) => ({ ...item, rank: item.rank + 1 }))]);
    setFilter("open");
    setQuery("");
    setSelectedId(id);
    setComposing(false);
  };

  const list = (
    <>
      <PhotoBanner photo="photo-6" position="50% 50%" title="Problemos" subtitle={`${counts.open} ${plural(counts.open, ["atvira", "atviros", "atvirų"])} · ${counts.resolved} ${plural(counts.resolved, ["išspręsta", "išspręstos", "išspręstų"])}`}>
        <button type="button" className="btn btn--on-photo" onClick={() => setComposing(true)}><Plus aria-hidden="true" />Pranešti</button>
      </PhotoBanner>
      <div className="list-tools">
        <SearchField value={query} onChange={setQuery} placeholder="Ieškoti problemų" label="Ieškoti problemų" />
        <div className="list-tools-row">
          <Segmented label="Rodyti" value={filter} onChange={setFilter} options={[{ value: "open", label: "Atviros", count: counts.open }, { value: "resolved", label: "Išspręstos", count: counts.resolved }, { value: "mine", label: "Palaikomos", count: counts.mine }]} />
          <label className="sort-select"><span className="sr-only">Rikiuoti</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="support">Daugiausia palaikymo</option><option value="recent">Naujausios</option></select></label>
        </div>
      </div>
      {visible.length ? (
        <ul className="rows" aria-label="Problemų sąrašas">
          {visible.map((item) => (
            <li key={item.id}>
              <button type="button" className={`row ${selected?.id === item.id ? "is-selected" : ""}`} aria-current={selected?.id === item.id && isSplit ? "true" : undefined} onClick={() => setSelectedId(item.id)}>
                <CategoryTile category={item.category} />
                <span className="row-main">
                  <span className="row-title">{item.title}</span>
                  <span className="row-meta">{item.location} · {item.updated}</span>
                </span>
                <span className="row-side">
                  <StatusBadge status={item.status} labels={statusLabels} />
                  <span className="row-count">{item.supporters} {plural(item.supporters, ["palaiko", "palaiko", "palaiko"])}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title={query ? "Nieko nerasta" : "Čia kol kas tuščia"} text={query ? `Nėra problemų, atitinkančių „${query}“.` : "Pastebėjai, kas mokykloje neveikia? Pranešk ir sek, kaip sprendžiama."}>
          {!query && <button type="button" className="btn btn--secondary" onClick={() => setComposing(true)}>Pranešti apie problemą</button>}
        </EmptyState>
      )}
    </>
  );

  const detail = selected ? (
    <article className="detail" aria-labelledby="problem-title">
      {!isSplit && <BackButton label="Problemos" onClick={() => setSelectedId(null)} />}
      <div className="detail-head">
        <span className="detail-kicker"><CategoryTile category={selected.category} /><StatusBadge status={selected.status} labels={statusLabels} /></span>
        <h2 id="problem-title" className="detail-title">{selected.title}</h2>
        <p className="detail-meta">{selected.category} · {selected.location}</p>
      </div>
      <StatusTrack stages={problemStages} status={selected.status} dates={Object.fromEntries(selected.history.map((step) => [step.status, step.date]))} />
      <p className="detail-body">{selected.description}</p>
      <div className="detail-action">
        <button type="button" className={`btn ${selected.supported ? "btn--secondary is-on" : "btn--primary"}`} aria-pressed={selected.supported} onClick={() => toggleSupport(selected.id)} disabled={selected.status === "resolved"}>
          {selected.supported && <Check aria-hidden="true" />}
          {selected.supported ? "Palaikai" : "Mane tai irgi liečia"}
        </button>
        <span className="detail-action-note">{selected.supporters} {plural(selected.supporters, ["mokinys", "mokiniai", "mokinių"])} {selected.status === "resolved" ? "palaikė" : "palaiko"}</span>
      </div>
      <section className="detail-section" aria-label="Mokyklos atsakymas">
        <h3 className="section-title">Mokyklos atsakymas</h3>
        <ResponseCard response={selected.response} pendingText="Pranešimą peržiūrės mokinių taryba per 3 darbo dienas." />
      </section>
      <section className="detail-section">
        <h3 className="section-title">Istorija</h3>
        <ol className="timeline">
          {[...selected.history].reverse().map((step) => (
            <li key={step.status}>
              <span className="timeline-date">{step.date}</span>
              <span><strong>{statusLabels[step.status]}</strong>{step.note && <> · {step.note}</>}</span>
            </li>
          ))}
        </ol>
        <p className="detail-footnote">Pranešė {selected.author === "Anonimiškai" ? "anonimiškai" : selected.author}, {selected.created}</p>
      </section>
    </article>
  ) : (
    <EmptyState title="Pasirink problemą" text="Čia matysi jos eigą ir mokyklos atsakymą." />
  );

  return (
    <>
      <SplitView list={list} detail={detail} hasSelection={Boolean(selected) && !isSplit} />
      {composing && <ProblemSheet onClose={() => setComposing(false)} onSubmit={addProblem} />}
    </>
  );
}

function ProblemSheet({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState(problemCategories[0]);
  const [anonymous, setAnonymous] = useState(false);
  const canSubmit = title.trim().length >= 5 && description.trim().length >= 10;
  return (
    <Sheet title="Nauja problema" submitLabel="Pateikti" canSubmit={canSubmit} onClose={onClose} onSubmit={() => onSubmit({ title: title.trim(), description: description.trim(), location: location.trim() || "Nenurodyta", category, anonymous })}>
      <Field label="Kas negerai?" counter={`${title.length}/80`}>
        <input autoFocus maxLength={80} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Pvz. Neveikia apšvietimas koridoriuje" />
      </Field>
      <Field label="Aprašymas" hint="Kada pastebėjai, kaip tai trukdo mokiniams.">
        <textarea rows={4} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Trumpai papasakok, kas vyksta" />
      </Field>
      <Field label="Vieta">
        <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Pvz. 2 aukštas, prie 214 kabineto" />
      </Field>
      <fieldset className="field">
        <legend className="field-label">Kategorija</legend>
        <div className="chips">
          {problemCategories.map((item) => <button key={item} type="button" className="chip" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
      </fieldset>
      <div className="grouped">
        <Switch label="Pranešti anonimiškai" detail="Kiti mokiniai nematys tavo vardo. Moderatoriai matys." checked={anonymous} onChange={setAnonymous} />
      </div>
    </Sheet>
  );
}

/* ───────────────────────── Ideas ───────────────────────── */

export function IdeasView({ ideas, setIdeas, initialId }) {
  const isSplit = useIsSplit();
  const [filter, setFilter] = useState(() => { const item = ideas.find((idea) => idea.id === initialId); return item && item.status !== "submitted" && item.status !== "review" ? "decided" : "voting"; });
  const [sort, setSort] = useState("votes");
  const [query, setQuery] = useState("");
  const [composing, setComposing] = useState(false);
  const [comment, setComment] = useState("");

  const isVoting = (item) => item.status === "submitted" || item.status === "review";
  const counts = {
    voting: ideas.filter(isVoting).length,
    decided: ideas.filter((item) => !isVoting(item)).length,
  };

  const visible = useMemo(() => {
    const filtered = ideas.filter((item) => (filter === "voting" ? isVoting(item) : !isVoting(item)) && matches(item, query));
    return [...filtered].sort((a, b) => (sort === "votes" ? b.votes - a.votes : a.rank - b.rank));
  }, [ideas, filter, sort, query]);

  const [selected, setSelectedId] = useSelection(visible, isSplit, initialId);

  const toggleVote = (id) => setIdeas((current) => current.map((item) => (item.id === id ? { ...item, voted: !item.voted, votes: item.votes + (item.voted ? -1 : 1) } : item)));

  const addIdea = (draft) => {
    const id = `i-${Date.now()}`;
    setIdeas((current) => [{ id, ...draft, author: "Tu", created: "šiandien", updated: "ką tik", rank: 0, status: "submitted", votes: 1, voted: true, mine: true, response: null, comments: [] }, ...current.map((item) => ({ ...item, rank: item.rank + 1 }))]);
    setFilter("voting");
    setQuery("");
    setSelectedId(id);
    setComposing(false);
  };

  const addComment = (event) => {
    event.preventDefault();
    const text = comment.trim();
    if (!text || !selected) return;
    setIdeas((current) => current.map((item) => (item.id === selected.id ? { ...item, comments: [...item.comments, { name: "Tu", text, time: "ką tik" }] } : item)));
    setComment("");
  };

  const list = (
    <>
      <PhotoBanner photo="photo-5" position="50% 50%" title="Idėjos" subtitle={`${counts.voting} ${plural(counts.voting, ["laukia", "laukia", "laukia"])} balsų · ${counts.decided} ${plural(counts.decided, ["sprendimas", "sprendimai", "sprendimų"])}`}>
        <button type="button" className="btn btn--on-photo" onClick={() => setComposing(true)}><Plus aria-hidden="true" />Siūlyti</button>
      </PhotoBanner>
      <div className="list-tools">
        <SearchField value={query} onChange={setQuery} placeholder="Ieškoti idėjų" label="Ieškoti idėjų" />
        <div className="list-tools-row">
          <Segmented label="Rodyti" value={filter} onChange={setFilter} options={[{ value: "voting", label: "Balsavimas", count: counts.voting }, { value: "decided", label: "Sprendimai", count: counts.decided }]} />
          <label className="sort-select"><span className="sr-only">Rikiuoti</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="votes">Daugiausia balsų</option><option value="recent">Naujausios</option></select></label>
        </div>
      </div>
      {visible.length ? (
        <ul className="rows" aria-label="Idėjų sąrašas">
          {visible.map((item) => (
            <li key={item.id} className="row-with-vote">
              {isVoting(item) ? <VoteButton voted={item.voted} votes={item.votes} title={item.title} onToggle={() => toggleVote(item.id)} /> : <span className="vote vote--static" aria-hidden="true"><span>{item.votes}</span></span>}
              <button type="button" className={`row ${selected?.id === item.id ? "is-selected" : ""}`} aria-current={selected?.id === item.id && isSplit ? "true" : undefined} onClick={() => setSelectedId(item.id)}>
                <span className="row-main">
                  <span className="row-title">{item.title}</span>
                  <span className="row-meta">{item.category} · {item.author} · {item.updated}</span>
                  {isVoting(item) && <VoteGoal votes={item.votes} />}
                </span>
                {!isVoting(item) && <span className="row-side"><StatusBadge status={item.status} labels={ideaStatusLabels} /></span>}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title={query ? "Nieko nerasta" : "Kol kas idėjų nėra"} text={query ? `Nėra idėjų, atitinkančių „${query}“.` : "Pasiūlyk, ką būtų verta pakeisti mokykloje."}>
          {!query && <button type="button" className="btn btn--secondary" onClick={() => setComposing(true)}>Siūlyti idėją</button>}
        </EmptyState>
      )}
    </>
  );

  const detail = selected ? (
    <article className="detail" aria-labelledby="idea-title">
      {!isSplit && <BackButton label="Idėjos" onClick={() => setSelectedId(null)} />}
      <div className="detail-head">
        <span className="detail-kicker"><CategoryTile category={selected.category} /><StatusBadge status={selected.status} labels={ideaStatusLabels} /></span>
        <h2 id="idea-title" className="detail-title">{selected.title}</h2>
        <p className="detail-meta">{selected.category} · siūlo {selected.author}, {selected.created}</p>
      </div>
      {selected.status !== "declined" && <StatusTrack stages={ideaStages} status={selected.status} />}
      <p className="detail-body">{selected.description}</p>
      {selected.benefit && (
        <div className="callout">
          <p className="callout-label">Kuo tai padės</p>
          <p>{selected.benefit}</p>
        </div>
      )}
      <div className="detail-action">
        {isVoting(selected) ? (
          <button type="button" className={`btn ${selected.voted ? "btn--secondary is-on" : "btn--primary"}`} aria-pressed={selected.voted} onClick={() => toggleVote(selected.id)}>
            {selected.voted && <Check aria-hidden="true" />}
            {selected.voted ? "Balsavai" : "Balsuoti"}
          </button>
        ) : null}
        <span className="detail-action-note"><strong>{selected.votes}</strong> {plural(selected.votes, ["balsas", "balsai", "balsų"])}{isVoting(selected) && selected.votes < 50 ? ` · taryba svarsto nuo 50` : ""}</span>
      </div>
      <section className="detail-section">
        <h3 className="section-title">Sprendimas</h3>
        <ResponseCard response={selected.response} pendingText="Idėjos, surinkusios 50 balsų, svarstomos artimiausiame mokinių tarybos posėdyje." />
      </section>
      <section className="detail-section">
        <h3 className="section-title">Komentarai <span className="section-count">{selected.comments.length}</span></h3>
        {selected.comments.length ? (
          <ul className="comments">
            {selected.comments.map((item, index) => (
              <li key={`${item.name}-${index}`}><Avatar name={item.name} size="small" /><div><p className="comment-head"><strong>{item.name}</strong> · {item.time}</p><p>{item.text}</p></div></li>
            ))}
          </ul>
        ) : <p className="muted">Dar niekas nekomentavo.</p>}
        <form className="inline-composer" onSubmit={addComment}>
          <label className="sr-only" htmlFor="idea-comment">Komentaras</label>
          <input id="idea-comment" value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Parašyk komentarą" />
          <button type="submit" className="btn btn--secondary" disabled={!comment.trim()}>Skelbti</button>
        </form>
      </section>
    </article>
  ) : (
    <EmptyState title="Pasirink idėją" text="Čia matysi jos aprašymą, balsus ir sprendimą." />
  );

  return (
    <>
      <SplitView list={list} detail={detail} hasSelection={Boolean(selected) && !isSplit} />
      {composing && <IdeaSheet onClose={() => setComposing(false)} onSubmit={addIdea} />}
    </>
  );
}

function IdeaSheet({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [benefit, setBenefit] = useState("");
  const [category, setCategory] = useState(ideaCategories[0]);
  const canSubmit = title.trim().length >= 5 && description.trim().length >= 10;
  return (
    <Sheet title="Nauja idėja" submitLabel="Siūlyti" canSubmit={canSubmit} onClose={onClose} onSubmit={() => onSubmit({ title: title.trim(), description: description.trim(), benefit: benefit.trim(), category })}>
      <Field label="Idėja" counter={`${title.length}/80`}>
        <input autoFocus maxLength={80} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Pvz. Knygų mainų lentyna" />
      </Field>
      <Field label="Ką tiksliai siūlai?">
        <textarea rows={4} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Kur, kaip ir ką reikėtų padaryti" />
      </Field>
      <Field label="Kuo tai padės?" hint="Neprivaloma, bet padeda surinkti balsų.">
        <textarea rows={2} value={benefit} onChange={(event) => setBenefit(event.target.value)} placeholder="Kam ir kaip pagerės" />
      </Field>
      <fieldset className="field">
        <legend className="field-label">Kategorija</legend>
        <div className="chips">
          {ideaCategories.map((item) => <button key={item} type="button" className="chip" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
      </fieldset>
    </Sheet>
  );
}
