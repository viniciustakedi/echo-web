/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ReviewList } from "../components/ReviewList";

import { getReviews } from "@/requests/get";
import { ScreenContentDefault } from "../components/ScreenContentDefault";
import { GetReviews } from "@/requests/get/reviews/types";
import { signOut, useSession } from "next-auth/react";
import { deleteReview } from "@/requests/delete";

const Reviews = () => {
  const { data: session, status } = useSession({ required: true });

  const [isLoading, setIsLoading] = useState(false);
  const [page] = useState(1);
  const [limit] = useState(10);
  const [reviews, setReviews] = useState<GetReviews.ReviewListItem[] | null>(
    null
  );

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await getReviews(page, limit);

      if (response === 404) {
        toast.error("You don't have any reviews", {
          description:
            "Don't worrie! Start to rating to build your reviews portfolio.",
        });
      }

      setReviews(Array.isArray(response) ? response : null);
    };
    fetchReviews();
  }, [page, limit]);

  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const handleDeleteReview = async (id: string) => {
    setReviews(reviews.filter((review) => review._id !== id));
    setIsLoading(true);

    try {
      const apiToken = (session as any).apiToken as string;
      const response = await deleteReview(id, apiToken);

      if (response.status === 401) {
        signOut({ redirect: false });
      }

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Review deleted", {
        description: "The review has been successfully deleted.",
      });
    } catch (error) {
      toast.error("Error in delete review!", {
        description:
          error instanceof Error
            ? error.message
            : "There was an error creating your review.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <ScreenContentDefault>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>

          <Button asChild>
            <Link href="/dashboard/new-review">
              <Edit className="mr-2 h-4 w-4" />
              New Review
            </Link>
          </Button>
        </div>

        <ReviewList reviews={reviews} onDeleteReview={handleDeleteReview} />
      </div>
    </ScreenContentDefault>
  );
};

export default Reviews;
