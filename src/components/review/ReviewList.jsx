
import { Star } from "lucide-react";

export const ReviewList = ({ reviews }) => {
  if (reviews.length === 0)
    return (
      <p className="text-gray-500 text-center py-6">
        No reviews yet. Be the first to write one!
      </p>
    );

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-medium">
              {review.user.name?.[0]?.toUpperCase() || "U"}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-semibold text-lg">
                  {review.user.name || "Anonymous"}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 text-lg">{review.comment}</p>
              <p className="text-sm text-gray-400 mt-3">
                Reviewed on{" "}
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
