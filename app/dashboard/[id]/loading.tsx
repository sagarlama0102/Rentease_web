export default function PropertyDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      {/* Back Button Placeholder */}
      <div className="h-6 w-32 bg-gray-100 animate-pulse rounded mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side: Image Gallery Placeholder */}
        <div className="space-y-6">
          <div className="aspect-[4/3] w-full rounded-[2.5rem] bg-gray-200 animate-pulse shadow-sm" />
          <div className="grid grid-cols-3 gap-4">
            <div className="aspect-square rounded-[1.5rem] bg-gray-100 animate-pulse" />
            <div className="aspect-square rounded-[1.5rem] bg-gray-100 animate-pulse" />
            <div className="aspect-square rounded-[1.5rem] bg-gray-100 animate-pulse" />
          </div>
        </div>

        {/* Right Side: Info Placeholder */}
        <div className="flex flex-col space-y-8">
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="h-7 w-24 bg-[#99DAB3]/20 animate-pulse rounded-full" />
              <div className="h-7 w-20 bg-gray-100 animate-pulse rounded-full" />
            </div>
            <div className="h-14 w-full bg-gray-200 animate-pulse rounded-2xl" />
            <div className="h-6 w-1/2 bg-gray-100 animate-pulse rounded-lg" />
          </div>

          <div className="h-32 w-full bg-white border border-gray-100 animate-pulse rounded-[2.5rem]" />
          
          <div className="space-y-3">
            <div className="h-6 w-40 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-full bg-gray-100 animate-pulse rounded" />
            <div className="h-4 w-full bg-gray-100 animate-pulse rounded" />
            <div className="h-4 w-2/3 bg-gray-100 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}