import Header from "@/app/(public)/_components/Header"; // Adjust this path to your public Header
import Footer from "@/app/(public)/_components/Footer"; // Adjust if you have a Footer component

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Note: In a real app, we would use a Global State (like Context or Redux).
         For now, since your Header handles the UI, we render it here.
      */}
      <Header forceLoggedIn = {true}/> 

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