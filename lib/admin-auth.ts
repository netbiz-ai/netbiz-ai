import "server-only";
import { createServerSupabase } from "./supabase-server";

export type AdminAuth = { user: { id: string; email: string } };

export async function requireAdmin(): Promise<AdminAuth | null> {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL is not set — content hub cannot start");
  }
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email || user.email !== adminEmail) return null;
  return { user: { id: user.id, email: user.email } };
}
