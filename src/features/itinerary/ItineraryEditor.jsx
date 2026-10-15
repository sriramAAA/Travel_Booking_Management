import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowDownToLine, Clock3, MapPin, Plus, Printer, X } from 'lucide-react'
import { useTravelStore } from '../../store/useTravelStore'
import { downloadCsv, printItinerary } from '../../utils/export'

const activitySchema = z.object({ title: z.string().min(2, 'Add an activity name.'), detail: z.string().min(2, 'Add a place or a little detail.'), time: z.string().min(1, 'Choose a time.') })

function ActivityForm({ onClose }) {
  const addActivity = useTravelStore((state) => state.addActivity)
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(activitySchema), defaultValues: { time: '09:00' } })
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="activity-title"><button className="modal-close" onClick={onClose} aria-label="Close"><X size={19} /></button><div className="eyebrow">MAKE A LITTLE ROOM IN THE DAY</div><h2 id="activity-title">Add to your itinerary.</h2><form className="form-stack" onSubmit={handleSubmit((values) => { addActivity({ ...values, type: 'Plan' }); onClose() })} noValidate><label>Activity<input {...register('title')} placeholder="A visit to the little bookshop" />{errors.title && <small className="field-error">{errors.title.message}</small>}</label><label>Place or details<input {...register('detail')} placeholder="Address, neighborhood, or note" />{errors.detail && <small className="field-error">{errors.detail.message}</small>}</label><label>Time<input {...register('time')} type="time" />{errors.time && <small className="field-error">{errors.time.message}</small>}</label><button className="button button-dark button-full">Add to the day <Plus size={16} /></button></form></div></div>
}

export default function ItineraryEditor({ activities }) {
  const [adding, setAdding] = useState(false)
  return <>
    <div className="trip-tools"><div className="trip-tool-heading"><div className="eyebrow">DAY ONE · OCTOBER 19</div><h2>A day at your own pace.</h2><p>A lovely little outline. Switch things around whenever you like.</p></div><div className="tool-buttons"><button className="button button-outline" onClick={() => setAdding(true)}><Plus size={15} /> Add activity</button><button className="button button-outline" onClick={() => downloadCsv('tripora-itinerary.csv', activities)}><ArrowDownToLine size={15} /> Export CSV</button><button className="button button-outline" onClick={printItinerary}><Printer size={15} /> Print / PDF</button></div></div>
    <section className="itinerary-list">{activities.map((item, index) => <article className="itinerary-item" key={item.id}><div className="itinerary-time"><Clock3 size={13} /> {item.time}</div><div className="itinerary-line"><span className={index === 0 ? 'line-dot current' : 'line-dot'} />{index < activities.length - 1 && <span className="line-stem" />}</div><div className="itinerary-card"><span className="itinerary-type">{item.type}</span><h3>{item.title}</h3><p><MapPin size={13} /> {item.detail}</p></div></article>)}</section>
    {adding && <ActivityForm onClose={() => setAdding(false)} />}
  </>
}
