import { signOut } from "next-auth/react";
import { PostTags } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createTag = async (data: PostTags.Create, accessToken: string) => {
  const response = await fetch(`${BASE_URL}/tags`, {
    method: "POST",
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
