import { API } from "./endpoints";
import axios from "./axios";

/**
 * Toggle a property in user's favourites (Add/Remove)
 */
export const toggleFavorite = async (propertyId: string) => {
    try {
        // Hits '/api/favourites/toggle'
        const response = await axios.post(API.USER.FAVOURITE.TOGGLE, { propertyId });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || 
            error.message || 
            'Failed to update favorite'
        );
    }
};

/**
 * Fetch the wishlist for the logged-in user
 */
export const getMyWishlist = async (
    page: number = 1, 
    size: number = 12
) => {
    try {
        // Hits '/api/favourites/my-wishlist'
        const response = await axios.get(API.USER.FAVOURITE.GET_MY_WISHLIST, {
            params: { page, size }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || 
            error.message || 
            'Failed to fetch your wishlist'
        );
    }
};

/**
 * Check if a specific property is currently favorited
 */
export const checkFavoriteStatus = async (propertyId: string) => {
    try {
        // Hits '/api/favourites/status/:propertyId'
        const response = await axios.get(API.USER.FAVOURITE.CHECK_STATUS(propertyId));
        return response.data;
    } catch (error: any) {
        // We don't necessarily want to crash the UI if the status check fails, 
        // but keeping error handling consistent with your pattern
        throw new Error(
            error.response?.data?.message || 
            error.message || 
            'Failed to check favorite status'
        );
    }
};