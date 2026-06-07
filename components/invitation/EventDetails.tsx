'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Share2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';

interface EventDetailsProps {
    date: string;
    venue: string;
    mapUrl: string;
}

export default function EventDetails({ date, venue, mapUrl }: EventDetailsProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const eventDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const eventTime = new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const shareUrl = mounted ? window.location.href : '';

    const handleShare = () => {
        const text = `You're invited to my birthday party! Check out the details here: ${shareUrl}`;

        if (navigator.share) {
            navigator.share({
                title: 'Birthday Invitation',
                text: text,
                url: shareUrl
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(shareUrl);
            toast.success('Link copied to clipboard!');
        }
    };

    return (
        <section className="py-20 px-4 bg-white/5 rounded-[3rem] mx-4 border border-white/10 mb-20">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-4"
                    >
                        <div className="p-4 bg-pink-500/20 rounded-2xl text-pink-400">
                            <Calendar size={28} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-xl">When</h4>
                            <p className="text-white/60">{eventDate}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-start gap-4"
                    >
                        <div className="p-4 bg-purple-500/20 rounded-2xl text-purple-400">
                            <Clock size={28} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-xl">Time</h4>
                            <p className="text-white/60">{eventTime} Onwards</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-start gap-4"
                    >
                        <div className="p-4 bg-blue-500/20 rounded-2xl text-blue-400">
                            <MapPin size={28} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-xl">Where</h4>
                            <p className="text-white/60">{venue}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="pt-6 flex gap-4 flex-wrap"
                    >
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white transition-all"
                        >
                            <Share2 size={18} />
                            Share Invitation
                        </button>
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent("Join us for my birthday celebration! " + (mounted ? window.location.href : ''))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/10 rounded-xl text-green-400 transition-all font-medium"
                        >
                            Share on WhatsApp
                        </a>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative group"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="relative overflow-hidden rounded-3xl border border-white/20 h-[400px] w-full bg-white/5 flex items-center justify-center">
                        {mapUrl && mapUrl.startsWith('http') ? (
                            <iframe
                                src={mapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        ) : (
                            <div className="text-center p-8">
                                <MapPin size={48} className="mx-auto mb-4 text-white/20" />
                                <p className="text-white/40 font-medium">Venue Map will appear here</p>
                                <p className="text-white/20 text-xs mt-2">Add a Google Maps Embed URL in Settings</p>
                            </div>
                        )}
                    </div>

                    <div className="absolute -bottom-6 -right-6 p-4 bg-white rounded-2xl shadow-2xl hidden md:block">
                        {mounted && <QRCodeSVG value={window.location.href} size={100} />}
                        <p className="text-[10px] text-center mt-2 font-bold text-gray-400">SCAN TO VIEW</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
