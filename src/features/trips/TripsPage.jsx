import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarDays, Check, MapPin, Plus, Sparkles, X } from 'lucide-react'
import { useTravelStore } from '../../store/useTravelStore'
import { imageUrl } from '../../lib/data'
import ItineraryEditor from '../itinerary/ItineraryEditor'

const tripSchema = z.object({ name: z.string().min(3, 'Give this trip a name.'), destination: z.string().min(2, 'Where are you going?'), dates: z.string().min(5, 'Add your travel dates.') })

function TripForm({ onClose }) {
  const addTrip = useTravelStore((state) => state.addTrip)
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(tripSchema) })
  const submit = (values) => { const id = addTrip(values); onClose(id) }
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="trip-form-title"><button className="modal-close" onClick={onClose} aria-label="Close"><X size={19} /></button><div className="eyebrow">A NEW ADVENTURE</div><h2 id="trip-form-title">Let’s make a plan.</h2><p className="modal-subtitle">Start with the big picture. You can fill in the fun bits later.</p><form className="form-stack" onSubmit={handleSubmit(submit)} noValidate><label>Give your trip a name<input {...register('name')} placeholder="e.g. A long weekend in Lisbon" />{errors.name && <small className="field-error">{errors.name.message}</small>}</label><label>Destination<input {...register('destination')} placeholder="City, country" />{errors.destination && <small className="field-error">{errors.destination.message}</small>}</label><label>Dates<input {...register('dates')} placeholder="Nov 08 — Nov 12, 2026" />{errors.dates && <small className="field-error">{errors.dates.message}</small>}</label><button className="button button-dark button-full">Create my trip <Plus size={16} /></button></form></div></div>
}

export default function TripsPage() {
  const trips = useTravelStore((state) => state.trips)
  const bookings = useTravelStore((state) => state.bookings)
  const activities = useTravelStore((state) => state.activities)
  const [creating, setCreating] = useState(false)
  const [activeTrip, setActiveTrip] = useState(trips[0]?.id)
  const selectedTrip = trips.find((trip) => trip.id === activeTrip) || trips[0]
  return <main className="page-wrap">
    <div className="page-intro"><div><div className="eyebrow">YOUR PERSONAL TRAVEL JOURNAL</div><h1>The good stuff, all together.</h1><p>Plans, places, and tiny details that make a trip yours.</p></div><button className="button button-dark" onClick={() => setCreating(true)}><Plus size={17} /> Create a trip</button></div>
    <div className="trip-tabs">{trips.map((trip) => <button key={trip.id} className={activeTrip === trip.id ? 'active' : ''} onClick={() => setActiveTrip(trip.id)}>{trip.name}</button>)}{!trips.length && <span>Your next story starts with a plan.</span>}</div>
    {selectedTrip ? <><section className="trip-cover"><img src={imageUrl(selectedTrip.image, 1600)} alt="" /><div className="trip-cover-shade" /><div className="trip-cover-content"><span className="trip-status"><span /> YOUR NEXT ADVENTURE</span><h2>{selectedTrip.name}</h2><p><MapPin size={15} /> {selectedTrip.destination} <span>·</span> <CalendarDays size={15} /> {selectedTrip.dates}</p></div></section>
      <ItineraryEditor activities={activities} />
      <section className="trip-bookings"><div className="panel-heading"><div><div className="eyebrow">THE PRACTICAL BITS</div><h2>Saved bookings</h2></div><span className="result-count">{bookings.length} saved</span></div>{bookings.map((booking) => <div className="saved-booking" key={booking.id}><div className="booking-stamp"><Check size={18} /></div><div><strong>{booking.property}</strong><span>{booking.destination} · {booking.dates}</span><small>Demo record · no real reservation</small></div><b>${Number(booking.total).toLocaleString()}</b></div>)}</section>
    </> : <div className="empty-state"><div className="empty-icon"><Sparkles size={22} /></div><h3>Let’s give your next trip a beginning.</h3><p>Keep the plans, places, and little moments all in one place.</p><button className="button button-dark" onClick={() => setCreating(true)}>Plan a trip <Plus size={16} /></button></div>}
    {creating && <TripForm onClose={(id) => { setCreating(false); if (id) setActiveTrip(id) }} />}
  </main>
}
