'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2 } from 'lucide-react';

export default function RSVPForm() {
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        guest_count: 1,
        message: '',
        attendance_status: 'attending',
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Check if person already RSVP'd with this phone number
            const { data: existingGuest, error: checkError } = await supabase
                .from('guests')
                .select('id')
                .eq('phone', formData.phone)
                .maybeSingle();

            if (checkError) throw checkError;

            if (existingGuest) {
                toast.error('You have already submitted!');
                setLoading(false);
                return;
            }

            const { error } = await supabase.from('guests').insert([formData]);

            if (error) throw error;

            // Notify Admin via Email
            try {
                await fetch('/api/notify-admin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            } catch (emailError) {
                console.error('Email notification failed:', emailError);
                // We don't throw here to ensure the user still sees their RSVP was successful
            }

            if (formData.attendance_status === 'attending') {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee']
                });
                toast.success('Yay! See you there!');
            } else {
                toast.success("We'll miss you!");
            }

            setSubmitted(true);
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/95 backdrop-blur-lg p-10 rounded-[2.5rem] border-2 border-[#b38954]/20 text-center text-[#2c2724] shadow-[0_15px_40px_rgba(179,137,84,0.12)] max-w-lg mx-auto font-serif relative"
            >
                {/* Inner Gold Frame Border */}
                <div className="absolute inset-3 border-4 border-double border-[#b38954]/30 rounded-[1.8rem] pointer-events-none z-10" />

                <div className="flex justify-center mb-4 text-[#7a947e]">
                    <CheckCircle2 size={64} />
                </div>
                <h3 className="text-2xl font-bold mb-2">RSVP Received!</h3>
                <p className="text-[#2c2724]/75 font-sans">Thank you for letting us know. We have updated the guest list.</p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm underline text-[#c77382] opacity-70 hover:opacity-100 font-sans font-bold"
                >
                    Submit another response
                </button>
            </motion.div>
        );
    }

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white/95 backdrop-blur-lg p-10 rounded-[2.5rem] border-2 border-[#b38954]/20 space-y-6 text-[#2c2724] max-w-lg mx-auto shadow-[0_15px_40px_rgba(179,137,84,0.12)] font-serif relative"
        >
            {/* Inner Gold Frame Border */}
            <div className="absolute inset-3 border-4 border-double border-[#b38954]/30 rounded-[1.8rem] pointer-events-none z-10" />

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-bold mb-1.5 text-[#2c2724] tracking-wide">Full Name</label>
                    <input
                        required
                        type="text"
                        className="w-full bg-[#faf5eb] border border-[#b38954]/30 rounded-xl px-4 py-3 text-[#2c2724] placeholder-[#2c2724]/40 focus:outline-none focus:ring-2 focus:ring-[#c77382]/40 focus:border-[#c77382]/60 transition-all font-sans"
                        placeholder="Enter your name"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-1.5 text-[#2c2724] tracking-wide">Phone Number</label>
                        <input
                            required
                            type="tel"
                            className="w-full bg-[#faf5eb] border border-[#b38954]/30 rounded-xl px-4 py-3 text-[#2c2724] placeholder-[#2c2724]/40 focus:outline-none focus:ring-2 focus:ring-[#c77382]/40 focus:border-[#c77382]/60 transition-all font-sans"
                            placeholder="Your phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1.5 text-[#2c2724] tracking-wide">Number of Guests</label>
                        <input
                            required
                            type="number"
                            min="1"
                            max="10"
                            className="w-full bg-[#faf5eb] border border-[#b38954]/30 rounded-xl px-4 py-3 text-[#2c2724] placeholder-[#2c2724]/40 focus:outline-none focus:ring-2 focus:ring-[#c77382]/40 focus:border-[#c77382]/60 transition-all font-sans"
                            value={formData.guest_count || ''}
                            onFocus={(e) => e.target.select()}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                setFormData({ ...formData, guest_count: isNaN(val) ? 1 : val });
                            }}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1.5 text-[#2c2724] tracking-wide">Attendance</label>
                    <div className="grid grid-cols-2 gap-3 font-sans">
                        {['attending', 'declined'].map((status) => (
                            <button
                                key={status}
                                type="button"
                                onClick={() => setFormData({ ...formData, attendance_status: status as any })}
                                className={`py-3 rounded-xl border transition-all capitalize font-bold ${formData.attendance_status === status
                                    ? 'bg-[#c77382] border-[#c77382] text-white shadow-md shadow-[#c77382]/20'
                                    : 'bg-[#faf5eb] border-[#b38954]/20 text-[#2c2724]/70 hover:bg-[#faf5eb]/80'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1.5 text-[#2c2724] tracking-wide">Birthday Wish (Optional)</label>
                    <textarea
                        rows={3}
                        className="w-full bg-[#faf5eb] border border-[#b38954]/30 rounded-xl px-4 py-3 text-[#2c2724] placeholder-[#2c2724]/40 focus:outline-none focus:ring-2 focus:ring-[#c77382]/40 focus:border-[#c77382]/60 transition-all font-sans"
                        placeholder="Write a message..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                </div>
            </div>

            <button
                disabled={loading}
                type="submit"
                className="w-full bg-gradient-to-r from-[#df8f9f] to-[#c77382] hover:from-[#c77382] hover:to-[#7a3547] text-white font-bold py-4 rounded-xl shadow-md shadow-[#c77382]/10 hover:shadow-[#c77382]/20 transition-all flex items-center justify-center gap-2 font-sans tracking-widest text-sm"
            >
                {loading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                    <>
                        <Send size={20} />
                        SUBMIT RSVP
                    </>
                )}
            </button>
        </motion.form>
    );
}
