/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useParams, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { ReviewEditor } from "../../components/ReviewEditor";

import { getReviewByKey } from "@/requests/get";
import { ScreenContentDefault } from "../../components/ScreenContentDefault";
import { GetReviews } from "@/requests/get/reviews/types";
import { updateReview } from "@/requests/patch";

const EditReview = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session } = useSession({ required: true });

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
      const apiToken = (session as any).apiToken as string;

      if (!reviewData?._id) {
        throw new Error("Review id didn't found to update.");
      }

      const response = await updateReview(reviewData._id, data, apiToken);

      if (response.status === 401) {
        signOut({ redirect: false });
      }

      if (!response.ok) {
        throw new Error((await response.json()).message);
      }

      toast.success("Review updated", {
        description: "Your review has been successfully updated.",
      });

      router.push(`/dashboard/review/${id}`);
    } catch (error) {
      console.error("Error updating review:", error);

      toast.error("Error", {
        description:
          error instanceof Error
            ? error.message
            : "There was an error updating your review.",
      });
    } finally {
      setIsLoading(false);
    }

    router.push("/dashboard/reviews");
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
