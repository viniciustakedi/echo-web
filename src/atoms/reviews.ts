import { atom } from "jotai";
import { GetReviews } from "@/requests/get/reviews/types";

export const reviewsAtom = atom<GetReviews.ReviewListItem[] | null>(null);
export const reviewsIsLoadingAtom = atom<boolean>(false);
export const totalReviewsAtom = atom<number>(0);