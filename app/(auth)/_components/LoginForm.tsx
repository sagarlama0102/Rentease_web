// "use client";

// import useLoginForm from "../hooks/useLoginForm";

// // 1. Add the Interface for props
// interface LoginFormProps {
//   onSwitch: () => void;
//   onLoginSuccess: () => void;
// }

// export default function LoginForm({onSwitch, onLoginSuccess}: LoginFormProps) {
//   const { formData, errors, handleChange, handleSubmit } = useLoginForm(onLoginSuccess);

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-6 border rounded-lg bg-white shadow-sm">

//       {/* Email */}
//       <div className="space-y-1">
//         <label className="text-sm font-medium" htmlFor="email">Email</label>
//         <input
//           id="email"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="you@example.com"
//           className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
//         />
//         {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
//       </div>

//       {/* Password */}
//       <div className="space-y-1">
//         <label className="text-sm font-medium" htmlFor="password">Password</label>
//         <input
//           id="password"
//           name="password"
//           type="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="••••••"
//           className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
//         />
//         {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
//         {errors.general && (
//   <p className="text-sm text-red-600 text-center">{errors.general}</p>
// )}
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//       >
//         Login
//       </button>
//       {/* 3. The Switch Button */}
//         <p className="text-center text-sm text-gray-500 pt-2">
//           New to RentEase?{" "}
//           <button 
//             type="button" 
//             onClick={onSwitch} // This triggers the setAuthView("register") in your Header
//             className="text-green-600 font-bold hover:underline underline-offset-4"
//           >
//             Create an account
//           </button>
//         </p>

//     </form>
//   );
// }


"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import z from "zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { LoginData, loginSchema } from "../schema";
import { handleLogin } from "@/lib/actions/auth-action";
import { useRouter } from "next/navigation";

export default function LoginForm(){
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
        if(response.success){
          router.push("/dashboard");
        }else {
          setError('Login Failed');
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
      
  

    </form>
  );
}