export default function Loading() {
  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 py-10">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-9 w-48 bg-gray-200 animate-pulse rounded-lg" />
        <div className="h-5 w-64 bg-gray-100 animate-pulse rounded-lg" />
      </div>

      {/* Filter Bar Skeleton */}
      <div className="h-16 w-full bg-gray-50 animate-pulse rounded-[2rem] border border-gray-100" />

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            {/* Image Box */}
            <div className="h-56 w-full bg-gray-200 animate-pulse" />
            
            {/* Content Box */}
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-5 w-32 bg-gray-200 animate-pulse rounded" />
                <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-full" />
              </div>
              <div className="h-4 w-24 bg-gray-100 animate-pulse rounded" />
              <div className="h-10 w-full bg-gray-50 animate-pulse rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}