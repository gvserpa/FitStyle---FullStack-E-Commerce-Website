"use client";

import { memo } from "react";
import { useCartStore } from "../../store/card-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { checkoutAction } from "./checkout-actions";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const { items, removeItem, addItem, clearCart } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (total === 0 || items.length === 0) {
    return (
      <div className="h-150 flex flex-col gap-10 items-center justify-center">
        <h1 className="font-semibold text-2xl flex items-center flex-col gap-4">
          <ShoppingCart className="text-cyan-700" size={100} />
          Your Cart is Empty.
        </h1>
        <Link href={"/"}><Button className="bg-cyan-700 hover:bg-cyan-900 cursor-pointer">Go Shopping</Button></Link>
      </div>
      
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {items.map((item, key) => (
              <li className="flex flex-col gap-2 border-b pb-2" key={key}>
                <div className="flex justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-semibold">
                    {" "}
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={() => removeItem(item.id)} variant="outline">
                    -
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button
                    onClick={() => addItem({ ...item, quantity: 1 })}
                    variant="outline"
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-2 text-lg font-semibold">
            Total: ${(total / 100).toFixed(2)}
          </div>
        </CardContent>
      </Card>
      <form action={checkoutAction} className="max-w-md mx-auto">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-800 cursor-pointer"
          variant={"default"}
        >
          Proceed to Payment
        </Button>
        <Button
          onClick={() => clearCart()}
          type="submit"
          className="w-full bg-red-500 mt-2 cursor-pointer hover:bg-red-800"
          variant={"default"}
        >
          Clear Cart
        </Button>
      </form>
    </div>
  );
};

export default memo(Page);
