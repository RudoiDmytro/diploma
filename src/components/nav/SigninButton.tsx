"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
const SigninButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="inline-flex items-center px-2 py-1 gap-2 text-sm font-medium text-foreground bg-transparent border-t border-b border-r rounded-e-lg border-foreground hover:bg-muted hover:text-foreground focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white ">
        <Image
          src={session.user.profileImageUrl ?? ""}
          alt={session.user.username ?? ""}
          className=" rounded-full"
          width={32}
          height={32}
        />
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }
  return (
    <button
      onClick={() => signIn()}
      className="inline-flex items-center px-2 py-1 gap-2 text-sm font-medium text-foreground bg-transparent border-t border-b border-r rounded-e-lg border-foreground hover:bg-muted hover:text-foreground focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white "
    >
      Sign In
    </button>
  );
};

export default SigninButton;
