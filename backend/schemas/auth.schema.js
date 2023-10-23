import { z } from "zod";

export const registerSchema = z.object({
    username: z.string({
        required_error: "Username is required"
    }),
    lastName: z.string({
        required_error: "Lastname is required"
    }),
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Invalid email"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(8, {
        message: "Password must be at least 8 characters"
    }),
});

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Invalid email"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(8, {
        message: "Password must be at least 8 characters"
    }),
});

export const changePasswordSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Invalid email"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(8, {
        message: "Password must be at least 8 characters"
    }),
    newPassword: z.string({
        required_error: "New Password is required"
    }).min(8, {
        message: "New password must be at least 8 characters"
    }),
});

