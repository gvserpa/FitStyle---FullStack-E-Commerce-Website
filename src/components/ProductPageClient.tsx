"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/card-store";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

type PlainProduct = {
  id: string;
  name: string | null;
  description: string | null;
  images: string[];
  priceUnitAmount?: number | null; // em cents
};

const ProductPageClient = ({ product }: { product: PlainProduct }) => {
  const { items, addItem, removeItem } = useCartStore();

  const cartItem = items.find((i) => i.id === product.id);
  const quantity = cartItem?.quantity ?? 0;

  const router = useRouter();

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name ?? "Product",
      price: product.priceUnitAmount ?? 0,
      imageUrl: product.images?.[0] ?? null,
      quantity: 1,
    });
  };

  const onRemoveItem = () => {
    if (quantity > 0) removeItem(product.id);
  };

  const buyNow = () => {
    if (quantity === 0) onAddItem();
    router.push("/checkout");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        {product.images?.[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0]}
            alt={product.name ?? "product"}
            className="w-full max-h-96 object-cover rounded"
          />
        ) : (
          <div className="w-full h-64 bg-gray-100 rounded flex items-center justify-center">
            No Image
          </div>
        )}
      </div>

      <div className="flex flex-col text-center items-center">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        {product.description && (
          <p className="text-gray-700 mb-4">{product.description}</p>
        )}

        {typeof product.priceUnitAmount === "number" ? (
          <p className="text-lg font-semibold text-gray-900 mb-4">
            ${(product.priceUnitAmount / 100).toFixed(2)}
          </p>
        ) : (
          <p className="text-lg font-semibold text-gray-900 mb-4">
            Price unavailable
          </p>
        )}

        <div className="flex items-center justify-center space-x-4 mb-6">
          <Button
            onClick={onRemoveItem}
            variant="outline"
            disabled={quantity <= 0}
          >
            -
          </Button>
          <span className="text-lg font-semibold">{quantity}</span>
          <Button onClick={onAddItem} variant="outline">
            +
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-1/2 mt-6 gap-2 lg:flex-col">
          <Button
            onClick={buyNow}
            variant="outline"
            className="bg-cyan-700 text-white hover:bg-cyan-900 cursor-pointer hover:text-white w-full flex justify-center gap-2"
          >
            <ShoppingBag />
            Buy Now
          </Button>

          <Button
            onClick={onAddItem}
            variant="outline"
            className="cursor-pointer w-full flex justify-center gap-2"
          >
            <ShoppingCart />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductPageClient);
