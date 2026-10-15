import { useMemo, useState } from 'react'
import { ArrowRight, Bus, CalendarDays, Plane, TrainFront, Wallet } from 'lucide-react'

const options = [
  { id: 'a1', type: 'Flight', icon: Plane, operator: 'SkyWays', route: 'Nonstop · Economy', from: 'SFO', to: 'NRT', departure: '10:40 AM', arrival: '2:15 PM +1', duration: '11h 35m', price: 642, stops: 0 },
  { id: 'a2', type: 'Flight', icon: Plane, operator: 'Pacific Air', route: '1 stop · Economy', from: 'SFO', to: 'NRT', departure: '8:20 AM', arrival: '5:50 PM +1', duration: '15h 30m', price: 518, stops: 1 },
  { id: 'a3', type: 'Train', icon: TrainFront, operator: 'Shinkansen', route: 'Nozomi · Reserved seat', from: 'Tokyo', to: 'Kyoto', departure: '9:03 AM', arrival: '11:14 AM', duration: '2h 11m', price: 98, stops: 0 },
  { id: 'a4', type: 'Bus', icon: Bus, operator: 'Willer Express', route: 'Overnight · Comfort seat', from: 'Tokyo', to: 'Kyoto', departure: '10:10 PM', arrival: '6:25 AM +1', duration: '8h 15m', price: 42, stops: 0 },
]

export default function TransportPage() {
  const [type, setType] = useState('All')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [searched, setSearched] = useState(false)
  const types = ['All', 'Flight', 'Train', 'Bus']
  const results = useMemo(() => options.filter((option) =>
    (type === 'All' || option.type === type)
    && (!from || `${option.from} ${option.operator}`.toLowerCase().includes(from.toLowerCase()))
    && (!to || option.to.toLowerCase().includes(to.toLowerCase()))
  ), [type, from, to])
  return <main className="page-wrap">
    <div className="page-intro"><div><div className="eyebrow">THE JOURNEY IS PART OF IT</div><h1>Getting there, thoughtfully.</h1><p>Compare a few ways to get from here to somewhere lovely.</p></div><span className="demo-pill">MOCK ROUTES</span></div>
    <section className="transport-search"><div className="transport-field"><small>FROM</small><input placeholder="City or airport" value={from} onChange={(event) => setFrom(event.target.value)} /></div><span className="transport-swap"><ArrowRight size={16} /></span><div className="transport-field"><small>TO</small><input placeholder="Where to?" value={to} onChange={(event) => setTo(event.target.value)} /></div><div className="transport-field"><small>DEPART</small><input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></div><button className="button button-dark" onClick={() => setSearched(true)}>Find routes <ArrowRight size={15} /></button></section>
    <div className="transport-tabs">{types.map((item) => <button className={type === item ? 'active' : ''} key={item} onClick={() => setType(item)}>{item === 'All' ? <Wallet size={15} /> : item === 'Flight' ? <Plane size={15} /> : item === 'Train' ? <TrainFront size={15} /> : <Bus size={15} />}{item}</button>)}</div>
    <div className="transport-heading"><div><div className="eyebrow">{searched ? 'YOUR SEARCH RESULTS' : 'A FEW GOOD OPTIONS'}</div><h2>{results.length} ways to make the trip</h2></div><span className="result-count">{date || 'Flexible dates'}</span></div>
    <section className="route-list">{results.map((option) => { const Icon = option.icon; return <article className="route-card" key={option.id}><div className="route-company"><span><Icon size={18} /></span><div><strong>{option.operator}</strong><small>{option.route}</small></div></div><div className="route-times"><strong>{option.departure}</strong><div className="route-duration"><small>{option.duration}</small><span /><small>{option.stops ? `${option.stops} stop` : 'Direct'}</small></div><strong>{option.arrival}</strong></div><div className="route-places"><b>{option.from}</b><ArrowRight size={14} /><b>{option.to}</b></div><div className="route-price"><strong>${option.price}</strong><small>per traveler</small></div><button className="button button-outline" onClick={() => window.alert('Demo only: route details are for planning and no ticket is purchased.')}>Details</button></article>})}{!results.length && <div className="empty-state"><h3>No routes match those details.</h3><p>Try a different city or route type.</p></div>}</section>
    <div className="demo-disclaimer transport-disclaimer"><CalendarDays size={15} /> These sample routes are for planning only. Availability and fares are mock data; Tripora does not sell or book tickets.</div>
  </main>
}
