"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Styles from "./page.styles";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleRoleSelection = async (role: "SEEKER" | "EMPLOYER") => {
    if (session && session.user) {
      const userData = {
        role,
        session,
      };

      await fetch("/api/user/register/role", {
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
    <Box component="main" id="main-content" sx={Styles.main}>
      <Typography variant="h1" component="h1" sx={Styles.heading}>
        Choose your role
      </Typography>
      <Box sx={Styles.actions}>
        <Button
          variant="contained"
          sx={Styles.roleButton}
          onClick={() => handleRoleSelection("SEEKER")}
        >
          Job Seeker
        </Button>
        <Button
          variant="contained"
          sx={Styles.roleButton}
          onClick={() => handleRoleSelection("EMPLOYER")}
        >
          Employer
        </Button>
      </Box>
    </Box>
  );
};

export default Page;
