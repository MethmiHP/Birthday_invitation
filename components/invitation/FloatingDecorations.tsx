'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const DECORATIONS = [
    { type: 'leaf', emoji: '🍃', color: 'text-[#8ba88f]' },
    { type: 'leaf', emoji: '🌿', color: 'text-[#7a947e]' },
    { type: 'petal', emoji: '🌸', color: 'text-[#df8f9f]' },
    { type: 'petal', emoji: '🌹', color: 'text-[#c77382]' },
    { type: 'sparkle', emoji: '✨', color: 'text-[#dfc88a]' },
    { type: 'petal', emoji: '🌺', color: 'text-[#c77382]' },
];

export default function FloatingDecorations() {
    const [elements, setElements] = useState<any[]>([]);

    useEffect(() => {
        // Generate only 16 elements (8 per side) for a clean, elegant look
        const newElements = Array.from({ length: 16 }).map((_, i) => {
            const isRightSide = i % 2 === 0;

            return {
                id: i,
                ...DECORATIONS[Math.floor(Math.random() * DECORATIONS.length)],
                positionSide: isRightSide ? 'right' : 'left',
                sideValue: `${Math.random() * 8}%`, // Keep them tighter to the edges
                initialY: `${Math.random() * 120 - 20}vh`,
                delay: Math.random() * -40,
                duration: 40 + Math.random() * 30, // Even slower, gentle drift
                size: 15 + Math.random() * 20, // Slightly smaller and subtle
                xOffset: (Math.random() - 0.5) * 50, // Minimal sway
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
