"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleAdminLogout = async () => {
    if (confirm("Are you sure you want to logout of the Admin Panel?")) {
      await logout();
      router.push("/?auth=login");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          
          {/* Left */}
          <div className="flex items-center gap-8">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#99DAB3] text-white font-semibold">
                A
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Admin Panel
                </p>
                <p className="text-xs text-gray-400">
                  RentEase Management
                </p>
              </div>
            </Link>

            <Link
              href="/dashboard"
              className="text-sm text-gray-500 hover:text-gray-900 transition"
            >
              View Website
            </Link>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#99DAB3] text-white text-sm font-medium">
                {user?.email?.[0]?.toUpperCase() || "A"}
              </div>
              <div>
                <p className="text-xs text-gray-400">Logged in as</p>
                <p className="text-sm font-medium text-gray-900">
                  {user?.email?.split("@")[0] || "Administrator"}
                </p>
              </div>
            </div>

            <button
              onClick={handleAdminLogout}
              className="px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-lg hover:bg-[#99DAB3] hover:text-white hover:border-[#99DAB3] transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}