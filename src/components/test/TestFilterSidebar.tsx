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

const CategoryButton = dynamic(() => import("../CategoryButton"), {
  ssr: false,
});

const filterJobs = async (formData: FormData) => {
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

  return (
    <aside className="lg:w-[300px] sticky top-0 bg-background border rounded-lg h-fit p-4">
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              name="q"
              placeholder="Title, etc."
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
              <option value="">All types</option>
              {testTypes.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Category</Label>
            <div className="grid grid-cols-2 gap-1 justify-around">
              {categories.map((category) => (
                <CategoryButton key={category.category?.categoryId} category={category.category} redirectUrl={"/test-library"} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="skills">Skills</Label>
            <SkillSelector skillNames={uniqueSkills} redirectUrl={"/test-library"} />
          </div>
          <FormSubmitButton type="submit" className="w-full">
            Filter tests
          </FormSubmitButton>
        </div>
      </form>
    </aside>
  );
}
