import { memo } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Footprints, Home, Menu, Shirt, ShoppingBag } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Link from "next/link";

const Sheets = () => {
  return (
    <div className="flex justify-between ml-5 mr-5 mt-5 mb-5">
      <h2 className="text-2xl font-bold">
        Fit<span className="text-cyan-700">Style</span>
      </h2>

      <Sheet>
        <SheetTrigger className="border-2 border-cyan-700 rounded-2xl p-2 cursor-pointer">
          <Menu className="text-cyan-700" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription className="flex flex-col gap-2 mt-5">
              <Label>E-mail</Label>
              <Input></Input>
              <Label>Password</Label>
              <Input></Input>
              <SheetTitle className="hover:underline cursor-pointer">Don't have an account? Sign Up</SheetTitle>
            </SheetDescription>
          </SheetHeader>
          <div className=" flex flex-col gap-8">
            <Link href={"/"} className="flex gap-4 w-full hover:bg-gray-200 py-2 px-4 rounded-2xl cursor-pointer">
              <Home />
              Home
            </Link>
            <Link href={"/leggings"} className="flex gap-4 w-full hover:bg-gray-200 py-2 px-4 rounded-2xl cursor-pointer">
              <ShoppingBag />
              Leggings
            </Link>
            <Link href={"/shirts"} className="flex gap-4 w-full hover:bg-gray-200 py-2 px-4 rounded-2xl cursor-pointer">
              <Shirt />
              Shirts
            </Link>
            <Link href={"/shoes"} className="flex gap-4 w-full hover:bg-gray-200 py-2 px-4 rounded-2xl cursor-pointer">
              <Footprints />
              Shoes
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default memo(Sheets);
