import { signIn } from "next-auth/react";
import React from "react";

function GoogleButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/test-library" })}
      className="justify-evenly items-center w-full px-4 py-2 border flex gap-2 border-muted-foreground rounded-lg text-muted-foreground hover:border-foreground hover:text-foreground hover:shadow transition duration-150"
    >
      <img
        className="w-6 h-6"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="google logo"
      />
      <span>Login with Google</span>
    </button>
  );
}

export default GoogleButton;
