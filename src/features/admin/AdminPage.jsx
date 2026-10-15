import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { CalendarDays, Check, Database, Eye, EyeOff, Hotel, MapPin, RotateCcw, ShieldCheck, Star, Trash2 } from 'lucide-react'
import { destinations, hotels } from '../../lib/data'
import { useTravelStore } from '../../store/useTravelStore'

export default function AdminPage() {
  const queryClient = useQueryClient()
  const role = useTravelStore((state) => state.role)
  const setRole = useTravelStore((state) => state.setRole)
  const resetDemo = useTravelStore((state) => state.resetDemo)
  const bookings = useTravelStore((state) => state.bookings)
  const reviews = useTravelStore((state) => state.reviews)
  const hiddenDestinations = useTravelStore((state) => state.hiddenDestinations)
  const hiddenHotels = useTravelStore((state) => state.hiddenHotels)
  const toggleDestinationVisibility = useTravelStore((state) => state.toggleDestinationVisibility)
  const toggleHotelVisibility = useTravelStore((state) => state.toggleHotelVisibility)
  const cancelBooking = useTravelStore((state) => state.cancelBooking)
  const removeReview = useTravelStore((state) => state.removeReview)
  const [notice, setNotice] = useState('')
  const collections = [
    { title: 'Destinations', count: String(destinations.length - hiddenDestinations.length).padStart(2, '0'), icon: MapPin, tag: 'Published' },
    { title: 'Stays', count: String(hotels.length - hiddenHotels.length).padStart(2, '0'), icon: Hotel, tag: 'Published' },
    { title: 'Bookings', count: bookings.length.toString().padStart(2, '0'), icon: CalendarDays, tag: 'Demo records' },
    { title: 'Reviews', count: reviews.length.toString().padStart(2, '0'), icon: Star, tag: 'Local notes' },
  ]
  const toggleDestination = (id) => {
    toggleDestinationVisibility(id)
    queryClient.invalidateQueries({ queryKey: ['destinations'] })
    setNotice('Destination visibility updated in this browser.')
  }
  const toggleHotel = (id) => {
    toggleHotelVisibility(id)
    queryClient.invalidateQueries({ queryKey: ['hotels'] })
    setNotice('Stay visibility updated in this browser.')
  }
  return <main className="page-wrap">
    <div className="page-intro"><div><div className="eyebrow">A LITTLE BEHIND THE SCENES</div><h1>Tripora, in good hands.</h1><p>Manage this local demo experience. Nothing here connects to a live service.</p></div><span className={`role-indicator ${role}`}><ShieldCheck size={15} /> {role === 'admin' ? 'Admin mode' : 'Traveler mode'}</span></div>
    <section className="admin-banner"><div className="admin-banner-icon"><Database size={20} /></div><div><strong>Standalone demo workspace</strong><p>Everything is stored in this browser. No real traveler data or live bookings are involved.</p></div><button className={`button ${role === 'admin' ? 'button-outline' : 'button-dark'}`} onClick={() => setRole(role === 'admin' ? 'traveler' : 'admin')}>{role === 'admin' ? 'Return to traveler' : 'Enter admin mode'}</button></section>
    {role === 'admin' ? <>
      <div className="admin-stats">{collections.map((item) => { const Icon = item.icon; return <article className="admin-stat" key={item.title}><div><Icon size={18} /></div><small>{item.title}</small><strong>{item.count}</strong><span>{item.tag}</span></article> })}</div>
      <section className="admin-content"><div className="panel-heading"><div><div className="eyebrow">DESTINATION CATALOG</div><h2>Places, ready for the next traveler.</h2></div><span className="demo-pill"><Check size={13} /> LOCAL MOCK DATA</span></div><div className="management-list">{destinations.map((place) => { const hidden = hiddenDestinations.includes(place.id); return <div className="management-row" key={place.id}><span className="management-icon"><MapPin size={15} /></span><span className="management-name"><strong>{place.name}</strong><small>{place.country} · {place.category}</small></span><span className={`published ${hidden ? 'unpublished' : ''}`}><i /> {hidden ? 'Hidden' : 'Published'}</span><button className="button button-outline manage-button" aria-label={`${hidden ? 'Publish' : 'Hide'} ${place.name}`} onClick={() => toggleDestination(place.id)}>{hidden ? <Eye size={14} /> : <EyeOff size={14} />}{hidden ? 'Publish' : 'Hide'}</button></div> })}</div></section>
      <section className="admin-content"><div className="panel-heading"><div><div className="eyebrow">STAY CATALOG</div><h2>Small places to call home.</h2></div></div><div className="management-list">{hotels.map((hotel) => { const hidden = hiddenHotels.includes(hotel.id); return <div className="management-row" key={hotel.id}><span className="management-icon"><Hotel size={15} /></span><span className="management-name"><strong>{hotel.name}</strong><small>{hotel.city} · ${hotel.price} / night</small></span><span className={`published ${hidden ? 'unpublished' : ''}`}><i /> {hidden ? 'Hidden' : 'Published'}</span><button className="button button-outline manage-button" aria-label={`${hidden ? 'Publish' : 'Hide'} ${hotel.name}`} onClick={() => toggleHotel(hotel.id)}>{hidden ? <Eye size={14} /> : <EyeOff size={14} />}{hidden ? 'Publish' : 'Hide'}</button></div> })}</div></section>
      <section className="admin-content"><div className="panel-heading"><div><div className="eyebrow">BOOKING RECORDS</div><h2>Planning records, not reservations.</h2></div></div>{bookings.length ? <div className="management-list">{bookings.map((booking) => { const cancelled = booking.status === 'Cancelled (demo)'; return <div className="management-row" key={booking.id}><span className="management-icon"><CalendarDays size={15} /></span><span className="management-name"><strong>{booking.property}</strong><small>{booking.id} · {booking.destination} · {booking.dates}</small></span><span className={`published ${cancelled ? 'unpublished' : ''}`}><i /> {booking.status}</span><button className="button button-outline manage-button" onClick={() => cancelBooking(booking.id)}>{cancelled ? 'Restore' : 'Cancel demo'}</button></div> })}</div> : <p className="empty-inline">There are no saved demo booking records yet.</p>}</section>
      <section className="admin-content"><div className="panel-heading"><div><div className="eyebrow">TRAVELER NOTES</div><h2>Community stories and tips.</h2></div></div>{reviews.length ? <div className="management-list">{reviews.map((review) => <div className="management-row review-management-row" key={review.id}><span className="management-icon"><Star size={15} /></span><span className="management-name"><strong>{review.name} · {review.destination} · {review.rating}/5</strong><small>{review.text}</small></span><button className="button button-outline manage-button" aria-label={`Remove review by ${review.name}`} onClick={() => { removeReview(review.id); setNotice('Traveler note removed from local demo data.') }}><Trash2 size={14} /> Remove</button></div>)}</div> : <p className="empty-inline">No traveler notes are currently saved.</p>}</section>
      <section className="admin-danger"><div><div className="eyebrow">START FRESH</div><h3>Reset local demo data</h3><p>Restores sample trips, expenses, wishlist, bookings, and preferences in this browser.</p></div><button className="button button-outline" onClick={() => { resetDemo(); queryClient.invalidateQueries(); setNotice('Sample data restored. Your browser is back to its original demo state.') }}><RotateCcw size={15} /> Reset demo data</button></section>
      {notice && <p className="inline-success" role="status"><Check size={15} /> {notice}</p>}
      <div className="admin-note"><Star size={15} /> Admin actions change only this local demo state. There is no server or live customer data.</div>
    </> : <div className="admin-locked"><div className="empty-icon"><ShieldCheck size={22} /></div><h2>Come on in, demo admin.</h2><p>Switch to admin mode above to explore mock destinations, stays, bookings, and reviews.</p></div>}
  </main>
}
