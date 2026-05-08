import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminAuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await requireAdmin();
  if (!auth) redirect("/admin/login");

  return <AdminShell userEmail={auth.user.email}>{children}</AdminShell>;
}
