'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    UserCheck,
    UserX,
    LayoutDashboard,
    LogOut,
    RefreshCw,
    Loader2
} from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';
import GuestList from '@/components/admin/GuestList';
import EventSettings from '@/components/admin/EventSettings';
import { Guest, DashboardStats } from '@/types';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminDashboard() {
    const [guests, setGuests] = useState<Guest[]>([]);
    const [stats, setStats] = useState<DashboardStats>({
        totalInvitees: 0,
        totalAttending: 0,
        totalDeclined: 0,
        totalGuests: 0,
    });
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'guests' | 'settings'>('guests');
    const router = useRouter();

    const fetchData = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('guests')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            const guestList = data as Guest[];
            setGuests(guestList);

            const attendingCount = guestList.filter(g => g.attendance_status === 'attending').length;
            const declinedCount = guestList.filter(g => g.attendance_status === 'declined').length;
            const totalGuestHeadCount = guestList
                .filter(g => g.attendance_status === 'attending')
                .reduce((acc, curr) => acc + (curr.guest_count || 1), 0);

            setStats({
                totalInvitees: guestList.length,
                totalAttending: attendingCount,
                totalDeclined: declinedCount,
                totalGuests: totalGuestHeadCount,
            });
        } catch (error: any) {
            toast.error('Error fetching data');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
            } else {
                setUser(user);
                fetchData();

                // Subscription for realtime updates
                const channel = supabase.channel(`admin-changes-${Math.random()}`);

                channel
                    .on('postgres_changes', { event: '*', table: 'guests' }, () => {
                        fetchData();
                    })
                    .subscribe();

                return () => {
                    supabase.removeChannel(channel);
                };
            }
        };
        checkUser();
    }, [router, fetchData]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen bg-[#050510] flex items-center justify-center">
                <Loader2 className="animate-spin text-pink-500" size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050510] text-white">
            <Toaster position="top-right" />

            {/* Header */}
            <header className="border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl">
                            <LayoutDashboard size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
                            <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Birthday Invitation</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={fetchData}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
                            title="Refresh Data"
                        >
                            <RefreshCw size={20} />
                        </button>
                        <div className="h-6 w-[1px] bg-white/10" />
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-red-500/10 text-white/60 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-red-500/20"
                        >
                            <LogOut size={18} />
                            <span className="hidden sm:inline font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-12">
                {/* Admin Only Text */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-8 flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center text-red-500">
                        <span className="font-bold">!</span>
                    </div>
                    <div>
                        <h4 className="text-red-400 font-bold text-sm uppercase tracking-wider">Restricted Access Area</h4>
                        <p className="text-white/40 text-xs mt-0.5">This dashboard and the data within it are strictly for admin use only. Personal guest information must be handled with confidentiality.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatsCard
                        title="Total RSVPs"
                        value={stats.totalInvitees}
                        icon={Users}
                        color="bg-blue-500"
                        delay={0.1}
                    />
                    <StatsCard
                        title="Attending"
                        value={stats.totalAttending}
                        icon={UserCheck}
                        color="bg-green-500"
                        delay={0.2}
                    />
                    <StatsCard
                        title="Total Guests"
                        value={stats.totalGuests}
                        icon={Users}
                        color="bg-pink-500"
                        delay={0.3}
                    />
                    <StatsCard
                        title="Declined"
                        value={stats.totalDeclined}
                        icon={UserX}
                        color="bg-red-500"
                        delay={0.4}
                    />
                </div>

                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl">
                            <button
                                onClick={() => setActiveTab('guests')}
                                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'guests' ? 'bg-pink-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                            >
                                Guest List
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-pink-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                            >
                                Event Settings
                            </button>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-white/20 uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Live Updates Enabled
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'guests' ? (
                                <GuestList guests={guests} onRefresh={fetchData} />
                            ) : (
                                <EventSettings />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            <footer className="py-12 border-t border-white/5 text-center text-white/20 text-sm">
                <p>&copy; 2026 Admin Panel • Secure Managed Environment</p>
            </footer>
        </div>
    );
}