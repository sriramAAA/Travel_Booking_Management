export function filterHotels(hotels, { query = '', maxPrice = Infinity, sort = 'Recommended' } = {}) {
  const normalizedQuery = query.trim().toLowerCase()
  return hotels
    .filter((hotel) => `${hotel.city} ${hotel.name}`.toLowerCase().includes(normalizedQuery) && hotel.price <= maxPrice)
    .sort((a, b) => sort === 'Price: low to high' ? a.price - b.price : sort === 'Top rated' ? b.rating - a.rating : 0)
}

export function calculateExpenseTotal(expenses) {
  return expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
}
