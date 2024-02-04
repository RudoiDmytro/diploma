import { jobTypes } from "@/lib/job-types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Select from "../ui/select";
import { JobFilterValues, jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButton from "../FormSubmitButton";

const filterJobs = async (formData: FormData) => {
  "use server";

  const values = Object.fromEntries(formData.entries());

  const { q, type, location, remote } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/jobs/?${searchParams.toString()}`);
};

type JobFilterSidebarProps = {
  defaultValues: JobFilterValues;
};

export default async function JobFilterSidebar({
  defaultValues,
}: JobFilterSidebarProps) {
  const formData = await fetch(`http://localhost:3000/api/jobFilter`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) =>
      data
        .map((location) => location)
        .filter((location) => location.location !== null)
    );
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
              {formData.map((locations) => (
                <option value={locations.location} key={locations.location}>
                  {locations.location}
                </option>
              ))}
            </Select>
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
