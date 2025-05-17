"use client";

import { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ReviewList } from "../components/ReviewList";

import { GetRequests } from "@/requests/get/types";
import { getReviews } from "@/requests/get";
import { ScreenContentDefault } from "../components/ScreenContentDefault";

const Reviews = () => {
  const [page] = useState(1);
  const [limit] = useState(10);
  const [reviews, setReviews] = useState<
    GetRequests.Review.ReviewListItem[] | null
  >(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await getReviews(page, limit);
      setReviews(response);
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

  const handleDeleteReview = (id: string) => {
    setReviews(reviews.filter((review) => review._id !== id));

    toast.success("Review deleted", {
      description: "The review has been successfully deleted.",
    });
  };

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
