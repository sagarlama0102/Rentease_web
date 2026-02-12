"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import { handleDeleteUser } from "@/lib/actions/admin/user-action";
import DeleteModal from "@/app/_components/DeleteModal";
const UserTable = (
    { users, pagination, search }: { users: any[], pagination: any, search?: string }
) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState(search || '');
    const handleSearchChange = () => {
        router.push(`/admin/users?page=1&size=${pagination.size}` +
            (searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''));
    };
    const makePagination = (): React.ReactElement[] => {
        const pages = [];
        const currentPage = pagination.page;
        const totalPages = pagination.totalPages;
        const delta = 2; // Number of pages to show on each side of current page

        // Previous button
        const prevHref = `/admin/users?page=${currentPage - 1}&size=${pagination.size}` +
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
            const href = `/admin/users?page=1&size=${pagination.size}` +
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
            const href = `/admin/users?page=${i}&size=${pagination.size}` +
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
            const href = `/admin/users?page=${totalPages}&size=${pagination.size}` +
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
        const nextHref = `/admin/users?page=${currentPage + 1}&size=${pagination.size}` +
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
            await handleDeleteUser(deleteId!);
            toast.success("User deleted successfully");
        } catch (err: Error | any) {
            toast.error(err.message || "Failed to delete user");
        } finally {
            setDeleteId(null);
        }
    }
    return (
  <div className="mt-8 bg-white border border-gray-200 rounded-xl overflow-hidden">
    <DeleteModal
      isOpen={!!deleteId}
      onClose={() => setDeleteId(null)}
      onConfirm={onDelete}
      title="Delete Confirmation"
      description="Are you sure you want to delete this item? This action cannot be undone."
    />

    {/* Search */}
    <div className="flex flex-wrap items-center justify-between gap-4 p-6 border-b border-gray-100">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearchChange()}
        placeholder="Search users..."
        className="w-full sm:w-72 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#99DAB3]"
      />
      <button
        onClick={handleSearchChange}
        className="px-6 py-2 bg-[#99DAB3] text-white rounded-lg hover:opacity-90 transition"
      >
        Search
      </button>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr className="text-left text-gray-500 uppercase text-xs tracking-wider">
            <th className="px-6 py-3">User</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Role</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr
              key={user._id}
              className="hover:bg-gray-50 transition"
            >
              {/* User Info */}
              <td className="px-6 py-3">
                <div className="flex items-center gap-3">
                  {user.profilePicture ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${user.profilePicture}`}
                      alt="User Image"
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 bg-[#99DAB3] text-white rounded-full flex items-center justify-center text-xs font-medium">
                      {user.email?.[0]?.toUpperCase()}
                    </div>
                  )}

                  <div>
                    <div className="font-medium text-gray-900">
                      {user.firstName || ""} {user.lastName || ""}
                    </div>
                    <div className="text-xs text-gray-400">
                      {user._id}
                    </div>
                  </div>
                </div>
              </td>

              {/* Email */}
              <td className="px-6 py-3 text-gray-600">
                {user.email}
              </td>

              {/* Role */}
              <td className="px-6 py-3">
                <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 capitalize">
                  {user.role}
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-3 text-right space-x-4">
                <Link
                  href={`/admin/users/${user._id}`}
                  className="text-gray-700 hover:text-[#99DAB3] transition"
                >
                  View
                </Link>

                <Link
                  href={`/admin/users/${user._id}/edit`}
                  className="text-gray-700 hover:text-[#99DAB3] transition"
                >
                  Edit
                </Link>

                <button
                  onClick={() => setDeleteId(user._id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Pagination */}
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 border-t border-gray-100">
      <div className="text-sm text-gray-600">
        Page <span className="font-semibold text-gray-900">{pagination.page}</span> of{" "}
        {pagination.totalPages}
      </div>

      <div className="flex flex-wrap gap-2">
        {makePagination()}
      </div>
    </div>
  </div>
);
}

export default UserTable;