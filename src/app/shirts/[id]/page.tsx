// src/app/product/[id]/page.tsx  (ou o caminho que você usa)
import ProductPageClient from "@/components/ProductPageClient";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

type PlainProduct = {
  id: string;
  name: string | null;
  description: string | null;
  images: string[]; // array serializável
  priceUnitAmount?: number | null; // cents
};

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price | undefined;

  const plainProduct: PlainProduct = {
    id: product.id,
    name: product.name ?? null,
    description: product.description ?? null,
    images: Array.isArray(product.images) ? product.images : [],
    priceUnitAmount: price?.unit_amount ?? null,
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Passa só dados serializáveis pro client */}
      <ProductPageClient product={plainProduct} />
    </div>
  );
};

export default ProductPage;
