import { signOut } from "next-auth/react";
import { PatchTags } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const updateTag = async (
  id: string,
  data: PatchTags.Update,
  accessToken: string
) => {
  const response = await fetch(`${BASE_URL}/tags/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (response.status === 401) {
    await signOut({ redirect: true });
  }

  return response;
};
