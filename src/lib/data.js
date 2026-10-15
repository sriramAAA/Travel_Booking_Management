export const destinations = [
  { id: 'kyoto', name: 'Kyoto', country: 'Japan', region: 'Asia', category: 'Culture', days: '5 days', price: 1240, rating: 4.9, stays: 128, lat: 35.0116, lng: 135.7681, image: 'photo-1493976040374-85c8e12f0c0e', description: 'Ancient temples, quiet gardens, and little lantern-lit streets make Kyoto a city to wander slowly.' },
  { id: 'amalfi', name: 'Amalfi Coast', country: 'Italy', region: 'Europe', category: 'Coast', days: '7 days', price: 1890, rating: 4.8, stays: 94, lat: 40.6333, lng: 14.6029, image: 'photo-1533105079780-92b9be482077', description: 'Pastel villages tumble toward the Mediterranean on one of Italy’s most beautiful coastlines.' },
  { id: 'bali', name: 'Bali', country: 'Indonesia', region: 'Asia', category: 'Nature', days: '6 days', price: 980, rating: 4.8, stays: 206, lat: -8.4095, lng: 115.1889, image: 'photo-1537996194471-e657df975ab4', description: 'Find your rhythm among emerald rice terraces, surf breaks, and warm island hospitality.' },
  { id: 'marrakech', name: 'Marrakech', country: 'Morocco', region: 'Africa', category: 'Culture', days: '4 days', price: 760, rating: 4.7, stays: 76, lat: 31.6295, lng: -7.9811, image: 'photo-1539020140153-e479b8c22e70', description: 'A sensory maze of spice markets, rooftop dinners, and serene riad courtyards.' },
  { id: 'lisbon', name: 'Lisbon', country: 'Portugal', region: 'Europe', category: 'City', days: '4 days', price: 860, rating: 4.9, stays: 143, lat: 38.7223, lng: -9.1393, image: 'photo-1555881400-74d7acaacd8b', description: 'Golden-hour viewpoints, tiled streets, and the best custard tarts you have ever tasted.' },
  { id: 'banff', name: 'Banff', country: 'Canada', region: 'Americas', category: 'Nature', days: '5 days', price: 1530, rating: 4.9, stays: 68, lat: 51.1784, lng: -115.5708, image: 'photo-1519904981063-b0cf448d479e', description: 'Glacial lakes and mountain air set the scene for a restorative escape into the wild.' },
]

export const hotels = [
  { id: 'h1', name: 'The House Collective', city: 'Kyoto', rating: 4.92, reviews: 328, price: 184, type: 'Boutique hotel', tags: ['Breakfast included', 'Free cancellation'], image: 'photo-1611892440504-42a792e24d32', badge: 'Guest favorite' },
  { id: 'h2', name: 'Machiya Garden Stay', city: 'Kyoto', rating: 4.87, reviews: 214, price: 132, type: 'Traditional home', tags: ['Garden view', 'Free cancellation'], image: 'photo-1600210492486-724fe5c67fb0', badge: 'Rare find' },
  { id: 'h3', name: 'Hotel Il Palazzo', city: 'Amalfi Coast', rating: 4.91, reviews: 187, price: 265, type: 'Seaside hotel', tags: ['Ocean view', 'Pool'], image: 'photo-1571896349842-33c89424de2d', badge: 'Loved by guests' },
  { id: 'h4', name: 'Uma Garden Retreat', city: 'Bali', rating: 4.96, reviews: 442, price: 118, type: 'Resort', tags: ['Pool', 'Breakfast included'], image: 'photo-1571896349842-33c89424de2d', badge: 'Superhost' },
  { id: 'h5', name: 'Casa do Pátio', city: 'Lisbon', rating: 4.84, reviews: 156, price: 146, type: 'Guesthouse', tags: ['City center', 'Free cancellation'], image: 'photo-1600607687939-ce8a6c25118c', badge: 'Guest favorite' },
]

export const upcomingTrips = [
  { id: 'trip-kyo', name: 'A slow week in Kyoto', destination: 'Kyoto, Japan', dates: 'Oct 18 — Oct 24, 2026', image: destinations[0].image, days: 3 },
  { id: 'trip-lis', name: 'Lisbon with friends', destination: 'Lisbon, Portugal', dates: 'Nov 08 — Nov 12, 2026', image: destinations[4].image, days: 24 },
]

export const initialBookings = [
  { id: 'TR-2048', property: 'The House Collective', destination: 'Kyoto, Japan', dates: 'Oct 18 — Oct 24, 2026', status: 'Confirmed', total: 1288, image: hotels[0].image },
]

export const imageUrl = (photo, width = 900) => `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${width}&q=85`
