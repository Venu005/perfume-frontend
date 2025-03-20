import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createReview } from "@/services/reviews";
import { useAuth } from "@/context/AuthContext";
import { Star } from "lucide-react";
import { useState } from "react";

export const ReviewForm = ({ productId, onReviewSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm();
  const { user } = useAuth();
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      // Create the review via your service
      const newReview = await createReview(productId, data);
      // Augment the returned review with the current user data so it displays immediately
      newReview.user = user;
      setSubmitSuccess(true);
      setSubmitError("");

      // Clear the form fields
      setValue("comment", "");
      setValue("rating", "");

      // Call the callback to update the list immediately
      if (onReviewSubmit) {
        onReviewSubmit(newReview);
      }
    } catch (error) {
      setSubmitError(
        error.response?.data?.message || "Failed to submit review"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
      <div>
        <Label className='font-medium text-lg' >Rating</Label>
        <div className="flex gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              type="button"
              key={rating}
              onClick={() => setValue("rating", rating)}
              className="text-primary hover:text-primary/80"
            >
              <Star
                className={`w-6 h-6 ${
                  rating <= (watch("rating") || 0) ? "fill-current" : ""
                }`}
              />
            </button>
          ))}
        </div>
        <input
          type="hidden"
          {...register("rating", { required: "Rating is required" })}
        />
      </div>

      <div>
        <Label>Review</Label>
        <textarea
          {...register("comment", { required: "Review text is required" })}
          className="w-full p-2 border rounded-md min-h-[100px]"
          placeholder="Write your review..."
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
      {submitError && (
        <p className="text-red-500 text-sm mt-2">{submitError}</p>
      )}
      {submitSuccess && (
        <p className="text-green-500 text-sm mt-2">Review submitted!</p>
      )}
    </form>
  );
};
