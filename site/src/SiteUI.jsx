export function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export function ExternalLink({ href, children, className = "" }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>;
}

export function PageTitle({ children, description, eyebrow }) {
  return (
    <div className="page-title">
      <div className="section-shell">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{children}</h1>
        {description && <p className="page-description">{description}</p>}
      </div>
    </div>
  );
}

export function Placeholder({ field }) {
  return <span className="content-placeholder">[Lack of information of {field}]</span>;
}

export function PublicationEntry({ publication }) {
  return (
    <article className="publication-entry">
      <div>
        <h3><ExternalLink href={publication.doi}>{publication.title} <Arrow diagonal /></ExternalLink></h3>
        <p className="publication-details">{publication.citation || `${publication.authors} ${publication.details}`}</p>
      </div>
      <span className="publication-year">{publication.year}</span>
    </article>
  );
}
