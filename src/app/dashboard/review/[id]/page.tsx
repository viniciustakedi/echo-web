"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { ReviewDetail } from "../../components/review/ReviewDetail";

import { getReviewByKey } from "@/requests/get";
import { ScreenContentDefault } from "../../components/ScreenContentDefault";
import { GetReviews } from "@/requests/get/reviews/types";
import { useSession } from "next-auth/react";

const ViewReview = () => {
  const { data: session, status } = useSession({ required: true });

  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [review, setReview] = useState<GetReviews.ReviewByKey | null>(null);

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
  }, [id, router]);

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!review) {
    return null;
  }

  if (status === "loading") {
    return <div className="text-center py-12">Loading...</div>;
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
