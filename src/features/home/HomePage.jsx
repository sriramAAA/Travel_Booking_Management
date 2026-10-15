import { useState } from 'react'
import { ArrowRight, ArrowUpRight, CalendarDays, ChevronDown, Compass, MapPin, Search, Sparkles, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { destinations, imageUrl } from '../../lib/data'

export default function HomePage() {
  const [query, setQuery] = useState('')
  return (
    <>
      <section className="hero-panel">
        <img className="hero-image" src={imageUrl('photo-1476514525535-07fb3b4ae5f1', 1800)} alt="A quiet lake surrounded by the Alps" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="eyebrow hero-eyebrow"><Sparkles size={14} /> YOUR NEXT CHAPTER STARTS HERE</div>
          <h1>Go where<br />you <em>feel</em> most alive.</h1>
          <p>Thoughtful trips, beautifully planned. All the details, in one happy place.</p>
          <div className="hero-search">
            <label><MapPin size={18} /><span className="search-label"><small>Where to?</small><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Explore destinations" /></span></label>
            <span className="search-divider" />
            <label><CalendarDays size={17} /><span className="search-label"><small>When</small><span className="search-value">Any week <ChevronDown size={14} /></span></span></label>
            <span className="search-divider" />
            <label><Compass size={18} /><span className="search-label"><small>Who</small><span className="search-value">2 travelers <ChevronDown size={14} /></span></span></label>
            <Link className="search-submit" to={`/destinations${query ? `?q=${encodeURIComponent(query)}` : ''}`} aria-label="Search destinations"><Search size={20} /></Link>
          </div>
          <div className="hero-note"><span className="avatar-stack"><i>J</i><i>M</i><i>A</i></span><span>Loved by travelers in 42 countries</span><span className="note-stars"><Star size={13} fill="currentColor" /> 4.9/5</span></div>
        </div>
        <div className="hero-caption"><span>01 / 06</span><span className="caption-line" /><span>Lake Como, Italy</span></div>
      </section>
      <section className="section-block">
        <div className="section-heading"><div><div className="eyebrow">A LITTLE INSPIRATION</div><h2>Places that stay with you</h2><p>Curated corners of the world, picked just for this moment.</p></div><Link className="text-link" to="/destinations">Explore all places <ArrowRight size={16} /></Link></div>
        <div className="destination-grid">
          {destinations.slice(0, 3).map((place, index) => <Link to={`/destinations?place=${place.id}`} className={`destination-card destination-card-${index + 1}`} key={place.id}>
            <img src={imageUrl(place.image, 900)} alt={place.name} />
            <span className="destination-tag">{place.category}</span><span className="destination-arrow"><ArrowUpRight size={18} /></span>
            <div className="destination-info"><div><h3>{place.name}</h3><p>{place.country} <span>·</span> {place.days}</p></div><div className="destination-rating"><Star size={14} fill="currentColor" /> {place.rating}</div></div>
          </Link>)}
        </div>
      </section>
      <section className="quote-band"><div className="quote-mark">“</div><blockquote>The best journeys answer questions that in the beginning you didn’t even think to ask.</blockquote><div className="quote-credit">— JEFF JOHNSON <span>·</span> TRAVEL WRITER</div></section>
      <section className="bottom-cta"><div><div className="eyebrow">YOUR TRAVEL STORY</div><h2>Make room for<br /><em>somewhere new.</em></h2></div><Link to="/trips" className="button button-dark">Plan a trip <ArrowRight size={17} /></Link></section>
    </>
  )
}
