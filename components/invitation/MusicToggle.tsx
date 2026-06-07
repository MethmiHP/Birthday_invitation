'use client';

import { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MusicToggle() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const toggleMusic = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio('/birthday-music.mp3');
            audioRef.current.loop = true;
        }

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(err => console.log("Audio play failed:", err));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 z-50 p-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-xl text-white hover:bg-white/30 transition-all"
            title={isPlaying ? "Pause Music" : "Play Music"}
        >
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </motion.button>
    );
}
