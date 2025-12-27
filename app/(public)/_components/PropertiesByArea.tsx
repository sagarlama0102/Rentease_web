import Image from "next/image";

const areas = [
  { name: "Budhanilkantha", count: "10 listings", src: "/images/budanilkhanta.png", grid: "col-span-1" },
  { name: "Swayambhu", count: "05 listings", src: "/images/swyambhu.png", grid: "col-span-1" },
  { name: "kuleshwor", count: "08 listings", src: "/images/kuleshwor.png", grid: "col-span-1" },
  { name: "Baneshwor", count: "12 listings", src: "/images/house.png", grid: "col-span-2" },
  { name: "Bhaisepati", count: "07 listings", src: "/images/bhaisepati.png", grid: "col-span-1" },
];

export default function PropertyByArea() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#2D3748]">Properties by Area</h2>
        <div className="w-24 h-1 bg-[#9EE2B8] mx-auto mt-2"></div>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm">
          Explore certified properties across major cities with smart filters and instant booking options.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {areas.map((area, index) => (
          <div 
            key={index} 
            className={`relative h-64 rounded-xl overflow-hidden group cursor-pointer ${area.grid}`}
          >
            <Image
              src={area.src}
              alt={area.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            
            {/* Text Content */}
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-bold">{area.name}</h3>
              <p className="text-sm opacity-80">{area.count}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}