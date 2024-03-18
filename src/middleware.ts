import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
    const { pathname, origin } = req.nextUrl;
    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === "production"
    })

    if (pathname == '/') {
        if (!session) return NextResponse.redirect("localhost:3000/");
    }

    if (pathname == '/auth') {
        if (session) return NextResponse.redirect(`${origin}`);
    }
}