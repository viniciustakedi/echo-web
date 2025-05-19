import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { signIn } from "@/requests/post";

const PUBLIC_KEY = process.env.JWT_VERIFYING_PUBLIC_KEY!;

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    apiToken?: string;
  }
}

const authHandler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "API Credentials",
      credentials: {
        login: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await signIn({
          email: String(credentials?.login),
          password: String(credentials?.password),
        });

        if (!res.ok) {
          throw new Error("Invalid credentials");
        }
        const { data } = await res.json();
        try {
          jwt.verify(data, PUBLIC_KEY, { algorithms: ["RS256"] });

          const decodedToken = jwt.decode(data) as {
            sub: string;
            name: string;
            roles: string[];
            iss: string;
            iat: number;
            exp: number;
          };

          return { id: decodedToken.sub, apiToken: data };
        } catch {
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
    signOut: "/sign-in",
    newUser: "/",
  },
  jwt: {
    maxAge: 604800, // Same API time
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const typedUser = user as { id: string; apiToken: string };
        token.apiToken = typedUser.apiToken;
        token.id = typedUser.id;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = { id: token.id as string };
      (session as Session).apiToken = token.apiToken as string | undefined;
      return session;
    },
  },
});

// Explicitly export the handler for GET and POST methods
export const GET = authHandler;
export const POST = authHandler;
