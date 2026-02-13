import { handleGetOneProperty } from "@/lib/actions/admin/property-action";
import Link from "next/link";
export default async function Page({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const response = await handleGetOneProperty(id);
    if (!response.success) {
        throw new Error(response.message || 'Failed to load property');
    }

    return (
        <div>
            <Link href="/admin/property" className="text-blue-500 hover:underline">Back to Property</Link>
            <Link href={`/admin/property/${id}/edit`} className="text-green-500 hover:underline ml-4">Edit Property</Link>
            <h1 className="text-2xl font-bold mb-4 mt-2">Property Details</h1>
            <div className="border border-gray-300 rounded-lg p-4">
                <p><strong>title:</strong> {response.data.title}</p>
                <p><strong>description:</strong> {response.data.description}</p>
                <p><strong>propertyType:</strong> {response.data.propertyType}</p>
                <p><strong>bhk:</strong> {response.data.bhk}</p>
                <p><strong>address:</strong> {response.data.address}</p>
                <p><strong>city:</strong> {response.data.city}</p>
                <p><strong>price:</strong> {response.data.price}</p>
                {/* Add more user details as needed */}
            </div>
        </div>
    );
}