import React from "react";
import { handleGetMyWishlist } from "@/lib/actions/favourite-action";
import PropertyCard from "../dashboard/_components/PropertyCard";
import { HeartOff } from "lucide-react";
import Link from "next/link";

interface PageProps {
  // In Next.js 15, searchParams is a Promise
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function FavouritePage({ searchParams }: PageProps) {
  // 1. Unwrapped the searchParams Promise using await
  const resolvedSearchParams = await searchParams;

  // 2. Access properties from the resolved object
  const page = typeof resolvedSearchParams.page === "string" ? resolvedSearchParams.page : "1";
  const size = typeof resolvedSearchParams.size === "string" ? resolvedSearchParams.size : "12";

  const response = await handleGetMyWishlist(page, size);

  if (!response.success) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <p className="text-red-500">Error: {response.message}</p>
      </div>
    );
  }

  const favourites = response.data;
  const isEmpty = favourites.length === 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        <p className="text-gray-500">
          {isEmpty 
            ? "You haven't saved any properties yet." 
            : `Showing ${favourites.length} saved properties`}
        </p>
      </header>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-20">
          <div className="rounded-full bg-gray-50 p-6">
            <HeartOff className="h-12 w-12 text-gray-300" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-700">No favorites found</h2>
          <p className="mt-2 text-gray-500 text-center max-w-sm">
            Start exploring homes and click the heart icon to save the ones you love!
          </p>
          <Link
            href="/properties"
            className="mt-6 rounded-lg bg-[#142725] px-6 py-2 font-medium text-white transition-colors hover:bg-opacity-90"
          >
            Explore Properties
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favourites.map((fav: any) => (
            <PropertyCard 
              key={fav._id} 
              property={fav.property} 
              initialIsFavorited={true} 
            />
          ))}
        </div>
      )}
    </div>
  );
}