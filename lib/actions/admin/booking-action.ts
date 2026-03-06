"use server";

import { adminGetAllBookings, adminUpdateBookingStatus } from "@/lib/api/admin/booking";
import { revalidatePath } from "next/cache";

/**
 * Handle Fetching All Bookings for Admin
 */
export const handleAdminGetAllBookings = async (
    page: string, 
    size: string, 
    status?: string
) => {
    try {
        const currentPage = parseInt(page) || 1;
        const currentSize = parseInt(size) || 10;

        const response = await adminGetAllBookings(currentPage, currentSize, status);

        if (response.success) {
            return {
                success: true,
                message: 'Bookings fetched successfully',
                data: response.data,
                pagination: response.pagination
            };
        }

        return {
            success: false,
            message: response.message || 'Failed to fetch bookings'
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Admin booking fetch action failed'
        };
    }
};

/**
 * Handle Booking Status Update (Confirm/Reject)
 */
export const handleAdminUpdateBookingStatus = async (id: string, status: string) => {
    try {
        const response = await adminUpdateBookingStatus(id, status);

        if (response.success) {
            // Revalidate the admin bookings page to show updated status
            revalidatePath('/admin/bookings');
            
            return {
                success: true,
                message: `Booking ${status.toLowerCase()} successfully`,
                data: response.data
            };
        }

        return {
            success: false,
            message: response.message || 'Update status failed'
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Admin status update action failed'
        };
    }
};