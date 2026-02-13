"use client";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { handleCreateProperty } from "@/lib/actions/admin/property-action";
import { PropertyData, PropertySchema, PropertyTypeEnum, BHKEnum } from "../schema";
import { SubmitHandler } from "react-hook-form";
export default function CreatePropertyForm() {
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PropertyData>({
  resolver: zodResolver(PropertySchema),
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
      fileInputRef.current.value = "";
    }
  };

  const onSubmit : SubmitHandler<z.input<typeof PropertySchema>> = async (data) => {
    setError(null);
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("propertyType", data.propertyType);
        formData.append("bhk", data.bhk);
        formData.append("address", data.address);
        formData.append("city", data.city);
        formData.append("price", data.price.toString());

       if (data.propertyImages) {
          formData.append("propertyImages", data.propertyImages);
       }


        const response = await handleCreateProperty(formData);

        if (!response.success) {
          throw new Error(response.message || "Create property failed");
        }

        reset();
        handleDismissImage();
        toast.success("Property Created successfully");
      } catch (error: any) {
        toast.error(error.message || "Create Property failed");
        setError(error.message);
      }
    });
  };

  return (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-8 bg-white text-gray-900 p-8 rounded-2xl border border-gray-200"
  >
    {/* Image Upload */}
    <div className="flex flex-col items-center gap-4">
      {previewImage ? (
        <div className="relative">
          <img
            src={previewImage}
            alt="Preview"
            className="h-40 w-64 rounded-xl object-cover border border-gray-200"
          />
          <Controller
            name="propertyImages"
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
      ) : (
        <div className="h-40 w-64 rounded-xl border border-gray-200 bg-gray-100 flex items-center justify-center text-sm text-gray-400">
          No Image Selected
        </div>
      )}

      <Controller
        name="propertyImages"
        control={control}
        render={({ field: { onChange } }) => (
          <label className="cursor-pointer text-sm font-medium text-[#99DAB3] hover:underline">
            Upload property image
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={(e) =>
                handleImageChange(e.target.files?.[0], onChange)
              }
            />
          </label>
        )}
      />

      {errors.propertyImages && (
        <p className="text-xs text-red-500">
          {errors.propertyImages.message}
        </p>
      )}
    </div>

    {/* Title */}
    <div className="space-y-2">
      <label className="text-sm font-medium">Property Title</label>
      <input
        {...register("title")}
        placeholder="Modern Apartment in Downtown"
        className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-[#99DAB3] transition"
      />
      {errors.title && (
        <p className="text-xs text-red-500">{errors.title.message}</p>
      )}
    </div>

    {/* Description */}
    <div className="space-y-2">
      <label className="text-sm font-medium">Description</label>
      <textarea
        {...register("description")}
        placeholder="Describe the property details..."
        className="w-full min-h-[120px] rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:border-[#99DAB3] transition"
      />
      {errors.description && (
        <p className="text-xs text-red-500">
          {errors.description.message}
        </p>
      )}
    </div>

    {/* Property Details */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Type</label>
        <select
          {...register("propertyType")}
          className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-[#99DAB3] transition"
        >
          <option value="">Select Type</option>
          <option value={PropertyTypeEnum.HOUSE}>House</option>
          <option value={PropertyTypeEnum.APARTMENT}>Apartment</option>
        </select>
        {errors.propertyType && (
          <p className="text-xs text-red-500">
            {errors.propertyType.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">BHK</label>
        <select
          {...register("bhk")}
          className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-[#99DAB3] transition"
        >
          <option value="">Select BHK</option>
          <option value={BHKEnum.TWO}>2 BHK</option>
          <option value={BHKEnum.THREE}>3 BHK</option>
          <option value={BHKEnum.FOUR_PLUS}>4+ BHK</option>
        </select>
        {errors.bhk && (
          <p className="text-xs text-red-500">
            {errors.bhk.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Price ($)</label>
        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          placeholder="500000"
          className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-[#99DAB3] transition"
        />
        {errors.price && (
          <p className="text-xs text-red-500">
            {errors.price.message}
          </p>
        )}
      </div>
    </div>

    {/* Location */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">City</label>
        <input
          {...register("city")}
          placeholder="New York"
          className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-[#99DAB3] transition"
        />
        {errors.city && (
          <p className="text-xs text-red-500">
            {errors.city.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Address</label>
        <input
          {...register("address")}
          placeholder="123 Main St"
          className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-[#99DAB3] transition"
        />
        {errors.address && (
          <p className="text-xs text-red-500">
            {errors.address.message}
          </p>
        )}
      </div>
    </div>

    {/* Submit */}
    <button
      type="submit"
      disabled={isSubmitting || pending}
      className="w-full h-12 rounded-xl bg-[#99DAB3] text-gray-900 font-semibold text-sm hover:opacity-90 transition disabled:opacity-60"
    >
      {isSubmitting || pending ? "Listing Property..." : "List Property"}
    </button>

    {error && (
      <p className="text-center text-sm text-red-500">{error}</p>
    )}
  </form>
);
}