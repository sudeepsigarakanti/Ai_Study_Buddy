import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    try {
        // Clear the authentication token cookie
        const cookieStore = await cookies();
        cookieStore.delete('token');

        return NextResponse.json(
            { success: true, message: 'Logged out successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { success: false, message: 'Logout failed' },
            { status: 500 }
        );
    }
}
