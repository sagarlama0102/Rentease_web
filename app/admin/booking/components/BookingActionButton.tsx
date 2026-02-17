"use client";

import { useState } from "react";
import { handleAdminUpdateBookingStatus } from "@/lib/actions/admin/booking-action";
import { toast } from "react-toastify";

export default function BookingActionButtons({ 
  bookingId, 
  currentStatus 
}: { 
  bookingId: string; 
  currentStatus: string; 
}) {
  const [loading, setLoading] = useState(false);

  const onUpdateStatus = async (status: 'CONFIRMED' | 'REJECTED') => {
    setLoading(true);
    const res = await handleAdminUpdateBookingStatus(bookingId, status);
    if (res.success) {
      toast.success(`Booking ${status.toLowerCase()}ed!`);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  // DEBUG: If you still see nothing, uncomment the line below to see if the component renders at all
  // return <div className="text-red-500">Testing: {currentStatus}</div>;

  // 1. If user cancelled, show text
  if (currentStatus === "CANCELLED") {
    return <span className="text-[10px] italic text-gray-400">User Cancelled</span>;
  }

  // 2. If already handled, show the status but let admin "Change" it if needed
  if (currentStatus === "CONFIRMED" || currentStatus === "REJECTED") {
     return (
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
          Processed
        </span>
     )
  }

  // 3. If PENDING, show the buttons
  return (
    <div className="flex gap-2 justify-end">
      <button
        onClick={() => onUpdateStatus("CONFIRMED")}
        disabled={loading}
        className="px-3 py-1 bg-green-600 text-white text-[10px] font-bold rounded hover:bg-green-700 transition disabled:opacity-50"
      >
        APPROVE
      </button>
      <button
        onClick={() => onUpdateStatus("REJECTED")}
        disabled={loading}
        className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold rounded hover:bg-red-700 transition disabled:opacity-50"
      >
        REJECT
      </button>
    </div>
  );
}