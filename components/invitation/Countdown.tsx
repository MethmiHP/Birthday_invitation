'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function Countdown({ targetDate }: { targetDate: string }) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = new Date(targetDate).getTime() - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!mounted || !timeLeft) return <div className="h-24"></div>;

    const items = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds },
    ];

    return (
        <div className="flex gap-4 md:gap-8 justify-center">
            {items.map((item, index) => (
                <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-bold text-white shadow-lg">
                        {item.value}
                    </div>
                    <span className="text-white/60 text-xs md:text-sm mt-2 uppercase tracking-widest font-medium">
                        {item.label}
                    </span>
                </motion.div>
            ))}
        </div>
    );
}
