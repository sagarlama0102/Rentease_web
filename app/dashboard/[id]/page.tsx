import { handleGetPropertyDetails } from "@/lib/actions/property-action";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await handleGetPropertyDetails(id);
  

  if (!response.success || !response.data) {
    notFound();
  }

  const property = response.data;

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  const getImageUrl = (index: number) => {
    const path = property.propertyImages?.[index];
    if (!path) return "/placeholder-home.jpg";
    return `${API_BASE}${path}`;
  };

  return (
  <div className="max-w-6xl mx-auto px-6 py-12 bg-white">
    {/* Back */}
    <Link
      href="/dashboard"
      className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition mb-10"
    >
      ← Back to Explore
    </Link>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      
      {/* LEFT — Image */}
      <div>
        <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-200">
          <img
            src={getImageUrl(0)}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* RIGHT — Content */}
      <div className="flex flex-col">
        
        {/* Tags */}
        <div className="flex gap-3 mb-4">
          <span className="px-3 py-1 text-xs font-semibold rounded-md bg-[#99DAB3]/20 text-[#142725]">
            {property.propertyType}
          </span>
          <span className="px-3 py-1 text-xs font-semibold rounded-md bg-gray-100 text-gray-600">
            {property.bhk}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          {property.title}
        </h1>

        {/* Location */}
        <p className="mt-3 text-gray-500 text-sm">
          {property.city} — {property.address}
        </p>

        {/* Price Section */}
        <div className="mt-8 border-t border-b border-gray-200 py-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Monthly Rent
            </p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">
              Rs. {property.price.toLocaleString()}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Availability
            </p>
            <p className="text-sm font-medium text-[#99DAB3] mt-1">
              Ready to Move
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            About this property
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            {property.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-10">
          <button className="flex-1 h-12 bg-[#142725] text-white text-sm font-medium rounded-lg hover:opacity-90 transition">
            Book Viewing
          </button>

          <button className="h-12 w-12 rounded-lg border border-gray-200 hover:bg-gray-50 transition flex items-center justify-center text-lg">
            ❤️
          </button>
        </div>
      </div>
    </div>
  </div>
);
}