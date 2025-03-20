import { useEffect, useState } from "react";
import { getReviews } from "@/services/reviews";
import { ReviewForm } from "./ReviewForm";
import { ReviewList } from "./ReviewList";
import { Loader } from "lucide-react";

export const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const data = await getReviews(productId);
      setReviews(data);
    } catch (error) {
      console.error("Error loading reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  // Callback function to add the new review to the list
  const handleReviewSubmit = (newReview) => {
    // Optionally, prepend the new review so it shows up at the top
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  return (
    <div>
      <ReviewForm productId={productId} onReviewSubmit={handleReviewSubmit} />
      {loading ? (
        <div className="flex items-center pt-20 pl-10 justify-center h-64">
          <Loader className="w-12 h-12 animate-spin text-primary" />
        </div>
      ) : (
        <ReviewList reviews={reviews} />
      )}
    </div>
  );
};
