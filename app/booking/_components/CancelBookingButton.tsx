"use client";

import { useState } from "react";
import { handleCancelBooking } from "@/lib/actions/booking-action";
import { toast } from "react-toastify";

export default function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const [loading, setLoading] = useState(false);

  const onCancel = async () => {
    if (!confirm("Are you sure you want to cancel this viewing request?")) return;

    setLoading(true);
    const res = await handleCancelBooking(bookingId);

    if (res.success) {
      toast.success("Booking cancelled successfully");
    } else {
      toast.error(res.message || "Failed to cancel booking");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={onCancel}
      disabled={loading}
      className="text-xs font-semibold text-red-500 hover:text-red-700 hover:underline transition-colors disabled:opacity-50"
    >
      {loading ? "Cancelling..." : "Cancel Request"}
    </button>
  );
}