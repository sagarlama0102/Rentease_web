"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state ONLY for the text input so it feels smooth while typing
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");

  const updateFilters = (updates: Record<string, string | undefined>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    newParams.set("page", "1");
    // scroll: false prevents the page from jumping to top on every filter
    router.push(`/dashboard?${newParams.toString()}`, { scroll: false });
  };

  return (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 mb-10">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      
      {/* Search */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-500 uppercase">
          Search
        </label>
        <input
          type="text"
          placeholder="City or Title..."
          className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#142725]"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && updateFilters({ search: searchValue })
          }
        />
      </div>

      {/* Type */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-500 uppercase">
          Type
        </label>
        <select
          className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#142725]"
          value={searchParams.get("type") || ""}
          onChange={(e) => updateFilters({ type: e.target.value })}
        >
          <option value="">All Types</option>
          <option value="HOUSE">House</option>
          <option value="APARTMENT">Apartment</option>
        </select>
      </div>

      {/* BHK */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-500 uppercase">
          Configuration
        </label>
        <select
          className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#142725]"
          value={searchParams.get("bhk") || ""}
          onChange={(e) => updateFilters({ bhk: e.target.value })}
        >
          <option value="">Any BHK</option>
          <option value="2BHK">2 BHK</option>
          <option value="3BHK">3 BHK</option>
          <option value="4BHK+">4BHK+</option>
        </select>
      </div>

      {/* Clear */}
      <div className="flex items-end">
  <button
    onClick={() => {
      setSearchValue("");
      router.push("/dashboard");
    }}
    className="w-full h-10 rounded-lg bg-[#142725] text-white text-sm font-medium hover:opacity-90 transition"
  >
    Clear Filters
  </button>
</div>
    </div>
  </div>
);
}