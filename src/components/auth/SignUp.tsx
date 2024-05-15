"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { validateEmail } from "@/lib/utils";
import { signIn } from "next-auth/react";
import GoogleButton from "./GoogleButton";

function SignUp() {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [passError, setPassError] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [role, setRole] = useState<"seeker" | "employer">("seeker");

  function validatePassword() {
    let isValid = confirmPassword === password;
    if (!isValid) {
      setPassError(true);
      return false;
    } else {
      setPassError(false);
      return true;
    }
  }

  function validate() {
    const errors = { email: "", password: "" };

    if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (password!.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }
    setErrors(errors);

    if (errors.password === "" && errors.email === "") {
      return true;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (validate() && validatePassword()) {
      let userData = {
        username,
        email,
        password,
        role,
      };
      console.log(userData);
      const res = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await signIn("credentials", { email, password });
      if (res.ok) {
        const data = await res.json();
      } else {
        throw new Error();
      }
    }
  }
  return (
    <div className="flex justify-center items-center m-auto p-3">
      <form
        onSubmit={handleSubmit}
        className="bg-muted shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <GoogleButton callbackUrl="/role-selection" />
        <label className="block text-card-foreground text-sm font-bold mt-4 mb-2">
          Choose your role
        </label>
        <div className="mb-4 flex flex-row justify-between">
          <label className="block text-card-foreground font-bold mb-2">
            <input
              type="radio"
              value="seeker"
              checked={role === "seeker"}
              onChange={() => setRole("seeker")}
              className="mr-2"
            />
            Job Seeker
          </label>
          <label className="block text-card-foreground font-bold mb-2">
            <input
              type="radio"
              value="employer"
              checked={role === "employer"}
              onChange={() => setRole("employer")}
              className="mr-2"
            />
            Employer
          </label>
        </div>
        <div className="mb-4">
          <label
            className="block text-card-foreground text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-card-foreground leading-tight focus:outline-none focus:shadow-outline`}
            id="Username"
            type="text"
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
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
        <div className="mb-4">
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
        <div className="mb-6">
          <label
            className="block text-card-foreground text-sm font-bold mb-2"
            htmlFor="confirm-password"
          >
            Confirm Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-card-foreground mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="confirm-password"
            type="password"
            placeholder="***********"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          {passError && (
            <p className="text-red-500 text-xs italic">
              Password do not match!
            </p>
          )}
        </div>
        <div className="flex items-center">
          <Button className="w-full" type="submit">
            Sign-up
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
