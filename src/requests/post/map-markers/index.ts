import { PostMapMarker } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createMapMarker = async (
  data: PostMapMarker.Create,
  accessToken: string
) => {
  const response = await fetch(`${BASE_URL}/map-markers`, {
    method: "POST",
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
