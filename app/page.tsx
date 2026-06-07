'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Hero from '@/components/invitation/Hero';
import Countdown from '@/components/invitation/Countdown';
import EventDetails from '@/components/invitation/EventDetails';
import RSVPForm from '@/components/invitation/RSVPForm';
import AttendeeCounter from '@/components/invitation/AttendeeCounter';
import MusicToggle from '@/components/invitation/MusicToggle';
import FloatingDecorations from '@/components/invitation/FloatingDecorations';
import WelcomePopup from '@/components/invitation/WelcomePopup';
import { Toaster } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from('settings').select('*').single();
      if (data) {
        setSettings(data);
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center">
        <Loader2 className="animate-spin text-pink-500" size={48} />
      </div>
    );
  }

  const birthdayName = settings?.birthday_name || process.env.NEXT_PUBLIC_BIRTHDAY_NAME || "John Doe";
  const birthdayDate = settings?.birthday_date || process.env.NEXT_PUBLIC_BIRTHDAY_DATE || "2026-10-25T19:00:00";
  const venue = settings?.event_venue || process.env.NEXT_PUBLIC_EVENT_VENUE || "The Grand Ballroom";
  const mapUrl = settings?.map_url || process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || "";
  const age = settings?.target_age || 25;

  return (
    <main className="min-h-screen bg-[#0a0a1a] text-white selection:bg-pink-500/30 selection:text-pink-200 overflow-x-hidden">
      <Toaster position="top-center" />
      <WelcomePopup />
      <FloatingDecorations />

      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(236,72,153,0.15),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(139,92,246,0.1),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(236,72,153,0.1),rgba(255,255,255,0))]" />
        <div className="absolute inset-x-0 bottom-0 top-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <MusicToggle />

      <Hero name={birthdayName} age={age} />

      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-200 to-purple-200">
            Counting Down the Days
          </h3>
          <Countdown targetDate={birthdayDate} />
        </div>
      </section>

      <EventDetails date={birthdayDate} venue={venue} mapUrl={mapUrl} />

      <section id="rsvp" className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Will You Join Us?</h2>
          <p className="text-white/60 text-lg">Please RSVP by October 15th to help us with arrangements.</p>
        </div>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center mb-12">
            <AttendeeCounter />
          </div>
          <RSVPForm />
        </div>
      </section>

      <footer className="py-20 text-center text-white/30 text-sm">
        <p>&copy; 2026 {birthdayName}'s Birthday Bash. All rights reserved.</p>
        <p className="mt-2 italic">Design with ❤️ for a special day.</p>

        <div className="mt-8">
          <a
            href="/login"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 hover:border-white/20 hover:bg-white/5 hover:text-white transition-all text-xs uppercase tracking-widest font-bold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
            Admin Access
          </a>
        </div>
      </footer>
    </main>
  );
}
