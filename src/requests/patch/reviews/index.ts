import { signOut } from "next-auth/react";
import { PatchReviews } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const updateReview = async (
  id: string,
  data: PatchReviews.Update,
  accessToken: string
) => {
  const { rating, priceRating, tags, ...rest } = data;

  const tagsFormatted = tags.map((tag) => tag._id);

  const response = await fetch(`${BASE_URL}/reviews/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      rating: Number(rating),
      priceRating: Number(priceRating),
      tags: tagsFormatted,
      ...rest,
    }),
  });

  if (response.status === 401) {
    await signOut({ redirect: true });
  }

  return response;
};
