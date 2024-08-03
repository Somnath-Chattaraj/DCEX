"use client"

import { signOut, signIn, useSession } from "next-auth/react";
import { PrimaryButton } from "./Button";

export const Appbar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex border-b-2 border-black items-center p-4 w-full justify-between">
      <div className="text-2xl font-bold">
        DCEX
      </div>
      <div className="flex justify-between text-xl text-blue-300">
        {status === "loading" ? (
          <div>Loading...</div>
        ) : session ? (
          <PrimaryButton onClick={() => signOut()}>Logout</PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => signIn("google")}>Login</PrimaryButton>
        )}
      </div>
    </div>
  );
};
