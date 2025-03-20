import React, { useEffect, useState } from "react";
import { getProducts } from "@/services/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Loader } from "lucide-react";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Example splits – adjust logic as needed.
  const mostLoved = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);
  const bestSellers = products.slice(8, 12);

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Explore our collections</h1>
      {isLoading ? (
        <div className="flex items-center pt-20 pl-10 justify-center h-64">
          <Loader className="w-12 h-12 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Most Loved</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mostLoved.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">New Arrivals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Best Sellers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ShopPage;
