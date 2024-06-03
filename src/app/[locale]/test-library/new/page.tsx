import { Metadata } from "next";
import NewTestForm from "./NewTestForm";

export const metadata: Metadata = {
  title: "Post a new task",
};

export default function page() {
  return <NewTestForm />;
}
