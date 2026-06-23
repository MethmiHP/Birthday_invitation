'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Heart, Sparkles } from 'lucide-react';

export default function WelcomePopup() {
    const [isOpen, setIsOpen] = useState(true);

    // Prevent scrolling when popup is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center px-4"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-[#050510]/95 backdrop-blur-xl"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Content */}
                    <motion.div
                        initial={{ scale: 0.8, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.8, y: 20, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-lg bg-gradient-to-b from-white/10 to-white/5 border border-white/20 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.3)]"
                    >
                        <div className="relative h-80 w-full">
                            <Image
                                src="/images/birthday-girl.png"
                                alt="Birthday Girl"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent" />

                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute top-6 right-6 p-3 bg-pink-500 rounded-full text-white shadow-lg"
                            >
                                <Heart fill="currentColor" size={20} />
                            </motion.div>
                        </div>

                        <div className="p-10 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-purple-300 mb-4 font-serif">
                                    You're Invited!
                                </h2>
                                <p className="text-white/70 text-lg leading-relaxed mb-8">
                                    We're so excited to have you join us for a magical evening of celebration, laughter, and memories.
                                </p>
                            </motion.div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => { setIsOpen(false); window.dispatchEvent(new CustomEvent('celebration-entered')); }}
                                className="group relative px-10 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full font-bold text-white shadow-[0_0_30px_rgba(236,72,153,0.5)] overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative flex items-center justify-center gap-2">
                                    <Sparkles size={18} />
                                    ENTER CELEBRATION
                                </span>
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Floating particles for extra celebration feel */}
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{
                                    x: Math.random() * 100 + "%",
                                    y: Math.random() * 100 + "%",
                                    opacity: 0
                                }}
                                animate={{
                                    y: [null, "-20%"],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: Math.random() * 5 + 5,
                                    repeat: Infinity,
                                    delay: Math.random() * 5
                                }}
                                className="w-1 h-1 bg-pink-400 rounded-full"
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
