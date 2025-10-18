"use client";

import { memo, useEffect, useState, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/card-store";
import { ChevronDown, LogIn, LogOut, ShoppingCart } from "lucide-react";
import defaultAvatar from "../../public/default-avatar.jpg";
import { useAuth } from "@/contexts/auth-context";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Avatar {
  avatar_url?: string | null;
}

const Navbar = () => {
  const [profile, setProfile] = useState<Avatar | null>(null);
  const [isProductsOpen, setIsProductsOpen] = useState<boolean>(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const { signOut, user } = useAuth();
  const supabase = useMemo(() => createClientComponentClient(), []);

  const productsRef = useRef<HTMLLIElement | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoadingProfile(false);
      return;
    }

    let mounted = true;

    async function loadProfile() {
      setLoadingProfile(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", user.id)
          .limit(1)
          .single();

        if (!mounted) return;

        if (error) {
          console.error("Error fetching profile:", error);
          setError("Failed to load profile");
          setProfile(null);
        } else {
          setProfile({ avatar_url: data?.avatar_url ?? null });
        }
      } catch (err) {
        console.error("Error loading profile:", err);
        if (mounted) {
          setError("Failed to load profile");
          setProfile(null);
        }
      } finally {
        if (mounted) setLoadingProfile(false);
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, [user, supabase]);

  // Fecha dropdowns ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (productsRef.current && !productsRef.current.contains(target)) {
        setIsProductsOpen(false);
      }
      if (avatarRef.current && !avatarRef.current.contains(target)) {
        setIsAvatarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { items } = useCartStore();
  const cartCount = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("SignOut error:", err);
    }
  }, [signOut]);

  return (
    <div>
      <div className="w-screen bg-cyan-700 text-white flex items-center justify-center py-2">
        <p className="text-sm">Free shipping on all order over $50</p>
      </div>

      <header className="flex justify-between items-center px-6 md:px-10 py-6 relative">
        <h2 className="text-2xl font-bold">
          Fit<span className="text-cyan-700">Style</span>
        </h2>

        <nav>
          <ul className="flex gap-6 md:gap-8 font-semibold text-lg text-cyan-700 items-center">
            <li>
              <Link
                href="/"
                className="transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:underline decoration-cyan-700 decoration-2 underline-offset-4 cursor-pointer"
              >
                Home
              </Link>
            </li>

            {/* Products dropdown */}
            <li
              ref={productsRef}
              className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button
                aria-expanded={isProductsOpen}
                className="flex items-center gap-1 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:underline decoration-cyan-700 decoration-2 underline-offset-4 cursor-pointer"
                onClick={() => setIsProductsOpen((s) => !s)}
              >
                Products
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isProductsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isProductsOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <ul className="text-base font-medium text-gray-700">
                      <li>
                        <Link href="/leggings" className="block px-4 py-2.5 hover:bg-cyan-700 hover:text-white rounded-md mx-1">
                          Leggings
                        </Link>
                      </li>
                      <li>
                        <Link href="/shirts" className="block px-4 py-2.5 hover:bg-cyan-700 hover:text-white rounded-md mx-1">
                          Shirts
                        </Link>
                      </li>
                      <li>
                        <Link href="/shoes" className="block px-4 py-2.5 hover:bg-cyan-700 hover:text-white rounded-md mx-1">
                          Shoes
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </li>

            <li>
              <Link
                href="/about"
                className="transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:underline decoration-cyan-700 decoration-2 underline-offset-4 cursor-pointer"
              >
                About us
              </Link>
            </li>

            <li>
              <Link
                href="/faq"
                className="transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:underline decoration-cyan-700 decoration-2 underline-offset-4 cursor-pointer"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4 text-cyan-700">
          <Link href="/checkout" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center bg-red-400 rounded-2xl text-white text-xs">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Avatar + dropdown */}
          {user ? (
            <div ref={avatarRef} className="relative">
              <button
                onClick={() => setIsAvatarOpen((s) => !s)}
                aria-expanded={isAvatarOpen}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={profile?.avatar_url ?? defaultAvatar}
                    alt="profile avatar"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isAvatarOpen ? "rotate-180 text-cyan-700" : "text-cyan-700"
                  }`}
                />
              </button>

              {isAvatarOpen && (
                <div className="absolute right-0 top-full mt-2 z-50">
                  <div className="w-44 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                    <ul className="text-base font-medium text-gray-700">
                      <li>
                        <Link href="/profile" className="block px-4 py-2.5 hover:bg-cyan-700 hover:text-white rounded-md mx-1">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link href="/orders" className="block px-4 py-2.5 hover:bg-cyan-700 hover:text-white rounded-md mx-1">
                          My orders
                        </Link>
                      </li>
                      <li>
                        <Link href="/help" className="block px-4 py-2.5 hover:bg-cyan-700 hover:text-white rounded-md mx-1">
                          Get help
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {/* Sign In / Out */}
          {user ? (
            <button
              onClick={handleSignOut}
              className="inline-flex gap-2 items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl hover:opacity-90 cursor-pointer"
            >
              Sign Out
              <LogOut />
            </button>
          ) : (
            <Link
              href="/login"
              className="inline-flex gap-2 items-center px-4 py-2 bg-gradient-to-r from-cyan-700 to-cyan-800 text-white rounded-2xl hover:opacity-90 cursor-pointer"
            >
              Sign In
              <LogIn />
            </Link>
          )}
        </div>
      </header>
    </div>
  );
};

export default memo(Navbar);
