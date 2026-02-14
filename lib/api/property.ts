import { API } from "./endpoints";
import axios from "./axios";

export const getAllProperties = async (page: number = 1, size: number = 12, search?: string, propertyType?:string, bhk?: string) => {
    try {
        const response = await axios.get(API.PUBLIC.PROPERTY.GET_ALL, {
            params: { page, size, search, propertyType, bhk }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || 
            error.message || 
            'Failed to fetch properties'
        );
    }
};

export const getPropertyDetails = async (id: string) => {
    try {
        const response = await axios.get(API.PUBLIC.PROPERTY.GET_ONE(id));
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || 
            error.message || 
            'Failed to fetch property details'
        );
    }
};