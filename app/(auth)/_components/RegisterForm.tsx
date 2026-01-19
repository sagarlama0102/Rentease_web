// "use client";

// import useRegisterForm from "../hooks/useRegisterForm";
// // Step 1: Define the interface
// interface RegisterFormProps {
//   onSwitch: () => void;
//   onRegisterSuccess: () => void;
  
// }

// export default function RegisterForm({onSwitch, onRegisterSuccess, }: RegisterFormProps) {
//   const { formData, errors, loading, handleChange, handleSubmit } = useRegisterForm();

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-6 border rounded-lg bg-white shadow-sm">
      
//       {/* Username Field */}
//       <div className="space-y-1">
//         <label className="text-sm font-medium" htmlFor="username">Username</label>
//         <input
//           id="username"
//           name="username"
//           type="text"
//           value={formData.username}
//           onChange={handleChange}
//           placeholder="jdoe123"
//           className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-green-500"
//         />
//         {errors.username && <p className="text-xs text-red-600">{errors.username}</p>}
//       </div>

//       {/* Names Row */}
//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="firstName">First Name</label>
//           <input
//             id="firstName"
//             name="firstName"
//             type="text"
//             value={formData.firstName}
//             onChange={handleChange}
//             placeholder="Jane"
//             className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-green-500"
//           />
//           {errors.firstName && <p className="text-xs text-red-600">{errors.firstName}</p>}
//         </div>
//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="lastName">Last Name</label>
//           <input
//             id="lastName"
//             name="lastName"
//             type="text"
//             value={formData.lastName}
//             onChange={handleChange}
//             placeholder="Doe"
//             className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-green-500"
//           />
//           {errors.lastName && <p className="text-xs text-red-600">{errors.lastName}</p>}
//         </div>
//       </div>

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
//       </div>

//        {/* Backend error */}
//       {errors.general && (
//         <p className="text-sm text-red-600 text-center">{errors.general}</p>
//       )}

//       {/* Confirm Password */}
//       <div className="space-y-1">
//         <label className="text-sm font-medium" htmlFor="confirmPassword">Confirm Password</label>
//         <input
//           id="confirmPassword"
//           name="confirmPassword"
//           type="password"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           placeholder="••••••"
//           className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
//         />
//         {errors.confirmPassword && <p className="text-xs text-red-600">{errors.confirmPassword}</p>}
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//       >
//         Create Account
//       </button>

//     </form>
//   );
// }
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { RegisterData, registerSchema } from "../schema";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { handleRegister } from "@/lib/actions/auth-action";


export default function RegisterForm(){
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},

  }= useForm<RegisterData> ({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const [pending, setTransition] = useTransition()
  const [error, setError] = useState<string | null> (null);

  const submit = async (values: RegisterData) => {
    setError(null);
    setTransition(async()=> {
      try{
        const response = await handleRegister(values);
        if(!response.success){
          throw new Error (response.message);
        }
        if(response.success){
          router.push("/login");
        }else {
            setError('Registration failed');
        }
      }catch (err: Error | any){
        setError(err.message || 'Registration failed');
      }
    });
    //Go to login page
    console.log('register', values);
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-md mx-auto space-y-4 p-6 border rounded-lg bg-white shadow-sm">
      {error && (
            <p className="text-sm text-red-600">{error}</p>
      )}
      {/* Username Field */}
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          autoComplete="given-name"
          placeholder="jdoe123"
          className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-green-500"
          {...register("username")}
        />
        {errors.username && <p className="text-xs text-red-600">{errors.username.message}</p>}
      </div>

      {/* Names Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            
            type="text"
            autoComplete="given-name"
            placeholder="Jane"
            className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-green-500"
             {...register("firstName")}
          />
          {errors.firstName && <p className="text-xs text-red-600">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            
            type="text"
            autoComplete="family-name"
            placeholder="Doe"
            className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-green-500"
            {...register("lastName")}
          />
          {errors.lastName && <p className="text-xs text-red-600">{errors.lastName.message}</p>}
        </div>
      </div>

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
          autoComplete="new-password"
          placeholder="••••••"
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
          {...register("password")}
        />
        {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
         
          type="password"
          autoComplete="new-password"
          placeholder="••••••"
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || pending}
        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        {isSubmitting || pending ? "Creating account..." : "Create account"}
       
      </button>
      
      

    </form>
  );

}