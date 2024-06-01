"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import LoginPage from "./Login";

function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center px-3 py-2 text-md font-medium text-foreground bg-transparent border rounded-e-lg border-foreground hover:bg-card hover:text-foreground">
          Login
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <div className="text-md font-medium text-background bg-foreground rounded-md w-full p-2 mt-2 text-center">
              <span>Sign-in</span>
            </div>
            <LoginPage />
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
