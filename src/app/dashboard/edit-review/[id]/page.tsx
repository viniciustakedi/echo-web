/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { ReviewEditor } from "../../components/review/ReviewEditor";

import { getReviewByKey } from "@/requests/get";
import { ScreenContentDefault } from "../../components/ScreenContentDefault";
import { GetReviews } from "@/requests/get/reviews/types";
import { updateReview } from "@/requests/patch";
import Loading from "@/components/loading";
import { useLoading } from "@/hooks/use-loading";
import { useReviews } from "@/hooks/use-reviews";

const EditReview = () => {
  const { data: session } = useSession({ required: true });
  const router = useRouter();

  const { isLoading, setIsLoading } = useLoading();
  const { reviews, setReviews } = useReviews();
  const { id } = useParams<{ id: string }>();

  const [reviewData, setReviewData] = useState<GetReviews.ReviewByKey | null>(
    null
  );

  useEffect(() => {
    const fetchReview = async () => {
      setIsLoading(true);

      const response = await getReviewByKey(id);

      if (!response) {
        toast.error("Error", {
          description: "Review not found.",
        });
        router.push("/dashboard/reviews");
        return;
      }

      setIsLoading(false);
      setReviewData(response);
    };

    fetchReview();
  }, [id, router, setIsLoading]);

  const handleSaveReview = async (data: GetReviews.ReviewByKey) => {
    setIsLoading(true);

    try {
      const apiToken = (session as any).apiToken as string;

      if (!reviewData?._id) {
        throw new Error("Review id didn't found to update.");
      }

      const response = await updateReview(reviewData._id, data, apiToken);

      if (!response.ok) {
        throw new Error((await response.json()).message);
      }

      toast.success("Review updated", {
        description: "Your review has been successfully updated.",
      });

      const oldReviews = reviews.filter((e) => e._id !== reviewData._id);
      const newReviews = [
        ...oldReviews,
        {
          _id: reviewData._id,
          thumbnail: data.thumbnail,
          headline: data.headline,
          friendlyUrl: data.friendlyUrl,
          rating: Number(data.rating),
          address: data.address,
          country: data.country,
          city: data.city,
          claps: data.claps,
          createdAt: reviews.find((e) => e._id === reviewData._id)?.createdAt ?? "",
          priceRating: Number(data.priceRating),
          tags: data.tags,
        },
      ];

      setReviews(newReviews);

      router.push(`/dashboard/review/${id}`);
    } catch (error) {
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
    return <Loading />;
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
