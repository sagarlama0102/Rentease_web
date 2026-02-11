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
    return(
        <div className="mt-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <DeleteModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={onDelete}
                title="Delete Property"
                description="Are you sure you want to delete this property? This will remove all associated data."
            />

            <div className="p-4 bg-gray-50 dark:bg-gray-800 flex flex-wrap gap-2">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchChange()}
                    placeholder="Search by title or city..."
                    className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button onClick={handleSearchChange}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                    Search
                </button>
            </div>

            <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b">
                <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Preview</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Title</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">City</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">BHK</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                {property.length > 0 ? property.map((prop) => (
                    <tr key={prop._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-4 py-3">
                            <div className="relative w-16 h-10 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                                {prop.propertyImages ? (
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${prop.propertyImages}`}
                                        alt={prop.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-[10px] text-gray-400 italic">No Image</div>
                                )}
                            </div>
                        </td>
                        <td className="px-4 py-3">
                            <div className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[180px]" title={prop.title}>
                                {prop.title}
                            </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                            {prop.city}
                        </td>
                        <td className="px-4 py-3">
                            <span className="text-xs font-medium px-2 py-1 rounded bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 uppercase">
                                {prop.propertyType}
                            </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                            {prop.bhk}
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-emerald-600">
                            ${Number(prop.price).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm flex items-center gap-3">
                            <Link 
                                href={`/admin/property/${prop._id}/edit`} 
                                className="text-indigo-600 hover:text-indigo-900 transition-colors"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => setDeleteId(prop._id)}
                                className="text-rose-500 hover:text-rose-700 transition-colors"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan={7} className="px-4 py-12 text-center text-gray-500 italic">
                            No properties found. Try a different search term.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>

            <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50 dark:bg-gray-800 border-t">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    Showing page <span className="font-semibold">{pagination.page}</span> of {pagination.totalPages}
                </div>
                <div className="flex gap-1">
                    {makePagination()}
                </div>
            </div>
        </div>
    );
}
export default PropertyTable;