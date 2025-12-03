import {object, string} from 'zod';

export const signinSchema = object({
    email: string({required_error: 'Email is required'})
        .min(1, "Emailis required")
        .email('Invalid email address'),
    password: string({required_error: 'Password is required'})
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters long')
        .max(32, 'Password must be at most 32 characters long'),
});