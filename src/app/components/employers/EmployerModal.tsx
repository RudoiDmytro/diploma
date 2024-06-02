import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { cache } from "react";
import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "../ui/button";

const getJobByCompanyName = cache(async (companyName: string) => {
  const job = await db.job.findMany({
    where: { companyName },
  });
  return job;
});

type EmployerModalProps = {
  companyName: string;
};

export default async function EmployerModal({
  companyName,
}: EmployerModalProps) {
  const job = await getJobByCompanyName(companyName);

  if (!job) {
    return null;
  }

  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>All jobs from this employer</DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button>
              <Link href="/employers">Close</Link>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
