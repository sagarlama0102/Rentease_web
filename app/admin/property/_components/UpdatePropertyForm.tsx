"use client";
import { Controller, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import {toast} from "react-toastify";
import { handleUpdateProperty } from "@/lib/actions/admin/property-action";
import Image from "next/image";
import { PropertyData, PropertySchema, PropertyTypeEnum, BHKEnum } from "../schema";
import { z } from "zod";

export default function UpdatePropertyForm(
    {property}: {property: any}
){
    console.log("Current Property Data:", property);
    const [pending, startTransition] = useTransition();
    const {register, handleSubmit, control, reset, formState: {errors, isSubmitting}}= useForm<Partial<PropertyData>>({
        resolver: zodResolver(PropertySchema.partial()),
        defaultValues: {
            title: property.title || '',
            description: property.description || '',
            propertyType: undefined,
            bhk: undefined,
            price: property.price || '',
            address: property.address|| '',
            city: property.city||'',
            propertyImages: undefined,
        }
    });
    const [error, setError] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null> (null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (file: File | undefined, onChange:(file: File | undefined)=> void) => {
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
    const onSubmit = async(data: Partial<PropertyData>)=> {
        setError(null);
        startTransition(async()=>{
            try{
                const formData = new FormData();
                if(data.title){
                    formData.append("title", data.title);
                }
                if(data.description){
                    formData.append('description', data.description);
                }
                if(data.propertyType){
                    formData.append('propertyType', data.propertyType);
                }
                if(data.bhk){
                    formData.append('bhk', data.bhk);
                }
                if(data.address){
                    formData.append('address', data.address);
                }
                if(data.city){
                    formData.append('city', data.city);
                }
                if (data.propertyImages) {
          formData.append("propertyImages", data.propertyImages);
       }
                const response = await handleUpdateProperty(property._id, formData);

                if(!response.success){
                    throw new Error(response.message || "Update Property Failed");
                }
                reset();
                handleDismissImage();
                toast.success("Property Updated successfully");
            }catch (error: Error | any){
                toast.error(error.message|| "Update property failed");
                setError(error.message || "Update property failed");
            }
        });
        
        
    };
    console.log(errors);
    return (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-8 bg-white text-gray-900 p-8 rounded-2xl border border-gray-200"
  >
    {/* Image Preview */}
    <div className="flex flex-col items-center gap-4">
      {previewImage ? (
        <div className="relative">
          <img
            src={previewImage}
            alt="Property Preview"
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
      ) : property.propertyImages ? (
        <div className="relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${property.propertyImages}`}
            alt="Property Image"
            width={256}
            height={160}
            className="h-40 w-64 rounded-xl object-cover border border-gray-200"
          />
        </div>
      ) : (
        <div className="h-40 w-64 rounded-xl border border-gray-200 bg-gray-100 flex items-center justify-center text-sm text-gray-400">
          No Image
        </div>
      )}

      <Controller
        name="propertyImages"
        control={control}
        render={({ field: { onChange } }) => (
          <label className="cursor-pointer text-sm font-medium text-[#99DAB3] hover:underline">
            Change property image
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

      {errors.propertyImages && (
        <p className="text-xs text-red-500">
          {errors.propertyImages.message}
        </p>
      )}
    </div>

    {/* Title */}
    <div className="space-y-2">
      <label className="text-sm font-medium">Title</label>
      <input
        {...register("title")}
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
          <option value={PropertyTypeEnum.HOUSE}>House</option>
          <option value={PropertyTypeEnum.APARTMENT}>Apartment</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">BHK</label>
        <select
          {...register("bhk")}
          className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-[#99DAB3] transition"
        >
          <option value={BHKEnum.TWO}>2 BHK</option>
          <option value={BHKEnum.THREE}>3 BHK</option>
          <option value={BHKEnum.FOUR_PLUS}>4+ BHK</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Price</label>
        <input
          type="number"
          {...register("price")}
          className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-[#99DAB3] transition"
        />
      </div>
    </div>

    {/* Location */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">City</label>
        <input
          {...register("city")}
          className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-[#99DAB3] transition"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Address</label>
        <input
          {...register("address")}
          className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-[#99DAB3] transition"
        />
      </div>
    </div>

    {/* Submit */}
    <button
      type="submit"
      disabled={isSubmitting || pending}
      className="w-full h-12 rounded-xl bg-[#99DAB3] text-gray-900 font-semibold text-sm hover:opacity-90 transition disabled:opacity-60"
    >
      {isSubmitting || pending ? "Updating property..." : "Update property"}
    </button>

    {error && (
      <p className="text-center text-sm text-red-500">{error}</p>
    )}
  </form>
);
  
}