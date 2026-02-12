import Link from "next/link";
import { handleGetAllUsers } from "@/lib/actions/admin/user-action";
import UserTable from "./_components/UserTable";

export default async function Page({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const page = params.page as string || '1';
    const size = params.size as string || '10';
    const search = params.search as string || '';

    const response = await handleGetAllUsers(
        page,
        size,
        search as string
    );

    if (!response.success) {
        throw new Error(response.message || 'Failed to load users');
    }

    return (
        <div>
            <Link className="inline-flex items-center justify-center
        px-5 h-11
        rounded-xl
        bg-[#99DAB3]
        text-white text-sm font-semibold
        transition hover:opacity-90
        "
                href="/admin/users/create">Create User</Link>
            <UserTable users={response.data} pagination={response.pagination} search={search} />
        </div>
    );
}