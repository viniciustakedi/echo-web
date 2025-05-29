import { signOut } from "next-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const deleteImage = async (id: string, accessToken: string) => {
  const response = await fetch(`${BASE_URL}/images/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    await signOut({ redirect: true });
  }

  return response;
}; 