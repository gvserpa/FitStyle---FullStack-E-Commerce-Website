"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ChevronDown,
  Footprints,
  Home,
  LogIn,
  LogOut,
  Menu,
  Shirt,
  ShoppingBag,
} from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Link from "next/link";
import Image from "next/image";
import { memo, useCallback, useRef, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import defaultAvatar from "../../public/default-avatar.jpg";

interface Avatar {
  avatar_url?: string | null;
}

const Sheets = () => {
  const [isAvatarOpen, setIsAvatarOpen] = useState<boolean>(false);
  const [profile, setProfile] = useState<Avatar | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);

  const { signOut, user } = useAuth();

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("SignOut error:", err);
    }
  }, [signOut]);

  return (
    <div className="flex justify-between ml-5 mr-5 mt-5 mb-5">
      <h2 className="text-2xl font-bold">
        Fit<span className="text-cyan-700">Style</span>
      </h2>
      <div className="flex gap-2">
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
                      <Link
                        href="/profile"
                        className="block px-4 py-2.5 hover:bg-cyan-700 hover:text-white rounded-md mx-1"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/orders"
                        className="block px-4 py-2.5 hover:bg-cyan-700 hover:text-white rounded-md mx-1"
                      >
                        My orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/help"
                        className="block px-4 py-2.5 hover:bg-cyan-700 hover:text-white rounded-md mx-1"
                      >
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

        <Sheet>
          <SheetTrigger className="border-2 border-cyan-700 rounded-2xl p-2 cursor-pointer">
            <Menu className="text-cyan-700" />
          </SheetTrigger>
          <SheetContent>
            {user ? null : (
              <SheetHeader>
                <SheetDescription className="flex flex-col gap-2">
                  <Label>E-mail</Label>
                  <Input></Input>
                  <Label>Password</Label>
                  <Input></Input>
                  <SheetTitle className="hover:underline cursor-pointer">
                    Don&apos;t have an account? Sign Up
                  </SheetTitle>
                </SheetDescription>
              </SheetHeader>
            )}

            <div className=" flex flex-col gap-8 mt-10">
              <Link
                href={"/"}
                className="flex gap-4 w-full hover:bg-gray-200 py-2 px-4 rounded-2xl cursor-pointer"
              >
                <Home />
                Home
              </Link>
              <Link
                href={"/leggings"}
                className="flex gap-4 w-full hover:bg-gray-200 py-2 px-4 rounded-2xl cursor-pointer"
              >
                <ShoppingBag />
                Leggings
              </Link>
              <Link
                href={"/shirts"}
                className="flex gap-4 w-full hover:bg-gray-200 py-2 px-4 rounded-2xl cursor-pointer"
              >
                <Shirt />
                Shirts
              </Link>
              <Link
                href={"/shoes"}
                className="flex gap-4 w-full hover:bg-gray-200 py-2 px-4 rounded-2xl cursor-pointer"
              >
                <Footprints />
                Shoes
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default memo(Sheets);
