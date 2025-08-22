"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { FaRegEye } from "react-icons/fa";
import { useActionState, useEffect, useState, useTransition } from "react"
import signupFormAction from "../actions/signupFormAction"
import { toast } from "react-toastify"
import { FaBasketballBall } from "react-icons/fa";
import { useRouter } from "next/navigation"
import { UserSignUpForm } from "@/lib/types"




const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Invalid email address.",
    }).optional().or(z.literal("")),
    phone: z
    .string()
    .nonempty({ message: "Phone number is required." })
    .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits." }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
        message: "Password not match.",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
})





const SignupPage = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: '',
            username:'',
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const[showPassword1, setShowPassword1] = useState(false);
    const[showPassword2, setShowPassword2] = useState(false);
    const initialState:{ success: string | boolean, message: string} = { success: 'pending', message: "" };
    const [state, formAction] = useActionState(signupFormAction, initialState);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const formSubmitHandler = async (data: z.infer<typeof formSchema>) =>{
        //
        startTransition(async () => {
            await formAction(data as UserSignUpForm);
        });
    }
    // Handle toast after the state updates
    useEffect(() => {
    if (!state.success) {
        toast.error(
          "Account exists already, please try another email or phone number."
        );

    } else if (state.success === true) {
        toast.success(
          `${state.message}`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            className: 'text-xs font-semibold',
          }
        );
        setTimeout(() => {
            router.push('/login');
        },2000);
        
    }
    }, [state]);

      
      
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-2xl font-bold text-blue-400 mt-12 mb-6">
          Signup Page
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(formSubmitHandler)} //wrap handler with handleSubmit, validation runs first
            className="space-y-8 shadow-2xl p-14 rounded-lg min-w-sm md:px-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="user name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="email(optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full flex-grow">
                    <FormControl>
                      <Input
                        placeholder="password"
                        {...field}
                        type={`${showPassword1 ? "text" : "password"}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword1(!showPassword1)}
                className="ml-2 hover:cursor-pointer hover:scale-125 transition-transform transform duration-300 ease-in-out"
              >
                <FaRegEye className="text-blue-500" />
              </button>
            </div>

            <div className="flex items-center justify-center">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="w-full flex-grow">
                    <FormControl>
                      <Input
                        placeholder="confirm password"
                        {...field}
                        type={`${showPassword2 ? "text" : "password"}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword2(!showPassword2)}
                className="ml-2 hover:cursor-pointer hover:scale-125 transition-transform transform duration-300 ease-in-out"
              >
                <FaRegEye className="text-blue-500" />
              </button>
            </div>
            <Button
              className=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center hover:cursor-pointer"
              type="submit"
            >
              {isPending ? (
                <div className="flex items-center justify-center">
                  Creating your account......
                  <FaBasketballBall className="animate-spin ml-2" />
                </div>
              ) : (
                <>Submit</>
              )}
            </Button>
            <p className="text-xs mt-[-15px] text-center text-blue-500">
              Already have an account? <br />
              Click
              <Link href="/login">
                <span className="text-blue-500 hover:text-blue-600 font-bold ml-2 underline transition-transform transform duration-300 hover:scale-115 inline-block">
                  Here
                </span>
              </Link>
            </p>
          </form>
        </Form>
      </div>
    );
}
 
export default SignupPage;