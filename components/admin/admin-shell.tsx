import { Sidebar } from "./sidebar";

type Props = {
  userEmail: string;
  children: React.ReactNode;
};

export function AdminShell({ userEmail, children }: Props) {
  return (
    <div className="admin-shell grid grid-cols-1 lg:grid-cols-[240px_1fr] min-h-screen">
      <div className="hidden lg:block">
        <Sidebar userEmail={userEmail} />
      </div>
      <main className="overflow-x-hidden">{children}</main>
    </div>
  );
}
