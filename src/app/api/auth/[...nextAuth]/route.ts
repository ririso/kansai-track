// app/api/auth/[...nextauth]/route.ts
import { authConfig } from "@/auth/config";
import NextAuth from "next-auth";

console.log("NextAuth handler is being called");

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
