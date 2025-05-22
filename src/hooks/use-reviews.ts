import { useAtom } from "jotai";
import { reviewsAtom } from "@/atoms/reviews";

export function useReviews() {
  const [reviews, setReviews] = useAtom(reviewsAtom);
  const loading = reviews === null;
  return { reviews: reviews ?? [], loading, setReviews };
}
