import Shirts from '@/components/Shirts';
import ProductCard from '@/components/ProductCard';
import { memo } from 'react';
import { stripe } from '@/lib/stripe';

const Page = async () => {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 100
  });

  const shirts = products.data.filter(
    (product) => product.metadata.category === "shirts"
  );

  return (
    <div>
      <div className="bg-white pt-20 pb-20">
        <Shirts />
        <div className="container mx-auto px-4">
          <div className="-ml-2 md:-ml-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {shirts.map((product) => (
              <div
                key={product.id}
                className="pl-2 md:pl-4"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Page);
