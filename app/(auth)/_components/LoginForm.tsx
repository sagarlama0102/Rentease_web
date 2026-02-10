


"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import z from "zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { LoginData, loginSchema } from "../schema";
import { handleLogin } from "@/lib/actions/auth-action";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  onSwitch: () => void;
  // onLoginSuccess: () => void;
  onLoginSuccess: (role: string) => void;
}

export default function LoginForm({ onSwitch, onLoginSuccess }: LoginFormProps){
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  }= useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const [pending, setTransition] = useTransition()
  const [error, setError] = useState<string | null> (null);

  const submit = async (values: LoginData) => {
    setError(null);

    //GOTO
    setTransition(async()=> {
      try {
        const response = await handleLogin(values);
        if(!response.success){
          throw new Error(response.message);
        }
        const userRole = response.data?.role;
        // if(response.success){
        //   onLoginSuccess();
        //   router.push("/dashboard");
        // }else {
        //   setError('Login Failed');
        // }
        if (response.success) {
        // Trigger the success logic and pass the role
        onLoginSuccess(userRole); 
      }
        
      }catch (err: Error | any){
          setError(err.message || 'Login Failed');
        }
    })
  };
  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-md mx-auto space-y-4 p-6 border rounded-lg bg-white shadow-sm">

      {/* Email */}
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="email">Email</label>
        <input
          id="email"
          autoComplete="email"
          type="email"
          placeholder="you@example.com"
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
          {...register("email")}
        />
        {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••"
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
          {...register("password")}
        />
        {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
        
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || pending}
        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        
        {isSubmitting || pending ? "Logging in..." : "Log in"}
      </button>

      <div className="pt-2 space-y-3 text-center text-sm text-gray-600">
        <Link
          href="/forget-password"
          className="text-green-600 font-medium hover:text-green-700 transition-colors hover:underline inline-block"
        >
          Forgot your password?
        </Link>

        <div className="text-gray-500">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSwitch}
            className="text-green-600 font-semibold hover:text-green-700 transition-colors hover:underline"
          >
            Sign up
          </button>
        </div>
      </div>

      {error && (
        <p className="text-center text-sm text-red-600 bg-red-50 py-2 px-4 rounded-lg">
          {error}
        </p>
      )}
 
    </form>
  );
}