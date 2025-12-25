import Image from "next/image";


export default function HeroSection() {
    return (
        <section className="relative h-[85vh] w-full flex items-center justify-center">
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 z-0">
                <Image 
                    src="/images/house.png" 
                    alt="Dream Home Background" 
                    fill 
                    className="object-cover" 
                    priority 
                />
                {/* Dark Overlay to make the white text pop */}
                <div className="absolute inset-0 bg-black/40 z-10"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Find Your Dream Home
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                    Explore certified properties across major cities with smart filters and instant booking options.
                </p>
            </div>
        </section>
    );
}

// "use client";

// export default function HeroSection() {
//   return (
//     <section className="w-full bg-white">
//       <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        
//         {/* Heading */}
//         <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
//           Find Your Perfect Rental Home
//         </h1>

//         {/* Description */}
//         <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
//           Browse thousands of verified properties, compare prices, and book your
//           next home with ease.
//         </p>

//         {/* Search Bar */}
//         <div className="mt-10 flex flex-col md:flex-row items-center gap-4 max-w-3xl mx-auto">
//           <input
//             type="text"
//             placeholder="Search by location, area, or property type"
//             className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//           />

//           <button
//             className="w-full md:w-auto rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700 transition"
//           >
//             Search
//           </button>
//         </div>

//       </div>
//     </section>
//   );
// }
