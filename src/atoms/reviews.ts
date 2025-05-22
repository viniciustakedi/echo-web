import { atom } from "jotai";
import { getReviews } from "@/requests/get";
import { GetReviews } from "@/requests/get/reviews/types";

let _fetchedReviews: GetReviews.ReviewListItem[] | null = null;

export const reviewsAtom = atom<GetReviews.ReviewListItem[] | null>(null);

reviewsAtom.onMount = (setAtom) => {
  if (_fetchedReviews !== null) {
    setAtom(_fetchedReviews);
    return;
  }

  getReviews(1, 20).then((fetched) => {
    _fetchedReviews = Array.isArray(fetched) ? fetched : [];
    setAtom(_fetchedReviews);
  });
};
