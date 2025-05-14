import { GetRequests } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getReviewByKey = async (
  key: string
): Promise<GetRequests.Review.ReviewByKey> => {
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

    const result: GetRequests.Review.GetReviewResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching review by key:", error);
    throw error;
  }
};

export const getReviews = async (
  page: number,
  limit: number
): Promise<GetRequests.Review.ReviewListItem[]> => {
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

    const result: GetRequests.Review.GetReviewsResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching review by key:", error);
    throw error;
  }
};

export const getMapMarkers = async (): Promise<GetRequests.Map.MapMarker[]> => {
  try {
    const response = await fetch(`${BASE_URL}/map-markers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const result: GetRequests.Map.GetMapMarkersResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching map markers:", error);
    throw error;
  }
};

export const getMapMarkerById = async (
  id: string
): Promise<GetRequests.Map.GetDetailedMapMarkerResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/map-markers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const result: GetRequests.Map.GetMapMarkersByIdResponse =
      await response.json();

    return result.data;
  } catch (error) {
    console.error("Error fetching map marker by ID:", error);
    throw error;
  }
};
