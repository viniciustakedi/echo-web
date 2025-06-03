import { GetTags } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTags = async (
  {
    page,
    limit,
    name
  }: {
    limit?: number;
    page?: number;
    name?: string;
  }
): Promise<GetTags.Response> => {
  try {
    let url = `${BASE_URL}/tags?page=${page ?? 1}&limit=${limit ?? 20}`;

    if (name) {
      url += "&name=${name}";
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    return {
      ...data,
      limit: Number(data.limit),
      page: Number(data.page)
    };
  } catch (error) {
    throw error;
  }
};
