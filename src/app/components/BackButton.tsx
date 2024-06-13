"use client"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function BackButton() {
  const Router = useRouter();
  return <Button onClick={() => Router.back()}>Go Back</Button>;
}
