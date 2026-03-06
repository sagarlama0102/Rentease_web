import { API } from "../endpoints";
import axios from "../axios";

export const adminGetAllBookings = async (page: number = 1, size: number = 10, status?: string) => {
    try {
        const response = await axios.get(API.ADMIN.BOOKING.GET_ALL, {
            params: { page, size, status }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || 
            error.message || 
            'Failed to fetch all bookings'
        );
    }
};

export const adminUpdateBookingStatus = async (id: string, status: string) => {
    try {
        const response = await axios.patch(API.ADMIN.BOOKING.UPDATE_STATUS(id), { status });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || 
            error.message || 
            'Failed to update booking status'
        );
    }
};