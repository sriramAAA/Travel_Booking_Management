import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { initialBookings, upcomingTrips } from '../lib/data'

const starterExpenses = [
  { id: 'ex-1', category: 'Stay', title: 'Machiya reservation deposit', amount: 420, date: '2026-10-18' },
  { id: 'ex-2', category: 'Food', title: 'Dinner at Gion Tanto', amount: 86, date: '2026-10-19' },
  { id: 'ex-3', category: 'Activities', title: 'Tea ceremony for two', amount: 74, date: '2026-10-20' },
]

const starterActivities = [
  { id: 'activity-1', time: '09:00', title: 'Coffee & a slow morning', detail: 'Weekenders Coffee · Higashiyama', type: 'Food' },
  { id: 'activity-2', time: '11:30', title: 'Walk through the red torii gates', detail: 'Fushimi Inari Shrine · 2 hours', type: 'Explore' },
  { id: 'activity-3', time: '14:00', title: 'Lunch at a little noodle shop', detail: 'Near Gion district', type: 'Food' },
  { id: 'activity-4', time: '16:30', title: 'Tea ceremony in a machiya', detail: 'Camellia Flower · Reserved', type: 'Experience' },
]

const starterGroups = [{ id: 'group-1', name: 'Kyoto crew', destination: 'Kyoto, Japan', members: ['Alex', 'Jamie', 'Morgan'], expenses: [{ id: 'share-1', title: 'Machiya deposit', paidBy: 'Alex', amount: 420 }, { id: 'share-2', title: 'Dinner in Gion', paidBy: 'Jamie', amount: 86 }] }]

const starterReviews = [
  { id: 'review-1', name: 'Jamie L.', destination: 'Kyoto', rating: 5, text: 'We found the sweetest little tea house through Tripora. Our itinerary had just enough structure and lots of room to wander.', date: 'September 2026' },
  { id: 'review-2', name: 'Priya R.', destination: 'Amalfi Coast', rating: 5, text: 'The saved stays and trip budget made planning with my sister feel easy. The best part was having all the little notes together.', date: 'August 2026' },
  { id: 'review-3', name: 'Sam W.', destination: 'Bali', rating: 4, text: 'A really thoughtful way to collect places and plan our days. Loved having our group expenses in one place.', date: 'July 2026' },
]

export const useTravelStore = create(persist((set) => ({
  trips: upcomingTrips,
  bookings: initialBookings,
  expenses: starterExpenses,
  activities: starterActivities,
  groups: starterGroups,
  reviews: starterReviews,
  hiddenDestinations: [],
  hiddenHotels: [],
  wishlist: ['amalfi', 'banff'],
  theme: 'light',
  role: 'traveler',
  notifications: 2,
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  toggleWishlist: (id) => set((state) => ({
    wishlist: state.wishlist.includes(id) ? state.wishlist.filter((item) => item !== id) : [...state.wishlist, id],
  })),
  addTrip: (trip) => {
    const id = `trip-${Date.now()}`
    set((state) => ({ trips: [{ ...trip, id, image: 'photo-1464822759023-fed622ff2c3b', days: 0 }, ...state.trips] }))
    return id
  },
  addActivity: (activity) => set((state) => ({ activities: [...state.activities, { ...activity, id: `activity-${Date.now()}`, type: activity.type || 'Plan' }].sort((a, b) => a.time.localeCompare(b.time)) })),
  addBooking: (booking) => set((state) => ({ bookings: [{ ...booking, id: `TR-${Math.floor(1000 + Math.random() * 9000)}`, status: 'Demo confirmed' }, ...state.bookings] })),
  addExpense: (expense) => set((state) => ({ expenses: [{ ...expense, id: `ex-${Date.now()}` }, ...state.expenses] })),
  addGroupExpense: (groupId, expense) => set((state) => ({ groups: state.groups.map((group) => group.id === groupId ? { ...group, expenses: [...group.expenses, { ...expense, id: `share-${Date.now()}` }] } : group) })),
  addGroupMember: (groupId, member) => set((state) => ({ groups: state.groups.map((group) => group.id === groupId && !group.members.includes(member) ? { ...group, members: [...group.members, member] } : group) })),
  addReview: (review) => set((state) => ({ reviews: [{ ...review, id: `review-${Date.now()}`, date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) }, ...state.reviews] })),
  removeReview: (id) => set((state) => ({ reviews: state.reviews.filter((review) => review.id !== id) })),
  toggleDestinationVisibility: (id) => set((state) => ({ hiddenDestinations: state.hiddenDestinations.includes(id) ? state.hiddenDestinations.filter((item) => item !== id) : [...state.hiddenDestinations, id] })),
  toggleHotelVisibility: (id) => set((state) => ({ hiddenHotels: state.hiddenHotels.includes(id) ? state.hiddenHotels.filter((item) => item !== id) : [...state.hiddenHotels, id] })),
  cancelBooking: (id) => set((state) => ({ bookings: state.bookings.map((booking) => booking.id === id ? { ...booking, status: booking.status === 'Cancelled (demo)' ? 'Demo confirmed' : 'Cancelled (demo)' } : booking) })),
  setRole: (role) => set({ role }),
  dismissNotifications: () => set({ notifications: 0 }),
  resetDemo: () => set({ trips: upcomingTrips, bookings: initialBookings, expenses: starterExpenses, activities: starterActivities, groups: starterGroups, reviews: starterReviews, hiddenDestinations: [], hiddenHotels: [], wishlist: ['amalfi', 'banff'], theme: 'light', role: 'traveler', notifications: 2 }),
}), { name: 'tripora-demo-v1' }))
