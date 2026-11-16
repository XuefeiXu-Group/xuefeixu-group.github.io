import { Link } from "react-router-dom";
import { courses, linkGroups, publications, software, tutorials } from "./data.js";
import { researchAreas, researchIntro } from "./research.js";
import { Arrow, ExternalLink, PageTitle, Placeholder, PublicationEntry } from "./SiteUI.jsx";

function ResearchHighlights({ works }) {
  return (
    <section className="research-highlights">
      <h3>Recent work</h3>
      <div className="research-highlights-grid">
        {works.map(work => (
          <article className="research-highlight" key={work.doi}>
            <p className="research-highlight-source">{work.source}</p>
            <h4>{work.title}</h4>
            <p>{work.summary}</p>
            <ExternalLink className="text-link" href={work.doi}>Read the paper <Arrow diagonal /></ExternalLink>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ResearchPage() {
  return (
    <main id="main-content">
      <PageTitle description={researchIntro}>
        Research directions
      </PageTitle>
      <div className="section-shell page-content research-directions">
        {researchAreas.map((area, index) => (
          <section className="research-direction" id={`direction-${index + 1}`} key={area.title}>
            <div className="research-direction-intro">
              <div className="research-direction-copy">
                <span className="research-category">{area.label}</span>
                <h2>{area.title}</h2>
                <p>{area.description}</p>
                <p>{area.overview}</p>
              </div>
              <figure className="research-figure">
                <ExternalLink className="research-figure-image" href={area.figure.image}>
                  <img src={area.figure.image} alt={area.figure.alt} width={area.figure.width} height={area.figure.height} loading="lazy" />
                </ExternalLink>
                <figcaption>
                  {area.figure.caption}
                  <ExternalLink className="research-figure-credit" href={area.figure.doi}>{area.figure.credit} <Arrow diagonal /></ExternalLink>
                </figcaption>
              </figure>
            </div>
            <ResearchHighlights works={area.recentWork} />
          </section>
        ))}
        <aside className="research-software-note">
          <div>
            <h2>Computational methods & software</h2>
            <p>Polyrate calculates elementary reaction rates, MSTor accounts for torsional anharmonicity, and TUMME models pressure-dependent reaction networks.</p>
          </div>
          <Link className="text-link" to="/software">Explore software <Arrow /></Link>
        </aside>
      </div>
    </main>
  );
}

function SoftwareDetails({ heading, entries }) {
  return (
    <section className="software-detail">
      <h3>{heading}</h3>
      <ul className="plain-list">{entries.map(entry => <li key={entry}>{entry}</li>)}</ul>
    </section>
  );
}

export function SoftwarePage() {
  return (
    <main id="main-content">
      <PageTitle description="Programs we co-develop for elementary reaction rates, pressure-dependent kinetics, and the thermochemistry of flexible molecules.">
        Scientific software
      </PageTitle>
      <div className="section-shell page-content software-programs">
        {software.map(item => {
          const papers = item.relatedPapers.map(doi => publications.find(paper => paper.doi === doi)).filter(Boolean);
          return (
            <article className="software-program" id={item.title.toLowerCase()} key={item.title}>
              <header className="software-program-header">
                <h2>{item.title}</h2>
                <div className="software-program-links">
                  <ExternalLink className="text-link" href={item.href}>Project website <Arrow diagonal /></ExternalLink>
                  <ExternalLink className="text-link" href={item.release}>2023 release <Arrow diagonal /></ExternalLink>
                </div>
              </header>
              <section className="software-overview">
                <h3>Overview</h3>
                <div>
                  <p>{item.description}</p>
                  <p>{item.overview}</p>
                </div>
              </section>
              <div className="software-detail-grid">
                <SoftwareDetails heading="Core features" entries={item.features} />
                <SoftwareDetails heading="Advantages" entries={item.advantages} />
              </div>
              <section className="software-papers">
                <h3>Related publications</h3>
                <div className="publication-stack">{papers.map(paper => <PublicationEntry key={paper.doi} publication={paper} />)}</div>
              </section>
            </article>
          );
        })}
      </div>
    </main>
  );
}

export function LinksPage() {
  return (
    <main id="main-content">
      <PageTitle description="Find Tsinghua resources, chemistry journals and databases, and information on courses taught by Xuefei Xu.">
        Resources & links
      </PageTitle>
      <div className="section-shell page-content">
        <Link className="text-link resources-teaching-link" to="#teaching">Courses & tutorials <span aria-hidden="true">↓</span></Link>
        <div className="resource-groups">
          {linkGroups.map(group => (
            <section key={group.title} className="resource-group">
              <h2>{group.title}</h2>
              <div className="link-list">
                {group.links.map(link => (
                  <ExternalLink key={link.href} href={link.href}>{link.label} <Arrow diagonal /></ExternalLink>
                ))}
              </div>
            </section>
          ))}
        </div>
        <section id="teaching" className="teaching-resources">
          <h2>Courses & tutorials</h2>
          <div className="resource-list">
            {courses.map(course => (
              <article key={course.title}>
                <div><h3>{course.title}</h3><p>{course.detail}</p></div>
              </article>
            ))}
            {tutorials.map(item => (
              <article key={item.title} id="tutorials">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><Placeholder field="available tutorials and computational chemistry notes" /></p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
