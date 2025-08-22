"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FaRegEye } from "react-icons/fa";
import { useActionState, useEffect, useState } from "react"
import { FaBasketballBall } from "react-icons/fa";
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { signIn } from 'next-auth/react';
import { customLoginAuth } from "@/app/actions/customLoginAuth"



const LoginPage = () => {

    const[showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const initialState: { success: string | boolean; errors:{ phone?: string[], password?: string[]} } = {
      success: "pending",
      errors:{phone: [], password: []},
    };
    const [state, formAction, isPending] = useActionState(customLoginAuth, initialState);
    //login success
    useEffect(() => {
      if (state.success === true) {
        toast.success("Login successful!",{
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        router.push("/");
      }
    },[state.success]);
     

    return (
      <div className="flex flex-col justify-center items-center px-20">
        <p className="text-xl font-bold text-blue-500 mt-12 mb-6 md:text-2xl">
          Login Page
        </p>

        <form
          action={formAction}
          className="space-y-4 shadow-2xl p-4 rounded-lg  min-w-xs md:min-w-sm md:p-10"
        >
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
          {
            state.errors.phone && (
                <>
                <p className="text-sm text-red-500">{state.errors.phone[0]}</p>
                </>
            )
          }
          <div className="flex items-center justify-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 hover:cursor-pointer hover:scale-125 transition-transform transform duration-300 ease-in-out"
            >
              <FaRegEye className="text-blue-500" />
            </button>
          </div>
          {state.errors.password && (
            <>
              <p className="text-sm text-red-500">{state.errors.password[0]}</p>
            </>
          )}
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 hover:cursor-pointer"
          >
            {isPending ? (
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
      </div>
    );
}
 
export default LoginPage;