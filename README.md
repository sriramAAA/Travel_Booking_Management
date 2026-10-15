# Tripora

Tripora is a standalone travel discovery and planning application built with React and JavaScript. It runs entirely in the browser with realistic sample data—there is no backend, paid API key, real reservation, or payment collection.

## Features

- Destination discovery with search, regional filters, wishlist controls, map previews, and OpenStreetMap tiles.
- Stay search with city search, nightly price filtering, sorting, reviews/rating summaries, and a validated demo booking flow.
- Local traveler dashboard with upcoming trips, booking notes, spending summary, and destination inspiration.
- Trip creation, a sample day-by-day itinerary, CSV export, and browser print-to-PDF.
- Group trip crew management, shared expense records, and equal expense splitting.
- Traveler review notes with validated submission and local persistence.
- Demo admin controls to publish/hide sample destinations and stays, cancel/restore local booking records, moderate local reviews, and reset the browser demo.
- Expense tracking with category breakdown, validation, and CSV download.
- Sample flight, train, and bus comparisons (planning data only).
- Wishlist, notifications, dark/light appearance, and traveler/admin demo modes.
- Responsive desktop and mobile navigation with keyboard-visible focus states.

### Demo data and privacy

Destinations, stays, transport routes, reviews, and several dashboard examples are mock data. New trips, expenses, wishlist selections, preferences, and demo bookings are stored in the browser's `localStorage` using Zustand persistence. A booking is only a local planning record; Tripora does not contact a hotel, issue a ticket, or process payment. Reset local data from **Demo admin → Enter admin mode → Reset demo data**.

Photographs are loaded from Unsplash image URLs. Map tiles are provided by OpenStreetMap; those external images and tiles require an internet connection. The application itself requires no API credentials.

## Technology

- React 19 + Vite
- JavaScript (ES modules; no TypeScript source or configuration)
- Tailwind CSS 4 plus a small custom CSS design system
- React Router DOM, Zustand, TanStack Query
- React Hook Form + Zod
- Recharts, Leaflet + React Leaflet, date-fns, Lucide React
- Vitest + React Testing Library, Playwright

## Getting started

Requirements: Node.js 20.19+ (or 22.12+) and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The app is ready to explore without registering or configuring a service.

## Scripts

```sh
npm run dev          # Start the Vite development server
npm run build        # Create a production bundle in dist/
npm run preview      # Preview the production bundle
npm run lint         # Lint JavaScript and JSX
npm test             # Run focused unit tests with Vitest
npm run test:watch   # Run Vitest in watch mode
npm run test:e2e     # Run Playwright browser journeys
```

For Playwright, install its Chromium browser once if it is not already available:

```sh
npx playwright install chromium
```

## Deployment

Run `npm run build` and deploy the generated `dist/` directory to a static host. Configure the host to serve `index.html` for application routes (SPA history fallback). No server-side environment variables or API credentials are required.

## Project structure

```text
src/
  App.jsx                    Application routes and shared navigation
  features/
    admin/                   Demo management workspace
    booking/                 Local demo booking checkout and confirmation
    budget/                  Expense tracker and chart
    dashboard/               Traveler overview
    destinations/            Destination discovery and map
    expenses/                Validated expense entry
    group-trips/             Shared planning and even expense splits
    home/                    Public landing page
    hotels/                  Stay discovery and demo booking
    itinerary/               Day schedule and export tools
    reviews/                 Traveler notes and rating form
    shared/                  Reusable feature UI (map)
    transport/               Mock route comparison
    trips/                   Trip planner and itinerary
    wishlist/                Saved places and stays
  lib/                       Sample data, validation, selectors
  services/                  Local mock async services
  store/                     Persisted traveler state
  tests/                     Vitest unit tests and setup
  utils/                     CSV and print helpers
e2e/                         Playwright journeys
```
