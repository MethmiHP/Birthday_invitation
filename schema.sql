-- GUESTS TABLE
CREATE TABLE IF NOT EXISTS guests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT,
  guest_count INTEGER DEFAULT 1,
  message TEXT,
  attendance_status TEXT CHECK (attendance_status IN ('attending', 'declined')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Realtime for guests table
-- Note: This is usually done in the Supabase Dashboard, but this SQL suggests it.
-- ALTER PUBLICATION supabase_realtime ADD TABLE guests;

-- ADMINS TABLE (Optional, can also use user metadata)
CREATE TABLE IF NOT EXISTS admins (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT
);

-- RLS POLICIES (Row Level Security)
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

-- Allow public to insert RSVP
CREATE POLICY "Public can insert RSVP" ON guests
  FOR INSERT WITH CHECK (true);

-- Allow admins to read all RSVPs
CREATE POLICY "Admins can read all RSVPs" ON guests
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow admins to delete RSVPs
CREATE POLICY "Admins can delete RSVPs" ON guests
  FOR DELETE USING (auth.role() = 'authenticated');

-- Allow public to read count (for live attendee count)
-- Note: In a real production app, you might want a more restricted select policy.
CREATE POLICY "Public can read summary" ON guests
  FOR SELECT USING (true);

-- SETTINGS TABLE
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  birthday_name TEXT NOT NULL,
  birthday_date TIMESTAMP WITH TIME ZONE NOT NULL,
  event_venue TEXT NOT NULL,
  map_url TEXT,
  target_age INTEGER DEFAULT 25,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT single_row CHECK (id = 1)
);

-- Force single row (optional but good practice for singleton settings)
-- INSERT INTO settings (id, birthday_name, birthday_date, event_venue, target_age)
-- VALUES (1, 'Birthdy Person', '2026-10-25T19:00:00Z', 'The Grand Ballroom', 25)
-- ON CONFLICT (id) DO NOTHING;

-- RLS for settings
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Allow public to read settings
CREATE POLICY "Public can read settings" ON settings
  FOR SELECT USING (true);

-- Allow admins to update settings
CREATE POLICY "Admins can update settings" ON settings
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow admins to insert settings (initial setup)
CREATE POLICY "Admins can insert settings" ON settings
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
