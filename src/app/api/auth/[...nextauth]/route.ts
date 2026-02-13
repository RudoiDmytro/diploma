import { options } from "@/features/auth";
import NextAuth from "next-auth";

const authHandler = NextAuth(options);

export { authHandler as GET, authHandler as POST };


