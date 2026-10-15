import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowUpRight, Heart, MapPin, Search, Star } from 'lucide-react'
import { getDestinations } from '../../services/mockApi'
import { imageUrl } from '../../lib/data'
import { useTravelStore } from '../../store/useTravelStore'
import MapPanel from '../shared/MapPanel'

export default function DestinationsPage() {
  const [searchParams] = useSearchParams()
  const initialPlace = searchParams.get('place')
  const { data = [], isLoading, isError, refetch } = useQuery({ queryKey: ['destinations'], queryFn: getDestinations })
  const [query, setQuery] = useState(() => searchParams.get('q') || '')
  const [region, setRegion] = useState('All places')
  const [selectedId, setSelectedId] = useState(initialPlace)
  const selected = data.find((place) => place.id === selectedId)
  const wishlist = useTravelStore((state) => state.wishlist)
  const toggleWishlist = useTravelStore((state) => state.toggleWishlist)
  const regions = ['All places', 'Europe', 'Asia', 'Africa', 'Americas']
  const filtered = useMemo(() => data.filter((place) => `${place.name} ${place.country} ${place.category}`.toLowerCase().includes(query.toLowerCase()) && (region === 'All places' || place.region === region)), [data, query, region])
  return (
    <main className="page-wrap">
      <div className="page-intro"><div><div className="eyebrow">THE WORLD, WELL WANDERED</div><h1>Find your somewhere.</h1><p>Real places, local favorites, and a little inspiration for the road ahead.</p></div><span className="result-count">{filtered.length} lovely places</span></div>
      <div className="filter-bar"><div className="filter-search"><Search size={17} /><input aria-label="Search destinations" placeholder="Search places, countries, experiences..." value={query} onChange={(event) => setQuery(event.target.value)} /></div><div className="filter-chips">{regions.map((item) => <button key={item} className={`chip ${region === item ? 'active' : ''}`} onClick={() => setRegion(item)}>{item}</button>)}</div></div>
      {isLoading ? <div className="loading-state">Finding beautiful places...</div> : isError ? <div className="empty-state"><h3>We couldn't load destinations.</h3><button className="button button-dark" onClick={() => refetch()}>Try again</button></div> : <div className="explore-grid">{filtered.map((place) => <article className="explore-card" key={place.id}>
        <button className={`heart-button ${wishlist.includes(place.id) ? 'saved' : ''}`} aria-label={wishlist.includes(place.id) ? `Remove ${place.name} from wishlist` : `Add ${place.name} to wishlist`} onClick={() => toggleWishlist(place.id)}><Heart size={18} fill={wishlist.includes(place.id) ? 'currentColor' : 'none'} /></button>
        <button className="image-button" onClick={() => setSelectedId(selectedId === place.id ? null : place.id)} aria-label={`View map for ${place.name}`}><img src={imageUrl(place.image, 760)} alt={place.name} /><span className="image-open"><MapPin size={14} /> View map</span></button>
        <div className="explore-card-content"><div className="explore-title"><div><h3>{place.name}</h3><p>{place.country} <span>·</span> {place.category}</p></div><span className="rating"><Star size={13} fill="currentColor" /> {place.rating}</span></div><p className="destination-description">{place.description}</p><div className="card-footer"><span>From <b>${place.price.toLocaleString()}</b> <small>/ person</small></span><button className="icon-button" onClick={() => setSelectedId(selectedId === place.id ? null : place.id)} aria-label={`More about ${place.name}`}><ArrowUpRight size={17} /></button></div></div>
      </article>)}</div>}
      {filtered.length === 0 && !isLoading && <div className="empty-state"><h3>No places found</h3><p>Try another search or region.</p></div>}
      {selected && <div className="map-detail"><div className="map-detail-copy"><div className="eyebrow">A PIN ON THE MAP</div><h2>{selected.name}, {selected.country}</h2><p>{selected.description}</p></div><MapPanel lat={selected.lat} lng={selected.lng} name={selected.name} /></div>}
    </main>
  )
}
