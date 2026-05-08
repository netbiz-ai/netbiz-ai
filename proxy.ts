import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase-server";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/content/:path*",
    "/api/admin/:path*",
  ],
};
