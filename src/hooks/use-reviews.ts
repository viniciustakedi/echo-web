import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";

import { reviewsAtom, reviewsIsLoadingAtom, totalReviewsAtom } from "@/atoms/reviews";

import { getReviews } from "@/requests/get";
import { GetReviews } from "@/requests/get/reviews/types";

import { useLoading } from "./use-loading";

export function useReviews() {
  const { setIsLoading } = useLoading();

  const [reviews, setReviewsAtom] = useAtom(reviewsAtom);
  const [isReviewsLoading, setIsReviewsLoading] = useAtom(reviewsIsLoadingAtom);
  const [totalReviews, setTotalReviews] = useAtom(totalReviewsAtom);

  const setReviews = useCallback((newValue: GetReviews.ReviewListItem[] | null) => {
    setReviewsAtom(newValue);
  }, [setReviewsAtom]);


  useEffect(() => {
    if (reviews === null && !isReviewsLoading) {
      setIsReviewsLoading(true);
      setIsLoading(true);
      getReviews({ page: 1, limit: 20 }).then((fetched) => {
        setReviews(Array.isArray(fetched) ? fetched : []);
        setTotalReviews(fetched.total);
      }).finally(() => {
        setIsReviewsLoading(false);
        setIsLoading(false);
      });
    }
  }, [reviews, setReviews, isReviewsLoading, setIsLoading, setIsReviewsLoading]);

  const refetchReviews = useCallback(async ({ page, limit }: { page: number; limit: number }) => {
    if (isReviewsLoading) return;

    setIsReviewsLoading(true);
    setIsLoading(true);

    const fetched = await getReviews({ page, limit });
    setReviews(Array.isArray(fetched) ? fetched : []);
    setTotalReviews(fetched.total);

    setIsReviewsLoading(false);
    setIsLoading(false);
  }, [setReviewsAtom, isReviewsLoading, setIsLoading, setIsReviewsLoading]);

  return {
    reviews: reviews ?? [],
    setReviews,
    refetchReviews,
    pageLimit: 20,
    total: totalReviews
  };
}
