import {API} from "../endpoints";

import axios from "../axios";

export const createProperty = async (propertyData: any)=> {
    try{
        const response = await axios.post(
            API.ADMIN.PROPERTY.CREATE,
            propertyData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
        return response.data;
    }catch(error: Error | any){
        throw new Error(error.response?.data?.message
            || error.message || 'Create property failed'
        );
    }
}
export const getPropertyById = async (id: string)=> {
    try{
        const response = await axios.get(
            API.ADMIN.PROPERTY.GET_ONE(id)
        );
        return response.data;
    }catch (error: Error | any){
        throw new Error(error.response?.data?.message
            || error.message || "Get property by id failed"
        );
    }
}

export const getAllProperty = async (
    page: number, size: number, search?: string
)=> {
    try{
        const response = await axios.get(
            API.ADMIN.PROPERTY.GET_ALL,
            {
                params: {page, size, search}
            }
        );
        return response.data;
    }catch (error: Error | any){
        throw new Error(error.response?.data?.message
            || error.message || "Get all property failed"
        );
    }
}
export const updateProperty = async (id: string, updateData: any)=> {
    try{
        const response = await axios.put(
            API.ADMIN.PROPERTY.UPDATE(id),
            updateData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // for file upload/multer
                }
            }
        );
        return response.data;
    }
    catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Update property failed');
    }
}

export const deleteProperty = async (id: string) => {
    try{
        const response = await axios.delete(
            API.ADMIN.PROPERTY.DELETE(id)
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Delete property failed');
    
    }
}