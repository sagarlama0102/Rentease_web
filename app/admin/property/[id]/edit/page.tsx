import { handleGetOneProperty } from "@/lib/actions/admin/property-action";
import UpdatePropertyForm from "../../_components/UpdatePropertyForm";
export default async function Page({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const response = await handleGetOneProperty(id);

    if(!response.success){
        throw new Error(response.message|| 'Failed to load property')
    }
    return (
        <div>
            <UpdatePropertyForm property={response.data} />
        </div>
    );
}
