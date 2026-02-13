import { Metadata } from "next";
import { NewTestForm } from "@/features/create-test";

export const metadata: Metadata = {
  title: "Post a new task",
};

export default function page() {
  return <NewTestForm />;
}
