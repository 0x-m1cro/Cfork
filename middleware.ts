import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware for logging and request processing
 */
export function middleware(request: NextRequest) {
  // Log the request
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${request.method} ${request.nextUrl.pathname}`);

  // Add CORS headers for API routes
  if (request.nextUrl.pathname.startsWith("/api")) {
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return new NextResponse(null, { status: 200, headers: response.headers });
    }

    return response;
  }

  return NextResponse.next();
}

/**
 * Configure which routes use this middleware
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
