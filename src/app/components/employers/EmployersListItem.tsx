import { Job } from "@prisma/client";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import { formatMoney, formatDate } from "@/lib/utils";
import Badge from "../Badge";

type EmployersListItemProps = {
  job: Job;
};

export default async function EmployersListItem({
  job: {
    slug,
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
    categoryId,
  },
}: EmployersListItemProps) {
  return (
    <article className="gradient1 rounded-3xl p-4 md:h-full">
      <section className="bg-background flex md:h-full rounded-xl p-2 hover:bg-card hover:transition-colors duration-500 ease-in-out">
        <div className="flex-grow space-y-3 bg-card text-card-foreground rounded-lg p-2">
          <h2 className="text-xl font-medium">{companyName}</h2>
          <div className="text-muted-foreground">
            <p className="flex items-center gap-2 md:hidden">
              <Briefcase size={16} className="shrink-0" />
              {type}
            </p>
            <Badge>{type}</Badge>
          </div>
        </div>
      </section>
    </article>
  );
}
