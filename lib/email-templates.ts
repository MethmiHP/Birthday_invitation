export const getRSVPEmailTemplate = (data: {
    full_name: string;
    guest_count: number;
    message?: string;
    phone?: string;
}) => {
    return `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <div style="background-color: #ec4899; padding: 24px; text-align: center;">
                <h2 style="color: #ffffff; margin: 0; font-size: 24px;">New Reservation Received!</h2>
            </div>
            <div style="padding: 32px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600; width: 35%;">Guest Name</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${data.full_name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Total Guests</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${data.guest_count}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Phone Number</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${data.phone || 'Not provided'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; color: #64748b; font-weight: 600; vertical-align: top;">Message</td>
                        <td style="padding: 12px 0; color: #1e293b; font-style: italic;">"${data.message || 'No message'}"</td>
                    </tr>
                </table>
            </div>
            <div style="background-color: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0; color: #94a3b8; font-size: 13px;">Birthday Management System</p>
            </div>
        </div>
    `;
};
