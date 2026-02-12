import Link from "next/link";
import { handleGetAllProperty } from "@/lib/actions/property-action";
import PropertyTable from "./_components/PropertyTable";
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
            <Link className="inline-flex items-center justify-center
        px-5 h-11
        rounded-xl
        bg-[#99DAB3]
        text-white text-sm font-semibold
        transition hover:opacity-90
        "
                href="/admin/property/create">Create Property</Link>
            <PropertyTable property={response.data} pagination={response.pagination} search={search}/>
        </div>
    );
}