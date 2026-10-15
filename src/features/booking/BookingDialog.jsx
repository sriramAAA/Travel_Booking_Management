import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, X } from 'lucide-react'
import { bookingSchema } from '../../lib/validation'
import { useTravelStore } from '../../store/useTravelStore'

export default function BookingDialog({ hotel, onClose }) {
  const addBooking = useTravelStore((state) => state.addBooking)
  const [complete, setComplete] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(bookingSchema), defaultValues: { guestName: '', email: '', checkIn: '', checkOut: '' } })
  const submit = async (values) => {
    await new Promise((resolve) => window.setTimeout(resolve, 350))
    addBooking({ property: hotel.name, destination: hotel.city, dates: `${values.checkIn} — ${values.checkOut}`, total: hotel.price * 3, guestName: values.guestName })
    setComplete(true)
  }
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="booking-title">
    <button className="modal-close" onClick={onClose} aria-label="Close"><X size={19} /></button>
    {complete ? <div className="success-panel"><div className="success-icon"><Check size={25} /></div><div className="eyebrow">YOUR DEMO BOOKING IS SAVED</div><h2>It’s a date.</h2><p>This is a local demo booking, not a real reservation. Find it anytime in your trips.</p><button className="button button-dark" onClick={onClose}>Lovely, thanks</button></div> : <>
      <div className="eyebrow">A LITTLE GETAWAY</div><h2 id="booking-title">Request a stay</h2><p className="modal-subtitle">{hotel.name} · {hotel.city}</p>
      <form className="form-stack" onSubmit={handleSubmit(submit)} noValidate>
        <label>Lead traveler<input {...register('guestName')} placeholder="Your name" />{errors.guestName && <small className="field-error">{errors.guestName.message}</small>}</label>
        <label>Email address<input {...register('email')} type="email" placeholder="you@example.com" />{errors.email && <small className="field-error">{errors.email.message}</small>}</label>
        <div className="form-row"><label>Check in<input {...register('checkIn')} type="date" />{errors.checkIn && <small className="field-error">{errors.checkIn.message}</small>}</label><label>Check out<input {...register('checkOut')} type="date" />{errors.checkOut && <small className="field-error">{errors.checkOut.message}</small>}</label></div>
        <div className="demo-disclaimer">Demo only · No payment is collected and no real reservation is made.</div>
        <button className="button button-dark button-full" disabled={isSubmitting}>{isSubmitting ? 'Saving your request…' : 'Save demo booking · $' + (hotel.price * 3).toLocaleString()}</button>
      </form>
    </>}
  </div></div>
}
