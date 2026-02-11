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
  data.propertyImages.forEach((file) => {
    formData.append("propertyImages", file);
  });
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
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    
                    <div className="mb-4">
                        {previewImage ? (
                            <div className="relative w-24 h-24">
                                <img
                                    src={previewImage}
                                    alt="Property Image Preview"
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                                <Controller
                                    name="propertyImages"
                                    control={control}
                                    render={({ field: { onChange } }) => (
                                        <button
                                            type="button"
                                            onClick={() => handleDismissImage(onChange)}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                                        >
                                            ✕
                                        </button>
                                    )}
                                />
                            </div>
                        ) :
        
                            (
                                property.propertyImages ? (
                                    <div className="relative w-24 h-24">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${property.propertyImages}`}
                                            alt="Property Image"
                                            className="w-24 h-24 rounded-full object-cover"
                                            width={96}
                                            height={96}
                                        />
                                       
                                    </div>
                                ) : (
                                    <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                                        <span className="text-gray-600">No Image</span>
                                    </div>
                                )
                            )}
        
                    </div>
                   
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Property Image</label>
                        <Controller
                            name="propertyImages"
                            control={control}
                            render={({ field: { onChange } }) => (
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
                                    accept=".jpg,.jpeg,.png,.webp"
                                />
                            )}
                        />
                        {errors.propertyImages && <p className="text-sm text-red-600">{errors.propertyImages.message}</p>}
                    </div>
                    {/* Text Fields */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Title</label>
          <input {...register("title")} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
          {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea {...register("description")} className="min-h-[100px] w-full rounded-lg border border-input bg-background p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="text-sm font-medium">Type</label>
            <select {...register("propertyType")} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm">
              <option value={PropertyTypeEnum.HOUSE}>House</option>
              <option value={PropertyTypeEnum.APARTMENT}>Apartment</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">BHK</label>
            <select {...register("bhk")} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm">
              <option value={BHKEnum.TWO}>2 BHK</option>
              <option value={BHKEnum.THREE}>3 BHK</option>
              <option value={BHKEnum.FOUR_PLUS}>4+ BHK</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Price</label>
            <input type="number" {...register("price")} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">City</label>
            <input {...register("city")} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium">Address</label>
            <input {...register("address")} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" />
          </div>
        </div>
      </div>
        
                    
                    <button
                        type="submit"
                        disabled={isSubmitting || pending}
                        className="h-10 w-full rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 disabled:opacity-60"
                    >
                        {isSubmitting || pending ? "Updating account..." : "Update account"}
                    </button>
                    {error && <p className="text-center text-sm text-red-500">{error}</p>}
                </form>
    );
  
}