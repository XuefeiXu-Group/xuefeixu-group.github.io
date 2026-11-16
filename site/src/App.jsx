import { useEffect, useState } from "react";
import { BrowserRouter, Link, Navigate, NavLink, Route, Routes, useLocation, useParams } from "react-router-dom";
import { members, profileLinks, publications } from "./data.js";
import { LinksPage, ResearchPage, SoftwarePage } from "./FrameworkPages.jsx";
import { NewsDetailPage, NewsPage } from "./NewsPage.jsx";
import { OrbitPaths } from "./OrbitPaths.jsx";
import { newsItems } from "./news.js";
import { researchAreas, researchIntro } from "./research.js";
import { allMembers, memberSlug, pageTitles } from "./siteRoutes.js";
import { Arrow, ExternalLink, PageTitle, Placeholder, PublicationEntry } from "./SiteUI.jsx";

const centerWebsite = "https://www.cce.tsinghua.edu.cn/en/";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = hash && document.getElementById(hash.slice(1));
      if (target) target.scrollIntoView({ behavior: "instant" });
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}

function DocumentTitle() {
  const pathname = useLocation().pathname.replace(/\/+$/, "") || "/";
  const member = findMemberBySlug(pathname.replace("/members/", ""));
  const detailTitle = member?.name || newsItems.find(item => pathname === `/news/${item.id}`)?.title;
  const title = pathname === "/" ? pageTitles["/"] : `${detailTitle || pageTitles[pathname] || "Page Not Found"} | Xuefei Xu's Group`;
  useEffect(() => { document.title = title; }, [title]);
  return null;
}

function GroupMark({ className = "" }) {
  return (
    <span className={`group-mark ${className}`} aria-hidden="true">
      <img src="/assets/logo/xu-group-logo-crop.jpg" alt="" width="1800" height="1800" />
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = event => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  const items = [
    ["/research", "Research"],
    ["/publications", "Publications"],
    ["/members", "People"],
    ["/software", "Software"],
    ["/news", "News"],
    ["/contact", "Contact"],
  ];
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="institution-bar">
        <div className="section-shell">
          <ExternalLink href="https://www.tsinghua.edu.cn/en/">Tsinghua University <Arrow diagonal /></ExternalLink>
          <ExternalLink href={centerWebsite}>Center for Combustion Energy <Arrow diagonal /></ExternalLink>
        </div>
      </div>
      <header className="site-header">
        <div className="section-shell header-inner">
          <div className="header-identity">
            <ExternalLink className="center-brand" href={centerWebsite}>
              <span className="center-mark">
                <img src="/assets/logo/cce-official-logo.png" alt="Center for Combustion Energy, Tsinghua University" />
              </span>
            </ExternalLink>
            <Link className="site-identity" to="/" aria-label="Xuefei Xu's Group home">
              <GroupMark />
              <span>
                <strong>Xuefei Xu’s Group</strong>
                <small>Theoretical & Computational Chemistry</small>
              </span>
            </Link>
          </div>
          <button className="menu-button" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(value => !value)}>
            {open ? "Close −" : "Menu +"}
          </button>
          <nav id="primary-navigation" className={`primary-navigation ${open ? "is-open" : ""}`} aria-label="Primary navigation">
            {items.map(([path, label]) => <NavLink key={path} to={path} onClick={() => setOpen(false)}>{label}</NavLink>)}
          </nav>
        </div>
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-shell">
        <div className="footer-main">
          <div className="footer-identity">
            <span className="eyebrow">Tsinghua University</span>
            <Link to="/">Xuefei Xu’s Group</Link>
            <p>Theoretical & Computational Chemistry</p>
          </div>
          <div>
            <h2>Explore</h2>
            <Link to="/research">Research</Link>
            <Link to="/publications">Publications</Link>
            <Link to="/members">People</Link>
            <Link to="/news">News</Link>
          </div>
          <div>
            <h2>Connect</h2>
            <Link to="/contact">Contact</Link>
            <Link to="/#join-us">Join the group</Link>
            <Link to="/links">Resources & links</Link>
          </div>
          <div className="footer-address">
            <h2>Find us</h2>
            <p>Room B551, Lee Shau Kee Technology Building<br />Tsinghua University<br />Beijing 100084, China</p>
            <a href="mailto:xuxuefei@tsinghua.edu.cn">xuxuefei@tsinghua.edu.cn</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Xuefei Xu’s Group</span>
          <ExternalLink href={centerWebsite}>Center for Combustion Energy <Arrow diagonal /></ExternalLink>
        </div>
      </div>
    </footer>
  );
}

function InlineLinks({ links }) {
  return <div className="inline-links">{links.map(link => <ExternalLink key={link.href} href={link.href}>{link.label} <Arrow diagonal /></ExternalLink>)}</div>;
}

function findMemberBySlug(slug) {
  return allMembers.find(person => memberSlug(person.name) === slug);
}

function ResearchOrbit() {
  const programs = [
    {
      id: "polyrate", name: "Polyrate", topic: "reaction-rate theory",
      image: "/assets/hero/research-orbits-restored.webp", crop: "-49.9%, -21.4%",
    },
    {
      id: "mstor", name: "MSTor", topic: "torsional anharmonicity",
      image: "/assets/hero/orbit-medallion-edits.webp", crop: "-22.1%, -69.3%",
    },
    {
      id: "tumme", name: "TUMME", topic: "energy-transfer kinetics",
      image: "/assets/hero/orbit-medallion-edits.webp", crop: "-77.3%, -69.3%",
    },
  ];

  return (
    <figure className="orbit-figure" aria-label="Three research programs orbiting the group emblem">
      <OrbitPaths />
      <GroupMark className="orbit-emblem" />
      {programs.map(program => (
        <Link
          className={`orbit-program orbit-program-${program.id}`}
          to={`/software#${program.id}`}
          aria-label={`${program.name}: ${program.topic}`}
          key={program.id}
        >
          <span className="orbit-medallion">
            <img
              className="orbit-medallion-art"
              src={program.image}
              alt=""
              style={{ "--orbit-crop": program.crop }}
              width="1254"
              height="1254"
            />
            {program.id === "mstor" && (
              <img className="orbit-butane" src="/assets/hero/butane-torsion.png" alt="" width="420" height="420" />
            )}
          </span>
        </Link>
      ))}
    </figure>
  );
}

function SectionHeading({ eyebrow, title, children, link, linkText }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {children && <p className="section-intro">{children}</p>}
      </div>
      {link && <Link className="text-link" to={link}>{linkText} <Arrow /></Link>}
    </div>
  );
}

function HomePage() {
  const latestStory = newsItems[0];
  const storyPath = `/news/${latestStory.id}`;
  const storyPhoto = latestStory.photos[0];

  return <main id="main-content">
    <section className="home-hero"><div className="section-shell hero-inner"><div className="hero-copy"><p className="eyebrow">Theoretical & Computational Chemistry</p><h1>Molecular insight.<br /><em>Chemical discovery.</em></h1><p className="hero-description">We calculate how fast molecules react and use simulations to study how catalysts and interfaces shape the outcome.</p><div className="hero-actions"><Link className="button button-light" to="/research">Explore our research <Arrow /></Link><Link className="hero-secondary" to="/publications">Our publications <Arrow /></Link></div></div><ResearchOrbit /></div><div className="section-shell hero-foot"><span>Xuefei Xu’s Research Group</span><span>Center for Combustion Energy · Tsinghua University</span></div></section>

    <section className="home-section section-shell" aria-labelledby="research-heading">
      <SectionHeading eyebrow="Our research" title={<span id="research-heading">Understanding reactions.<br />Exploring molecular complexity.</span>} link="/research" linkText="All research directions">
        {researchIntro}
      </SectionHeading>
      <div className="research-preview-grid">
        {researchAreas.map((area, index) => {
          const path = `/research#direction-${index + 1}`;
          return (
            <article className="research-preview" key={area.title}>
              <Link to={path} className="research-image-link" aria-label={area.title}>
                <img src={area.figure.image} alt={area.figure.alt} width={area.figure.width} height={area.figure.height} loading="lazy" />
              </Link>
              <div className="research-preview-body">
                <span className="research-category">{area.label}</span>
                <h3><Link to={path}>{area.title} <Arrow /></Link></h3>
                <p>{area.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>

    <section className="publications-band"><div className="section-shell home-section"><SectionHeading eyebrow="Recent work" title="Recent publications" link="/publications" linkText="Browse all publications">A selection of recent papers in reaction dynamics, molecular simulation, and interfacial chemistry.</SectionHeading><div className="publication-stack home-publications">{publications.filter(paper => paper.featured).slice(0, 3).map(paper => <PublicationEntry key={paper.doi} publication={paper} />)}</div></div></section>

    <section className="section-shell home-section home-news" aria-labelledby="home-news-heading">
      <Link className="home-news-image" to={storyPath} tabIndex={-1} aria-hidden="true">
        <img src={storyPhoto.src} alt={storyPhoto.alt} loading="lazy" />
      </Link>
      <div>
        <p className="eyebrow">Group news</p>
        <h2 id="home-news-heading"><Link to={storyPath}>{latestStory.title}</Link></h2>
        <p>{latestStory.summary}</p>
        <div className="home-news-actions">
          <Link className="button button-dark" to="/news">All news <Arrow /></Link>
          <Link className="button button-outline" to="/members">Meet the group <Arrow /></Link>
        </div>
      </div>
    </section>

    <section id="join-us" className="join-section"><div className="section-shell join-inner"><div><p className="eyebrow">Join the group</p><h2>Bring your questions.<br /><em>Explore with us.</em></h2></div><div><p>We welcome motivated graduate students and postdoctoral researchers interested in theoretical chemistry, molecular simulation, machine learning for atomistic modeling, enhanced sampling, and high-performance scientific computing.</p><p className="join-detail">Postdoctoral applicants: please send a CV, representative publications, and contact information for references.</p><a className="button button-dark" href="mailto:xuxuefei@tsinghua.edu.cn">Contact Xuefei Xu <Arrow diagonal /></a><ExternalLink className="join-program" href="https://postdoctor.tsinghua.edu.cn/info/zxtz/2097">Shuimu Scholar Program <Arrow diagonal /></ExternalLink></div></div></section>
  </main>;
}

function MemberPortrait({ person, decorative = false }) {
  if (/\/(boy|girl)\.png$/.test(person.image)) {
    return <div className="portrait-placeholder">{person.name.split(" ").map(word => word[0]).join("")}<small>Portrait forthcoming</small></div>;
  }
  return <img src={person.image} alt={decorative ? "" : person.name} loading={decorative ? "lazy" : undefined} style={{ objectPosition: person.portraitPosition }} />;
}

function MemberCard({ person }) {
  const path = `/members/${memberSlug(person.name)}`;
  const isPI = person.role === "Principal Investigator";
  return (
    <article className={`member-card${isPI ? " pi-card" : ""}`}>
      <Link className="member-portrait" to={path} tabIndex={-1} aria-hidden="true">
        <MemberPortrait person={person} decorative />
      </Link>
      <div>
        <p className="member-role">{person.role}</p>
        <h3><Link to={path}>{person.name} <Arrow diagonal /></Link></h3>
        {person.lines.map(line => <p key={line}>{line}</p>)}
        {person.researchInterests && <p>{person.researchInterests}</p>}
        {!isPI && person.email && <a className="member-email" href={`mailto:${person.email}`}>{person.email}</a>}
      </div>
    </article>
  );
}

function MemberSection({ title, people }) {
  if (!people.length) return null;
  return <section className="content-section member-section"><div className="member-section-heading"><h2>{title}</h2><span>{String(people.length).padStart(2, "0")}</span></div><div className="member-grid">{people.map(person => <MemberCard key={person.name} person={person} />)}</div></section>;
}

function MembersPage() {
  return (
    <main id="main-content">
      <PageTitle description="Meet the students, postdoctoral researchers, and alumni of Xuefei Xu’s group at Tsinghua University.">Our people</PageTitle>
      <div className="section-shell page-content">
        <MemberSection title="Principal Investigator" people={members.pi} />
        <MemberSection title="Postdoctoral Researchers" people={members.postdocs} />
        <MemberSection title="Graduate Students" people={members.graduate} />
        <MemberSection title="Undergraduate Students" people={members.undergraduate} />
        <section className="alumni-section">
          <p className="eyebrow">Our wider community</p>
          <h2>Alumni</h2>
          <MemberSection title="Postdoctoral Alumni" people={members.alumni.postdocs} />
          <MemberSection title="PhD Alumni" people={members.alumni.phd} />
          <MemberSection title="Visiting Alumni" people={members.alumni.visiting} />
        </section>
      </div>
    </main>
  );
}

function MemberDetailPage() {
  const { slug } = useParams();
  const person = findMemberBySlug(slug);
  if (!person) return <NotFoundPage />;

  const papers = publications.filter(paper => paper.firstAuthor === (person.authorName || person.name));
  const isPI = person.role === "Principal Investigator";
  const researchLabel = /^Research (?:interests?|fields?):\s*/i;
  const profileNotes = person.lines.filter(line => !researchLabel.test(line));
  const researchNotes = person.lines.filter(line => researchLabel.test(line));
  const emails = person.detail?.emails || (person.email ? [person.email] : []);
  const hasContact = emails.length > 0 || person.href || person.detail?.phone || person.detail?.address;

  return (
    <main id="main-content">
      <PageTitle eyebrow={person.role}>{person.name}</PageTitle>
      <div className="section-shell page-content member-detail">
        <div className="member-profile-toolbar">
          <Link className="button button-outline" to="/members"><span aria-hidden="true">←</span> All people</Link>
        </div>
        <section className="member-detail-hero" aria-label="Member profile">
          <div className="member-profile-photo"><MemberPortrait person={person} /></div>
          <div className="member-profile-sections">
            <section className="member-profile-panel">
              <h2>About me</h2>
              {profileNotes.map(line => <p key={line}>{line}</p>)}
              {person.biography && <p>{person.biography}</p>}
              {!person.biography && !profileNotes.length && <p><Placeholder field="personal introduction" /></p>}
            </section>
            <section className="member-profile-panel">
              <h2>Research interests</h2>
              {researchNotes.map(line => <p key={line}>{line.replace(researchLabel, "")}</p>)}
              {person.researchInterests && <p>{person.researchInterests}</p>}
              {!person.researchInterests && !researchNotes.length && <p><Placeholder field="research interests" /></p>}
            </section>
          </div>
        </section>

        {person.detail && (
          <>
            <section className="content-section">
              <h2>Research overview</h2>
              <p className="reading-width">{person.detail.research}</p>
            </section>
            <section className="content-section">
              <h2>Education</h2>
              <ul className="plain-list">{person.detail.education.map(item => <li key={item}>{item}</li>)}</ul>
            </section>
            <section className="content-section">
              <h2>Professional appointments</h2>
              <ul className="plain-list appointment-list">{person.detail.appointments.map(item => <li key={item}>{item}</li>)}</ul>
            </section>
          </>
        )}

        {!isPI && <section className="member-page-section member-publications">
          <div className="section-heading">
            <h2>Related Publications</h2>
            <Link className="text-link" to="/publications">Group publications <Arrow /></Link>
          </div>
          {papers.length
            ? <div className="publication-stack">{papers.map(paper => <PublicationEntry key={paper.doi} publication={paper} />)}</div>
            : <p className="member-publication-empty">No publications listed for this member yet.</p>}
        </section>}
        {hasContact && (
          <section className="member-page-section member-contact">
            <h2>Contact Me</h2>
            <address>
              {emails.map(email => <a key={email} href={`mailto:${email}`}>{email}</a>)}
              {person.detail?.phone && <span>Phone {person.detail.phone}</span>}
              {person.detail?.address && <span>{person.detail.address}</span>}
              {person.href && <ExternalLink href={person.href}>Personal website <Arrow diagonal /></ExternalLink>}
            </address>
          </section>
        )}
      </div>
    </main>
  );
}

function PublicationsPage() {
  const byYear = publications.reduce((groups, paper) => { (groups[paper.year] ||= []).push(paper); return groups; }, {});
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));
  return <main id="main-content"><PageTitle description="Browse the group’s papers on reaction kinetics, catalysis, interfacial chemistry, and computational methods by year.">Publications</PageTitle><div className="section-shell page-content publications-layout"><aside className="publication-sidebar"><p className="eyebrow">Browse by year</p><nav aria-label="Publication years">{years.map(year => <a href={`#year-${year}`} key={year}>{year}<span>{byYear[year].length}</span></a>)}</nav><ExternalLink className="text-link" href={profileLinks[0].href}>Google Scholar <Arrow diagonal /></ExternalLink></aside><div className="publication-years">{years.map(year => <section className="publication-year-section" id={`year-${year}`} key={year}><div className="year-heading"><h2>{year}</h2><span>{byYear[year].length} publications</span></div><div className="publication-stack">{byYear[year].map(paper => <PublicationEntry key={paper.doi} publication={paper} />)}</div></section>)}</div></div></main>;
}

function ContactPage() {
  return <main id="main-content"><PageTitle description="Find our office at Tsinghua University or contact Xuefei Xu about collaboration and joining the group.">Contact</PageTitle><div className="section-shell page-content contact-content"><section><p className="eyebrow">01 / Visit</p><h2>Find us at Tsinghua</h2><p>Room B551, Lee Shau Kee Technology Building</p><p>Tsinghua University, Beijing 100084, China</p></section><section><p className="eyebrow">02 / Write</p><h2>Email</h2><p><a href="mailto:xuxuefei@tsinghua.edu.cn">xuxuefei@tsinghua.edu.cn</a></p><p><a href="mailto:xuxuefei@gmail.com">xuxuefei@gmail.com</a></p></section><section><p className="eyebrow">03 / Call</p><h2>Telephone</h2><a href="tel:+861062796755">+86 10 62796755</a></section><section><p className="eyebrow">04 / Explore</p><h2>Academic profiles</h2><InlineLinks links={profileLinks} /></section></div></main>;
}

function NotFoundPage() {
  return <main id="main-content"><PageTitle description="The page you requested could not be found.">Page not found</PageTitle><div className="section-shell page-content"><Link className="text-link" to="/">Return to the home page <Arrow /></Link></div></main>;
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <DocumentTitle />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/members/:slug" element={<MemberDetailPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/teaching" element={<Navigate replace to="/links#teaching" />} />
        <Route path="/tutorials" element={<Navigate replace to="/links#tutorials" />} />
        <Route path="/software" element={<SoftwarePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<NewsDetailPage />} />
        <Route path="/links" element={<LinksPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export function App() {
  return <BrowserRouter><AppLayout /></BrowserRouter>;
}
