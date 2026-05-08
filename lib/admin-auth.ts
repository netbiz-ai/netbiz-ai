import "server-only";
import { createServerSupabase } from "./supabase-server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

if (!ADMIN_EMAIL) {
  throw new Error("ADMIN_EMAIL is not set — content hub cannot start");
}

export type AdminAuth = { user: { id: string; email: string } };

export async function requireAdmin(): Promise<AdminAuth | null> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email || user.email !== ADMIN_EMAIL) return null;
  return { user: { id: user.id, email: user.email } };
}
