export default function BookingsLoading() {
  return (
    <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-64 bg-gray-200 rounded-lg mb-2" />
        <div className="h-4 w-96 bg-gray-100 rounded-md" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-6"><div className="h-3 w-20 bg-gray-100 rounded" /></th>
              <th className="py-4 px-4"><div className="h-3 w-20 bg-gray-100 rounded" /></th>
              <th className="py-4 px-4"><div className="h-3 w-20 bg-gray-100 rounded" /></th>
              <th className="py-4 px-4"><div className="h-3 w-20 bg-gray-100 rounded" /></th>
              <th className="py-4 px-6 text-right"><div className="h-3 w-20 ml-auto bg-gray-100 rounded" /></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[...Array(6)].map((_, i) => (
              <tr key={i}>
                {/* User Details Cell */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-200 rounded-full" />
                    <div className="space-y-2">
                      <div className="h-3 w-24 bg-gray-200 rounded" />
                      <div className="h-2 w-32 bg-gray-100 rounded" />
                    </div>
                  </div>
                </td>

                {/* Property Cell */}
                <td className="py-4 px-4">
                  <div className="space-y-2">
                    <div className="h-3 w-32 bg-gray-200 rounded" />
                    <div className="h-2 w-16 bg-gray-100 rounded" />
                  </div>
                </td>

                {/* Request Date Cell */}
                <td className="py-4 px-4">
                  <div className="h-3 w-20 bg-gray-100 rounded" />
                </td>

                {/* Status Cell */}
                <td className="py-4 px-4">
                  <div className="h-6 w-20 bg-gray-100 rounded-full" />
                </td>

                {/* Actions Cell */}
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-2">
                    <div className="h-8 w-8 bg-gray-100 rounded-lg" />
                    <div className="h-8 w-8 bg-gray-100 rounded-lg" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}