"use server";
import {IFormData} from "@/types/form-data";
import {saltAndHashPasword} from "@/utils/password";
import {prisma} from "@/utils/prisma";

export async function registerUser(formData: IFormData) {

    const {email, password, confirmPassword} = formData;

    if (password !== confirmPassword) {
        return{ success: false, error: "Пароли не совпадают" };
    }

    if (password.length < 6) {
        return{error: "пароль должен быть не менее 6 символов", success: false};
    }

    try{
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { success: false,  error: "Пользователь с таким email уже существует" };
        }

        const pwHash = await saltAndHashPasword(password);

        const user = await prisma.user.create({
            data: {
                email,
                password: pwHash,
            },
        });

        return user
    }
    catch (error){
        console.error("Error creating user:", error);
        return { success: false, error: String(error) };
    }
}