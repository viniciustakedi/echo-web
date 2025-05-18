"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { ReviewEditor } from "../../components/ReviewEditor";

import { getReviewByKey } from "@/requests/get";
import { ScreenContentDefault } from "../../components/ScreenContentDefault";
import { GetReviews } from "@/requests/get/reviews/types";

const EditReview = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [reviewData, setReviewData] = useState<GetReviews.ReviewByKey | null>(
    null
  );

  useEffect(() => {
    const fetchReview = async () => {
      const response = await getReviewByKey(id);

      if (!response) {
        toast.error("Error", {
          description: "Review not found.",
        });
        router.push("/dashboard/reviews");
        return;
      }

      setReviewData(response);
    };

    fetchReview();
  }, [id, router]);

  const handleSaveReview = async (data: GetReviews.ReviewByKey) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Updated review:", data);

      toast.success("Review updated", {
        description: "Your review has been successfully updated.",
      });

      router.push(`/dashboard/review/${id}`);
    } catch (error) {
      console.error("Error updating review:", error);

      toast.error("Error", {
        description: "There was an error updating your review.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!reviewData) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <ScreenContentDefault>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Review</h1>
          <p className="text-muted-foreground">
            Update your restaurant review.
          </p>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <ReviewEditor
            initialData={reviewData}
            onSave={handleSaveReview}
            isLoading={isLoading}
          />
        </div>
      </div>
    </ScreenContentDefault>
  );
};

export default EditReview;
