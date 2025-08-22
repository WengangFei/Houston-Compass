"use server";


import { prisma } from "@/lib/prisma";
import { UserSignUpForm } from "@/lib/types";
import bcrypt from 'bcrypt';


//User sign up form action
export default async function signupFormAction (_: any, data: UserSignUpForm) {
    const hashed_password = await bcrypt.hash(data.password as string, 10);
    const checkUser = await prisma.user.findFirst({
        where: {
            OR: [
            { email: data.email || undefined },
            { phone_number: data.phone || undefined },
            ],
        },
    });
    if(checkUser){
        return {
            success: false,
            message: 'User already exists.'
        }
    }
    const user = await prisma.user.create({
        data: {
            user_name: data.username,
            phone_number: data.phone,
            email: data.email,
            password: hashed_password,
        }
    })
    console.log('created use ==>',user);
    return {
        success: true,
        message: 'User created successfully.'
    }
}