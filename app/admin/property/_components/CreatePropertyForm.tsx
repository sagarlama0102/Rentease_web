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
      className="space-y-6 rounded-2xl border border-border bg-background p-6 shadow-sm"
    >
      {/* Image Upload Section */}
      <div className="flex flex-col items-center gap-3">
        {previewImage ? (
          <div className="relative">
            <img
              src={previewImage}
              alt="Preview"
              className="h-32 w-full max-w-[200px] rounded-lg object-cover ring-2 ring-border"
            />
            <Controller
              name="propertyImages"
              control={control}
              render={({ field: { onChange } }) => (
                <button
                  type="button"
                  onClick={() => handleDismissImage(onChange)}
                  className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-destructive text-xs text-white shadow hover:scale-105"
                >
                  ✕
                </button>
              )}
            />
          </div>
        ) : (
          <div className="flex h-32 w-full max-w-[200px] items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
            No Image Selected
          </div>
        )}

        <Controller
          name="propertyImages"
          control={control}
          render={({ field: { onChange } }) => (
            <label className="cursor-pointer text-sm font-medium text-primary hover:underline">
              Upload property image
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
              />
            </label>
          )}
        />
        {errors.propertyImages && (
          <p className="text-xs text-destructive">{errors.propertyImages.message}</p>
        )}
      </div>

      {/* Title */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Property Title</label>
        <input
          {...register("title")}
          placeholder="Modern Apartment in Downtown"
          className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:ring-2 focus:ring-primary/30"
        />
        {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Description</label>
        <textarea
          {...register("description")}
          placeholder="Describe the property details..."
          className="min-h-[100px] w-full rounded-lg border border-border bg-background p-3 text-sm focus:ring-2 focus:ring-primary/30"
        />
        {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
      </div>

      {/* Grid for Selects and Numbers */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Property Type */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Type</label>
          <select
            {...register("propertyType")}
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
          >
            <option value="">Select Type</option>
            <option value={PropertyTypeEnum.HOUSE}>House</option>
            <option value={PropertyTypeEnum.APARTMENT}>Apartment</option>
          </select>
          {errors.propertyType && <p className="text-xs text-destructive">{errors.propertyType.message}</p>}
        </div>

        {/* BHK */}
        <div className="space-y-1">
          <label className="text-sm font-medium">BHK</label>
          <select
            {...register("bhk")}
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
          >
            <option value="">Select BHK</option>
            <option value={BHKEnum.TWO}>2 BHK</option>
            <option value={BHKEnum.THREE}>3 BHK</option>
            <option value={BHKEnum.FOUR_PLUS}>4+ BHK</option>
          </select>
          {errors.bhk && <p className="text-xs text-destructive">{errors.bhk.message}</p>}
        </div>

        {/* Price */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Price ($)</label>
          <input
            type="number"
            {...register("price", {valueAsNumber: true})}
            placeholder="500000"
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
          />
          {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
        </div>
      </div>

      {/* Location Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium">City</label>
          <input
            {...register("city")}
            placeholder="New York"
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
          />
          {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Address</label>
          <input
            {...register("address")}
            placeholder="123 Main St"
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
          />
          {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || pending}
        className="h-11 w-full rounded-xl bg-primary font-semibold text-primary-foreground shadow transition hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting || pending ? "Listing Property..." : "List Property"}
      </button>

      {error && <p className="text-center text-sm text-destructive">{error}</p>}
    </form>
  );
}