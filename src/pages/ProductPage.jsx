import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductReviews } from "@/components/review/ProductReviews";
import { useAuth } from "@/context/AuthContext";
import { getProduct } from "@/services/products";
import { Loader } from "lucide-react";

export const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProduct(id);
        console.log("Product data:", data); // Debugging line
        // Ensure images array exists and has items
        if (!data.images || data.images.length === 0) {
          data.images = ["/placeholder-image.jpg"];
        }
        setProduct(data);
      } catch (error) {
        console.error("Error loading product:", error);
        navigate("/error", { state: { message: "Product not found" } });
      }
    };
    loadProduct();
  }, [id, navigate]);

  if (!product)
    return (
      <div className="flex items-center pt-20 pl-10 justify-center h-64">
        <Loader className="w-12 h-12 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 gap-6">
          {product.images.map((img, index) => (
            <div
              key={index}
              className="relative aspect-video overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            >
              <img
                src={img}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary">
            ${product.price}
          </p>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <div className="mt-4">
            <Button className="w-full py-3 text-lg">Add to Cart</Button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">
          Customer Reviews
        </h2>
        {user ? (
          <ProductReviews productId={id} />
        ) : (
          <div className="border p-6 rounded-lg bg-gray-100 text-center">
            <p className="text-gray-700">
              Please{" "}
              <Link
                to="/auth"
                state={{ from: `/products/${id}` }}
                className="text-primary font-medium hover:underline"
              >
                login
              </Link>{" "}
              to leave a review
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
