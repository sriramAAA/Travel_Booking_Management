import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRightLeft, Check, CircleDollarSign, Plus, Users } from 'lucide-react'
import { calculateGroupSplit } from '../../lib/groupUtils'
import { useTravelStore } from '../../store/useTravelStore'

const expenseSchema = z.object({ title: z.string().min(2, 'Add a short description.'), paidBy: z.string().min(1), amount: z.coerce.number().positive('Enter an amount above zero.') })
const memberSchema = z.object({ name: z.string().min(2, 'Enter a name or nickname.') })

export default function GroupTripsPage() {
  const groups = useTravelStore((state) => state.groups)
  const addGroupExpense = useTravelStore((state) => state.addGroupExpense)
  const addGroupMember = useTravelStore((state) => state.addGroupMember)
  const [activeId, setActiveId] = useState(groups[0]?.id)
  const [addingExpense, setAddingExpense] = useState(false)
  const [addingMember, setAddingMember] = useState(false)
  const [notice, setNotice] = useState('')
  const group = groups.find((item) => item.id === activeId) || groups[0]
  const expenseForm = useForm({ resolver: zodResolver(expenseSchema), defaultValues: { paidBy: group?.members[0] || '' } })
  const memberForm = useForm({ resolver: zodResolver(memberSchema) })
  if (!group) return <main className="page-wrap"><div className="empty-state"><h2>Start a group trip</h2><p>Create a trip first, then invite your favorite people to plan it together.</p></div></main>
  const split = calculateGroupSplit(group.expenses, group.members)
  const total = group.expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
  return <main className="page-wrap">
    <div className="page-intro"><div><div className="eyebrow">BETTER WHEN SHARED</div><h1>Good trips are a group effort.</h1><p>Keep the crew, shared costs, and little details in sync.</p></div><span className="demo-pill"><Users size={14} /> GROUP PLANNING DEMO</span></div>
    <div className="group-trip-tabs">{groups.map((item) => <button key={item.id} className={item.id === group.id ? 'active' : ''} onClick={() => setActiveId(item.id)}>{item.name}<small>{item.destination}</small></button>)}</div>
    <section className="group-summary"><div className="group-summary-copy"><div className="eyebrow">THE TRAVEL CREW</div><h2>{group.name}</h2><p>{group.destination} <span>·</span> Shared plans, no spreadsheet required.</p><div className="member-row">{group.members.map((member, index) => <span className="member-chip" key={member}><i className={`member-avatar avatar-${index % 4}`}>{member.slice(0, 1).toUpperCase()}</i>{member}</span>)}<button className="member-add" onClick={() => setAddingMember(!addingMember)}><Plus size={14} /> Invite</button></div>{addingMember && <form className="invite-form" onSubmit={memberForm.handleSubmit(({ name }) => { addGroupMember(group.id, name.trim()); memberForm.reset(); setNotice(`${name} has been added to your local trip crew.`); setAddingMember(false) })}><label className="sr-only" htmlFor="invite-name">Name or nickname</label><input id="invite-name" {...memberForm.register('name')} placeholder="Name or nickname" /><button className="button button-dark">Add person</button>{memberForm.formState.errors.name && <small className="field-error">{memberForm.formState.errors.name.message}</small>}</form>}</div><div className="group-total"><CircleDollarSign size={19} /><small>SHARED SPENDING</small><strong>${total.toLocaleString()}</strong><span>{group.expenses.length} shared expenses</span></div></section>
    <div className="group-columns"><section className="panel"><div className="panel-heading"><div><div className="eyebrow">THE SHARED LEDGER</div><h2>Who paid for what?</h2></div><button className="button button-outline" onClick={() => setAddingExpense(!addingExpense)}><Plus size={14} /> Add cost</button></div>
      {addingExpense && <form className="group-expense-form" onSubmit={expenseForm.handleSubmit((values) => { addGroupExpense(group.id, values); expenseForm.reset({ paidBy: group.members[0], title: '', amount: '' }); setAddingExpense(false) })} noValidate><label>What was it?<input {...expenseForm.register('title')} placeholder="Dinner, tickets, taxi…" />{expenseForm.formState.errors.title && <small className="field-error">{expenseForm.formState.errors.title.message}</small>}</label><div className="form-row"><label>Paid by<select {...expenseForm.register('paidBy')}>{group.members.map((member) => <option key={member}>{member}</option>)}</select></label><label>Amount<input {...expenseForm.register('amount')} type="number" min="0.01" step="0.01" placeholder="$" />{expenseForm.formState.errors.amount && <small className="field-error">{expenseForm.formState.errors.amount.message}</small>}</label></div><button className="button button-dark">Save shared cost</button></form>}
      <div className="shared-expenses">{group.expenses.map((expense) => <div key={expense.id}><span className="shared-expense-icon"><CircleDollarSign size={15} /></span><span><strong>{expense.title}</strong><small>Paid by {expense.paidBy}</small></span><b>${Number(expense.amount).toLocaleString()}</b></div>)}</div>
    </section><section className="panel split-panel"><div className="eyebrow"><ArrowRightLeft size={13} /> THE EVEN SPLIT</div><h2>All square, eventually.</h2><p>Everyone’s share is split evenly across {group.members.length} travelers.</p><div className="split-list">{split.map((person) => <div className="split-row" key={person.member}><span className="member-avatar">{person.member.slice(0, 1).toUpperCase()}</span><span><strong>{person.member}</strong><small>Paid ${person.paid.toLocaleString()}</small></span><b className={person.balance < 0 ? 'owes' : 'gets'}>{person.balance === 0 ? 'All square' : `${person.balance > 0 ? '+' : '−'}$${Math.abs(person.balance).toFixed(2)}`}</b></div>)}</div><div className="split-caption"><Check size={14} /> Positive means they’re owed; negative means they owe the group.</div></section></div>
    {notice && <p className="inline-success"><Check size={15} /> {notice}</p>}
  </main>
}
