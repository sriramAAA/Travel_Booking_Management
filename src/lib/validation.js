import { z } from 'zod'

export const bookingSchema = z.object({
  guestName: z.string().min(2, 'Please enter the lead traveler name.'),
  email: z.string().email('Enter a valid email address.'),
  checkIn: z.string().min(1, 'Choose a check-in date.'),
  checkOut: z.string().min(1, 'Choose a check-out date.'),
}).refine((booking) => !booking.checkIn || !booking.checkOut || booking.checkOut > booking.checkIn, {
  message: 'Check-out must be after check-in.',
  path: ['checkOut'],
})
