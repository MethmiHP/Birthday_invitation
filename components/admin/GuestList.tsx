'use client';

import { useState } from 'react';
import { Guest } from '@/types';
import { Search, Filter, Trash2, Download, Phone, MessageSquare } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

interface GuestListProps {
    guests: Guest[];
    onRefresh: () => void;
}

export default function GuestList({ guests, onRefresh }: GuestListProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'attending' | 'declined'>('all');

    const filteredGuests = guests.filter((g) => {
        const matchesSearch = g.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (g.phone && g.phone.includes(searchTerm));
        const matchesFilter = filter === 'all' || g.attendance_status === filter;
        return matchesSearch && matchesFilter;
    });

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this RSVP?')) return;

        const { error } = await supabase.from('guests').delete().eq('id', id);
        if (error) {
            toast.error('Failed to delete');
        } else {
            toast.success('Deleted successfully');
            onRefresh();
        }
    };

    const exportCSV = () => {
        const headers = ['Full Name', 'Phone', 'Guests', 'Status', 'Message', 'Date'];
        const rows = filteredGuests.map(g => [
            g.full_name,
            g.phone || '',
            g.guest_count,
            g.attendance_status,
            g.message || '',
            new Date(g.created_at).toLocaleDateString()
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "guests_list.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                    <input
                        type="text"
                        placeholder="Search guests..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        <select
                            className="w-full md:w-48 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 appearance-none"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as any)}
                        >
                            <option value="all" className="bg-[#1a1a2e]">All RSVPs</option>
                            <option value="attending" className="bg-[#1a1a2e]">Attending</option>
                            <option value="declined" className="bg-[#1a1a2e]">Declined</option>
                        </select>
                    </div>
                    <button
                        onClick={exportCSV}
                        className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white transition-all font-medium"
                    >
                        <Download size={18} />
                        <span className="hidden sm:inline">Export CSV</span>
                    </button>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/10 text-white/50 text-sm uppercase tracking-wider">
                            <th className="px-6 py-4 font-semibold">Guest</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold">Guests</th>
                            <th className="px-6 py-4 font-semibold">Message</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-white">
                        {filteredGuests.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-white/30 italic">No guests found</td>
                            </tr>
                        ) : (
                            filteredGuests.map((guest) => (
                                <tr key={guest.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-bold">{guest.full_name}</div>
                                        {guest.phone && (
                                            <div className="text-xs text-white/40 flex items-center gap-1 mt-1">
                                                <Phone size={10} /> {guest.phone}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${guest.attendance_status === 'attending'
                                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                            }`}>
                                            {guest.attendance_status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-pink-400">{guest.guest_count}</td>
                                    <td className="px-6 py-4 max-w-xs truncate text-white/60">
                                        {guest.message ? (
                                            <div className="flex items-start gap-2" title={guest.message}>
                                                <MessageSquare size={14} className="mt-1 shrink-0 opacity-40" />
                                                <span className="italic">{guest.message}</span>
                                            </div>
                                        ) : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(guest.id)}
                                            className="p-2 text-white/20 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
