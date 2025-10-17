// src/app/about/page.tsx
"use client";

import { memo } from "react";
import { Users, Award, Heart } from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen px-4 md:px-20 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-700 mb-4">
          About FitStyle
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          FitStyle is your premium destination for high-quality fitness apparel in Australia. 
          We combine style, comfort, and performance for your active lifestyle.
        </p>
      </div>

      {/* Our Mission */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-semibold text-cyan-700 mb-4 text-center">
          Our Mission
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          At FitStyle, our mission is to empower every individual to achieve their fitness goals while feeling confident and comfortable. 
          We design apparel that supports performance, durability, and style for everyone, whether you’re at the gym, yoga, or running outdoors.
        </p>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
          <Award className="w-12 h-12 text-cyan-700 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
          <p className="text-gray-600">
            Our products are crafted from high-quality, sustainable materials to ensure maximum comfort and durability.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
          <Heart className="w-12 h-12 text-cyan-700 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Customer First</h3>
          <p className="text-gray-600">
            We put our customers at the heart of everything we do, providing support, flexibility, and easy returns.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
          <Users className="w-12 h-12 text-cyan-700 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Community Focused</h3>
          <p className="text-gray-600">
            We are committed to building a supportive fitness community across Australia, inspiring healthy lifestyles for everyone.
          </p>
        </div>
      </div>

      {/* Closing Section */}
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          At FitStyle, we’re more than just fitness apparel — we’re your partner in achieving a healthy, confident, and active lifestyle.
        </p>
        <Link href={"/"}><button className="bg-cyan-700 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-cyan-900 transition-colors duration-300">
          Shop Now
        </button></Link>
      </div>
    </div>
  );
};

export default memo(AboutPage);
