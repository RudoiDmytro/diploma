"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SignUp from "./SignUp";
import RoleSelection from "./RoleSelection";

function RegisterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("register");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center px-3 py-2 text-md font-medium text-foreground bg-transparent border rounded-s-lg border-foreground hover:bg-muted hover:text-foreground focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white ">
          Sign-Up
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <Tabs defaultValue="register" value={activeTab}>
              <TabsList className="w-full bg-transparent flex flex-row justify-center space-x-2 border-b-2 mt-2">
                <TabsTrigger
                  value="register"
                  className="w-full hover:bg-card"
                  onClick={() => setActiveTab("register")}
                >
                  Sign-up with email
                </TabsTrigger>
                <TabsTrigger
                  value="google"
                  className="w-full hover:bg-card"
                  onClick={() => setActiveTab("google")}
                >
                  Sign-up with google
                </TabsTrigger>
              </TabsList>
              <div className="">
                <TabsContent value="register">
                  <SignUp />
                </TabsContent>
                <TabsContent value="google">
                  <RoleSelection />
                </TabsContent>
              </div>
            </Tabs>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default RegisterModal;
