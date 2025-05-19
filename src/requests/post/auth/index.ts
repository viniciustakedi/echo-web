import { PostAuth } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const signIn = async ({
  email,
  password,
}: PostAuth.SignInParams): Promise<Response> => {
  const response = await fetch(`${BASE_URL}/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login: email,
      password,
    }),
  });

  return response;
};

export async function logout() {
  await fetch("/api/logout", { method: "GET" });
  // if (typeof window !== "undefined") {
  //   window.location.href = "/sign-in";
  // }
}
