import NextAuth, {
  AuthOptions,
  Session,
  SessionStrategy,
  getServerSession,
} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import GoogleProvider from "next-auth/providers/google";

export const options: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          username: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          profileImageUrl: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials, req) {
        if (credentials) {
          const userCredentials = {
            email: credentials.email,
            password: credentials.password,
          };
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/login`,
            {
              method: "POST",
              body: JSON.stringify(userCredentials),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const user = await res.json();

          if (user) {
            return user;
          } else {
            return null;
          }
        }
      },
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session, token }) {
      if (token) {
        const user = await db.user.findUnique({
          where: {
            id: token.id,
          },
        });

        if (user) {
          session.user = {
            ...session.user,
            ...user,
          };
        }
      }

      return session;
    },

    async jwt({ token, user }) {
      if (token) {
        const dbUser = await db.user.findUnique({
          where: {
            email: token.email as string,
          },
        });
        if (dbUser) {
          token = {
            ...token,
            ...dbUser,
          };
        }
      }
      return token;
    },
  },
};
