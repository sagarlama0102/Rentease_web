
"use client";

import Link from "next/link";
import { useState } from "react";
import AuthModal from "@/app/(auth)/_components/authModal";
import LoginForm from "@/app/(auth)/_components/LoginForm";
import RegisterForm from "@/app/(auth)/_components/RegisterForm";
import { useRouter } from "next/navigation";

// 1. Define the Prop interface
interface HeaderProps {
  forceLoggedIn?: boolean;
}
export default function Header({forceLoggedIn = false}: HeaderProps) {
  
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(forceLoggedIn);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "register">("login");

  // Handlers
  const openLogin = () => { setAuthView("login"); setIsModalOpen(true); };
  const openRegister = () => { setAuthView("register"); setIsModalOpen(true); };

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

        {/* Navigation Links - Dynamically switches based on isLoggedIn */}
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
              <Link href="/properties" className="hover:text-gray-900">Properties</Link>
              <Link href="/book" className="hover:text-gray-900">Book</Link>
              <Link href="/favorites" className="hover:text-gray-900">Favorites</Link>
              <Link href="/profile" className="hover:text-gray-900">Profile</Link>
            </>
          )}
        </nav>

        
        {/* Auth Buttons / Profile Action */}
        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <button 
                onClick={openLogin}
                className="text-sm font-medium text-gray-700 hover:text-green-600 transition"
              >
                Login
              </button>
              <button 
                onClick={openRegister}
                className="rounded-md bg-[#142725] px-4 py-2 text-sm font-semibold text-white hover:bg-green-600 transition"
              >
                Sign Up
              </button>
            </>
          ) : (
            <button 
              onClick={() => {
                if(confirm("Are you sure you want to logout?")){
                  setIsLoggedIn(false);
                  router.push("/");
                }
                
              }} // Simple logout toggle for testing
              className="text-sm font-medium text-red-500 hover:text-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* AUTH MODAL ENGINE */}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {authView === "login" ? (
          <LoginForm onSwitch={() => setAuthView("register")}
          onLoginSuccess={() =>{
            setIsLoggedIn(true); // Change the Navbar
            setIsModalOpen(false); // Close the Modal
            router.push("/dashboard");
          }} />
        ) : (
          <RegisterForm onSwitch={() => setAuthView("login")} />
        )}
      </AuthModal>
    </header>
  );
}

