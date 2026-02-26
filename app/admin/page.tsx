import { 
  Users, 
  Home, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Building2,
  LayoutDashboard
} from "lucide-react";
import { handleGetAllUsers } from "@/lib/actions/admin/user-action";
import { handleGetAllProperty } from "@/lib/actions/admin/property-action";
import { handleAdminGetAllBookings } from "@/lib/actions/admin/booking-action";

export default async function Page() {
    const [usersRes, propertiesRes, bookingsRes] = await Promise.all([
        handleGetAllUsers("1", "10000"),
        handleGetAllProperty("1", "10000"),
        handleAdminGetAllBookings("1", "10000"),
    ]);

    const users = usersRes.success ? usersRes.data || [] : [];
    const properties = propertiesRes.success ? propertiesRes.data || [] : [];
    const bookings = bookingsRes.success ? bookingsRes.data || [] : [];

    const bookedPropertyIds = new Set<string>();
    for (const b of bookings) {
        const pid = b?.property?._id || b?.property;
        if (pid) bookedPropertyIds.add(pid);
    }

    const bookedProperties = properties.filter((p: any) => bookedPropertyIds.has(p._id));
    const availableProperties = properties.filter((p: any) => !bookedPropertyIds.has(p._id));

    return (
        <div className="space-y-6">
            {/* Header Area */}
            <div className="flex items-center gap-2 mb-2">
                <LayoutDashboard className="text-[#a3e6ba]" size={24} />
                <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
            </div>

            {/* Stats Grid - Matching your thin border style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Users" value={users.length} />
                <StatCard title="Total Properties" value={properties.length} />
                <StatCard title="Booked Properties" value={bookedPropertyIds.size} />
                <StatCard title="Available Properties" value={availableProperties.length} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {/* Main Section: Recently Booked */}
                <section className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Recently Booked Properties</h2>
                    <div className="space-y-4">
                        {bookedProperties.length === 0 ? (
                            <p className="text-sm text-gray-400 italic">No properties are currently booked.</p>
                        ) : (
                            bookedProperties.slice(0, 6).map((p: any) => (
                                <div key={p._id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{p.title || p.name}</p>
                                        <p className="text-[11px] text-gray-400 uppercase tracking-tighter">ID: #{p._id?.slice(-6)}</p>
                                    </div>
                                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded">
                                        Booked
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* Aside: Available List */}
                <aside className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Available Properties</h2>
                    <ul className="space-y-4">
                        {availableProperties.slice(0, 5).map((p: any) => (
                            <li key={p._id} className="flex items-center justify-between group cursor-pointer">
                                <div className="max-w-[80%]">
                                    <p className="text-sm font-medium text-gray-700 truncate">{p.title || p.name}</p>
                                    <p className="text-[10px] text-gray-400">ID: #{p._id?.slice(-6)}</p>
                                </div>
                                <span className="text-[10px] font-bold text-[#4ade80] group-hover:underline">
                                    Available
                                </span>
                            </li>
                        ))}
                    </ul>
                    <button className="w-full mt-6 py-2 bg-[#a3e6ba] text-gray-800 text-sm font-bold rounded-lg hover:bg-[#86d9a3] transition-colors">
                        View All Listings
                    </button>
                </aside>
            </div>
        </div>
    );
}

/* --- Reusable Stat Card matching the image border/text style --- */
function StatCard({ title, value }: { title: string, value: number | string }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-300 shadow-sm flex flex-col justify-between h-32">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="text-4xl font-bold text-gray-900">{value}</h3>
    </div>
  );
}