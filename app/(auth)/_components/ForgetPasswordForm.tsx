"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { forgetPasswordSchema, ForgetPasswordData } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { handleRequestPasswordReset } from "@/lib/actions/auth-action";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Mail, Loader2, ArrowLeft, KeyRound } from "lucide-react";

const ForgetPasswordForm = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<ForgetPasswordData>({
        mode: "onSubmit",
        resolver: zodResolver(forgetPasswordSchema),
    });
    
    const [pending, setTransition] = useTransition();

    const submit = (values: ForgetPasswordData) => {
        setTransition(async () => {
            try {
                const result = await handleRequestPasswordReset(values.email);
                if (result.success) {
                    toast.success("If the email is registered, a reset link has been sent.");
                    router.push('/'); // Adjust if you have a specific login route or modal
                } else {
                    throw new Error(result.message || 'Failed to send reset link');
                }
            } catch (err: any) {
                toast.error(err.message || 'Failed to send reset link');
            }
        })
    }

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Header Icon & Text */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#99DAB3]/10 text-[#99DAB3] mb-4">
                    <KeyRound size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Forgot password?</h2>
                <p className="text-sm text-gray-500 mt-2">
                    No worries, we'll send you reset instructions.
                </p>
            </div>

            <form onSubmit={handleSubmit(submit)} className="space-y-5">
                <div className="space-y-2">
                    <label 
                        className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-2" 
                        htmlFor="email"
                    >
                        <Mail size={14} className="text-[#142725]" /> Email Address
                    </label>
                    <div className="relative">
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            className={`w-full px-5 py-4 rounded-2xl border bg-gray-50/50 text-gray-900 transition-all outline-none focus:ring-2 focus:ring-[#99DAB3]/20 ${
                                errors.email 
                                ? "border-red-300 focus:border-red-500" 
                                : "border-gray-100 focus:border-[#99DAB3]"
                            }`}
                            {...register("email")}
                            placeholder="Enter your registered email"
                        />
                    </div>
                    {errors.email?.message && (
                        <p className="text-xs font-medium text-red-500 ml-1">{errors.email.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={pending}
                    className="group relative w-full h-14 rounded-2xl bg-[#142725] text-white font-bold text-sm shadow-xl shadow-[#142725]/10 hover:bg-[#1e3a37] transition-all flex items-center justify-center gap-3 overflow-hidden disabled:opacity-70"
                >
                    {pending ? (
                        <Loader2 className="h-5 w-5 animate-spin text-[#99DAB3]" />
                    ) : (
                        "Send Reset Link"
                    )}
                </button>

                <div className="pt-2">
                    <Link 
                        href="/" 
                        className="flex items-center justify-center gap-2 text-sm font-bold text-gray-500 hover:text-[#142725] transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to Login
                    </Link>
                </div>
            </form>

            {/* Aesthetic Footer Detail */}
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400">
                    Secure password recovery powered by <span className="font-bold text-[#142725]/40">RentEase Auth</span>
                </p>
            </div>
        </div>
    );
}

export default ForgetPasswordForm;