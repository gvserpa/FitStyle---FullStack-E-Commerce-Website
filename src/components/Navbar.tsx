"use client";

import { memo, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/card-store";
import { ChevronDown, ShoppingCart } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div>
      <div className="w-screen bg-cyan-700 text-white flex items-center justify-center py-2">
        <p className="text-sm">Free shipping on all order over $50</p>
      </div>
      <header className="flex justify-between items-center px-10 py-6 relative">
        <h2 className="text-2xl font-bold">
          Fit<span className="text-cyan-700">Style</span>
        </h2>

        <nav>
          <ul className="flex gap-8 font-semibold text-lg text-cyan-700">
            <Link
              href={"/"}
              className="transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:underline decoration-cyan-700 decoration-2 underline-offset-4 cursor-pointer"
            >
              Home
            </Link>

            {/* Dropdown Menu */}
            <li
              className="relative"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <button className="flex items-center gap-1 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:underline decoration-cyan-700 decoration-2 underline-offset-4 cursor-pointer">
                Products
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Content - Removido mt-2 e adicionado pt-2 */}
              {isOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <ul className="text-base font-medium text-gray-700">
                      <Link href={"/leggings"}>
                        <div className="px-4 py-2.5 w-full hover:bg-cyan-700 hover:text-white cursor-pointer transition-all duration-200 rounded-md mx-1">
                          Leggings
                        </div>
                      </Link>
                      <Link href={"/shirts"}>
                        <li className="px-4 py-2.5 hover:bg-cyan-700 hover:text-white cursor-pointer transition-all duration-200 rounded-md mx-1">
                          Shirts
                        </li>
                      </Link>
                      <Link href={"/shoes"}>
                        <li className="px-4 py-2.5 hover:bg-cyan-700 hover:text-white cursor-pointer transition-all duration-200 rounded-md mx-1">
                          Shoes
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
              )}
            </li>

            <Link href={"/about"}>
              <li className="transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:underline decoration-cyan-700 decoration-2 underline-offset-4 cursor-pointer">
                About us
              </li>
            </Link>
            <Link href={"/faq"}>
              <li className="transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:underline decoration-cyan-700 decoration-2 underline-offset-4 cursor-pointer">
                FAQ
              </li>
            </Link>
          </ul>
        </nav>

        <div className="flex items-center gap-4 text-cyan-700 cursor-pointer">
          <Link href="/checkout" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center bg-red-400 rounded-2xl text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Button
            onClick={() => handleClick()}
            className="bg-cyan-700 hover:bg-cyan-900 cursor-pointer"
          >
            Login
          </Button>
        </div>
      </header>
    </div>
  );
};

export default memo(Navbar);
