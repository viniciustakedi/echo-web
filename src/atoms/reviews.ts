import { atom } from "jotai";
import { GetReviews } from "@/requests/get/reviews/types";

export const reviewsAtom = atom<GetReviews.ReviewListItem[] | null>(null);