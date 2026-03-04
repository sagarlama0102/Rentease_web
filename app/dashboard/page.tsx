import { Suspense } from "react";
import { handleGetAllProperty } from "@/lib/actions/property-action";
import PropertyGrid from "./_components/PropertyGrid";
import PropertyFilters from "./_components/PropertyFilters";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DashboardPage({ searchParams }: PageProps) {
 
  const params = await searchParams;

  // 2. Extract values from the URL
  const page = (params.page as string) || "1";
  const search = (params.search as string) || "";
  const type = (params.type as string) || "";
  const bhk = (params.bhk as string) || "";

  // 3. Pass these dynamic values to your action
  const response = await handleGetAllProperty(page, "12", search, type, bhk);
  const properties = response.data || [];

  return (
    <div className="space-y-10">
      <header className="space-y-2">
  <h1 className="text-3xl font-semibold text-gray-900">
    Welcome back
  </h1>
  <p className="text-gray-500">
    Explore the latest properties listed by our team.
  </p>
</header>

      {/* 4. Wrap the Client Component in Suspense to prevent the loop */}
      <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-[2rem]" />}>
        <PropertyFilters />
      </Suspense>

      <PropertyGrid properties={properties} />
    </div>
  );
}