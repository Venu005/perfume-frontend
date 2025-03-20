import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  console.log(product);
  return (
    <Link to={`/products/${product._id}`}>
      <Card className="p-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mt-2">
            {product.description}
          </p>
          <div className="mt-4 font-bold text-primary">${product.price}</div>
        </div>
      </Card>
    </Link>
  );
};
