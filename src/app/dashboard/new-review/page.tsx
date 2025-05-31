/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { ReviewEditor } from "../components/review/ReviewEditor";
import { ScreenContentDefault } from "../components/ScreenContentDefault";

import { createReview } from "@/requests/post";
import { GetReviews } from "@/requests/get/reviews/types";

import Loading from "@/components/loading";

import { useLoading } from "@/hooks/use-loading";
import { useReviews } from "@/hooks/use-reviews";

const NewReview = () => {
  const { isLoading, setIsLoading } = useLoading();
  const { reviews, setReviews } = useReviews();
  const router = useRouter();

  const { data: session, status } = useSession({ required: true });

  if (status === "loading") return <Loading />;

  const handleSaveReview = async (data: GetReviews.ReviewByKey) => {
    setIsLoading(true);

    try {
      const apiToken = (session as any).apiToken as string;
      const response = await createReview(data, apiToken);

      if (!response.ok) {
        throw new Error();
      }

      const responseData = await response.json();

      setReviews([
        ...reviews,
        {
          _id: responseData.data._id,
          thumbnail: data.thumbnail,
          headline: data.headline,
          friendlyUrl: data.friendlyUrl,
          rating: data.rating,
          claps: data.claps,
          address: data.address,
          country: data.country,
          city: data.city,
          createdAt: data.createdAt,
          priceRating: data.priceRating,
          tags: data.tags,
        }
      ]);

      toast.success("Review created", {
        description: "Your review has been successfully created.",
      });
    } catch {
      toast.error("Error!", {
        description: "There was an error creating your review.",
      });
    } finally {
      setIsLoading(false);
    }

    router.push("/dashboard/reviews");
  };

  return (
    <ScreenContentDefault>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Review</h1>
          <p className="text-muted-foreground">
            Create a new restaurant review with Markdown support.
          </p>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <ReviewEditor onSave={handleSaveReview} isLoading={isLoading} />
        </div>
      </div>
    </ScreenContentDefault>
  );
};

export default NewReview;
