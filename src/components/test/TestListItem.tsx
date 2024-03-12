import { Assessment } from "@prisma/client";
import { Clock, Clock2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Badge from "../Badge";

type TestListItemProps = {
  test: Assessment;
};

export default function TestListItem({
  test: { title, category, duration, createdAt },
}: TestListItemProps) {
  return (
    <article className="flex md:min-h-full gap-3 rounded-xl border p-4 hover:bg-muted/60">
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{category}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-2 md:hidden">
            <Clock2 size={16} className="shrink-0" />
            {duration}
          </p>
          <p className="flex items-center gap-2 md:hidden">
            <Clock size={16} className="shrink-0" />
            {formatDate(createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden md:flex flex-col shrink-0 items-end justify-between">
        <Badge>{category}</Badge>
        <span className="flex items-center gap-2 text-muted-foreground">
          <Clock size={16} />
          {duration}
        </span>
      </div>
    </article>
  );
}
