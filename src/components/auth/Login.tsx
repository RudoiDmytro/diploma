"use client";

import React, { useState } from "react";
import { validateEmail } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import GoogleButton from "./GoogleButton";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();

    if (validate()) {
      let res = await signIn("credentials", { email, password });

      return res;
    }
  }

  function validate() {
    const errors = { email: "", password: "" };

    if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }
    setErrors(errors);

    if (errors.password === "" && errors.email === "") {
      return true;
    }
  }
  return (
    <div className="flex justify-center items-center m-auto p-3">
      <form
        onSubmit={handleSubmit}
        className="bg-muted shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <GoogleButton />
        </div>
        <div className="mb-4">
          <label
            className="block text-card-foreground text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`border-${
              errors.email ? "red-500" : ""
            } shadow appearance-none border rounded w-full py-2 px-3 text-card-foreground leading-tight focus:outline-none focus:shadow-outline`}
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            className="block text-card-foreground text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`border-${
              errors.password ? "red-500" : ""
            } shadow appearance-none border rounded w-full py-2 px-3 text-card-foreground mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
        </div>
        <div className="flex items-center">
          <Button className="w-full" type="submit">
            Sign-in
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
