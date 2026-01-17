import { LoginData, RegisterData } from "@/app/(auth)/schema";
import axois from "./axios"
import { API } from "./endpoints"

export const register = async (registerData: RegisterData) => {
    try{
        const response = await axois.post(API.AUTH.REGISTER, registerData)
        return response.data
    }catch (error: Error | any){
        throw new Error(error.response?.data?.message ||error.message || 'Registration failed')
    }
}
export const login = async (loginData: LoginData) =>{
    try{
        const response = await axois.post(API.AUTH.LOGIN, loginData)
        return response.data
    }catch (error: Error | any) {
        throw new Error(error.response?.data?.message || error.message || 'Login failed')
    }
}