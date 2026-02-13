"use client";
import { Controller, useForm } from "react-hook-form";
import { UserData, UserSchema } from "@/app/admin/users/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { handleUpdateUser } from "@/lib/actions/admin/user-action";
import Image from "next/image";
export default function UpdateUserForm(
    { user }: { user: any }
) {
    console.log("Current User Data:", user);
    const [pending, startTransition] = useTransition();
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<Partial<UserData>>({
        resolver: zodResolver(UserSchema.partial()),
        defaultValues: {
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            username: user.username || '',
            profilePicture: undefined,
        }
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

    const onSubmit = async (data: Partial<UserData>) => {
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
                if (data.email) {
                    formData.append('email', data.email);
                }
                if (data.username) {
                    formData.append('username', data.username);
                }

                if (data.profilePicture) {
                    formData.append('image', data.profilePicture);
                }
                const response = await handleUpdateUser(user._id, formData);

                if (!response.success) {
                    throw new Error(response.message || 'Update profile failed');
                }
                reset();
                handleDismissImage();
                toast.success('Profile Updated successfully');

            } catch (error: Error | any) {
                toast.error(error.message || 'Update profile failed');
                setError(error.message || 'Update profile failed');
            }
        });

    };
    console.log(errors);
    return (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-8 bg-white text-gray-900 p-8 rounded-2xl border border-gray-200"
  >
    {/* Profile Section */}
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
                className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center hover:opacity-80 transition"
              >
                ✕
              </button>
            )}
          />
        </div>
      ) : user.profilePicture ? (
        <div className="relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${user.profilePicture}`}
            alt="Profile Image"
            width={112}
            height={112}
            className="h-28 w-28 rounded-full object-cover border border-gray-200"
          />
        </div>
      ) : (
        <div className="h-28 w-28 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-400 border border-gray-200">
          No Image
        </div>
      )}

      <Controller
        name="profilePicture"
        control={control}
        render={({ field: { onChange } }) => (
          <label className="cursor-pointer text-sm font-medium text-[#99DAB3] hover:underline">
            Change profile photo
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
        <label className="text-sm font-medium">First Name</label>
        <input
          {...register("firstName")}
          placeholder="Jane"
          className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-[#99DAB3] transition"
        />
        {errors.firstName?.message && (
          <p className="text-xs text-red-500">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Last Name</label>
        <input
          {...register("lastName")}
          placeholder="Doe"
          className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-[#99DAB3] transition"
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
      <label className="text-sm font-medium">Email</label>
      <input
        {...register("email")}
        type="email"
        placeholder="you@example.com"
        className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-[#99DAB3] transition"
      />
      {errors.email?.message && (
        <p className="text-xs text-red-500">
          {errors.email.message}
        </p>
      )}
    </div>

    {/* Username */}
    <div className="space-y-2">
      <label className="text-sm font-medium">Username</label>
      <input
        {...register("username")}
        placeholder="jane_doe"
        className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-[#99DAB3] transition"
      />
      {errors.username?.message && (
        <p className="text-xs text-red-500">
          {errors.username.message}
        </p>
      )}
    </div>

    {/* Submit */}
    <button
      type="submit"
      disabled={isSubmitting || pending}
      className="w-full h-12 rounded-xl bg-[#99DAB3] text-gray-900 font-semibold text-sm hover:opacity-90 transition disabled:opacity-60"
    >
      {isSubmitting || pending ? "Updating account..." : "Update account"}
    </button>
  </form>
);
}