import { ShoppingBag, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import Stripe from "stripe";

interface Props {
  product: Stripe.Product;
}

const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price | undefined;
  const category = product.metadata.category;

  return (
    <div className="w-full sm:w-64 mx-auto mt-6 sm:mt-10">
      <Link href={`/${category}/${product.id}`}>
        <div className="flex items-center justify-center bg-gray-200 h-60 rounded-2xl overflow-hidden">
          {product.images[0] && (
            <Image
              className="rounded-2xl object-cover w-full h-full"
              src={product.images[0]}
              alt={product.name}
              width={200}
              height={200}
            />
          )}
        </div>
        <div className="flex flex-col items-center mt-4 px-4">
          <p className="font-bold text-center">{product.name}</p>
          <p className="text-cyan-700 text-center">
            {price?.unit_amount ? `$${(price.unit_amount / 100).toFixed(2)}` : "N/A"}
          </p>

          <button className="bg-cyan-700 text-white flex justify-center py-2 rounded-2xl gap-2 w-full mt-2 hover:bg-cyan-600 transition cursor-pointer">
            <ShoppingBag />
            Buy Now
          </button>
          <button className="bg-black text-white flex justify-center py-2 rounded-2xl gap-2 w-full mt-2 hover:bg-black/80 transition cursor-pointer">
            <ShoppingCart />
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  );
};

export default memo(ProductCard);
