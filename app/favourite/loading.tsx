import React from "react";

export default function FavouriteLoading() {
  // Create an array of 8 items to represent the skeleton cards
  const skeletonCards = Array.from({ length: 8 });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <header className="mb-8 space-y-2">
        <div className="h-9 w-48 animate-pulse rounded-md bg-gray-200" />
        <div className="h-5 w-64 animate-pulse rounded-md bg-gray-100" />
      </header>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {skeletonCards.map((_, index) => (
          <div 
            key={index} 
            className="flex h-[400px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white"
          >
            {/* Image Skeleton */}
            <div className="h-56 w-full animate-pulse bg-gray-200" />
            
            {/* Content Skeleton */}
            <div className="flex flex-1 flex-col p-5 space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200" />
                <div className="h-5 w-1/4 animate-pulse rounded bg-gray-200" />
              </div>
              
              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
              
              {/* Button Skeleton */}
              <div className="mt-auto pt-2">
                <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}