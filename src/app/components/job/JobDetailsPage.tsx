import { formatMoney } from "@/lib/utils";
import { Job } from "@prisma/client";
import { Banknote, Briefcase, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Markdown from "../Markdown";

interface JobDetailsPageProps {
  job: Job;
}

export default function JobDetailsPage({
  job: {
    title,
    type,
    companyName,
    companyLogoUrl,
    location,
    locationType,
    applicationUrl,
    description,
    salary,
    slug,
  },
}: JobDetailsPageProps) {
  return (
    <section className="w-full grow space-y-5">
      <div className="flex items-center gap-4">
        {companyLogoUrl && (
          <Image
            src={`/assets/${slug}.jpg`}
            alt="Company logo"
            width={200}
            height={200}
            className="rounded-xl dark:bg-foreground p-1"
          />
        )}
        <div>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="font-semibold">
              {applicationUrl ? (
                <Link
                  href={new URL(applicationUrl).origin}
                  className="text-red-500 hover:underline"
                >
                  {companyName}
                </Link>
              ) : (
                <span>{companyName}</span>
              )}
            </p>
          </div>
          <div className="text-muted-foreground">
            <p className="flex items-center gap-2">
              <Briefcase size={16} className="shrink-0" />
              {type}
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} className="shrink-0" />
              {locationType}
            </p>
            <p className="flex items-center gap-2">
              <Globe2 size={16} className="shrink-0" />
              {location || "Worldwide"}
            </p>
            <p className="flex items-center gap-2">
              <Banknote size={16} className="shrink-0" />
              {formatMoney(salary)}
            </p>
          </div>
        </div>
      </div>
      <div>{description && <Markdown>{description}</Markdown>}</div>
    </section>
  );
}
