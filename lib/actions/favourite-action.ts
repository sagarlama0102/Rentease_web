"use server";

import { toggleFavorite, getMyWishlist, checkFavoriteStatus } from "@/lib/api/favourite";
import { revalidatePath } from "next/cache";

/**
 * Handle Toggling a Favorite (Add/Remove)
 */
export const handleToggleFavorite = async (propertyId: string) => {
    try {
        const response = await toggleFavorite(propertyId);

        if (response.success) {
            // Revalidate all pages where the heart icon might appear
            revalidatePath(`/properties/${propertyId}`);
            revalidatePath('/properties');
            revalidatePath('/user/wishlist'); 
            
            return {
                success: true,
                favorited: response.favorited, // Helpful for UI state
                message: response.message || 'Wishlist updated successfully',
                data: response.data
            };
        }

        return {
            success: false,
            message: response.message || 'Failed to update wishlist'
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'An error occurred while toggling favorite'
        };
    }
};

/**
 * Handle Fetching Logged-in User's Wishlist
 */
export const handleGetMyWishlist = async (
    page: string,
    size: string
) => {
    try {
        const currentPage = parseInt(page) || 1;
        const currentSize = parseInt(size) || 10;

        const response = await getMyWishlist(currentPage, currentSize);

        if (response.success) {
            return {
                success: true,
                message: 'Wishlist fetched successfully',
                data: response.data,
                pagination: response.pagination
            };
        }

        return {
            success: false,
            message: response.message || 'Failed to fetch wishlist'
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Action failed to fetch wishlist'
        };
    }
};

/**
 * Handle Checking if a specific property is favorited
 */
export const handleCheckFavoriteStatus = async (propertyId: string) => {
    try {
        const response = await checkFavoriteStatus(propertyId);

        if (response.success) {
            return {
                success: true,
                isFavorited: response.isFavorited
            };
        }

        return {
            success: false,
            isFavorited: false
        };
    } catch (error: any) {
        return {
            success: false,
            isFavorited: false,
            message: error.message || 'Action failed to check favorite status'
        };
    }
};