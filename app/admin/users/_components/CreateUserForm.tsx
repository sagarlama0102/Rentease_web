"use client";
import { Controller, useForm } from "react-hook-form";
import { UserData, UserSchema } from "@/app/admin/users/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { handleCreateUser } from "@/lib/actions/admin/user-action";
export default function CreateUserForm() {

    const [pending, startTransition] = useTransition();
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<UserData>({
        resolver: zodResolver(UserSchema)
    });
    const [error, setError] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (file: File | undefined, onChange: (file: File | undefined) => void) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
        onChange(file);
    };

    const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
        setPreviewImage(null);
        onChange?.(undefined);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const onSubmit = async (data: UserData) => {
        setError(null);
        startTransition(async () => {
            try {
                const formData = new FormData();
                if (data.firstName) {
                    formData.append('firstName', data.firstName);
                }
                if (data.lastName) {
                    formData.append('lastName', data.lastName);
                }

                formData.append('email', data.email);
                formData.append('username', data.username);
                formData.append('password', data.password);
                formData.append('confirmPassword', data.confirmPassword);

                if (data.profilePicture) {
                    formData.append('image', data.profilePicture);
                }
                const response = await handleCreateUser(formData);

                if (!response.success) {
                    throw new Error(response.message || 'Create profile failed');
                }
                reset();
                handleDismissImage();
                toast.success('Profile Created successfully');

            } catch (error: Error | any) {
                toast.error(error.message || 'Create profile failed');
                setError(error.message || 'Create profile failed');
            }
        });

    };
    console.log(errors);
  return (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 space-y-8"
  >
    {/* Title */}
    <div>
      <h2 className="text-xl font-semibold text-gray-900">
        Create New User
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Fill in the details below to create a new account.
      </p>
    </div>

    {/* Profile Image */}
    <div className="flex flex-col items-center gap-4">
      {previewImage ? (
        <div className="relative">
          <img
            src={previewImage}
            alt="Profile Preview"
            className="h-28 w-28 rounded-full object-cover border border-gray-200"
          />
          <Controller
            name="profilePicture"
            control={control}
            render={({ field: { onChange } }) => (
              <button
                type="button"
                onClick={() => handleDismissImage(onChange)}
                className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:scale-105 transition"
              >
                ✕
              </button>
            )}
          />
        </div>
      ) : (
        <div className="h-28 w-28 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-400">
          No Image
        </div>
      )}

      <Controller
        name="profilePicture"
        control={control}
        render={({ field: { onChange } }) => (
          <label className="cursor-pointer text-sm font-medium text-[#99DAB3] hover:underline">
            Upload profile photo
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={(e) =>
                handleImageChange(e.target.files?.[0], onChange)
              }
            />
          </label>
        )}
      />
      {errors.profilePicture && (
        <p className="text-xs text-red-500">
          {errors.profilePicture.message}
        </p>
      )}
    </div>

    {/* Names */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900">
          First name
        </label>
        <input
          {...register("firstName")}
          placeholder="Jane"
          className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#99DAB3]"
        />
        {errors.firstName?.message && (
          <p className="text-xs text-red-500">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900">
          Last name
        </label>
        <input
          {...register("lastName")}
          placeholder="Doe"
          className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#99DAB3]"
        />
        {errors.lastName?.message && (
          <p className="text-xs text-red-500">
            {errors.lastName.message}
          </p>
        )}
      </div>
    </div>

    {/* Email */}
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-900">
        Email
      </label>
      <input
        {...register("email")}
        type="email"
        placeholder="you@example.com"
        className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#99DAB3]"
      />
      {errors.email?.message && (
        <p className="text-xs text-red-500">
          {errors.email.message}
        </p>
      )}
    </div>

    {/* Username */}
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-900">
        Username
      </label>
      <input
        {...register("username")}
        placeholder="jane_doe"
        className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#99DAB3]"
      />
      {errors.username?.message && (
        <p className="text-xs text-red-500">
          {errors.username.message}
        </p>
      )}
    </div>

    {/* Passwords */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900">
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          placeholder="••••••••"
          className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#99DAB3]"
        />
        {errors.password?.message && (
          <p className="text-xs text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900">
          Confirm password
        </label>
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="••••••••"
          className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#99DAB3]"
        />
        {errors.confirmPassword?.message && (
          <p className="text-xs text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
    </div>

    {/* Submit */}
    <button
      type="submit"
      disabled={isSubmitting || pending}
      className="h-12 w-full rounded-xl bg-[#99DAB3] text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition"
    >
      {isSubmitting || pending
        ? "Creating account..."
        : "Create account"}
    </button>
  </form>
);
}