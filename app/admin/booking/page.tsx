import { handleAdminGetAllBookings } from "@/lib/actions/admin/booking-action";
import BookingActionButtons from "./components/BookingActionButton";
import Image from "next/image";

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const { page, status } = await searchParams;
  const response = await handleAdminGetAllBookings(page || "1", "10", status);

  if (!response.success) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-500 font-medium border border-red-200 bg-red-50 inline-block px-6 py-3 rounded-lg">
          Error: {response.message || "Failed to load bookings"}
        </p>
      </div>
    );
  }

  const bookings = response.data;
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
        <p className="text-sm text-gray-500">Review and manage viewing requests from all users.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-gray-400 text-[11px] uppercase tracking-wider">
              <th className="py-4 px-6 font-semibold">User Details</th>
              <th className="py-4 px-4 font-semibold">Property</th>
              <th className="py-4 px-4 font-semibold">Request Date</th>
              <th className="py-4 px-4 font-semibold">Status</th>
              <th className="py-4 px-6 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-400 italic">
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking: any) => (
                
                
                <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors">
                  {/* USER INFO CELL - Matches your User Table style */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {booking.user?.profilePicture ? (
                        <Image
                          src={`${API_BASE}${booking.user.profilePicture}`}
                          alt="User"
                          width={36}
                          height={36}
                          className="rounded-full object-cover border border-gray-100"
                        />
                      ) : (
                        <div className="w-9 h-9 bg-[#99DAB3] text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                          {booking.user?.email?.[0]?.toUpperCase() || "U"}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold text-gray-900 leading-none mb-1">
                          {booking.user?.firstName || ""} {booking.user?.lastName || ""}
        {(!booking.user?.firstName && !booking.user?.lastName) && (booking.user?.name || booking.user?.username || "Unknown User")}
                        </p>
                        <p className="text-[11px] text-gray-500">{booking.user?.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* PROPERTY INFO */}
                  <td className="py-4 px-4">
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">
                      {booking.property?.title || "Deleted Property"}
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-tight">
                      ID: #{booking.property?._id?.slice(-6)}
                    </p>
                  </td>

                  {/* DATE */}
                  <td className="py-4 px-4 text-sm text-gray-500 font-medium">
                    {new Date(booking.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>

                  {/* STATUS BADGE */}
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                      booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                      booking.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                      booking.status === 'CANCELLED' ? 'bg-gray-100 text-gray-500' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status}
                    </span>
                  </td>

                  {/* ACTION BUTTONS */}
                  <td className="py-4 px-6 text-right">
                    <BookingActionButtons 
                      bookingId={booking._id} 
                      currentStatus={booking.status} 
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}