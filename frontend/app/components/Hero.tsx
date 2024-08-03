"use client"

import { useRouter } from "next/navigation";
import { SecondaryButton } from "./Button"
import { signOut, signIn, useSession } from "next-auth/react";
export const Hero = () => {
    const session = useSession()
    const router = useRouter()
    return (
        <div className="flex flex-col items-center  h-screen w-full">
            <div className="text-6xl flex pt-20 font-bold">The crypto of tomorrow, <p className="text-6xl font-bold text-blue-400 pl-2"> today</p></div>
            <div className="text-xl text-gray-400 pt-5">Create a frictionless wallet with just a Google Account</div>
            <div className="text-xl text-gray-400 pt-1 pb-10">Convert your INR into cyptocurrency</div>
            {session.data?.user ? 
                <SecondaryButton onClick={() => router.push('/dashboard')}>Go to Dashboard</SecondaryButton>
                :
                <SecondaryButton onClick={() => signIn('google')}>Sign In with Google</SecondaryButton>
            
            }
        </div>
    )
}