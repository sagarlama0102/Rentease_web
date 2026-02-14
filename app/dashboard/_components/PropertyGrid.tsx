import PropertyCard from "./PropertyCard";

export default function PropertyGrid({ properties }: { properties: any[] }) {
  if (!properties || properties.length === 0) {
    return (
  <div className="text-center py-20 border border-dashed border-gray-300 rounded-2xl bg-white">
    <p className="text-gray-500 font-medium">
      No properties available at the moment.
    </p>
  </div>
);
  }

  return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {properties.map((item) => (
      <PropertyCard key={item._id} property={item} />
    ))}
  </div>
);
}