import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server"

export default async function middleware(req: NextRequest) {
    const session = await auth()
    const path = req.nextUrl.pathname
    
    // Allow access to sign-in and sign-up without session
    if (path === "/sign-in" || path === "/sign-up") {
        return NextResponse.next()
    }
    
    // Redirect to sign-in if no session
    if (!session) {
        return NextResponse.redirect(new URL("/sign-in", req.url))
    }
    
    return NextResponse.next()
}

export const config = {
    matcher: ["/sign-in", "/sign-up", "/dashboard/:path*"]
}
