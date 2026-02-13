import { Metadata } from "next";
import { NewJobForm } from "@/features/create-job";

export const metadata: Metadata = {
  title: "Post a new job",
};

export default function page() {
  return <NewJobForm />;
}
