'use client';

import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function AttendeeCounter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchCount = async () => {
            const { count: guestCount, error } = await supabase
                .from('guests')
                .select('*', { count: 'exact', head: true })
                .eq('attendance_status', 'attending');

            if (!error && guestCount !== null) {
                // We actually want the sum of guest_count for those attending
                const { data, error: sumError } = await supabase
                    .from('guests')
                    .select('guest_count')
                    .eq('attendance_status', 'attending');

                if (!sumError && data) {
                    const total = data.reduce((acc, curr) => acc + (curr.guest_count || 1), 0);
                    setCount(total);
                }
            }
        };

        fetchCount();

        // Subscribe to changes
        const channel = supabase.channel(`attendee-updates-${Math.random()}`);

        channel
            .on('postgres_changes' as any, { event: '*', table: 'guests' }, () => {
                fetchCount();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 bg-[#df8f9f]/10 backdrop-blur-sm border border-[#df8f9f]/30 px-4 py-2 rounded-full text-[#c77382] font-sans text-sm shadow-sm"
        >
            <Users size={18} className="text-[#c77382]" />
            <span className="font-bold">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={count}
                        initial={{ y: 5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -5, opacity: 0 }}
                    >
                        {count}
                    </motion.span>
                </AnimatePresence>{' '}
                People Attending
            </span>
        </motion.div>
    );
}
