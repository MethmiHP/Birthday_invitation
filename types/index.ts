export type AttendanceStatus = 'attending' | 'declined';

export interface Guest {
    id: string;
    full_name: string;
    phone?: string;
    guest_count: number;
    message?: string;
    attendance_status: AttendanceStatus;
    created_at: string;
}

export interface DashboardStats {
    totalInvitees: number;
    totalAttending: number;
    totalDeclined: number;
    totalGuests: number;
}

export interface Settings {
    id: number;
    birthday_name: string;
    birthday_date: string;
    event_venue: string;
    map_url?: string;
    target_age: number;
    updated_at: string;
}
