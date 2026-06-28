'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const DECORATIONS = [
    { type: 'flower', emoji: '🌸', color: 'text-pink-300' },
    { type: 'flower', emoji: '🌹', color: 'text-rose-400' },
    { type: 'flower', emoji: '🌺', color: 'text-pink-200' },
];

export default function FloatingDecorations() {
    const [elements, setElements] = useState<any[]>([]);

    useEffect(() => {
        const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 640;
        const count = isMobileDevice ? 8 : 16; // Fewer flowers on mobile (4 per side instead of 8)

        const newElements = Array.from({ length: count }).map((_, i) => {
            const isRightSide = i % 2 === 0;

            return {
                id: i,
                ...DECORATIONS[Math.floor(Math.random() * DECORATIONS.length)],
                positionSide: isRightSide ? 'right' : 'left',
                // Keep them tightly stuck to the screen margins on mobile so they don't cover text/cards
                sideValue: isMobileDevice ? `${Math.random() * 2.5}%` : `${Math.random() * 8}%`,
                initialY: `${Math.random() * 120 - 20}vh`,
                delay: Math.random() * -40,
                duration: 40 + Math.random() * 30, // Gentle drift
                // Smaller size on mobile (10px - 18px) to be extremely subtle and prevent overlap
                size: isMobileDevice ? (10 + Math.random() * 8) : (15 + Math.random() * 20),
                // Minimal horizontal sway on mobile to keep them in the side margins
                xOffset: isMobileDevice ? (Math.random() - 0.5) * 12 : (Math.random() - 0.5) * 50,
            };
        });
        setElements(newElements);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
            {elements.map((el) => (
                <motion.div
                    key={el.id}
                    initial={{ y: el.initialY, x: 0, opacity: 0 }}
                    animate={{
                        y: ['110vh', '-20vh'],
                        x: [el.xOffset * -1, el.xOffset],
                        opacity: [0, 0.35, 0.35, 0],
                        rotate: [0, 45, -45, 0],
                    }}
                    transition={{
                        duration: el.duration,
                        repeat: Infinity,
                        delay: el.delay,
                        ease: "linear"
                    }}
                    style={{
                        fontSize: el.size,
                        [el.positionSide]: el.sideValue // This dynamically sets left or right
                    }}
                    className={`absolute ${el.color} filter drop-shadow-[0_0_6px_rgba(179,137,84,0.15)]`}
                >
                    {el.emoji}
                </motion.div>
            ))}
        </div>
    );
}
