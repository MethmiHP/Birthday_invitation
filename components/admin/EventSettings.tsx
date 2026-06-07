'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, Loader2, Map, Calendar, User, Hash } from 'lucide-react';
import toast from 'react-hot-toast';

export default function EventSettings() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        birthday_name: '',
        birthday_date: '',
        event_venue: '',
        map_url: '',
        target_age: 25,
    });

    useEffect(() => {
        async function fetchSettings() {
            const { data, error } = await supabase.from('settings').select('*').single();
            if (!error && data) {
                // Convert date to local format for datetime-local input
                const date = new Date(data.birthday_date);
                const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
                    .toISOString()
                    .slice(0, 16);

                setSettings({
                    ...data,
                    birthday_date: localDate
                });
            }
            setLoading(false);
        }
        fetchSettings();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const { error } = await supabase
                .from('settings')
                .upsert({
                    id: 1,
                    ...settings,
                    birthday_date: new Date(settings.birthday_date).toISOString()
                });

            if (error) throw error;
            toast.success('Settings updated successfully!');
        } catch (error: any) {
            toast.error(error.message || 'Failed to update settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Save size={20} className="text-pink-500" />
                Event Configuration
            </h3>

            <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/50 flex items-center gap-2">
                            <User size={14} /> Birthday Person Name
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                            value={settings.birthday_name}
                            onChange={(e) => setSettings({ ...settings, birthday_name: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/50 flex items-center gap-2">
                            <Hash size={14} /> Turning Age
                        </label>
                        <input
                            type="number"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                            value={settings.target_age}
                            onChange={(e) => setSettings({ ...settings, target_age: parseInt(e.target.value) })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/50 flex items-center gap-2">
                            <Calendar size={14} /> Event Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                            value={settings.birthday_date}
                            onChange={(e) => setSettings({ ...settings, birthday_date: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/50 flex items-center gap-2">
                            <Map size={14} /> Venue Name
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                            value={settings.event_venue}
                            onChange={(e) => setSettings({ ...settings, event_venue: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/50 flex items-center gap-2">
                        <Map size={14} /> Google Maps Embed URL
                    </label>
                    <input
                        type="text"
                        placeholder="https://google.com/maps/embed?..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 text-sm"
                        value={settings.map_url}
                        onChange={(e) => setSettings({ ...settings, map_url: e.target.value })}
                    />
                    <p className="text-[10px] text-white/30 italic">Tip: Use the 'Embed a map' option in Google Maps share menu.</p>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full md:w-auto px-8 py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Update Invitation Details
                </button>
            </form>
        </div>
    );
}
