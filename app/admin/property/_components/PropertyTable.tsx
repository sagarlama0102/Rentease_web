"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import { handleDeleteProperty } from "@/lib/actions/admin/property-action";
import DeleteModal from "@/app/_components/DeleteModal";
const PropertyTable = (
    { property, pagination, search }: { property: any[], pagination: any, search?: string }
) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState(search || '');
    const handleSearchChange = () => {
        router.push(`/admin/property?page=1&size=${pagination.size}`+
            (searchTerm ? `&search=${encodeURIComponent(searchTerm)}`: '')
        );
    };
    const makePagination = (): React.ReactElement[]=> {
        const pages = [];
        const currentPage = pagination.page;
        const totalPages = pagination.totalPages;
        const delta = 2; // Number of pages to show on each side of current page

        // Previous button
        const prevHref = `/admin/property?page=${currentPage - 1}&size=${pagination.size}` +
            (searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : '');
        pages.push(
            <Link key="prev"
                className={`px-3 py-1 border rounded-md 
                    ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none' : 'bg-white text-blue-500 hover:bg-blue-100'}`}
                href={currentPage === 1 ? '#' : prevHref}>
                Previous
            </Link>
        );
        // Calculate range of pages to show
        let startPage = Math.max(1, currentPage - delta);
        let endPage = Math.min(totalPages, currentPage + delta);

        // Add first page if not in range
        if (startPage > 1) {
            const href = `/admin/property?page=1&size=${pagination.size}` +
                (searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : '');
            pages.push(
                <Link key={1}
                    className="px-3 py-1 border rounded-md bg-white text-blue-500 hover:bg-blue-100"
                    href={href}>
                    1
                </Link>
            );
            if (startPage > 2) {
                pages.push(
                    <span key="ellipsis1" className="px-2 text-gray-500">...</span>
                );
            }
        }
        // Add page numbers in range
        for (let i = startPage; i <= endPage; i++) {
            const href = `/admin/property?page=${i}&size=${pagination.size}` +
                (search ? `&search=${encodeURIComponent(search)}` : '');
            pages.push(
                <Link key={i}
                    className={`px-3 py-1 border rounded-md 
                        ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-100'}`}
                    href={href}>
                    {i}
                </Link>
            );
        }
        // Add last page if not in range
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <span key="ellipsis2" className="px-2 text-gray-500">...</span>
                );
            }
            const href = `/admin/property?page=${totalPages}&size=${pagination.size}` +
                (search ? `&search=${encodeURIComponent(search)}` : '');
            pages.push(
                <Link key={totalPages}
                    className="px-3 py-1 border rounded-md bg-white text-blue-500 hover:bg-blue-100"
                    href={href}>
                    {totalPages}
                </Link>
            );
        }
        // Next button
        const nextHref = `/admin/property?page=${currentPage + 1}&size=${pagination.size}` +
            (search ? `&search=${encodeURIComponent(search)}` : '');
        pages.push(
            <Link key="next"
                className={`px-3 py-1 border rounded-md 
                    ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none' : 'bg-white text-blue-500 hover:bg-blue-100'}`}
                href={currentPage === totalPages ? '#' : nextHref}>
                Next
            </Link>
        );
        return pages;

    }
    const [deleteId, setDeleteId] = useState(null);

    const onDelete = async () => {
            try {
                await handleDeleteProperty(deleteId!);
                toast.success("Property deleted successfully");
            } catch (err: Error | any) {
                toast.error(err.message || "Failed to delete property");
            } finally {
                setDeleteId(null);
            }
    }
    return (
  <div className="mt-8">
    <DeleteModal
      isOpen={!!deleteId}
      onClose={() => setDeleteId(null)}
      onConfirm={onDelete}
      title="Delete Property"
      description="Are you sure you want to delete this property? This will remove all associated data."
    />

    {/* Search Bar */}
    <div className="flex flex-wrap gap-3 mb-8">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearchChange()}
        placeholder="Search by title or city..."
        className="flex-1 min-w-[220px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#99DAB3]"
      />
      <button
        onClick={handleSearchChange}
        className="px-6 py-2 bg-[#99DAB3] text-white rounded-lg hover:opacity-90 transition"
      >
        Search
      </button>
    </div>

    {/* Card Grid */}
    {property.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {property.map((prop) => (
          <div
            key={prop._id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition"
          >
            {/* Image */}
            <div className="relative h-40 w-full bg-gray-100">
              {prop.propertyImages ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${prop.propertyImages}`}
                  alt={prop.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              <div>
                <h3
                  className="text-base font-semibold text-gray-900 truncate"
                  title={prop.title}
                >
                  {prop.title}
                </h3>
                <p className="text-sm text-gray-500">{prop.city}</p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700 uppercase">
                  {prop.propertyType}
                </span>
                <span className="text-gray-600">{prop.bhk}</span>
              </div>

              <div className="text-lg font-bold text-[#99DAB3]">
                ${Number(prop.price).toLocaleString()}
              </div>

              {/* Actions */}
              <div className="flex justify-between pt-3 border-t border-gray-100">
                <Link
                  href={`/admin/property/${prop._id}/edit`}
                  className="text-sm font-medium text-gray-900 hover:text-[#99DAB3] transition"
                >
                  Edit
                </Link>

                <button
                  onClick={() => setDeleteId(prop._id)}
                  className="text-sm font-medium text-red-500 hover:text-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-16 text-gray-500">
        No properties found. Try a different search term.
      </div>
    )}

    {/* Pagination */}
    <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="text-sm text-gray-600">
        Showing page{" "}
        <span className="font-semibold text-gray-900">
          {pagination.page}
        </span>{" "}
        of {pagination.totalPages}
      </div>

      <div className="flex gap-2 flex-wrap">{makePagination()}</div>
    </div>
  </div>
);
}
export default PropertyTable;