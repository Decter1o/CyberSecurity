"use server";

import {signIn} from "@/auth/auth";

export async function signInWithCredentials(email: string, password: string) {
    try{
        await signIn("credentials", {
            redirect: false,
            email,
            password
        });
        return { success: true };
    } catch (error){
        console.error("Ошибка авторизации:", error);
        return { 
            success: false, 
            error: "Неврный email или пароль" 
        };
    }
}