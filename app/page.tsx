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
import confetti from 'canvas-confetti';

export default function Home() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleEnter = () => {
      // Trigger a beautiful, elegant sparkle confetti burst
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#dfc88a', '#c77382', '#faf5eb', '#df8f9f', '#b38954'],
        shapes: ['star', 'circle'],
        scalar: 1.2,
      });
    };

    window.addEventListener('celebration-entered', handleEnter, { once: true });
    return () => window.removeEventListener('celebration-entered', handleEnter);
  }, []);

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
    <main className="min-h-screen bg-transparent text-[#2c2724] selection:bg-rose-100 selection:text-rose-800 overflow-x-hidden relative font-serif">
      <Toaster position="top-center" />
      <WelcomePopup />
      <FloatingDecorations />

      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(179,137,84,0.06),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(199,115,130,0.05),rgba(255,255,255,0))]" />
      </div>

      <MusicToggle />

      <Hero name={birthdayName} age={age} />

      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#b38954] to-[#7a3547] font-serif">
            Counting Down the Days
          </h3>
          <Countdown targetDate={birthdayDate} />
        </div>
      </section>

      <EventDetails date={birthdayDate} venue={venue} mapUrl={mapUrl} />

      <section id="rsvp" className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#2c2724] font-serif">Will You Join Us?</h2>
          <p className="text-[#2c2724]/75 text-lg font-sans">Please RSVP by October 15th to help us with arrangements.</p>
        </div>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center mb-12">
            <AttendeeCounter />
          </div>
          <RSVPForm />
        </div>
      </section>

      <footer className="py-20 text-center text-[#2c2724]/60 text-sm flex flex-col items-center justify-center gap-4 relative z-10">
        <div>
          <p>&copy; 2026 {birthdayName}'s Birthday Bash. All rights reserved.</p>
          <p className="mt-2 italic text-[#2c2724]/40">Design with ❤️ for a special day.</p>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-[#2c2724]/60 mt-2 px-4 py-2 rounded-full border border-[#b38954]/20 bg-white/50 backdrop-blur-sm shadow-sm">
          <span>Created by</span>
          <a href="https://unovar.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-100 transition-opacity duration-300">
            <img 
              src="/images/logo.png" 
              alt="Unovar Logo" 
              className="h-5 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
            />
          </a>
        </div>

        <div className="mt-4">
          <a
            href="/login"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#b38954]/20 hover:border-[#b38954]/40 hover:bg-white/50 text-[#2c2724]/70 hover:text-[#2c2724] transition-all text-xs uppercase tracking-widest font-bold bg-white/30 backdrop-blur-sm shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c77382] animate-pulse" />
            Admin Access
          </a>
        </div>
      </footer>
    </main>
  );
}
