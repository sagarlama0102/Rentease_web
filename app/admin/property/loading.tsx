export default function PropertySkeleton() {
  return (
    <div className="mt-8 animate-pulse">
      {/* Search Bar Skeleton */}
      <div className="flex flex-wrap gap-3 mb-8">
        <div className="flex-1 min-w-[220px] h-11 bg-gray-200 rounded-lg" />
        <div className="w-24 h-11 bg-gray-200 rounded-lg" />
      </div>

      {/* Card Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm"
          >
            {/* Image Placeholder */}
            <div className="h-40 w-full bg-gray-200" />

            {/* Content Placeholder */}
            <div className="p-5 space-y-4">
              <div>
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-1/4 bg-gray-100 rounded" />
              </div>

              <div className="flex items-center justify-between">
                <div className="h-6 w-16 bg-gray-100 rounded" />
                <div className="h-3 w-10 bg-gray-100 rounded" />
              </div>

              <div className="h-6 w-24 bg-gray-200 rounded mt-2" />

              {/* Actions Placeholder */}
              <div className="flex justify-between pt-4 border-t border-gray-50">
                <div className="h-4 w-10 bg-gray-100 rounded" />
                <div className="h-4 w-12 bg-gray-100 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="h-4 w-40 bg-gray-100 rounded" />
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 w-8 bg-gray-100 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}