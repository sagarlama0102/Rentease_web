export default function UserTableSkeleton() {
  return (
    <div className="mt-8 bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse">
      
      {/* Search Bar Skeleton */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 border-b border-gray-100">
        <div className="w-full sm:w-72 h-10 bg-gray-200 rounded-lg" />
        <div className="w-24 h-10 bg-gray-200 rounded-lg" />
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3"><div className="h-3 w-12 bg-gray-200 rounded" /></th>
              <th className="px-6 py-3"><div className="h-3 w-16 bg-gray-200 rounded" /></th>
              <th className="px-6 py-3"><div className="h-3 w-10 bg-gray-200 rounded" /></th>
              <th className="px-6 py-3 text-right"><div className="h-3 w-16 ml-auto bg-gray-200 rounded" /></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {[...Array(8)].map((_, i) => (
              <tr key={i}>
                {/* User Info Cell */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-200 rounded-full flex-shrink-0" />
                    <div className="space-y-2">
                      <div className="h-3 w-28 bg-gray-200 rounded" />
                      <div className="h-2 w-20 bg-gray-100 rounded" />
                    </div>
                  </div>
                </td>

                {/* Email Cell */}
                <td className="px-6 py-4">
                  <div className="h-3 w-40 bg-gray-100 rounded" />
                </td>

                {/* Role Cell */}
                <td className="px-6 py-4">
                  <div className="h-6 w-16 bg-gray-100 rounded-full" />
                </td>

                {/* Actions Cell */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-4">
                    <div className="h-3 w-8 bg-gray-100 rounded" />
                    <div className="h-3 w-8 bg-gray-100 rounded" />
                    <div className="h-3 w-10 bg-gray-100 rounded" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 border-t border-gray-100">
        <div className="h-4 w-32 bg-gray-100 rounded" />
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 w-8 bg-gray-100 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}