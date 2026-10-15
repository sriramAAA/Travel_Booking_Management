import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MessageCircle, Star } from 'lucide-react'
import { useTravelStore } from '../../store/useTravelStore'

const reviewSchema = z.object({ name: z.string().min(2, 'Add your name or initials.'), destination: z.string().min(2, 'Add the place you visited.'), rating: z.coerce.number().min(1).max(5), text: z.string().min(15, 'Share at least a sentence about your trip.') })

export default function ReviewsPage() {
  const reviews = useTravelStore((state) => state.reviews)
  const addReview = useTravelStore((state) => state.addReview)
  const [submitted, setSubmitted] = useState(false)
  const [rating, setRating] = useState(5)
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({ resolver: zodResolver(reviewSchema), defaultValues: { rating: 5 } })
  const average = reviews.length ? (reviews.reduce((sum, review) => sum + Number(review.rating), 0) / reviews.length).toFixed(1) : '—'
  return <main className="page-wrap">
    <div className="page-intro"><div><div className="eyebrow">NOTES FROM THE ROAD</div><h1>The best part is what you remember.</h1><p>Little stories and helpful notes from the Tripora travel community.</p></div><span className="review-score"><Star size={15} fill="currentColor" /> {average} <small>from {reviews.length} notes</small></span></div>
    <div className="reviews-layout"><section className="review-list">{reviews.map((review) => <article className="review-card" key={review.id}><div className="review-card-top"><span className="review-avatar">{review.name.slice(0, 1).toUpperCase()}</span><div><strong>{review.name}</strong><small>{review.destination} · {review.date}</small></div><div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: 5 }, (_, index) => <Star key={index} size={12} fill={index < review.rating ? 'currentColor' : 'none'} />)}</div></div><p>“{review.text}”</p><span className="review-tag"><MessageCircle size={12} /> A traveler’s note</span></article>)}</section>
      <aside className="review-form-card"><div className="eyebrow">A NOTE OF YOUR OWN</div><h2>Tell us what stayed with you.</h2><p>Your tips help the next traveler find a little magic, too.</p>{submitted ? <div className="review-success"><Star size={21} fill="currentColor" /><strong>Your note is saved.</strong><span>Thanks for sharing a little of your story.</span><button className="button button-outline" onClick={() => setSubmitted(false)}>Write another</button></div> : <form className="form-stack" onSubmit={handleSubmit((values) => { addReview(values); reset({ rating: 5 }); setRating(5); setSubmitted(true) })} noValidate><label>Your name or initials<input {...register('name')} placeholder="Jamie L." />{errors.name && <small className="field-error">{errors.name.message}</small>}</label><label>Place you visited<input {...register('destination')} placeholder="Kyoto, Japan" />{errors.destination && <small className="field-error">{errors.destination.message}</small>}</label><label>Your little rating<div className="rating-picker" role="radiogroup" aria-label="Rating">{[1, 2, 3, 4, 5].map((value) => <button key={value} type="button" role="radio" aria-checked={rating === value} aria-label={`${value} star${value === 1 ? '' : 's'}`} onClick={() => { setRating(value); setValue('rating', value, { shouldValidate: true }) }}><Star size={20} fill={value <= rating ? 'currentColor' : 'none'} /></button>)}</div></label><input type="hidden" {...register('rating')} /><label>Your note<textarea {...register('text')} rows="4" placeholder="A moment, a favorite place, or a tip you’d pass along…" />{errors.text && <small className="field-error">{errors.text.message}</small>}</label><button className="button button-dark button-full">Share a traveler note</button></form>}</aside></div>
  </main>
}
