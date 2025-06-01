import { GetReviews } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getReviewByKey = async (
  key: string
): Promise<GetReviews.ReviewByKey> => {
  try {
    const response = await fetch(`${BASE_URL}/reviews/${key}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const result: GetReviews.GetReviewResponse = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getReviews = async ({
  page,
  limit
}: {
  limit?: number;
  page?: number;
}
): Promise<GetReviews.ReviewListItem[] | number> => {
  const response = await fetch(
    `${BASE_URL}/reviews?page=${page ?? 1}&limit=${limit ?? 20}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    return response.status;
  }

  const result: GetReviews.GetReviewsResponse = await response.json();
  return result.data;
};
