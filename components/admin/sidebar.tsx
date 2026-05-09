"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, FileText, BookOpen, LogOut } from "lucide-react";

type Props = { userEmail: string };

const NAV = [
  { href: "/admin", label: "Create", icon: Plus, exact: true },
  { href: "/admin/content", label: "Content", icon: FileText, exact: false },
  { href: "/admin/blog", label: "Blog", icon: BookOpen, exact: false },
];

export function Sidebar({ userEmail }: Props) {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-full px-4 py-6 border-r border-[var(--admin-hairline)]">
      <div className="px-2 mb-10">
        <Link href="/admin" className="block">
          <div className="admin-display text-2xl">netbiz.ai</div>
          <div className="admin-marker-muted mt-1 text-[15px]">
            COMMAND CENTER
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={active}
              className="admin-link"
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[var(--admin-hairline)] pt-4 mt-4">
        <div className="admin-marker-muted text-[15px] px-2 mb-2 truncate">
          {userEmail}
        </div>
        <form action="/api/admin/logout" method="post">
          <button type="submit" className="admin-link w-full">
            <LogOut className="h-4 w-4" strokeWidth={1.5} />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
