"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { validateEmail } from "@/lib/utils";
import { signIn } from "next-auth/react";
import GoogleButton from "../GoogleButton";
import GithubButton from "../GithubButton";
import Styles from "./styles";

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
    <Box sx={Styles.wrapper}>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={Styles.form}>
        <Stack spacing={1} sx={Styles.providers}>
          <GoogleButton callbackUrl="/test-library" />
          <GithubButton callbackUrl="/test-library" />
        </Stack>
        <FormControl component="fieldset" sx={Styles.roleFieldset}>
          <FormLabel component="legend" sx={Styles.legend}>
            Choose your role
          </FormLabel>
          <RadioGroup
            row
            value={role}
            onChange={(e) =>
              setRole(e.target.value as "seeker" | "employer")
            }
            sx={Styles.radioRow}
          >
            <FormControlLabel
              value="seeker"
              control={<Radio />}
              label="Job Seeker"
              sx={Styles.radioLabel}
            />
            <FormControlLabel
              value="employer"
              control={<Radio />}
              label="Employer"
              sx={Styles.radioLabel}
            />
          </RadioGroup>
        </FormControl>
        <TextField
          id="username"
          name="username"
          type="text"
          label="Username"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          fullWidth
          margin="normal"
          sx={Styles.field}
        />
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
        <TextField
          id="confirm-password"
          name="confirm-password"
          type="password"
          label="Confirm Password"
          placeholder="***********"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          error={passError}
          helperText={passError ? "Password do not match!" : undefined}
          fullWidth
          margin="normal"
          sx={Styles.field}
        />
        <Button type="submit" variant="contained" fullWidth sx={Styles.submit}>
          Sign-up
        </Button>
      </Box>
    </Box>
  );
}

export default SignUp;
