'use client';

import { motion } from 'framer-motion';

interface HeroProps {
    name: string;
    age?: number;
}

export default function Hero({ name, age }: HeroProps) {
    return (
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-pink-500/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-700" />

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
                    className="text-pink-400 font-medium tracking-[0.3em] uppercase mt-8 mb-4 text-sm md:text-base"
                >
                    You're Invited to Celebrate
                </motion.h2>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-pink-200 to-purple-300 drop-shadow-2xl font-serif leading-tight"
                >
                    {name}'s <br />
                    <span className="text-pink-500">{age ? `${age}th` : ''} Birthday</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 text-white/60 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed"
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
                        className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-2xl hover:shadow-pink-500/40"
                    >
                        RSVP NOW
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
