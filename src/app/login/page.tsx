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
import { useState } from "react"
import { FaBasketballBall } from "react-icons/fa";
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { signIn } from 'next-auth/react';
 
const formSchema = z
        .object({
        phone: z
            .string()
            .min(10, { message: "Phone number must be at least 10 digits long" })
            .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters" }),
        })
 
const LoginPage = () => {

    // 1. Define form.
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        phone: "",
        password: "",
    },
    })

    // 2. Define a submit handler.
    async function loginHandler (values: z.infer<typeof formSchema>) {
        setButtonLoading(true);
        const res = await signIn("credentials", {
          phone: values.phone,
          password: values.password,
          redirect: false,
        });
        if(res?.error){
            toast.error("Username or password is incorrect.Please try again.");
            setButtonLoading(false);
        }
        else{
            toast.success('Login successful');
            router.push('/');
            setButtonLoading(false);
        }
    }
    const[showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [buttonLoading, setButtonLoading] = useState(false);

    return (
      <div className="flex flex-col justify-center items-center ">
        <p className="text-2xl font-bold text-blue-400 mt-12 mb-6">
          Login Page
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(loginHandler)}
            className="space-y-8 shadow-2xl p-10 rounded-lg min-w-sm"
          >
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
                        type={`${showPassword ? "text" : "password"}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 hover:cursor-pointer hover:scale-125 transition-transform transform duration-300 ease-in-out"
              >
                <FaRegEye className="text-blue-500" />
              </button>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 hover:cursor-pointer"
            >
              {buttonLoading ? (
                <div className="flex items-center justify-center">
                  Sign in......
                  <FaBasketballBall className="animate-spin ml-2" />
                </div>
              ) : (
                <>Submit</>
              )}
            </Button>
            <p className="text-xs mt-[-15px] text-center text-blue-500">
              Don't have an account? <br />
              Click
              <Link href="/signup">
                <span className="text-blue-500 font-bold ml-2 underline transition-transform transform duration-300 hover:scale-115 inline-block">
                  Here
                </span>
              </Link>
            </p>
          </form>
        </Form>
      </div>
    );
}
 
export default LoginPage;



// "use client"

// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import { FaRegEye } from "react-icons/fa";
// import { useActionState, useEffect, useState } from "react"
// import { FaBasketballBall } from "react-icons/fa";
// import { toast } from "react-toastify"
// import { useRouter } from "next/navigation"
// import { signIn } from 'next-auth/react';
// import { customLoginAction } from "../actions/customLoginAction";




// const LoginPage = () => {

//     const[showPassword, setShowPassword] = useState(false);
//     const router = useRouter();
//     const initialState: { success: string | boolean; errors:{ phone?: string[], password?: string[]} } = {
//       success: "pending",
//       errors:{phone: [], password: []},
//     };
//     const [state, formAction, isPending] = useActionState(customLoginAction, initialState);
//     const handleSubmit = 
//     //login success
//     useEffect(() => {
//       if (state.success === true) {
//         toast.success("Login successful!",{
//             position: "top-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//         });
//         router.push("/");
//       }
//     },[state.success]);
     

//     return (
//       <div className="flex flex-col justify-center items-center px-20">
//         <p className="text-xl font-bold text-blue-500 mt-12 mb-6 md:text-2xl">
//           Login Page
//         </p>

//         <form
//           action={formAction}
//           className="space-y-4 shadow-2xl p-4 rounded-lg  min-w-xs md:min-w-sm md:p-10"
//         >
//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
//             required
//           />
//           {
//             state.errors.phone && (
//                 <>
//                 <p className="text-sm text-red-500">{state.errors.phone[0]}</p>
//                 </>
//             )
//           }
//           <div className="flex items-center justify-center">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="ml-2 hover:cursor-pointer hover:scale-125 transition-transform transform duration-300 ease-in-out"
//             >
//               <FaRegEye className="text-blue-500" />
//             </button>
//           </div>
//           {state.errors.password && (
//             <>
//               <p className="text-sm text-red-500">{state.errors.password[0]}</p>
//             </>
//           )}
//           <Button
//             type="submit"
//             className="w-full bg-blue-500 hover:bg-blue-700 hover:cursor-pointer"
//           >
//             {isPending ? (
//               <div className="flex items-center justify-center">
//                 Sign in......
//                 <FaBasketballBall className="animate-spin ml-2" />
//               </div>
//             ) : (
//               <>Submit</>
//             )}
//           </Button>
//           <p className="text-xs mt-[-15px] text-center text-blue-500">
//             Don't have an account? <br />
//             Click
//             <Link href="/signup">
//               <span className="text-blue-500 font-bold ml-2 underline transition-transform transform duration-300 hover:scale-115 inline-block">
//                 Here
//               </span>
//             </Link>
//           </p>
//         </form>
//       </div>
//     );
// }
 
// export default LoginPage;


