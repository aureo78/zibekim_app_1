import { useEffect, useId, useRef } from "react";
import { BookOpen, Building2, ChevronLeft, ChevronUp, ConciergeBell, Cpu, Flag, Globe, Leaf, PartyPopper, School, Search, ShieldCheck, Sofa, Sparkles, X } from "lucide-react";
import { categoryMeta } from "./data.js";

const icons = { BookOpen, Building2, ConciergeBell, Cpu, Flag, Globe, Leaf, PartyPopper, School, ShieldCheck, Sofa, Sparkles };

/** Lithuanian plural: plural(3, ["balsas", "balsai", "balsų"]) → "balsai" */
// eslint-disable-next-line react-refresh/only-export-components
export function plural(n, [one, few, many]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

/** Responsive school photo from /public/home-gallery (720px and 1600px versions). */
// eslint-disable-next-line react-refresh/only-export-components
export function photoSet(name) {
  const base = `${import.meta.env.BASE_URL}home-gallery/${name}`;
  return { src: `${base}-l.jpg`, srcSet: `${base}-s.jpg 720w, ${base}-l.jpg 1600w` };
}

export function Photo({ name, alt = "", sizes = "100vw", className = "", position, eager = false }) {
  return <img className={className} {...photoSet(name)} sizes={sizes} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" style={position ? { objectPosition: position } : undefined} />;
}

/** Page header on top of a school photo. Title stays readable thanks to a dark gradient. */
export function PhotoBanner({ photo, position, title, subtitle, children }) {
  return (
    <header className="photo-banner">
      <Photo name={photo} position={position} className="photo-banner-img" sizes="(min-width: 769px) 1100px, 100vw" eager />
      <div className="photo-banner-content">
        <div className="page-header-text">
          <h1 className="large-title">{title}</h1>
          {subtitle && <p className="photo-banner-subtitle">{subtitle}</p>}
        </div>
        {children && <div className="page-actions">{children}</div>}
      </div>
    </header>
  );
}

const avatarHues = ["berry", "amber", "teal", "blue", "violet", "green"];
// eslint-disable-next-line react-refresh/only-export-components
export const initials = (name) => name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();

export function Avatar({ name, label, size = "", children }) {
  const hue = avatarHues[[...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % avatarHues.length];
  return <span className={`avatar avatar--${hue} ${size ? `avatar--${size}` : ""}`} aria-hidden="true">{children || label || initials(name)}</span>;
}

/** Coloured rounded icon tile, like iOS Settings: helps scan lists by category. */
export function IconTile({ icon, tone }) {
  const Icon = typeof icon === "string" ? icons[icon] || Sparkles : icon;
  return <span className={`icon-tile icon-tile--${tone}`} aria-hidden="true"><Icon /></span>;
}

export function CategoryTile({ category }) {
  const meta = categoryMeta[category] || categoryMeta.Kita;
  return <IconTile icon={meta.icon} tone={meta.tone} />;
}

/** Progress toward the 50-vote threshold at which the student council must discuss an idea. */
export function VoteGoal({ votes, goal = 50 }) {
  const reached = votes >= goal;
  return (
    <div className={`vote-goal ${reached ? "is-reached" : ""}`}>
      <span className="vote-goal-bar" aria-hidden="true"><span style={{ width: `${Math.min(100, (votes / goal) * 100)}%` }} /></span>
      <span className="vote-goal-text">{reached ? "Pasiekė tarybą" : `Dar ${goal - votes} iki tarybos`}</span>
    </div>
  );
}

export function PageHeader({ title, subtitle, children }) {
  return (
    <header className="page-header">
      <div className="page-header-text">
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
        <h1 className="large-title">{title}</h1>
      </div>
      {children && <div className="page-actions">{children}</div>}
    </header>
  );
}

export function StatusBadge({ status, labels }) {
  return (
    <span className={`badge badge--${status}`}>
      <span className="badge-dot" aria-hidden="true" />
      {labels[status]}
    </span>
  );
}

export function StatusTrack({ stages, status, dates = {}, compact = false }) {
  const current = stages.findIndex((stage) => stage.key === status);
  return (
    <ol className={`track track--${status} ${compact ? "track--compact" : ""}`} aria-label={`Eiga: ${stages[current]?.label}, ${current + 1} žingsnis iš ${stages.length}`}>
      {stages.map((stage, index) => (
        <li key={stage.key} className={index <= current ? "is-reached" : ""} aria-current={index === current ? "step" : undefined}>
          <span className="track-bar" aria-hidden="true" />
          {!compact && (
            <>
              <span className="track-label">{stage.label}</span>
              <span className="track-date">{dates[stage.key] || "\u00a0"}</span>
            </>
          )}
        </li>
      ))}
    </ol>
  );
}

export function Segmented({ label, options, value, onChange }) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((option) => (
        <button key={option.value} type="button" aria-pressed={value === option.value} onClick={() => onChange(option.value)}>
          {option.label}
          {option.count !== undefined && <span className="segmented-count">{option.count}</span>}
        </button>
      ))}
    </div>
  );
}

export function SearchField({ value, onChange, placeholder, label }) {
  return (
    <label className="search-field">
      <Search aria-hidden="true" />
      <span className="sr-only">{label}</span>
      <input type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
      {value && (
        <button type="button" className="search-clear" aria-label="Išvalyti paiešką" onClick={() => onChange("")}>
          <X aria-hidden="true" />
        </button>
      )}
    </label>
  );
}

export function BackButton({ label, onClick }) {
  return (
    <button type="button" className="back-button" onClick={onClick}>
      <ChevronLeft aria-hidden="true" />
      {label}
    </button>
  );
}

export function VoteButton({ voted, votes, title, onToggle, size = "regular" }) {
  return (
    <button
      type="button"
      className={`vote vote--${size} ${voted ? "is-voted" : ""}`}
      aria-pressed={voted}
      aria-label={`${voted ? "Atšaukti balsą už" : "Balsuoti už"} „${title}“. ${votes} ${plural(votes, ["balsas", "balsai", "balsų"])}`}
      onClick={onToggle}
    >
      <ChevronUp aria-hidden="true" />
      <span>{votes}</span>
    </button>
  );
}

export function EmptyState({ title, text, children }) {
  return (
    <div className="empty-state">
      <p className="empty-title">{title}</p>
      {text && <p className="empty-text">{text}</p>}
      {children}
    </div>
  );
}

/** Modal sheet built on <dialog>: native focus trap, Esc closes, backdrop click cancels. */
export function Sheet({ title, submitLabel, canSubmit, onSubmit, onClose, children }) {
  const ref = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
    document.documentElement.classList.add("sheet-open");
    return () => document.documentElement.classList.remove("sheet-open");
  }, []);

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => event.target === ref.current && onClose()}
    >
      <form
        className="sheet-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (canSubmit) onSubmit();
        }}
      >
        <span className="sheet-grabber" aria-hidden="true" />
        <header className="sheet-header">
          <button type="button" className="btn-plain" onClick={onClose}>Atšaukti</button>
          <h2 id={titleId}>{title}</h2>
          <button type="submit" className="btn-plain btn-plain--strong" disabled={!canSubmit}>{submitLabel}</button>
        </header>
        <div className="sheet-body">{children}</div>
      </form>
    </dialog>
  );
}

export function Field({ label, hint, counter, children }) {
  return (
    <label className="field">
      <span className="field-label">
        {label}
        {counter && <span className="field-counter">{counter}</span>}
      </span>
      {children}
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  );
}

export function Switch({ label, detail, checked, onChange }) {
  return (
    <label className="switch-row">
      <span className="switch-text">
        <span>{label}</span>
        {detail && <small>{detail}</small>}
      </span>
      <input type="checkbox" role="switch" className="switch" checked={checked} onChange={(event) => onChange(event.target.checked)} />
    </label>
  );
}
