import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, X } from 'lucide-react'
import { useTravelStore } from '../../store/useTravelStore'

const expenseSchema = z.object({ title: z.string().min(2, 'Add a short description.'), category: z.string().min(1), amount: z.coerce.number().positive('Enter an amount above zero.'), date: z.string().min(1, 'Choose a date.') })

export default function ExpenseForm({ onClose }) {
  const addExpense = useTravelStore((state) => state.addExpense)
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(expenseSchema), defaultValues: { category: 'Food' } })
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="expense-title"><button className="modal-close" onClick={onClose} aria-label="Close"><X size={19} /></button><div className="eyebrow">KEEP THE LITTLE DETAILS</div><h2 id="expense-title">Add an expense.</h2><form className="form-stack" onSubmit={handleSubmit((values) => { addExpense(values); onClose() })} noValidate><label>What was it for?<input {...register('title')} placeholder="A memorable dinner…" />{errors.title && <small className="field-error">{errors.title.message}</small>}</label><div className="form-row"><label>Category<select {...register('category')}><option>Food</option><option>Stay</option><option>Transport</option><option>Activities</option><option>Other</option></select></label><label>Amount (USD)<input {...register('amount')} type="number" min="0.01" step="0.01" placeholder="0.00" />{errors.amount && <small className="field-error">{errors.amount.message}</small>}</label></div><label>Date<input {...register('date')} type="date" />{errors.date && <small className="field-error">{errors.date.message}</small>}</label><button className="button button-dark button-full">Save expense <Plus size={16} /></button></form></div></div>
}
