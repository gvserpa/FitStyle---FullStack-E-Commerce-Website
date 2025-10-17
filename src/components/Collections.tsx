import Image from "next/image";
import { memo } from "react";
import legg from "../../public/legg.png";
import shirts from "../../public/shirts.png";
import shoes from "../../public/shoes.png";
import Link from "next/link";

const Collections = () => {
  return (
    <div className="px-4 md:px-10">
      <div className="text-center">
        <h2 className="font-bold text-3xl mb-6 md:mb-10">Our Collections</h2>
        <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
          Discover our fitness collections crafted for performance, comfort, and style,
          helping you look and feel your best every workout.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mt-8">
        {/* Leggings Card */}
        <Link
          href="/leggings"
          className="shadow-md w-full sm:w-1/3 h-64 sm:h-80 relative grid transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"
        >
          <Image src={legg} alt="Leggings" className="h-full w-full object-cover" />
          <span className="absolute bottom-0 left-0 w-full h-16 bg-black/60 text-white flex items-center justify-center text-lg font-semibold">
            Leggings
          </span>
        </Link>

        {/* Shirts Card */}
        <Link
          href="/shirts"
          className="shadow-md w-full sm:w-1/3 h-64 sm:h-80 relative grid transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"
        >
          <Image src={shirts} alt="Shirts" className="h-full w-full object-cover" />
          <span className="absolute bottom-0 left-0 w-full h-16 bg-black/60 text-white flex items-center justify-center text-lg font-semibold">
            Shirts
          </span>
        </Link>

        {/* Shoes Card */}
        <Link
          href="/shoes"
          className="shadow-md w-full sm:w-1/3 h-64 sm:h-80 relative grid transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"
        >
          <Image src={shoes} alt="Shoes" className="h-full w-full object-cover" />
          <span className="absolute bottom-0 left-0 w-full h-16 bg-black/60 text-white flex items-center justify-center text-lg font-semibold">
            Shoes
          </span>
        </Link>
      </div>
    </div>
  );
};

export default memo(Collections);
