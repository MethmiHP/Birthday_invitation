'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            toast.success('Welcome back, Admin!');
            router.push('/admin');
        } catch (error: any) {
            toast.error(error.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050510] flex items-center justify-center px-4">
            <Toaster position="top-center" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-pink-500">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Admin Access</h1>
                    <p className="text-white/50 text-sm mt-2">Enter credentials to manage guest list</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                            <input
                                required
                                type="email"
                                placeholder="Admin Email"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                            <input
                                required
                                type="password"
                                placeholder="Password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Login'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
