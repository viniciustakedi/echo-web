import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";

import { reviewsAtom } from "@/atoms/reviews";

import { getReviews } from "@/requests/get";
import { GetReviews } from "@/requests/get/reviews/types";

export function useReviews() {
  const [reviews, setReviewsAtom] = useAtom(reviewsAtom);
  const loading = reviews === null;

  useEffect(() => {
    if (reviews === null) {
      getReviews(1, 20).then((fetched) => {
        if (Array.isArray(fetched)) {
          setReviews(fetched);
        }
      });
    }
  }, [reviews]);

  const setReviews = useCallback((newValue: GetReviews.ReviewListItem[] | null) => {
    setReviewsAtom(newValue);
  }, [setReviewsAtom]);

  return { reviews: reviews ?? [], loading, setReviews };
}
