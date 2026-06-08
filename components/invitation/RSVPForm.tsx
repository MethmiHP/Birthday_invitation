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
                className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 text-center text-white"
            >
                <div className="flex justify-center mb-4 text-green-400">
                    <CheckCircle2 size={64} />
                </div>
                <h3 className="text-2xl font-bold mb-2">RSVP Received!</h3>
                <p className="text-white/70">Thank you for letting us know. We have updated the guest list.</p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm underline opacity-50 hover:opacity-100"
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
            className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 space-y-6 text-white max-w-lg mx-auto"
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1 opacity-70">Full Name</label>
                    <input
                        required
                        type="text"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"
                        placeholder="Enter your name"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 opacity-70">Phone Number</label>
                        <input
                            required
                            type="tel"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"
                            placeholder="Your phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 opacity-70">Number of Guests</label>
                        <input
                            required
                            type="number"
                            min="1"
                            max="10"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"
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
                    <label className="block text-sm font-medium mb-1 opacity-70">Attendance</label>
                    <div className="grid grid-cols-2 gap-3">
                        {['attending', 'declined'].map((status) => (
                            <button
                                key={status}
                                type="button"
                                onClick={() => setFormData({ ...formData, attendance_status: status as any })}
                                className={`py-3 rounded-xl border transition-all capitalize ${formData.attendance_status === status
                                    ? 'bg-pink-600 border-pink-500 shadow-lg shadow-pink-500/30'
                                    : 'bg-white/5 border-white/10 opacity-70 hover:opacity-100 hover:bg-white/10'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 opacity-70">Birthday Wish (Optional)</label>
                    <textarea
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"
                        placeholder="Write a message..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                </div>
            </div>

            <button
                disabled={loading}
                type="submit"
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2"
            >
                {loading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                    <>
                        <Send size={20} />
                        Submit RSVP
                    </>
                )}
            </button>
        </motion.form>
    );
}
