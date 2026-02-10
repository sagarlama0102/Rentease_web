"use server";
import { getAllProperties, getPropertyDetails } from "../api/property";

export const handleGetAllProperty = async(
    page: string, 
    size: string, 
    search?: string) => {
        try {
        const currentPage = parseInt(page) || 1;
        const currentSize = parseInt(size) || 12;

        const response = await getAllProperties(currentPage, currentSize, search);

        if (response.success) {
            return {
                success: true,
                message: 'Properties fetched successfully',
                data: response.data,
                pagination: response.pagination
            };
        }

        return {
            success: false,
            message: response.message || 'Failed to fetch properties'
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Public property fetch action failed'
        };
    }

}
export const handleGetPropertyDetails = async(id: string)=> {
    try {
        const response = await getPropertyDetails(id);

        if (response.success) {
            return {
                success: true,
                message: 'Property details fetched successfully',
                data: response.data
            };
        }

        return {
            success: false,
            message: response.message || 'Failed to fetch property details'
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Public property detail action failed'
        };
    }
}