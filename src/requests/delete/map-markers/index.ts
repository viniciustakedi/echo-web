const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const deleteMapMarker = async (id: string, accessToken: string) => {
  const response = await fetch(`${BASE_URL}/map-markers//${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // if (response.status === 401) {
  //   logout();
  //   throw new Error("Session expired, redirecting to login…");
  // }

  return response;
};
