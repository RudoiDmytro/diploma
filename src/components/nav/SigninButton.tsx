"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Auth from "../auth/LoginModal";
const SigninButton = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <div className="inline-flex items-center px-2 py-1 gap-2 text-md font-medium text-foreground bg-transparent border-t border-b border-r rounded-e-lg border-foreground hover:bg-card hover:text-foreground ">
        {session.user.profileImageUrl ? (
          <Image
            src={session.user.profileImageUrl ?? ""}
            alt={session.user.username ?? ""}
            className=" rounded-full"
            width={32}
            height={32}
          />
        ) : (
          <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {session.user
                .username!.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }
  return <Auth />;
};

export default SigninButton;
