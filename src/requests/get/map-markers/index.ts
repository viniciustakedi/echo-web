import { GetMaps } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMapMarkers = async ({
  page,
  limit,
}: {
  limit?: number;
  page?: number;
}): Promise<GetMaps.Response> => {
  const response = await fetch(
    `${BASE_URL}/map-markers?limit${limit ?? 20}&page${page ?? 1}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result: GetMaps.Response = await response.json();

  if (Array.isArray(result.data)) {
    result.data = result.data.map(marker => ({
      ...marker,
      latitude: Number(marker.latitude),
      longitude: Number(marker.longitude)
    }));
  } else {
    result.data = {
      ...result.data,
      latitude: Number(result.data.latitude),
      longitude: Number(result.data.longitude)
    };
  }

  return result;
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
    throw error;
  }
};
