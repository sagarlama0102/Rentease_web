import Image from "next/image";
import { Bed, Bath, Move, User } from "lucide-react"; // Using lucide-react for the icons

const properties = [
  {
    id: 1,
    title: "6802 Narayanhiti Palace Museum, Baluwatar, Kathmandu",
    price: "NRP 1,50,000",
    beds: 4,
    baths: 2,
    sqft: "2,500 sq ft",
    image: "/images/latestimageone.png",
    agent: "Jenny Wilson",
    isVerified: true,
  },
  {
    id: 2,
    title: "44000 Narayanhiti Palace Museum, Baluwatar, Kathmandu",
    price: "NRP 2,50,000",
    beds: 4,
    baths: 2,
    sqft: "2,500 sq ft",
    image: "/images/latestimagetwo.png",
    agent: "Jenny Wilson",
    isVerified: true,
  },
  {
    id: 3,
    title: "6802 Narayanhiti Palace Museum, Baluwatar, Kathmandu",
    price: "NRP 1,50,000",
    beds: 4,
    baths: 2,
    sqft: "2,500 sq ft",
    image: "/images/latestimagethree.png",
    agent: "Jenny Wilson",
    isVerified: true,
  },
  {
    id: 4,
    title: "6802 Narayanhiti Palace Museum, Baluwatar, Kathmandu",
    price: "NRP 1,50,000",
    beds: 4,
    baths: 2,
    sqft: "2,500 sq ft",
    image: "/images/latestimagefour.png",
    agent: "Jenny Wilson",
    isVerified: true,
  },
  {
    id: 5,
    title: "6802 Narayanhiti Palace Museum, Baluwatar, Kathmandu",
    price: "NRP 1,50,000",
    beds: 4,
    baths: 2,
    sqft: "2,500 sq ft",
    image: "/images/latestimagefive.png",
    agent: "Jenny Wilson",
    isVerified: true,
  },
  {
    id: 6,
    title: "6802 Narayanhiti Palace Museum, Baluwatar, Kathmandu",
    price: "NRP 1,50,000",
    beds: 4,
    baths: 2,
    sqft: "2,500 sq ft",
    image: "/images/latestimagesix.png",
    agent: "Jenny Wilson",
    isVerified: true,
  },
  // Add more as needed to match your screenshot (it shows 6 cards total)
];

export default function LatestProperties() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#2D3748]">Latest Properties</h2>
        <div className="w-24 h-1 bg-[#9EE2B8] mx-auto mt-2"></div>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm">
          Explore certified properties across major cities with smart filters and instant booking options.
        </p>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((prop) => (
          <div key={prop.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Image & Badge */}
            <div className="relative h-60 w-full">
              <Image src={prop.image} alt={prop.title} fill className="object-cover" />
              {prop.isVerified && (
                <span className="absolute top-4 left-4 bg-[#9EE2B8] text-[#2D3748] text-[10px] font-bold px-2 py-1 rounded">
                  VERIFIED
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              <h3 className="font-bold text-[#2D3748] text-sm leading-tight line-clamp-2">
                {prop.title}
              </h3>
              <p className="text-[#4ade80] font-bold text-lg">{prop.price}</p>
              
              {/* Features */}
              <div className="flex items-center gap-4 text-gray-500 text-xs py-2 border-y border-gray-50">
                <div className="flex items-center gap-1">
                  <Bed size={14} /> <span>{prop.beds}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath size={14} /> <span>{prop.baths}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Move size={14} /> <span>{prop.sqft}</span>
                </div>
              </div>

              {/* Agent info */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                     <User size={18} className="text-gray-400" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">{prop.agent}</span>
                </div>
                <div className="w-6 h-6 bg-[#9EE2B8] rounded flex items-center justify-center">
                   <div className="w-2 h-2 border-r-2 border-b-2 border-[#2D3748] rotate-[-45deg]"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-12 text-center">
        <button className="bg-[#1a1a1a] text-white px-8 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition">
          Load more button
        </button>
      </div>
    </section>
  );
}