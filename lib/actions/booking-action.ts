"use server";

import { createBooking, getMyBookings, cancelBooking } from "@/lib/api/booking";
import { revalidatePath } from "next/cache";

/**
 * Handle Creating a New Booking
 */
export const handleCreateBooking = async (data: { property: string; message?: string }) => {
    try {
        const response = await createBooking(data);

        if (response.success) {
            // Revalidate the property details page and user dashboard
            revalidatePath(`/properties/${data.property}`);
            revalidatePath('/user/bookings'); 
            
            return {
                success: true,
                message: 'Booking request sent successfully!',
                data: response.data
            };
        }

        return {
            success: false,
            message: response.message || 'Failed to send booking request'
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'An error occurred while creating booking'
        };
    }
};

/**
 * Handle Fetching Logged-in User's Bookings
 */
export const handleGetMyBookings = async (
    page: string,
    size: string,
    status?: string,
    search?: string
) => {
    try {
        const currentPage = parseInt(page) || 1;
        const currentSize = parseInt(size) || 10;

        const response = await getMyBookings(currentPage, currentSize, status, search);

        if (response.success) {
            return {
                success: true,
                message: 'Your bookings fetched successfully',
                data: response.data,
                pagination: response.pagination
            };
        }

        return {
            success: false,
            message: response.message || 'Failed to fetch your bookings'
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Action failed to fetch user bookings'
        };
    }
};

/**
 * Handle Cancelling a Booking
 */
export const handleCancelBooking = async (bookingId: string) => {
    try {
        const response = await cancelBooking(bookingId);

        if (response.success) {
            // Refresh the bookings list page to show the "CANCELLED" status
            revalidatePath('/user/bookings');
            
            return {
                success: true,
                message: 'Booking cancelled successfully',
                data: response.data
            };
        }

        return {
            success: false,
            message: response.message || 'Failed to cancel booking'
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Action failed to cancel booking'
        };
    }
};