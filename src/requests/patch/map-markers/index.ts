import { PatchMaps } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const updateMapMarker = async (
  id: string,
  data: PatchMaps.UpdateMapMarker,
  accessToken: string
) => {
  const response = await fetch(`${BASE_URL}/map-markers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  // if (response.status === 401) {
  //   logout();
  //   throw new Error("Session expired, redirecting to login…");
  // }

  return response;
};
