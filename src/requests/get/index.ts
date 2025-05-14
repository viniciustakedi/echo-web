import { GetRequests } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getReviewByKey = async (
  key: string
): Promise<GetRequests.ReviewByKey> => {
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

    const result: GetRequests.GetReviewResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching review by key:", error);
    throw error;
  }
};

export const getReviews = async (
  page: number,
  limit: number
): Promise<GetRequests.ReviewListItem[]> => {
  try {
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
      throw new Error("Failed to fetch data");
    }

    const result: GetRequests.GetReviewsResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching review by key:", error);
    throw error;
  }
};
