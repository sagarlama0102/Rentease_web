"use client";
import Image from "next/image";
import Link from "next/link";

export default function PropertyCard({ property }: { property: any }) {
  const imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${property.propertyImages}`;

  return (
  <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden transition hover:shadow-md">
    {/* Image */}
    <div className="relative h-56 w-full overflow-hidden">
      <Image
        src={imageUrl}
        alt={property.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute top-3 left-3 bg-[#142725] text-white text-[10px] px-3 py-1 rounded-full font-semibold tracking-wide">
        {property.propertyType}
      </div>
    </div>

    {/* Content */}
    <div className="p-5 space-y-3">
      <div className="flex justify-between items-start">
        <h3 className="text-base font-semibold text-gray-900 truncate">
          {property.title}
        </h3>
        <span className="text-base font-bold text-[#142725]">
          ${property.price}
        </span>
      </div>

      <p className="text-sm text-gray-500">
        {property.city} • {property.bhk}
      </p>

      <Link
        href={`/dashboard/${property._id}`}
        className="block text-center h-10 leading-10 rounded-lg border border-[#142725] text-[#142725] text-sm font-medium hover:bg-[#142725] hover:text-white transition"
      >
        View Details
      </Link>
    </div>
  </div>
);
}