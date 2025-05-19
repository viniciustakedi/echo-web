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
    console.error("Error fetching review by key:", error);
    throw error;
  }
};

export const getReviews = async (
  page: number,
  limit: number
): Promise<GetReviews.ReviewListItem[] | number> => {
  const response = await fetch(
    `${BASE_URL}/reviews?page=${page}&limit=${limit}`,
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
