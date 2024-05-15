"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Auth from "../auth/LoginModal";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";
const SigninButton = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <Popover>
        <PopoverTrigger>
          {session.user.profileImageUrl ? (
            <Image
              src={session.user.profileImageUrl ?? ""}
              alt={session.user.username ?? ""}
              className="rounded-full"
              width={36}
              height={36}
            />
          ) : (
            <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                {session.user.username!.charAt(0).toUpperCase()}
              </span>
            </div>
          )}{" "}
        </PopoverTrigger>
        <PopoverContent
          className="w-fit flex flex-col items-start mt-2 bg-background text-sm font-medium text-foreground divide-y shadow"
          align="center"
        >
          <div className="flex flex-col w-full text-start">
            <span>{session.user.username}</span>
            <span className="pb-2">{session.user.email}</span>
          </div>
          <div className="flex flex-col w-full text-start">
            <Link
              href="/profile"
              className="w-full hover:bg-muted dark:hover:bg-card px-4 py-2"
            >
              Profile
            </Link>
            <Link
              href="/dashboard"
              className="w-full hover:bg-muted dark:hover:bg-card px-4 py-2"
            >
              Dashboard
            </Link>
          </div>
          <button
            className="w-full px-4 py-2 hover:bg-muted dark:hover:bg-card text-start"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </PopoverContent>
      </Popover>
    );
  }
  return <Auth />;
};

export default SigninButton;
