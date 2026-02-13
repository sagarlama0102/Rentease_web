
export const API = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        WHOAMI: '/api/auth/whoami',
        UPDATEPROFILE: '/api/auth/update-profile',
        REQUEST_PASSWORD_RESET: '/api/auth/request-password-reset',
        RESET_PASSWORD: (token: string) => `/api/auth/reset-password/${token}`,
    },
    ADMIN: {
        USER: {
            CREATE: '/api/admin/users/',
            GET_ALL: '/api/admin/users/',
            GET_ONE: (userId: string) => `/api/admin/users/${userId}`,
            UPDATE: (userId: string) => `/api/admin/users/${userId}`,
            DELETE: (userId: string) => `/api/admin/users/${userId}`,
        },
        PROPERTY: {
            CREATE: '/api/admin/properties/',
            GET_ALL: '/api/admin/properties/',
            GET_ONE: (propertyId: string) => `/api/admin/properties/${propertyId}`,
            UPDATE: (propertyId: string) => `/api/admin/properties/${propertyId}`,
            DELETE: (propertyId: string) => `/api/admin/properties/${propertyId}`,
        }
    },
    PUBLIC: {
        PROPERTY:{
            GET_ALL: '/api/properties/',
            GET_ONE: (id: string) => `/api/properties/${id}`,
        }
    }
}