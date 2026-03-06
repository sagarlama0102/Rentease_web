"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AuthModal from "@/app/(auth)/_components/authModal";
import LoginForm from "@/app/(auth)/_components/LoginForm";
import RegisterForm from "@/app/(auth)/_components/RegisterForm";
import { useRouter } from "next/navigation";
import { handleLogout } from "@/lib/actions/auth-action";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LogoutModal from "./LogoutModel";

interface HeaderProps {
  forceLoggedIn?: boolean;
}

export default function Header({ forceLoggedIn = false }: HeaderProps) {
  const { checkAuth } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  // States
  const [isLoggedIn, setIsLoggedIn] = useState(forceLoggedIn);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "register">("login");

  useEffect(() => {
    const auth = searchParams.get("auth");
    if (auth === "login") {
      setAuthView("login");
      setIsModalOpen(true);
      router.replace("/", { scroll: false });
    }
  }, [searchParams, router]);

  useEffect(() => {
    setIsLoggedIn(forceLoggedIn);
  }, [forceLoggedIn]);

  // Handlers
  const handleClose = () => {
    setIsModalOpen(false);
    if (searchParams.get("auth")) {
      router.replace("/", { scroll: false });
    }
  };

  const openLogin = () => { setAuthView("login"); setIsModalOpen(true); };
  const openRegister = () => { setAuthView("register"); setIsModalOpen(true); };

  const confirmLogout = async () => {
    await handleLogout();
    setIsLoggedIn(false);
    setIsLogoutModalOpen(false);
    router.push("/");
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">
          <Link href="/" className="flex items-center">
            <span className="text-gray-900">RENT</span>
            <span className="text-[#99DAB3]">EASE</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700" aria-label="Main Navigation">
          {!isLoggedIn ? (
            <>
              <Link href="/" className="hover:text-gray-900">Home</Link>
              <Link href="/about" className="hover:text-gray-900">About Us</Link>
              <Link href="#contact" className="hover:text-gray-900">Contact Us</Link>
              <Link href="/properties" className="hover:text-gray-900">Properties</Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="hover:text-gray-900">Dashboard</Link>
              <Link href="/booking" className="hover:text-gray-900">Booking</Link>
              <Link href="/favourite" className="hover:text-gray-900">Favorites</Link>
              <Link href="/profile" className="hover:text-gray-900">Profile</Link>
            </>
          )}
        </nav>

        {/* Auth Buttons / Profile Action */}
        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <button onClick={openLogin} className="text-sm font-medium text-gray-700 hover:text-green-600 transition">
                Login
              </button>
              <button onClick={openRegister} className="rounded-md bg-[#142725] px-4 py-2 text-sm font-semibold text-white hover:bg-green-600 transition">
                Sign Up
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsLogoutModalOpen(true)} 
              className="text-sm font-medium text-red-500 hover:text-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* AUTH MODAL ENGINE */}
      <AuthModal isOpen={isModalOpen} onClose={handleClose}>
        {authView === "login" ? (
          <LoginForm 
            onSwitch={() => setAuthView("register")}
            onLoginSuccess={async (role: string) => {
              await checkAuth();
              setIsLoggedIn(true);
              setIsModalOpen(false);
              router.push(role === 'admin' ? "/admin" : "/dashboard");
            }} 
          />
        ) : (
          <RegisterForm onSwitch={() => setAuthView("login")} />
        )}
      </AuthModal>

      {/* MODERN LOGOUT DIALOG */}
      <LogoutModal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
        onConfirm={confirmLogout} 
      />
    </header>
  );
}