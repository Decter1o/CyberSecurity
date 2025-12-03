import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import {ZodError} from "zod";   
import Credentials from "next-auth/providers/credentials";
import {signinSchema} from "@/schema/zod";
import {getUserFromDb} from "@/utils/user";
import {prisma} from "@/utils/prisma";
import { sign } from "node:crypto";

export const {handlers, signIn, signOut, auth} = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name: "Account",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
            },
            authorize: async (credentials) => {
                try {
                    if(!credentials.email || !credentials.password) {
                        throw new Error("Email и пароль обязательны для заполнения");
                    }
                    const {email, password} = await signinSchema.parseAsync(
                        credentials
                    );

                    const user = await getUserFromDb(email);

                    if (!user || !user.password) {
                        throw new Error("Неверный email или пароль");
                    }

                    const isPasswordValid = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if(!isPasswordValid){
                        throw new Error("Неверный email или пароль");
                    }

                    return {id: user.id, email: user.email};
                } catch (error) {
                    if (error instanceof ZodError) {

                        return null;
                    }
                    return null;
                }
            }
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 3600
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({token, user}) {
            if(user){
                token.id = user.id;
            }
            return token;
        }
    }
});