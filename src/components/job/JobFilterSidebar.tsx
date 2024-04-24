import { jobTypes } from "@/lib/job-types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Select from "../ui/select";
import { JobFilterValues, jobFilterSchema } from "@/lib/validation";
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

  const { q, type, location, remote, skills, category } =
    jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
    ...(skills && { skills }),
    ...(category && { category }),
  });

  redirect(`/jobs/?${searchParams.toString()}`);
};

type JobFilterSidebarProps = {
  defaultValues: JobFilterValues;
};

export default async function JobFilterSidebar({
  defaultValues,
}: JobFilterSidebarProps) {
  const [locations, categories, skills] = await Promise.all([
    db.job.findMany({
      select: { location: true },
      distinct: ["location"],
    }),
    db.job.findMany({
      distinct: ["categoryId"],
      select: { category: true },
    }),
    db.job.findMany({
      distinct: ["slug"],
      select: { requiredSkills: true },
    }),
  ]);

  const filteredLocations = locations.filter((data) => data.location !== null);

  const skill = skills
    .map((skill) =>
      skill.requiredSkills.map((skill) => ({
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
              placeholder="Title, company, etc."
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
              {jobTypes.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              defaultValue={defaultValues.location || ""}
            >
              <option value="">All locations</option>
              {filteredLocations.map((locations) => (
                <option
                  value={locations.location?.toString()}
                  key={locations.location}
                >
                  {locations.location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Category</Label>
            <div className="grid grid-cols-2 gap-1 justify-around">
              {categories.map((category) => (
                <CategoryButton
                  key={category.category.categoryId}
                  category={category.category}
                  redirectUrl={"/jobs"}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="skills">Skills</Label>
            <SkillSelector skillNames={uniqueSkills} redirectUrl={"/jobs"} />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black"
              defaultChecked={defaultValues.remote}
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <FormSubmitButton type="submit" className="w-full">
            Filter jobs
          </FormSubmitButton>
        </div>
      </form>
    </aside>
  );
}
