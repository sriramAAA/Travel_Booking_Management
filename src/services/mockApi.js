import { destinations, hotels } from '../lib/data'
import { useTravelStore } from '../store/useTravelStore'

const pause = (ms = 260) => new Promise((resolve) => window.setTimeout(resolve, ms))

export async function getDestinations() {
  await pause()
  const hidden = useTravelStore.getState().hiddenDestinations
  return destinations.filter((destination) => !hidden.includes(destination.id))
}

export async function getHotels() {
  await pause()
  const hidden = useTravelStore.getState().hiddenHotels
  return hotels.filter((hotel) => !hidden.includes(hotel.id))
}
