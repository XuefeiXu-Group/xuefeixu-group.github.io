import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { gallery } from "./data.js";
import { newsItems } from "./news.js";
import { Arrow, PageTitle } from "./SiteUI.jsx";

function PhotoWall({ items }) {
  const [position, setPosition] = useState(0);
  const [paused, setPaused] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [hovered, setHovered] = useState(false);
  const count = items.length;
  const wrap = value => ((value % count) + count) % count;
  const currentIndex = wrap(position);
  const offsets = count === 1 ? [0] : [-2, -1, 0, 1, 2];

  function move(direction) {
    setPosition(value => value + direction);
  }

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = event => { if (event.matches) setPaused(true); };
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || hovered || count < 2) return;
    const timer = setTimeout(() => setPosition(value => value + 1), 5000);
    return () => clearTimeout(timer);
  }, [paused, hovered, count, position]);

  return (
    <section className="news-photo-wall" aria-labelledby="photo-wall-title">
      <div className="news-wall-heading">
        <h2 id="photo-wall-title">Group photo wall</h2>
        {count > 1 && (
          <div className="news-wall-controls">
            <button type="button" aria-label="Previous photo" aria-controls="news-photos" onClick={() => move(-1)}>←</button>
            <button type="button" className="photo-playback" aria-controls="news-photos" onClick={() => setPaused(value => !value)}>
              {paused ? "Play" : "Pause"}
            </button>
            <button type="button" aria-label="Next photo" aria-controls="news-photos" onClick={() => move(1)}>→</button>
          </div>
        )}
      </div>
      <div
        id="news-photos"
        className="news-photo-stage"
        role="group"
        aria-label="Group photos"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="news-photo-track">
          {/* Key by sequence position so photos retain their transition across the loop boundary. */}
          {offsets.map(offset => {
            const sequence = position + offset;
            const photo = items[wrap(sequence)];
            const direction = offset < 0 ? "previous" : "next";
            return (
              <figure
                className="news-photo-tile"
                data-offset={offset}
                style={{ "--photo-offset": offset }}
                key={sequence}
                aria-hidden={Math.abs(offset) > 1 ? true : undefined}
              >
                <img src={photo.src} alt={photo.alt} />
                {Math.abs(offset) === 1 && (
                  <button
                    type="button"
                    className="news-photo-target"
                    tabIndex={-1}
                    aria-label={`Show ${direction} photo`}
                    onClick={() => move(offset)}
                  />
                )}
              </figure>
            );
          })}
        </div>
      </div>
      <div className="news-photo-count" aria-live={paused ? "polite" : "off"}>
        {currentIndex + 1} / {count}
      </div>
    </section>
  );
}

function NewsMetadata({ item }) {
  return (
    <p className="news-meta">
      <span>{item.category}</span>
      {item.date && <time dateTime={item.date}>{item.date}</time>}
    </p>
  );
}

export function NewsPage() {
  const storyPhotos = newsItems.flatMap(item => item.photos);
  const newsImages = new Set(storyPhotos.map(photo => photo.src));
  const photos = [...storyPhotos, ...[...gallery].reverse().filter(photo => !newsImages.has(photo.src))];
  return (
    <main id="main-content">
      <PageTitle description="Follow group events and browse photos from lab life at Tsinghua University.">News</PageTitle>
      <div className="section-shell page-content news-content">
        {photos.length > 0 && <PhotoWall items={photos} />}
        <section className="news-updates" aria-labelledby="news-updates-title">
          <h2 id="news-updates-title">Latest updates</h2>
          {newsItems.map(item => (
            <article className="news-entry" key={item.id}>
              <Link className="news-entry-image" to={`/news/${item.id}`} tabIndex={-1} aria-label={item.title}>
                <img src={item.photos[0].src} alt={item.photos[0].alt} loading="lazy" />
              </Link>
              <div>
                <NewsMetadata item={item} />
                <h3><Link to={`/news/${item.id}`}>{item.title} <Arrow /></Link></h3>
                {item.summary && <p className="news-body">{item.summary}</p>}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export function NewsDetailPage() {
  const { slug } = useParams();
  const item = newsItems.find(story => story.id === slug);
  if (!item) return <Navigate to="/news" replace />;
  const [leadPhoto, ...additionalPhotos] = item.photos;

  return (
    <main id="main-content">
      <article className="section-shell page-content news-article">
        <header className="news-article-header">
          <Link className="back-link" to="/news">← All news</Link>
          <h1>{item.title}</h1>
        </header>
        <figure className="news-article-photo"><img src={leadPhoto.src} alt={leadPhoto.alt} /></figure>
        <div className="news-article-copy">
          {item.body.map(paragraph => <p className="news-body" key={paragraph}>{paragraph}</p>)}
        </div>
        {additionalPhotos.map(photo => (
          <figure className="news-article-photo" key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy" /></figure>
        ))}
      </article>
    </main>
  );
}
