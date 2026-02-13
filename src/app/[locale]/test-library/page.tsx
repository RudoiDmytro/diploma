import TestFilterSidebar from "@/widgets/test/ui/TestFilterSidebar";
import TestResults from "@/widgets/test/ui/TestResults";
import { Button } from "@/shared/ui/button";
import H1 from "@/shared/ui/h1";
import { TestFilterValues } from "@/shared/lib/validation";
import { Metadata } from "next";
import Link from "next/link";
import { options } from "@/features/auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/popover";
import { getServerSession } from "next-auth";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { getTranslations } from "next-intl/server";

type PageProps = {
  searchParams: Promise<{
    q?: string;
    type?: string;
    category?: string;
    skills?: string;
  }>;
  params: Promise<{ locale: string }>;
};

const getTitle = async ({ q, type, category, skills }: TestFilterValues) => {
  const t = await getTranslations("TestLibrary");

  const titlePrefix = q
    ? `${q} ${t("title")}`
    : type
    ? `${type}  ${t("title")}`
    : skills
    ? `${skills}  ${t("title")}`
    : category
    ? `${category}  ${t("title")}`
    : ` ${t("all")}`;
  const title =
    skills && category ? `${category}, ${titlePrefix}` : titlePrefix;

  return `${title}`;
};

export const generateMetadata = async({
  searchParams,
}: PageProps): Promise<Metadata> => {
  const { q, type, category, skills } = await searchParams;
  return {
    title: `${await getTitle({
      q,
      type,
      skills,
      category,
    })}`,
  };
};

export default async function TestLibrary({
  searchParams: searchParamsPromise,
  params: paramsPromise,
}: PageProps) {
  const { q, type, category, skills } = await searchParamsPromise;
  const { locale } = await paramsPromise;
  const filterValues: TestFilterValues = {
    q,
    type,
    category,
    skills,
  };
  const session = await getServerSession(options);
  const t = await getTranslations("TestLibrary");

  return (
    <main className="px-3 m-auto max-w-7xl my-10 space-y-10 min-h-screen">
      <div className="relative space-y-5 text-center flex flex-row max-md:flex-col px-4 m-auto items-center justify-center">
        <div>
          <H1>{await getTitle(filterValues)}</H1>
          <p className="text-muted-foreground">{t("complete")}</p>
        </div>
        <aside className="md:absolute md:right-0">
          {session?.user.role === "EMPLOYER" ? (
            <Button asChild>
              <Link
                href="/test-library/new"
                locale={locale}
                className="w-40 md:w-fit"
              >
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
              <TestFilterSidebar defaultValues={filterValues} />
            </DrawerContent>
          </Drawer>
        </div>
        <div className="max-lg:hidden">
          <TestFilterSidebar defaultValues={filterValues} />
        </div>
        <TestResults filterValues={filterValues} />
      </section>
    </main>
  );
}



