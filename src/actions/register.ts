"use server";
import {IFormData} from "@/types/form-data";
import {prisma} from "@/utils/prisma";

export async function registerUser(formData: IFormData) {

    const {email, password, confirmPassword} = formData;
    try{
        const user = await prisma.user.create({
            data: {
                email: email,
                password: password
            }
        })
        console.log("User:", user);
        return { success: true, user };
    }
    catch (error){
        console.error("Error creating user:", error);
        // Проброс ошибки к клиенту, чтобы её можно было обработать
        return { success: false, error: String(error) };
    }
}