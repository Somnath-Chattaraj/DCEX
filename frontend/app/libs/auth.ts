import NextAuth, { NextAuthOptions } from "next-auth";
import { signOut, signIn, useSession } from "next-auth/react";
import GoogleProvider from "next-auth/providers/google";
import db from "@/app/db";
import { Keypair } from "@solana/web3.js";
import { Session } from "next-auth";

export interface CustomSession extends Session {
    user: {
        email: string,
        name: string,
        image: string,
        uid: string
    }
}

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session, token }) {
        const newSession: CustomSession = session as CustomSession;
        if (newSession.user && token.uid) {
            // @ts-ignore
            newSession.user.uid = token.uid ?? "";
        }
        return newSession;
    },
    async jwt({ token, account, profile }) {
        if (account) {
            const user = await db.user.findFirst({
                where: {
                    sub: account.providerAccountId ?? ""
                }
            });
            if (user) {
                token.uid = user.id;
            }
        }
        return token;
    },
    async signIn({ user, account }) {
        if (account?.provider === "google") {
            const email = user.email;
            if (!email) {
                return false;
            }

            const userDb = await db.user.findUnique({
                where: {
                    username: email
                },
            });
            if (userDb) {
                return true;
            }

            const keypair = Keypair.generate();
            const publicKey = keypair.publicKey.toBase58();
            const privateKey = keypair.secretKey;
            console.log(publicKey, privateKey);
            await db.user.create({
                data: {
                    username: email,
                    provider: "Google",
                    sub: account.providerAccountId,
                    solWalletId: {
                        create: {
                            publicKey: publicKey,
                            privateKey: privateKey.toString(),
                        }
                    },
                    inrWalletId: {
                        create: {
                            balance: 0,
                        }
                    }
                }
            });

            return true;
        }
        return false;
    },
  },
};

export default NextAuth(authConfig);
