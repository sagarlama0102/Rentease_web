// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState } from "react";
// import ThemeToggle from "./ThemeToggle";

// const NAV_LINKS = [
//     { href: "/", label: "Home" },
//     { href: "/about", label: "About" },
// ];

// export default function Header() {
//     const pathname = usePathname();
//     const [open, setOpen] = useState(false);

//     const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

//     return (
//         <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-black/10 dark:border-white/10">
//             <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
//                 <div className="flex h-16 items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] w-full">
//                     {/* Left: Logo */}
//                     <div className="flex items-center gap-2">
//                         <Link href="/" className="flex items-center gap-2 group">
//                             <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background font-semibold">
//                                 M
//                             </span>
//                             <span className="text-base font-semibold tracking-tight group-hover:opacity-80 transition-opacity">
//                                 MyApp
//                             </span>
//                         </Link>
//                     </div>

//                     {/* Center: Desktop Nav */}
//                     <div className="hidden md:flex items-center gap-6 justify-self-center">
//                         {NAV_LINKS.map((link) => (
//                             <Link
//                                 key={link.href}
//                                 href={link.href}
//                                 className={
//                                     "text-sm font-medium transition-colors hover:text-foreground/80 " +
//                                     (isActive(link.href) ? "text-foreground" : "text-foreground/60")
//                                 }
//                             >
//                                 {link.label}
//                             </Link>
//                         ))}
//                     </div>

//                     {/* Right: Auth + Mobile Toggle */}
//                     <div className="flex items-center gap-2 md:justify-self-end">
//                         <div className="hidden sm:flex items-center gap-2">
//                             <Link
//                                 href="/login"
//                                 className="h-9 px-3 inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/15 text-sm font-medium hover:bg-foreground/5 transition-colors"
//                             >
//                                 Log in
//                             </Link>
//                             <Link
//                                 href="/register"
//                                 className="h-9 px-3 inline-flex items-center justify-center rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity"
//                             >
//                                 Sign up
//                             </Link>
//                         </div>

//                         {/* Theme toggle */}
//                         <ThemeToggle />

//                         {/* Mobile hamburger */}
//                         <button
//                             type="button"
//                             onClick={() => setOpen((v) => !v)}
//                             aria-label="Toggle menu"
//                             aria-expanded={open}
//                             className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 dark:border-white/15 hover:bg-foreground/5 transition-colors"
//                         >
//                             {open ? (
//                                 // Close icon
//                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
//                                     <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
//                                 </svg>
//                             ) : (
//                                 // Hamburger icon
//                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
//                                     <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
//                                 </svg>
//                             )}
//                         </button>
//                     </div>
//                 </div>

//                 {/* Mobile panel */}
//                 <div className={"md:hidden overflow-hidden transition-[max-height] duration-300 " + (open ? "max-h-96" : "max-h-0")}>
//                     <div className="pb-4 pt-2 border-t border-black/10 dark:border-white/10">
//                         <div className="flex flex-col gap-2">
//                             {NAV_LINKS.map((link) => (
//                                 <Link
//                                     key={link.href}
//                                     href={link.href}
//                                     onClick={() => setOpen(false)}
//                                     className={
//                                         "rounded-md px-2 py-2 text-sm font-medium transition-colors hover:bg-foreground/5 " +
//                                         (isActive(link.href) ? "text-foreground" : "text-foreground/70")
//                                     }
//                                 >
//                                     {link.label}
//                                 </Link>
//                             ))}

//                             <div className="mt-2 flex items-center gap-2">
//                                 <Link
//                                     href="/login"
//                                     className="flex-1 h-9 px-3 inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/15 text-sm font-medium hover:bg-foreground/5 transition-colors"
//                                 >
//                                     Log in
//                                 </Link>
//                                 <Link
//                                     href="/register"
//                                     className="flex-1 h-9 px-3 inline-flex items-center justify-center rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity"
//                                 >
//                                     Sign up
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </nav>
//         </header>
//     );
// }


"use client";

import Link from "next/link";
import { useState } from "react";
import AuthModal from "@/app/(auth)/_components/authModal";
import LoginForm from "@/app/(auth)/_components/LoginForm";
import RegisterForm from "@/app/(auth)/_components/RegisterForm";
export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          <Link href="/">RENTEASE</Link> 
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
                className="rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600 transition"
              >
                Sign Up
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsLoggedIn(false)} // Simple logout toggle for testing
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
          }} />
        ) : (
          <RegisterForm onSwitch={() => setAuthView("login")} />
        )}
      </AuthModal>
    </header>
  );
}

