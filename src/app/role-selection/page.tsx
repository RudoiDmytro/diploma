"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleRoleSelection = async (role: "SEEKER" | "EMPLOYER") => {
    if (session && session.user) {
      const userData = {
        role,
        session,
      };

      const updateUserRole = await fetch("/api/user/register/role", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      setTimeout(() => router.push("/"), 2000);
    } else {
      console.error("Failed to sign in with Google");
    }
  };

  return (
    <div className="m-auto">
      <h2 className="block text-card-foreground text-md font-bold mb-2">
        Choose your role
      </h2>
      <div className="flex flex-row justify-between space-x-2">
        <Button
          className="w-full"
          onClick={() => handleRoleSelection("SEEKER")}
        >
          Job Seeker
        </Button>
        <Button
          className="w-full"
          onClick={() => handleRoleSelection("EMPLOYER")}
        >
          Employer
        </Button>
      </div>
    </div>
  );
};

export default page;
