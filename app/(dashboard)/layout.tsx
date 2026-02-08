import Header from "@/app/(public)/_components/Header"; // Adjust this path to your public Header
import Footer from "@/app/(public)/_components/Footer"; // Adjust if you have a Footer component
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // 1. Check for the cookie on the server
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");

  // 2. Security: If no token, bounce them to login
  // This prevents the "Manually writing dashboard in URL" trick
  if (!token) {
      redirect("/login");
  }
  return (
    <div className="flex flex-col min-h-screen">
      {/* Note: In a real app, we would use a Global State (like Context or Redux).
         For now, since your Header handles the UI, we render it here.
      */}
      <Header forceLoggedIn = {!!token}/> 

      {/* This is where your Dashboard page content will appear */}
      <main className="flex-grow bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-10">
          {children}
        </div>
      </main>

      {/* Shared Footer for the dashboard */}
      <footer className="w-full bg-white border-t py-8 text-center text-gray-500 text-sm">
        <Footer />
        
      </footer>
    </div>
  );
}