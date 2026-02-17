
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
        },
        BOOKING: {
            GET_ALL: '/api/admin/bookings/',
            UPDATE_STATUS: (id: string) => `/api/admin/bookings/${id}/status`,
        }

    },
    // Adding USER for private actions like booking
    USER: {
        BOOKING: {
            CREATE: '/api/bookings/',
            GET_MY_BOOKINGS: '/api/bookings/my-bookings',
            CANCEL: (id: string) => `/api/bookings/${id}/cancel`,
        },
        FAVOURITE: {
            TOGGLE: '/api/favourites/toggle',
            GET_MY_WISHLIST: '/api/favourites/my-wishlist',
            CHECK_STATUS: (propertyId: string) => `/api/favourites/status/${propertyId}`,
        }
    },
    PUBLIC: {
        PROPERTY:{
            GET_ALL: '/api/properties/',
            GET_ONE: (id: string) => `/api/properties/${id}`,
        }
    }
}