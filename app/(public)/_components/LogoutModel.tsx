"use client";

import { X, LogOut } from "lucide-react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
}: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md px-4 animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon Section */}
        <div className="flex flex-col items-center px-8 pt-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <LogOut className="w-6 h-6 text-red-500" />
          </div>

          <h3 className="mt-5 text-xl font-semibold text-gray-900">
            Logout from RENT
            <span className="text-[#99DAB3]">EASE</span>?
          </h3>

          <p className="mt-2 text-center text-sm text-gray-500">
            Are you sure you want to logout ?
          </p>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gray-100" />

        {/* Actions */}
        <div className="flex flex-col gap-3 px-8 pb-8">
          <button
            onClick={onConfirm}
            className="w-full rounded-xl bg-[#142725] py-3 text-sm font-semibold text-white 
                       hover:bg-[#1f3a37] transition-all duration-200 shadow-sm"
          >
            Confirm Logout
          </button>

          <button
            onClick={onClose}
            className="w-full rounded-xl border border-gray-200 py-3 text-sm font-medium 
                       text-gray-700 hover:bg-gray-50 transition-all duration-200"
          >
            Stay Logged In
          </button>
        </div>
      </div>
    </div>
  );
}