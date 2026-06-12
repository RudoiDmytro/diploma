"use client";

import React, { useState } from "react";
import { validateEmail } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Box, Button, Stack, TextField } from "@mui/material";
import GoogleButton from "../GoogleButton";
import GithubButton from "../GithubButton";
import Styles from "./styles";

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
    <Box sx={Styles.wrapper}>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={Styles.form}>
        <Stack spacing={1} sx={Styles.providers}>
          <GoogleButton callbackUrl="/test-library" />
          <GithubButton callbackUrl="/test-library" />
        </Stack>
        <TextField
          id="email"
          name="email"
          type="text"
          label="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email || undefined}
          fullWidth
          margin="normal"
          sx={Styles.field}
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="******************"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password || undefined}
          fullWidth
          margin="normal"
          sx={Styles.field}
        />
        <Button type="submit" variant="contained" fullWidth sx={Styles.submit}>
          Sign-in
        </Button>
      </Box>
    </Box>
  );
}

export default LoginPage;
