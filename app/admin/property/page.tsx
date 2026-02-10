import Link from "next/link";
import { handleGetAllProperty } from "@/lib/actions/property-action";

export default async function Page({
    searchParams
}: {
     searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const page = params.page as string || '1';
    const size = params.size as string || '12';
    const search = params.search as string || '';

    const response = await handleGetAllProperty(
            page,
            size,
            search as string
    );
    if (!response.success) {
        throw new Error(response.message || 'Failed to load properties');
    }
    return (
        <div>
            <Link className="text-blue-500 border border-blue-500 p-2 rounded inline-block"
                href="/admin/users/create">Create User</Link>
            {/* <UserTable users={response.data} pagination={response.pagination} search={search} /> */}
        </div>
    );
}