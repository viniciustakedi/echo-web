import { GetMaps } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMapMarkers = async ({
  page,
  limit,
}: {
  limit?: number;
  page?: number;
}): Promise<GetMaps.MapMarker[]> => {
  const response = await fetch(`${BASE_URL}/map-markers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result: GetMaps.Response = await response.json();
  return result.data as GetMaps.MapMarker[];
};

export const getMapMarkerById = async (
  id: string
): Promise<GetMaps.MapMarkerDetailed> => {
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

    const result: GetMaps.Response = await response.json();

    return result.data as GetMaps.MapMarkerDetailed;
  } catch (error) {
    console.error("Error fetching map marker by ID:", error);
    throw error;
  }
};
