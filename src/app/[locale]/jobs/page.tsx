import JobFilterSidebar from "@/app/components/job/JobFilterSidebar";
import JobResults from "@/app/components/job/JobResults";
import { Button } from "@/app/components/ui/button";
import H1 from "@/app/components/ui/h1";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";
import Link from "next/link";
import { options } from "@/app/components/auth/Options";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { getServerSession } from "next-auth";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import { getTranslations } from "next-intl/server";

type PageProps = {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    skills?: string;
    category?: string;
  };
  params: { locale: string };
};

const getTitle = async({
  q,
  type,
  location,
  remote,
  skills,
  category,
}: JobFilterValues) => {
  const t = await getTranslations("JobLibrary");
  const titlePrefix = q
    ? `${q} ${t("title")}`
    : type
    ? `${type} ${t("title")}`
    : remote
    ? `${t("remote")}`
    : skills
    ? `${skills} ${t("title")}`
    : category
    ? `${category} ${t("title")}`
    : `${t("all")}`;
  const titelSuffix = location ? ` in ${location}` : "";
  const title =
    skills && category ? `${category}, ${titlePrefix}` : titlePrefix;

  return `${title}${titelSuffix}`;
};

export const generateMetadata = async({
  searchParams: { q, type, location, remote, skills, category },
}: PageProps): Promise<Metadata> => {
  return {
    title: `${await getTitle({
      q,
      type,
      location,
      skills,
      category,
      remote: remote === "true",
    })}`,
  };
};

export default async function Jobs({
  searchParams: { q, type, location, remote, skills, category },
  params: { locale },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    skills,
    category,
    remote: remote == "true",
  };

  const session = await getServerSession(options);
  const t = await getTranslations("JobLibrary");

  return (
    <main className="px-3 m-auto max-w-7xl my-10 space-y-10 min-h-screen">
      <div className="relative space-y-5 text-center flex flex-row max-md:flex-col px-4 m-auto items-center justify-center">
        <div>
          <H1>{await getTitle(filterValues)}</H1>
          <p className="text-muted-foreground">{t("find")}</p>
        </div>
        <aside className="md:absolute md:right-0">
          {session?.user.role === "EMPLOYER" ? (
            <Button asChild>
              <Link href="/jobs/new" locale={locale} className="w-40 md:w-fit">
                {t("add_new")}
              </Link>
            </Button>
          ) : !session ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button>{t("add_new")}</Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-1" align="center">
                <span>{t("to_add_new")}</span>
              </PopoverContent>
            </Popover>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button>{t("add_new")}</Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-1" align="center">
                <span>{t("to_add_new_emp")}</span>
              </PopoverContent>
            </Popover>
          )}
        </aside>
      </div>
      <section className="flex flex-col space-y-3 lg:flex-row-reverse gap-3">
        <div className="lg:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="w-fit fixed right-5 top-20">{t("filter")}</Button>
            </DrawerTrigger>
            <DrawerContent>
              <JobFilterSidebar defaultValues={filterValues} />
            </DrawerContent>
          </Drawer>
        </div>
        <div className="max-lg:hidden">
          <JobFilterSidebar defaultValues={filterValues} />
        </div>
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
