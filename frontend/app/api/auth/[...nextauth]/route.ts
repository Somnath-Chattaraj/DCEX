"use server"

import NextAuth from "next-auth";
import { authConfig } from "@/app/libs/auth";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
