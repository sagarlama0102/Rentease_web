import z from "zod";

export const loginSchema = z.object({
    email: z.email({ message: "Enter a valid email" }),
    password: z.string().min(6, { message: "Minimum 6 characters" }),
});

export type LoginData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters" }),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.email({ message: "Enter a valid email" }),
    password: z.string().min(6, { message: "Minimum 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Minimum 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
});

export type RegisterData = z.infer<typeof registerSchema>;

export const forgetPasswordSchema = z.object({
    email: z.email({ message: "Enter a valid email" }),
});
export type ForgetPasswordData = z.infer<typeof forgetPasswordSchema>;


export const resetPasswordSchema = z.object({
    newPassword: z.string().min(6, { message: "Minimum 6 characters" }),
    confirmNewPassword: z.string().min(6, { message: "Minimum 6 characters" }),
}).refine((v) => v.newPassword === v.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
});

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;