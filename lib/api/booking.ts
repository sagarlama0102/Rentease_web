import { API } from "./endpoints";
import axios from "./axios";

/**
 * Create a new booking request
 */
export const createBooking = async (data: { property: string; message?: string }) => {
    try {
        // Assuming API.USER.BOOKING.CREATE is the endpoint '/api/bookings'
        const response = await axios.post(API.USER.BOOKING.CREATE, data);
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || 
            error.message || 
            'Failed to create booking'
        );
    }
};

/**
 * Fetch bookings for the logged-in user
 */
export const getMyBookings = async (
    page: number = 1, 
    size: number = 10, 
    status?: string, 
    search?: string
) => {
    try {
        // Assuming API.USER.BOOKING.GET_MY_BOOKINGS is '/api/bookings/my-bookings'
        const response = await axios.get(API.USER.BOOKING.GET_MY_BOOKINGS, {
            params: { page, size, status, search }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || 
            error.message || 
            'Failed to fetch your bookings'
        );
    }
};

/**
 * Cancel a specific booking
 */
export const cancelBooking = async (id: string) => {
    try {
        // Assuming API.USER.BOOKING.CANCEL(id) is '/api/bookings/:id/cancel'
        const response = await axios.patch(API.USER.BOOKING.CANCEL(id));
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || 
            error.message || 
            'Failed to cancel booking'
        );
    }
};