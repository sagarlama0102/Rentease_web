"use client";

import Link from "next/link";
import { useState } from "react"; // Added useState
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import LogoutModal from "@/app/(public)/_components/LogoutModel";// Ensure path points to your new modal

export default function Header() {
  const { logout, user } = useAuth();
  const router = useRouter();
  
  // State for the custom Logout Modal
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleAdminLogout = async () => {
    await logout();
    setIsLogoutModalOpen(false);
    router.push("/?auth=login");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          
          {/* Left Section */}
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

          {/* Right Section */}
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
              onClick={() => setIsLogoutModalOpen(true)} // Open Custom Modal
              className="px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-lg hover:bg-[#142725] hover:text-white hover:border-[#142725] transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* REUSED MODERN LOGOUT DIALOG */}
      <LogoutModal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
        onConfirm={handleAdminLogout} 
      />
    </header>
  );
}