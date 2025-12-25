"use client";

export default function SearchBar() {
  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto max-w-5xl px-6">
        
        {/* Search Container */}
        <div className="rounded-lg shadow-md border border-gray-200 p-6 flex flex-col md:flex-row gap-4">
          
          {/* Location Input */}
          <input
            type="text"
            placeholder="Enter location"
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Property Type */}
          <select
            className="w-full md:w-48 rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option>Property Type</option>
            <option>Apartment</option>
            <option>House</option>
            <option>Room</option>
          </select>

          {/* Search Button */}
          <button
            className="w-full md:w-auto rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700 transition"
          >
            Search
          </button>
        </div>

      </div>
    </section>
  );
}
