'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Heart, Sparkles, Star } from 'lucide-react';

export default function WelcomePopup() {
    const [isOpen, setIsOpen] = useState(true);
    const [state, setState] = useState<'closed' | 'opening' | 'open'>('closed');

    // Prevent scrolling when popup is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const handleOpen = () => {
        setState('opening');
        // Wait for flap animation, then transition to 'open' to slide the card
        setTimeout(() => {
            setState('open');
        }, 600);
    };

    const handleEnter = () => {
        setIsOpen(false);
        window.dispatchEvent(new CustomEvent('celebration-entered'));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-4 font-serif select-none overflow-hidden"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-[#faf5eb]/85 backdrop-blur-md"
                        onClick={() => state === 'open' && setIsOpen(false)}
                    />

                    {/* Drifting petals background */}
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(15)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{
                                    x: Math.random() * 100 + "%",
                                    y: "-10%",
                                    opacity: 0,
                                    scale: 0.5 + Math.random() * 0.5
                                }}
                                animate={{
                                    y: "110vh",
                                    x: [null, `${(Math.random() - 0.5) * 30}%`],
                                    opacity: [0, 0.6, 0.6, 0],
                                    rotate: [0, 180, 360]
                                }}
                                transition={{
                                    duration: 10 + Math.random() * 10,
                                    repeat: Infinity,
                                    delay: Math.random() * 5,
                                    ease: "linear"
                                }}
                                className="absolute text-xl"
                            >
                                {['🌸', '🍃', '✨', '🌹'][i % 4]}
                            </motion.div>
                        ))}
                    </div>

                    {/* 3D Envelope Wrapper */}
                    <div 
                        className="relative w-full max-w-[450px] aspect-[3/2] flex items-center justify-center z-10"
                        style={{ perspective: '1200px' }}
                    >
                        {/* 1. Envelope Back Panel */}
                        <div className="absolute inset-0 bg-[#f4ebd0] border border-[#b38954]/25 rounded-2xl shadow-lg z-0" />

                        {/* 2. Invitation Card (Slides Up) */}
                        <motion.div
                            initial={{ y: 0, scale: 0.92, zIndex: 5 }}
                            animate={
                                state === 'open'
                                    ? { y: '-42%', scale: 1.04, zIndex: 40 }
                                    : state === 'opening'
                                    ? { y: '-10%', scale: 0.95, zIndex: 5 }
                                    : { y: 0, scale: 0.92, zIndex: 5 }
                            }
                            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: state === 'open' ? 0.05 : 0 }}
                            className="absolute w-[92%] h-[122%] bg-gradient-to-br from-white via-[#fdfbf7] to-[#faf5eb] border border-[#b38954]/35 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(179,137,84,0.25)] p-8 flex flex-col items-center justify-between text-center"
                        >
                            {/* Luxury Double Gold Inner Border */}
                            <div className="absolute inset-3.5 border-4 border-double border-[#b38954]/25 rounded-[2rem] pointer-events-none z-10" />

                            {/* Decorative Sparkle at top */}
                            <div className="flex flex-col items-center mt-1 z-20">
                                <Sparkles className="text-[#b38954]/70 mb-2 animate-pulse" size={16} />
                                
                                {/* Elegant Circular Cameo Portrait */}
                                <div className="relative w-36 h-36 rounded-full border-4 border-[#b38954]/55 overflow-hidden shadow-xl bg-[#faf5eb] flex items-center justify-center">
                                    <Image
                                        src="/images/birthday-girl.png"
                                        alt="Birthday Girl"
                                        fill
                                        className="object-cover object-[center_22%]"
                                        sizes="144px"
                                        priority
                                    />
                                    <motion.div
                                        animate={{ scale: [1, 1.15, 1] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="absolute -top-1 -right-1 p-2 bg-[#c77382] rounded-full text-white shadow-md z-10"
                                    >
                                        <Heart fill="currentColor" size={12} />
                                    </motion.div>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col items-center justify-center mt-3 z-20">
                                <h2 className="text-3xl font-black text-[#2c2724] tracking-wide leading-none font-serif">
                                    You're Invited!
                                </h2>
                                
                                {/* Classy gold divider line */}
                                <div className="flex items-center gap-3 justify-center my-2.5 w-full">
                                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#b38954]/50" />
                                    <span className="text-[#b38954]/80 text-[10px]">✦</span>
                                    <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#b38954]/50" />
                                </div>

                                <p className="text-[#2c2724]/75 text-sm font-sans max-w-[260px] leading-relaxed">
                                    Join us for a magical evening of celebration, laughter, and lifelong memories.
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.04, boxShadow: '0 8px 25px rgba(199, 115, 130, 0.35)' }}
                                whileTap={{ scale: 0.96 }}
                                onClick={handleEnter}
                                className="w-[85%] py-3.5 bg-gradient-to-r from-[#df8f9f] via-[#c77382] to-[#7a3547] text-white font-bold rounded-full shadow-[0_4px_15px_rgba(199,115,130,0.25)] font-sans tracking-widest text-xs uppercase relative overflow-hidden z-20 mb-1 border border-white/10"
                            >
                                {/* Shimmer Sweep effect */}
                                <motion.span
                                    className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/25 to-transparent"
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.2 }}
                                />
                                <span className="relative flex items-center justify-center gap-2">
                                    <Sparkles size={14} className="text-[#dfc88a]" />
                                    Enter Celebration
                                    <Sparkles size={14} className="text-[#dfc88a]" />
                                </span>
                            </motion.button>
                        </motion.div>

                        {/* 3. Envelope Flaps */}
                        {/* Left Flap */}
                        <div
                            className="absolute inset-y-0 left-0 w-[51%] bg-[#eddcb9] z-20 shadow-md"
                            style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
                        />

                        {/* Right Flap */}
                        <div
                            className="absolute inset-y-0 right-0 w-[51%] bg-[#eddcb9] z-20 shadow-md"
                            style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}
                        />

                        {/* Bottom Flap */}
                        <div
                            className="absolute inset-x-0 bottom-0 h-[51%] bg-[#e3d3b0] z-25 shadow-md"
                            style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}
                        />

                        {/* Top Flap (folds open in 3D) */}
                        <motion.div
                            style={{
                                transformOrigin: 'top',
                                transformStyle: 'preserve-3d',
                                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                                backfaceVisibility: 'hidden'
                            }}
                            initial={{ rotateX: 0, zIndex: 30 }}
                            animate={
                                state === 'closed'
                                    ? { rotateX: 0, zIndex: 30 }
                                    : { rotateX: -180, zIndex: 10 }
                            }
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-x-0 top-0 h-[51%] bg-[#ecdcb6] shadow-md border-t border-[#b38954]/15"
                        >
                            {/* Inner triangle styling (facing inside when flipped open) */}
                            <div className="absolute inset-0 bg-[#eddcb9] flex items-center justify-center">
                                <Star className="text-[#b38954]/20 rotate-45" size={24} />
                            </div>
                        </motion.div>

                        {/* 4. Wax Seal Button */}
                        <AnimatePresence>
                            {state === 'closed' && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: 'spring', damping: 15 }}
                                    className="absolute z-40 cursor-pointer flex flex-col items-center gap-2"
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleOpen}
                                        className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7a3547] to-[#5a212f] border-4 border-[#b38954] flex items-center justify-center shadow-2xl relative"
                                    >
                                        <Heart fill="#dfc88a" className="text-[#dfc88a] drop-shadow-sm" size={22} />
                                        <span className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping opacity-60" />
                                    </motion.button>
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#b38954] bg-[#faf5eb]/90 px-3 py-1 rounded-full border border-[#b38954]/20 shadow-sm animate-pulse font-sans">
                                        Open Invitation
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
