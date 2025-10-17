import Image from "next/image";
import exerciseCouple from "../../public/couple.png";
import MainCard from "@/components/MainCard";
import ProductCard from "@/components/ProductCard";
import { stripe } from "@/lib/stripe";
import Leggings from "@/components/Leggings";
import Shirts from "@/components/Shirts";
import Shoes from "@/components/Shoes";
import Collections from "@/components/Collections";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default async function Home() {
  const allProducts = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 100,
  });

  const leggings = allProducts.data.filter(
    (product) => product.metadata.category === "leggings"
  );
  const shirts = allProducts.data.filter(
    (product) => product.metadata.category === "shirts"
  );
  const shoes = allProducts.data.filter(
    (product) => product.metadata.category === "shoes"
  );

  return (
    <main>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row mt-10 bg-gray-200 gap-8 md:gap-20 px-4 md:px-10 h-200">
        {/* Left Column */}
        <div className="flex flex-col justify-between lg:h-200 w-full md:w-1/3 lg:w-1/2">
          <div className="flex flex-col gap-6 md:gap-10">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold">
              Transform Your<span className="text-cyan-700"> Fitness </span>
              Journey Today
            </h1>
            <p className="text-sm sm:text-base md:text-lg">
              Reach your goals in style and comfort. Discover fitness apparel
              that moves with you, combining performance, durability, and modern
              design for every workout. Feel confident as you push yourself
              daily and get inspired to exceed your limits with our premium
              activewear collection.
            </p>
          </div>
          <button className="bg-cyan-700 lg:mb-30 text-white px-6 py-3 sm:px-8 sm:py-4 mt-6 md:mt-0 rounded-2xl w-full sm:w-1/2 hover:bg-cyan-600 transition-transform duration-300 ease-in-out hover:-translate-y-1">
            Shop Now
          </button>
        </div>

        {/* Right Column */}
        <div className="relative w-full md:w-2/3 mt-6 md:mt-0">
          <svg
            className="absolute w-full h-full"
            viewBox="0 0 600 800"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ecfeff" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#0e7490" />
              </linearGradient>
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#cffafe" />
                <stop offset="50%" stopColor="#0891b2" />
                <stop offset="100%" stopColor="#0e7490" />
              </linearGradient>
              <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a5f3fc" />
                <stop offset="50%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#0e7490" />
              </linearGradient>
            </defs>

            <path
              d="M0,700 C100,500 200,300 300,200 C400,100 500,50 600,20"
              stroke="url(#waveGradient1)"
              strokeWidth="20"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M0,720 C110,510 210,310 310,205 C410,105 510,60 600,30"
              stroke="url(#waveGradient2)"
              strokeWidth="40"
              fill="none"
              opacity="0.4"
            />
            <path
              d="M0,680 C90,490 190,290 290,195 C390,95 490,40 600,10"
              stroke="url(#waveGradient3)"
              strokeWidth="20"
              fill="none"
              opacity="0.3"
            />
          </svg>

          <Image
            src={exerciseCouple}
            alt=""
            className="relative lg:h-full z-10 h-auto object-fit rounded"
          />
        </div>
      </div>

      {/* MainCard Section */}
      <div className="bg-white pt-20 pb-20 w-full">
        <MainCard />
      </div>

      {/* Collections Section */}
      <div className="bg-white py-20">
        <Collections />
      </div>

      {/* Leggings Carousel */}
      <div className="bg-white pt-20">
        <Leggings />
        <div className="container mx-auto px-4">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {leggings.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* Shirts Carousel */}
      <div className="bg-white pt-20">
        <Shirts />
        <div className="container mx-auto px-4">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {shirts.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* Shoes Carousel */}
      <div className="bg-white pt-20 pb-20">
        <Shoes />
        <div className="container mx-auto px-4">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {shoes.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </main>
  );
}
