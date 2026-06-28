'use client';

import { motion } from 'framer-motion';

interface HeroProps {
    name: string;
    age?: number;
}

export default function Hero({ name, age }: HeroProps) {
    return (
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden z-10">
            {/* Decorative warm subtle gradients */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#dfc88a]/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#f5d3da]/20 rounded-full blur-[100px] animate-pulse delay-700" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
            >

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[#b38954] font-bold tracking-[0.3em] uppercase mt-8 mb-4 text-xs md:text-sm"
                >
                    You're Invited to Celebrate
                </motion.h2>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-[#2c2724] drop-shadow-sm font-serif leading-tight"
                >
                    {name}'s <br />
                    <span className="text-[#c77382]">{age ? `${age}th` : ''} Birthday</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 text-[#2c2724]/75 text-lg md:text-xl max-w-xl mx-auto font-sans leading-relaxed"
                >
                    An evening of dinner, music, and celebration. Let's make memories that last a lifetime.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12"
                >
                    <a
                        href="#rsvp"
                        className="px-10 py-4 bg-gradient-to-r from-[#df8f9f] to-[#c77382] hover:from-[#c77382] hover:to-[#7a3547] text-white font-bold rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(199,115,130,0.4)] tracking-wider uppercase text-sm"
                    >
                        RSVP NOW
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
