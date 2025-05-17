"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { ReviewDetail } from "../../components/ReviewDetail";

import { GetRequests } from "@/requests/get/types";
import { getReviewByKey } from "@/requests/get";
import { ScreenContentDefault } from "../../components/ScreenContentDefault";

const ViewReview = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [review, setReview] = useState<GetRequests.Review.ReviewByKey | null>(
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
      }

      setIsLoading(false);
      setReview(response);
    };

    fetchReview();
  }, [id, toast]);

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!review) {
    return null;
  }

  return (
    <ScreenContentDefault>
      <div className="space-y-6">
        <ReviewDetail review={review} />
      </div>
    </ScreenContentDefault>
  );
};

export default ViewReview;
