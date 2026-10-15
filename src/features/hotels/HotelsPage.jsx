import { useMemo, useState } from 'react'
import { ArrowDownWideNarrow, ArrowUpRight, Heart, SlidersHorizontal, Star } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getHotels } from '../../services/mockApi'
import { imageUrl } from '../../lib/data'
import { filterHotels } from '../../lib/travelUtils'
import { useTravelStore } from '../../store/useTravelStore'
import BookingDialog from '../booking/BookingDialog'

export default function HotelsPage() {
  const { data = [], isLoading, isError, refetch } = useQuery({ queryKey: ['hotels'], queryFn: getHotels })
  const [query, setQuery] = useState('')
  const [maxPrice, setMaxPrice] = useState(400)
  const [sort, setSort] = useState('Recommended')
  const [bookingHotel, setBookingHotel] = useState(null)
  const wishlist = useTravelStore((state) => state.wishlist)
  const toggleWishlist = useTravelStore((state) => state.toggleWishlist)
  const filtered = useMemo(() => filterHotels(data, { query, maxPrice, sort }), [data, query, maxPrice, sort])
  return <main className="page-wrap">
    <div className="page-intro"><div><div className="eyebrow">STAYS WITH A STORY</div><h1>Somewhere to settle in.</h1><p>Handpicked stays for nights that become favorite memories.</p></div><span className="result-count">{filtered.length} stays found</span></div>
    <div className="hotel-search-row"><input aria-label="Search hotels or city" placeholder="Where are you headed?" value={query} onChange={(event) => setQuery(event.target.value)} /><div className="hotel-filter-control"><SlidersHorizontal size={16} /><label>Max / night <strong>${maxPrice}</strong><input type="range" min="75" max="400" step="5" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} /></label></div><label className="sort-control"><ArrowDownWideNarrow size={16} /><select aria-label="Sort hotels" value={sort} onChange={(event) => setSort(event.target.value)}><option>Recommended</option><option>Price: low to high</option><option>Top rated</option></select></label></div>
    {isLoading ? <div className="loading-state">Finding your perfect stay…</div> : isError ? <div className="empty-state"><h3>We couldn't load stays.</h3><button className="button button-dark" onClick={() => refetch()}>Try again</button></div> : filtered.length ? <div className="hotel-list">{filtered.map((hotel) => <article className="hotel-card" key={hotel.id}>
      <div className="hotel-image"><img src={imageUrl(hotel.image, 760)} alt={hotel.name} /><span className="hotel-badge">{hotel.badge}</span><button className={`heart-button ${wishlist.includes(hotel.id) ? 'saved' : ''}`} aria-label="Save stay" onClick={() => toggleWishlist(hotel.id)}><Heart size={18} fill={wishlist.includes(hotel.id) ? 'currentColor' : 'none'} /></button></div>
      <div className="hotel-info"><div className="eyebrow">{hotel.type.toUpperCase()} · {hotel.city.toUpperCase()}</div><h2>{hotel.name}</h2><div className="hotel-rating"><Star size={14} fill="currentColor" /> <b>{hotel.rating}</b> <span>({hotel.reviews} reviews)</span></div><div className="hotel-tags">{hotel.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="hotel-book-row"><div><strong>${hotel.price}</strong><span> / night</span><small> · before taxes</small></div><button className="button button-outline" onClick={() => setBookingHotel(hotel)}>View stay <ArrowUpRight size={15} /></button></div></div>
    </article>)}</div> : <div className="empty-state"><h3>No stays match those filters</h3><p>Try a nearby city or adjust your nightly budget.</p></div>}
    {bookingHotel && <BookingDialog hotel={bookingHotel} onClose={() => setBookingHotel(null)} />}
  </main>
}
