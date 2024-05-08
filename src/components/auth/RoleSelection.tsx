import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

const RoleSelection = () => {
  
  return (
    <div>
      <h2 className="block text-card-foreground text-md font-bold mb-2">
        Choose your role
      </h2>
      <div className="flex flex-row justify-between space-x-2">
        <Button
          className="w-full"
          onClick={() =>
            signIn("google", {
              callbackUrl: "/role-selection",
              redirect: false,
            })
          }
        >
          Job Seeker
        </Button>
      </div>
    </div>
  );
};

export default RoleSelection;
