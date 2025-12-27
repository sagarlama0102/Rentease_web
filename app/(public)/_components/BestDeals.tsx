import Image from "next/image";
import { MapPin, Move, } from "lucide-react";

const deals = [
  {
    id: 1,
    location: "Gokarna",
    sqft: "1200 sq ft",
    image: "/images/bestdealsone.png",
  },
  {
    id: 2,
    location: "Baluwatar",
    sqft: "1500 sq ft",
    image: "/images/bestdealstwo.png",
  },
  {
    id: 3,
    location: "Kapan",
    sqft: "1800 sq ft",
    image: "/images/bestdealsthree.png",
  },
  {
    id: 4,
    location: "Lalitpur",
    sqft: "2200 sq ft",
    image: "/images/bestdealsfour.png",
  },
  {
    id: 5,
    location: "Baneshwor",
    sqft: "1000 sq ft",
    image: "/images/latestimagefour.png",
  },
  {
    id: 6,
    location: "Baneshwor",
    sqft: "1000 sq ft",
    image: "/images/latestimagefour.png",
  },
];

export default function BestDeals() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#2D3748]">Best Deals on Property</h2>
        <div className="w-24 h-1 bg-[#9EE2B8] mx-auto mt-2"></div>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm">
          Explore certified properties across major cities with smart filters and instant booking options.
        </p>
      </div>

      {/* Deals Cards Container */}
      <div className="relative group">
        <div className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide no-scrollbar">
          {deals.map((deal) => (
            <div 
              key={deal.id} 
              className="relative min-w-[220px] h-[350px] rounded-xl overflow-hidden flex-shrink-0 cursor-pointer"
            >
              {/* Image */}
              <Image 
                src={deal.image} 
                alt={deal.location} 
                fill 
                className="object-cover" 
              />
              
              {/* Best Offer Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#142725] text-white text-[10px] px-3 py-1 rounded-sm backdrop-blur-sm">
                  Best offer
                </span>
              </div>

              {/* Bottom Info Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-1">
                    <MapPin size={12} />
                    <span>{deal.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Move size={12} />
                    <span>{deal.sqft}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
    
  );
}