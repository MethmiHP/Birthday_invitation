import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { getRSVPEmailTemplate } from '@/lib/email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { full_name } = body;

        const adminEmail = process.env.ADMIN_EMAIL || 'methmionline@gmail.com';

        const { data, error } = await resend.emails.send({
            from: 'Birthday Invitation <onboarding@resend.dev>',
            to: [adminEmail],
            subject: `🎉 New RSVP: ${full_name}`,
            html: getRSVPEmailTemplate(body),
        });

        if (error) {
            return NextResponse.json({ error }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
