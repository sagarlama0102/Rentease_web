import { handleGetPropertyDetails } from "@/lib/actions/property-action";
import { notFound } from "next/navigation";
import Link from "next/link";
import BookingButton from "@/app/booking/_components/BookingButton";

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
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-6 py-14">
        
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition mb-12"
        >
          ← Back to Explore
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* LEFT — Image */}
          <div className="relative">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 relative">
              
              <img
                src={getImageUrl(0)}
                alt={property.title}
                className="w-full h-full object-cover transition duration-700 hover:scale-[1.02]"
              />

              {/* ✅ Clean Full-Length Diagonal Ribbon */}
              {property.isRented && (
  <div className="absolute top-8 -right-28 rotate-45 w-[380px] bg-red-500 shadow-lg">
    <div className="text-white text-sm font-bold tracking-[0.25em] text-center py-2">
      RENTED OUT
    </div>
  </div>
)}
            </div>
          </div>

          {/* RIGHT — Content */}
          <div className="flex flex-col">
            
            {/* Tags */}
            <div className="flex gap-3 mb-6">
              <span className="px-3 py-1 text-xs font-semibold rounded-md bg-[#99DAB3]/20 text-[#142725]">
                {property.propertyType}
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-md bg-gray-100 text-gray-600">
                {property.bhk}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              {property.title}
            </h1>

            {/* Location */}
            <p className="mt-4 text-gray-500 text-sm">
              {property.city} — {property.address}
            </p>

            {/* Price Card */}
            <div className="mt-10 p-6 rounded-2xl border border-gray-200 bg-gray-50 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Monthly Rent
                </p>
                <p className="text-3xl font-semibold text-gray-900 mt-2">
                  Rs. {property.price.toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Availability
                </p>
                <p
                  className={`text-sm font-semibold mt-2 ${
                    property.isRented
                      ? "text-red-500"
                      : "text-[#99DAB3]"
                  }`}
                >
                  {property.isRented
                    ? "Already Rented"
                    : "Ready to Move"}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-10 border-t border-gray-200 pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                About this property
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {property.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-12">
              {property.isRented ? (
                <div className="flex-1 bg-gray-100 text-gray-400 h-12 rounded-lg flex items-center justify-center font-semibold text-sm border border-gray-200 cursor-not-allowed">
                  Currently Unavailable
                </div>
              ) : (
                <BookingButton propertyId={property._id} />
              )}

              <button className="h-12 w-12 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition text-lg">
                ❤️
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}