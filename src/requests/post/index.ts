import { PostRequests } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const signIn = async ({
  email,
  password,
}: PostRequests.SignIn.SignInParams): Promise<Response> => {
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
  // NextAuth’s sign-out endpoint lives at /api/auth/signout
  await fetch("/api/auth/signout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callbackUrl: "/sign-in" }),
  });
}
