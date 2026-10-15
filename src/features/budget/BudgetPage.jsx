import { useMemo, useState } from 'react'
import { ArrowDownToLine, Plus, Wallet } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { calculateExpenseTotal } from '../../lib/travelUtils'
import { useTravelStore } from '../../store/useTravelStore'
import { downloadCsv } from '../../utils/export'
import ExpenseForm from '../expenses/ExpenseForm'

const colors = ['#a78366', '#738568', '#d1b96e', '#8c9da5', '#c77f71']

export default function BudgetPage() {
  const expenses = useTravelStore((state) => state.expenses)
  const [adding, setAdding] = useState(false)
  const total = calculateExpenseTotal(expenses)
  const chart = useMemo(() => Object.entries(expenses.reduce((acc, expense) => { acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount); return acc }, {})).map(([name, value]) => ({ name, value })), [expenses])
  return <main className="page-wrap">
    <div className="page-intro"><div><div className="eyebrow">THE ART OF TRAVELING WELL</div><h1>Keep the numbers gentle.</h1><p>A clear-eyed little view of where your trip budget is going.</p></div><button className="button button-dark" onClick={() => setAdding(true)}><Plus size={17} /> Add expense</button></div>
    <section className="budget-overview"><div className="budget-total"><div className="stat-icon butter"><Wallet size={19} /></div><div className="eyebrow">TOTAL TRACKED SPENDING</div><strong>${total.toLocaleString()}</strong><p>Across {expenses.length} thoughtful little expenses.</p><div className="budget-progress"><span /></div><small>You've tracked your trip spending here.</small></div><div className="budget-chart"><div className="eyebrow">BY CATEGORY</div>{chart.length ? <><div className="donut-chart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={chart} dataKey="value" nameKey="name" innerRadius={58} outerRadius={83} paddingAngle={4}>{chart.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}</Pie><Tooltip formatter={(value) => `$${value}`} /></PieChart></ResponsiveContainer><div className="donut-center"><strong>${total.toLocaleString()}</strong><small>total</small></div></div><div className="category-legend">{chart.map((item, index) => <span key={item.name}><i style={{ background: colors[index % colors.length] }} />{item.name} <b>${item.value.toLocaleString()}</b></span>)}</div></> : <div className="empty-inline">Add an expense to see your breakdown.</div>}</div></section>
    <section className="expense-section"><div className="panel-heading"><div><div className="eyebrow">THE LITTLE LEDGER</div><h2>Recent expenses</h2></div><button className="button button-outline" onClick={() => downloadCsv('tripora-expenses.csv', expenses)}><ArrowDownToLine size={15} /> Export CSV</button></div>
      {expenses.length ? <div className="expense-table"><div className="expense-row expense-head"><span>WHAT</span><span>WHEN</span><span>CATEGORY</span><span>AMOUNT</span></div>{expenses.map((expense) => <div className="expense-row" key={expense.id}><strong>{expense.title}</strong><span>{format(parseISO(expense.date), 'MMM d, yyyy')}</span><span className="expense-category">{expense.category}</span><b>${Number(expense.amount).toLocaleString()}</b></div>)}</div> : <div className="empty-state"><h3>Your ledger is ready.</h3><p>Add the first little expense to get started.</p></div>}
    </section>{adding && <ExpenseForm onClose={() => setAdding(false)} />}
  </main>
}
