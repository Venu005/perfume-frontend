import { useEffect, useState } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProducts } from "@/services/products";
import Spline from "@splinetool/react-spline";
import { Button } from "@/components/ui/button";
export const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);
  const bannerProducts = products.slice(0, 5);
  return (
    <div className="sm:-mt-8">
      {/* Auto-scrolling Banner */}

      {/* Full-Width Spline Component */}
      <div className="w-screen overflow-hidden m-0 p-0">
        <Spline
          className="block w-full h-auto"
          scene="https://prod.spline.design/iZNcIRt20Id62Q9p/scene.splinecode"
        />
      </div>

      <div className="w-screen overflow-hidden relative h-[400px] md:h-[500px] bg-gray-100 mt-5">
        {/* Scrolling Images Container */}
        <div className="absolute inset-0 flex animate-infinite-scroll hover:animation-paused">
          {[...bannerProducts, ...bannerProducts].map((product, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-full md:w-1/2 lg:w-1/3 h-full"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover brightness-90"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            </div>
          ))}
        </div>

        {/* Text Overlay */}
        <div className="absolute bottom-8 left-8 right-8 text-white/75 max-w-2xl z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Discover Your Signature Scent
          </h1>
          <p className="text-lg md:text-xl mb-6 drop-shadow-md">
            Explore our curated collection of luxury fragrances. Limited-time
            offer: Get 20% off your first purchase!
          </p>
          <Button
            variant="primary"
            className="text-lg px-8 py-6 hover:bg-primary/90 cursor-pointer"
            onClick={() => (window.location = "/shop")}
          >
            Shop Now
          </Button>
        </div>
      </div>
      {/* Main Content Container */}
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Products
        </h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ProductGrid products={products} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};
