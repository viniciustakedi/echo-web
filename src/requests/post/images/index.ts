import { signOut } from "next-auth/react";
import { ImagesPost } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const uploadImage = async (data: ImagesPost.Upload, accessToken: string) => {
  const formData = new FormData();
  formData.append("image", data.file);

  const response = await fetch(`${BASE_URL}/images`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  if (response.status === 401) {
    await signOut({ redirect: true });
  }

  return response;
};
