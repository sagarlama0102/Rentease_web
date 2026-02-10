"use server";
import { createProperty, getAllProperty, getPropertyById, deleteProperty, updateProperty } from "@/lib/api/admin/property";
import { revalidatePath } from "next/cache";

export const handleCreateProperty = async (data: FormData)=> {
    try{
        const response = await createProperty(data)
        if(response.success){
            revalidatePath('/admin/properties');
            return {
                success: true,
                message: "Property created successfully",
                data: response.data
            }
        }
        return{
            success: false,
            message: response.message || 'Property creation failed'
        }
    }catch (error: Error | any){
        return { success: false, message: error.message || 'Property creation action failed'}
    }
}

export const handleGetAllProperty =  async (
    page: string, size: string, search?: string
) => {
    try{
        const currentPage = parseInt(page) || 1;
        const currentSize = parseInt(size) || 12;

        const response = await getAllProperty(currentPage, currentSize, search);
        if(response.success){
            return {
                success: true,
                message: 'Get all property successful',
                data: response.data,
                pagination: response.pagination
            }
        }
        return {
            success: false,
            message: response.message || 'Get all property failed'
        }
    }catch (error: Error | any) {
        return {
            success: false,
            message: error.message || 'Get all property action failed'
        }
    }
}
export const handleGetOneProperty = async (id: string)=> {
    try{
        const response = await getPropertyById(id);
        if(response.success){
            return {
                success: true,
                message: 'Get property by id successful',
                data: response.data
            }
        }return {
            success: false,
            message: response.message || 'Get property by id failed'
        }
    }catch (error: Error | any) {
        return {
            success: false,
            message: error.message || 'Get property by id action failed'
        }
    }
}
export const handleUpdateProperty = async (id: string, data: FormData) => {
    try{
        const response = await updateProperty(id, data)
        if(response.success){
            revalidatePath('/admin/properties');
            return {
                success: true,
                message: 'Update property successful',
                data: response.data
            }
        }
        return {
            success: false,
            message: response.message || 'Update property failed'
        }
    }catch (error: Error | any) {
        return { success: false, message: error.message || 'Update property action failed' }
    }
}
export const handleDeleteProperty = async (id: string)=> {
    try{
        const response = await deleteProperty(id)
        if(response.success){
            revalidatePath('/admin/properties');
            return {
                success: true,
                message: 'Delete properties successful'
            }
        }
        return {
            success: false,
            message: response.message || 'Delete properties failed'
        }
    }catch (error: Error | any) {
        return { success: false, message: error.message || 'Delete properties action failed' }
    }
}