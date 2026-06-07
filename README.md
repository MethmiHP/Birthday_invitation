# Birthday Invitation App

A modern, full-stack birthday invitation web application built with Next.js, Tailwind CSS, and Supabase.

## Features
- **Public Invitation**: Animated landing page with hero, countdown, and event details.
- **Realtime RSVP**: Attendees counter updates instantly across all users.
- **Admin Dashboard**: Protected panel to manage guests, view stats, and export CSV.
- **Mobile Responsive**: Designed for all devices.
- **Elegant UI**: Glassmorphism, smooth animations (Framer Motion), and confetti.

## Tech Stack
- Next.js (App Router)
- Supabase (PostgreSQL, Auth, Realtime)
- Tailwind CSS
- Framer Motion
- Lucide Icons
- Canvas Confetti
- QR Code Support

## Setup Instructions

### 1. Supabase Setup
- Create a new project on [Supabase](https://supabase.com).
- Run the SQL provided in `schema.sql` in the Supabase SQL Editor.
- Enable **Realtime** for the `guests` table (Database > Replication > Tables).
- Go to Authentication > Providers and ensure Email is enabled. Create an admin user manually.

### 2. Environment Variables
Rename `.env.example` to `.env.local` and fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_BIRTHDAY_NAME="John Doe"
NEXT_PUBLIC_BIRTHDAY_DATE="2026-10-25T19:00:00"
NEXT_PUBLIC_EVENT_VENUE="The Grand Ballroom..."
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL="..."
```

### 3. Installation
```bash
npm install
```

### 4. Run Locally
```bash
npm run dev
```

## Deployment
- Push to GitHub.
- Connect to Vercel.
- Add environment variables in Vercel settings.
