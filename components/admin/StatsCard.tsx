import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    color: string;
    delay?: number;
}

export default function StatsCard({ title, value, icon: Icon, color, delay = 0 }: StatsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl overflow-hidden relative"
        >
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-[40px] opacity-20 ${color}`} />
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${color} shadow-lg shadow-black/20`}>
                    <Icon className="text-white" size={24} />
                </div>
                <div>
                    <p className="text-white/50 text-sm font-medium uppercase tracking-wider">{title}</p>
                    <h4 className="text-3xl font-bold text-white mt-1 shrink-0">{value}</h4>
                </div>
            </div>
        </motion.div>
    );
}
