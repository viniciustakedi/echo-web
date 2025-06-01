import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";

import { reviewsAtom } from "@/atoms/reviews";

import { getReviews } from "@/requests/get";
import { GetReviews } from "@/requests/get/reviews/types";

export function useReviews() {
  const [reviews, setReviewsAtom] = useAtom(reviewsAtom);
  const loading = reviews === null;

  const setReviews = useCallback((newValue: GetReviews.ReviewListItem[] | null) => {
    setReviewsAtom(newValue);
  }, [setReviewsAtom]);


  useEffect(() => {
    if (reviews === null) {
      getReviews({ page: 1, limit: 20 }).then((fetched) => {
        if (Array.isArray(fetched)) {
          setReviews(fetched);
        }
      });
    }
  }, [reviews, setReviews]);

  const refetchReviews = useCallback(async ({ page, limit }: { page: number; limit: number }) => {
    const fetched = await getReviews({ page, limit });
    setReviewsAtom(Array.isArray(fetched) ? fetched : []);
  }, [setReviewsAtom]);

  return {
    reviews: reviews ?? [],
    loading,
    setReviews,
    refetchReviews
  };
}
