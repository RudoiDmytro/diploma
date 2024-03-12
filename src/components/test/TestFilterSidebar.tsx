import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Select from "../ui/select";
import { TestFilterValues, testFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButton from "../FormSubmitButton";
import { Category } from "@prisma/client";
import { GetCategoryTags } from "@/app/api/testFilter/tags/CategoryTags";

const filterJobs = async (formData: FormData) => {
  "use server";
  const values = Object.fromEntries(formData.entries());

  const { q, type, category } = testFilterSchema.parse(values);
  const tags = await GetCategoryTags(category);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(category && { category }),
    ...(tags && { tags }),
  });

  redirect(`/test-library/?${searchParams.toString()}`);
};

type JobFilterSidebarProps = {
  defaultValues: TestFilterValues;
};

export default async function JobFilterSidebar({
  defaultValues,
}: JobFilterSidebarProps) {
  const formData = await fetch(`http://localhost:3000/api/testFilter`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) =>
      data
        .map((category: Category) => category)
        .filter((category: Category) => category.category !== null)
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
            <Label htmlFor="category">Category</Label>
            <Select
              id="category"
              name="category"
              defaultValue={defaultValues.category || ""}
            >
              <option value="">All categories</option>
              {formData.map((categories: Category) => (
                <option value={categories.category} key={categories.category}>
                  {categories.category}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            {formData.map((categories: Category) => (
              <p>{categories.category}</p>
            ))}
          </div>
          <FormSubmitButton type="submit" className="w-full">
            Filter tests
          </FormSubmitButton>
        </div>
      </form>
    </aside>
  );
}
