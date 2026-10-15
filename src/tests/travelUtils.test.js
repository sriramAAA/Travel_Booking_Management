import { describe, expect, it } from 'vitest'
import { hotels } from '../lib/data'
import { calculateExpenseTotal, filterHotels } from '../lib/travelUtils'
import { bookingSchema } from '../lib/validation'
import { useTravelStore } from '../store/useTravelStore'
import { calculateGroupSplit } from '../lib/groupUtils'

describe('filterHotels', () => {
  it('filters by city and nightly price', () => {
    expect(filterHotels(hotels, { query: 'kyoto', maxPrice: 150 }).map((hotel) => hotel.id)).toEqual(['h2'])
  })

  it('sorts by rating without mutating its source list', () => {
    const originalIds = hotels.map((hotel) => hotel.id)
    const sorted = filterHotels(hotels, { sort: 'Top rated' })
    expect(sorted[0].rating).toBe(4.96)
    expect(hotels.map((hotel) => hotel.id)).toEqual(originalIds)
  })
})

describe('expense totals', () => {
  it('sums stored numeric and string amounts', () => {
    expect(calculateExpenseTotal([{ amount: 20 }, { amount: '3.5' }])).toBe(23.5)
  })
})

describe('group expense split', () => {
  it('allocates cents evenly and keeps group balances in exact balance', () => {
    const split = calculateGroupSplit([{ paidBy: 'A', amount: 420 }, { paidBy: 'B', amount: 86 }], ['A', 'B', 'C'])
    expect(split.map((person) => person.balance)).toEqual([251.33, -82.67, -168.66])
    expect(split.reduce((sum, person) => sum + Math.round(person.balance * 100), 0)).toBe(0)
  })
})

describe('demo booking validation', () => {
  it('accepts a well-formed booking and rejects invalid dates', () => {
    const booking = { guestName: 'Alex Morgan', email: 'alex@example.com', checkIn: '2026-10-18', checkOut: '2026-10-20' }
    expect(bookingSchema.safeParse(booking).success).toBe(true)
    expect(bookingSchema.safeParse({ ...booking, checkOut: '2026-10-17' }).success).toBe(false)
  })

  it('saves a booking as a local demo record', () => {
    const store = useTravelStore.getState()
    store.resetDemo()
    store.addBooking({ property: 'Machiya Garden Stay', destination: 'Kyoto', dates: '2026-10-18 — 2026-10-20', total: 264 })
    const savedBooking = useTravelStore.getState().bookings[0]
    expect(savedBooking.status).toBe('Demo confirmed')
    expect(savedBooking.id).toMatch(/^TR-\d+$/)
    useTravelStore.getState().resetDemo()
  })
})
