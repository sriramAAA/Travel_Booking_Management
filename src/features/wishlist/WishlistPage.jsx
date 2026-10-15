import { ArrowUpRight, Heart, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { destinations, hotels, imageUrl } from '../../lib/data'
import { useTravelStore } from '../../store/useTravelStore'

export default function WishlistPage() {
  const wishlist = useTravelStore((state) => state.wishlist)
  const toggleWishlist = useTravelStore((state) => state.toggleWishlist)
  const places = [...destinations, ...hotels].filter((item) => wishlist.includes(item.id))
  return <main className="page-wrap"><div className="page-intro"><div><div className="eyebrow">A FEW THINGS TO DREAM ABOUT</div><h1>Your little wish list.</h1><p>Places and stays you want to come back to.</p></div><span className="result-count">{places.length} saved</span></div>{places.length ? <div className="explore-grid">{places.map((item) => <article className="explore-card" key={item.id}><button className="heart-button saved" aria-label={`Remove ${item.name} from wishlist`} onClick={() => toggleWishlist(item.id)}><Heart size={18} fill="currentColor" /></button><Link className="image-button" to={item.country ? `/destinations?place=${item.id}` : '/hotels'}><img src={imageUrl(item.image, 760)} alt={item.name} /></Link><div className="explore-card-content"><div className="explore-title"><div><h3>{item.name}</h3><p><MapPin size={12} /> {item.country || item.city}</p></div><span className="rating"><Star size={13} fill="currentColor" /> {item.rating}</span></div><div className="card-footer"><span>{item.country ? `From $${item.price} / person` : `$${item.price} / night`}</span><Link className="icon-button" to={item.country ? '/destinations' : '/hotels'} aria-label="Explore"><ArrowUpRight size={17} /></Link></div></div></article>)}</div> : <div className="empty-state"><div className="empty-icon"><Heart size={22} /></div><h3>A blank page for a lovely dream.</h3><p>Tap the heart on any place or stay to save it here.</p><Link className="button button-dark" to="/destinations">Explore places</Link></div>}</main>
}
