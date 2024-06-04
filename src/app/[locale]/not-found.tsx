import H1 from "@/app/components/ui/h1";
import Link from "next/link";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <main className="max-w-5xl m-auto my-10 space-y-5 px-3 text-center">
      <H1>Not found</H1>
      <p>The page you are looking for is not exists</p>
      <Button>
        <Link href="/">Go home</Link>
      </Button>
    </main>
  );
}
