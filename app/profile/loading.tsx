// loading.tsx
export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6 animate-pulse">
      <div className="mb-8">
        <div className="h-9 w-64 bg-gray-200 rounded-lg mb-2" />
        <div className="h-4 w-96 bg-gray-100 rounded-md" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-[#142725] rounded-3xl p-8 h-[400px] border border-[#99DAB3]/10 flex flex-col items-center">
            <div className="w-32 h-32 rounded-3xl bg-[#1e3a37] mb-6" />
            <div className="h-6 w-32 bg-[#1e3a37] rounded mb-3" />
            <div className="h-5 w-20 bg-[#99DAB3]/10 rounded-full" />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-[500px]">
            <div className="flex justify-between mb-10">
              <div className="h-7 w-40 bg-gray-200 rounded" />
              <div className="h-10 w-28 bg-gray-100 rounded-xl" />
            </div>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="h-3 w-20 bg-gray-100 rounded" />
                  <div className="h-14 w-full bg-gray-50 rounded-2xl" />
                </div>
                <div className="space-y-3">
                  <div className="h-3 w-24 bg-gray-100 rounded" />
                  <div className="h-14 w-full bg-gray-50 rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}