import { testTypes } from "@/lib/test-types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Select from "../ui/select";
import { TestFilterValues, testFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButton from "../FormSubmitButton";
import { db } from "@/lib/db";
import dynamic from "next/dynamic";
import SkillSelector from "../SkillSelector";
import { getTranslations } from "next-intl/server";

const CategoryButton = dynamic(() => import("../CategoryButton"), {
  ssr: false,
});

const filterTests = async (formData: FormData) => {
  "use server";

  const values = Object.fromEntries(formData.entries());

  const { q, type, skills, category } = testFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(skills && { skills }),
    ...(category && { category }),
  });

  redirect(`/test-library/?${searchParams.toString()}`);
};

type TestFilterSidebarProps = {
  defaultValues: TestFilterValues;
};

export default async function TestFilterSidebar({
  defaultValues,
}: TestFilterSidebarProps) {
  const [categories, skills] = await Promise.all([
    db.assessment.findMany({
      distinct: ["categoryId"],
      select: { category: true },
    }),
    db.assessment.findMany({ distinct: ["slug"],
      select: { skills: true },
     }),
  ]);

  const skill = skills
    .map((skill) =>
      skill.skills.map((skill) => ({
        skillName: skill.skillName,
      }))
    )
    .flat();

  const uniqueSkills = [...new Set(skill.map((item) => item.skillName))];
  const t = await getTranslations("FilterSidebar");

  return (
    <aside id="testFilterSidebar" className="lg:w-[300px] mt-3 md:sticky top-20 bg-background border rounded-lg h-fit p-4">
      <form action={filterTests} key={JSON.stringify(defaultValues)}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              name="q"
              placeholder={`${t("title")}`}
              defaultValue={defaultValues.q}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              id="type"
              name="type"
              defaultValue={defaultValues.type || ""}
            >
              <option value="">{t("all_types")}</option>
              {testTypes.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">{t("category")}</Label>
            <div className="grid grid-cols-2 gap-1 justify-around">
              {categories.map((category) => (
                <CategoryButton key={category.category?.categoryId} category={category.category} redirectUrl={"/test-library"} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="skills">{t("skills")}</Label>
            <SkillSelector skillNames={uniqueSkills} redirectUrl={"/test-library"} />
          </div>
          <FormSubmitButton type="submit" className="w-full">
          {t("filter_tests")}
          </FormSubmitButton>
        </div>
      </form>
    </aside>
  );
}
