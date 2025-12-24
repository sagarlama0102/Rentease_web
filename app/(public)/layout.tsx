import Header from "./_components/Header";
import Footer from "./_components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-700">
      
      {/* Global Header */}
      <Header />

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Global Footer */}
      <Footer />
    </div>
    );
}
