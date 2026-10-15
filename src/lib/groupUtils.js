export function calculateGroupSplit(expenses, members) {
  if (!members.length) return []
  const spentByMember = Object.fromEntries(members.map((member) => [member, 0]))
  expenses.forEach((expense) => {
    if (Object.hasOwn(spentByMember, expense.paidBy)) spentByMember[expense.paidBy] += Math.round(Number(expense.amount) * 100)
  })
  const total = Object.values(spentByMember).reduce((sum, amount) => sum + amount, 0)
  const evenShare = Math.floor(total / members.length)
  const extraCents = total % members.length
  return members.map((member, index) => {
    const share = evenShare + (index < extraCents ? 1 : 0)
    return { member, paid: spentByMember[member] / 100, balance: (spentByMember[member] - share) / 100 }
  })
}
