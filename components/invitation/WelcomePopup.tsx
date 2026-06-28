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


                    {/* 3D Envelope Wrapper */}
                    <div 
                        className="relative w-full max-w-[450px] aspect-[3/2] flex items-center justify-center z-10"
                        style={{ perspective: '1200px' }}
                    >
                        {/* Gold Glow Backdrop */}
                        <motion.div 
                            animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.03, 0.95] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute inset-4 bg-[#dfc88a]/35 rounded-2xl blur-3xl pointer-events-none"
                        />

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
                            className="absolute w-[92%] h-[122%] bg-white border border-[#b38954]/30 rounded-3xl overflow-hidden shadow-2xl p-6 flex flex-col items-center justify-between text-center"
                        >
                            {/* Inner Gold Frame Border */}
                            <div className="absolute inset-3 border-4 border-double border-[#b38954]/45 rounded-[1.8rem] pointer-events-none z-10" />

                            {/* Elegant Circular Cameo Portrait */}
                            <div className="relative w-36 h-36 rounded-full border-4 border-[#b38954]/35 overflow-hidden shadow-inner bg-[#faf5eb] flex items-center justify-center mt-2">
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

                            <div className="flex-1 flex flex-col items-center justify-center mt-2 space-y-2">
                                <h2 className="text-3xl font-black text-[#2c2724] tracking-wide leading-none font-serif">
                                    You're Invited!
                                </h2>
                                <p className="text-[#2c2724]/75 text-sm font-sans max-w-[280px] leading-relaxed">
                                    Join us for a magical evening of celebration, laughter, and lifelong memories.
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleEnter}
                                className="w-[85%] py-3.5 bg-gradient-to-r from-[#df8f9f] to-[#c77382] hover:from-[#c77382] hover:to-[#7a3547] rounded-full font-bold text-white shadow-md shadow-[#c77382]/20 font-sans tracking-widest text-xs uppercase transition-all duration-300"
                            >
                                Enter Celebration
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
