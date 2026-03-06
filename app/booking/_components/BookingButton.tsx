"use client";

import { useState } from "react";
import { handleCreateBooking } from "@/lib/actions/booking-action";
import {toast} from "react-toastify"

export default function BookingButton({ propertyId }: { propertyId: string }) {
  const [loading, setLoading] = useState(false);

  const onBook = async () => {
    const confirmBook = confirm("Do you want to request a viewing for this property?");
    if (!confirmBook) return;

    setLoading(true);
    // We send the ID and a default message
    const res = await handleCreateBooking({ 
        property: propertyId, 
        message: "I am interested in viewing this property." 
    });

    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={onBook}
      disabled={loading}
      className={`flex-1 h-12 bg-[#142725] text-white text-sm font-medium rounded-lg hover:opacity-90 transition ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Processing..." : "Book Viewing"}
    </button>
  );
}