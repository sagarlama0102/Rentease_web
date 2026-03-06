"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/property", label: "Property" },
  { href: "/admin/booking", label: "Bookings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname?.startsWith(href);

  return (
    <aside className="fixed md:static top-0 left-0 h-screen w-64 bg-white border-r border-gray-200">
      
      {/* Brand */}
      <div className="px-6 py-6 border-b border-gray-100">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-[#99DAB3] text-white flex items-center justify-center font-semibold">
            A
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Admin Panel
            </p>
            <p className="text-xs text-gray-400">
              RentEase Control
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="px-4 py-6 space-y-2">
        {ADMIN_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`
              flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition
              ${
                isActive(link.href)
                  ? "bg-[#99DAB3] text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }
            `}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}