# Gogaga Holidays

A responsive React + Vite travel dashboard prototype for holiday package and flight selection workflows.

## Features

- Dashboard and leads module routing with nested layout
- Responsive sidebar + topbar experience (mobile and desktop)
- Holiday tabs: Indian and International
- Package modes: with flights / without flights
- Flight search by destination, airline, city, or airport code
- Passenger selection, travel date filters, hotel standard, meal add-ons
- Outbound and return flight selection with live fare summary
- Dedicated Coming Soon page for unfinished modules

## Routes

- `/` → Dashboard
- `/leads` → Leads booking/selection flow
- Any other nested route → Coming Soon page

## Tech Stack

- React 19
- React Router DOM
- Vite
- Tailwind CSS
- ESLint

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
	components/   # UI building blocks (Topbar, Sidebar, Tabs, Filters, FlightCard)
	data/         # Static flight dataset
	layouts/      # Main layout shell
	pages/        # Dashboard, Leads, ComingSoon
	utils/        # Format helpers (currency, etc.)
```

## Notes

- Airline logos and UI images are served from `public/`.
- Current data is static and can be replaced with API integration later.
