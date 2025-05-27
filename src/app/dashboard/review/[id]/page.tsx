"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { ReviewDetail } from "../../components/review/ReviewDetail";

import { getReviewByKey } from "@/requests/get";
import { ScreenContentDefault } from "../../components/ScreenContentDefault";
import { GetReviews } from "@/requests/get/reviews/types";
import { useSession } from "next-auth/react";
import Loading from "@/components/loading";
import { useLoading } from "@/hooks/use-loading";

const ViewReview = () => {
  const { status } = useSession({ required: true });

  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { setIsLoading } = useLoading();
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

      setReview(response);
      setIsLoading(false);
    };

    fetchReview();
  }, [id, router, setIsLoading]);

  if (!review) {
    return null;
  }

  if (status === "loading") {
    return <Loading />;
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
