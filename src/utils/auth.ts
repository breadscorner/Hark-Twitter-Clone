import NextAuth, { NextAuthConfig } from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/db"

export const authConfig = { 
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: DrizzleAdapter(db),
  callbacks: {
    async session({ session, user }) {
      // Ensure that both session.user and user are defined before assigning id
      if (user && session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const paths = ["/profile", "/create-post"];
      const isProtected = paths.some((path) => nextUrl.pathname.startsWith(path));

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("api/auth/signin", nextUrl.origin);
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
        return Response.redirect(redirectUrl);
      }
      
      return true;
    },
  }
} satisfies NextAuthConfig;

export const { handlers, auth, signOut } = NextAuth(authConfig);
