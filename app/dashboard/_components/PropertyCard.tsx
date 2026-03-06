"use client";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/app/favourite/_components/FavouriteButton"; // Adjust this path!

// 1. Define the Props interface to accept initialIsFavorited
interface PropertyCardProps {
  property: any;
  initialIsFavorited?: boolean; // The '?' makes it optional
}

export default function PropertyCard({ 
  property, 
  initialIsFavorited = false // 2. Default it to false
}: PropertyCardProps) {
  
  const imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${property.propertyImages}`;

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden transition hover:shadow-md flex flex-col h-full relative">
      
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden shrink-0">
        <Image
          src={imageUrl}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badge */}
        <div className="absolute top-3 left-3 bg-[#142725] text-white text-[10px] px-3 py-1 rounded-full font-semibold tracking-wide z-10">
          {property.propertyType}
        </div>

        {/* 3. ADD THE FAVORITE BUTTON HERE */}
        <div className="absolute top-3 right-3 z-20">
          <FavoriteButton 
            propertyId={property._id} 
            initialIsFavorited={initialIsFavorited} 
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
        <div>
          <div className="flex justify-between items-start gap-3">
            <h3 
              className="text-base font-semibold text-gray-900 truncate flex-1" 
              title={property.title}
            >
              {property.title}
            </h3>
            <span className="text-base font-bold text-[#142725] whitespace-nowrap shrink-0">
              Rs. {property.price.toLocaleString()}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            {property.city} • {property.bhk}
          </p>
        </div>

        <div className="pt-2">
          {property.isRented ? (
            <div className="block text-center h-10 leading-10 rounded-lg bg-gray-50 border border-gray-200 text-gray-400 text-sm font-medium cursor-not-allowed w-full">
              Not Available
            </div>
          ) : (
            <Link
              href={`/dashboard/${property._id}`}
              className="block text-center h-10 leading-10 rounded-lg border border-[#142725] text-[#142725] text-sm font-medium hover:bg-[#142725] hover:text-white transition w-full"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}