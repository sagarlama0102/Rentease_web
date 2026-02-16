import { handleGetMyBookings } from "@/lib/actions/booking-action";
import Link from "next/link";

export default async function UserBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const { page, status } = await searchParams;
  const response = await handleGetMyBookings(page || "1", "10", status);

  if (!response.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-red-500 font-medium">Failed to load bookings.</p>
      </div>
    );
  }

  const bookings = response.data;
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Viewing Requests</h1>
          <p className="text-gray-500 mt-2">Manage and track your property visit appointments</p>
        </div>
        <Link href="/dashboard" className="text-sm font-semibold text-[#99DAB3] hover:underline">
          Browse more properties →
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500">You haven't requested any viewings yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking: any) => {
            // Helper to get image URL
            const imageUrl = booking.property?.propertyImages?.[0] 
              ? `${API_BASE}${booking.property.propertyImages[0]}` 
              : "/placeholder-home.jpg";

            return (
              <div 
                key={booking._id} 
                className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6"
              >
                {/* 1. Property Image */}
                <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <img 
                    src={imageUrl} 
                    alt={booking.property?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* 2. Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#142725] transition-colors">
                        {booking.property?.title || "Property Details Unavailable"}
                      </h3>
                      <span className={`md:hidden px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                        booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                        booking.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {booking.property?.description || "No description provided."}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      📅 Booked on: {new Date(booking.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    
                  </div>
                </div>

                {/* 3. Status Badge (Desktop) */}
                <div className="hidden md:flex flex-col items-end justify-center min-w-[120px]">
                  <span className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase shadow-sm ${
                    booking.status === 'CONFIRMED' ? 'bg-green-600 text-white' :
                    booking.status === 'REJECTED' ? 'bg-red-500 text-white' :
                    'bg-yellow-400 text-[#142725]'
                  }`}>
                    {booking.status}
                  </span>
                  <p className="text-[10px] text-gray-400 mt-2 font-medium italic">
                    {booking.status === 'PENDING' ? 'Awaiting Admin' : 'Decision Finalized'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}