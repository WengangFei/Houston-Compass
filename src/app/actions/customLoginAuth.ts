'use server';
//custom login auth server function
import { z } from "zod";
export async function customLoginAuth(
  prev: any,
  formData: FormData
) {
 // Validate credentials
    const data = {
        phone: formData.get("phone"),
        password: formData.get("password"),
    }
    const parsed = z
        .object({
        phone: z
            .string()
            .min(10, { message: "Phone number must be at least 10 digits long" })
            .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters" }),
        })
        .safeParse(data);

    if (!parsed.success) {
        const errorMessage = parsed?.error.flatten().fieldErrors;
        return {
            success: false,
            errors: errorMessage
        };

    }
    const { phone, password } = parsed.data;

    return {
        success: true,
        errors: {},
    };
 
}