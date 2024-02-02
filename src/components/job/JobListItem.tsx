import { Job } from "@prisma/client";
import {
  Banknote,
  Briefcase,
  Building2,
  Clock,
  Globe2,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { formatMoney, formatDate } from "@/lib/utils";
import Badge from "./Badge";

type JobListItem = {
  job: Job;
};

export default function JobListItem({
  job: {
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
  },
}: JobListItem) {
  return (
    <article className="flex gap-3 rounded-xl border p-4 hover:bg-muted/60">
      <Building2 className="self-center" size={50} />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-2 md:hidden">
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
          <p className="flex items-center gap-2 md:hidden">
            <Clock size={16} className="shrink-0" />
            {formatDate(createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden md:flex flex-col shrink-0 items-end justify-between">
        <Badge>{type}</Badge>
        <span className="flex items-center gap-2 text-muted-foreground">
          <Clock size={16}/>
          {formatDate(createdAt)}
        </span>
      </div>
    </article>
  );
}
