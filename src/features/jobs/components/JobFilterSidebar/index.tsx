import { jobTypes } from "@/lib/job-types";
import { ExpandMore } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { JobFilterValues, jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButton from "@/components/FormSubmitButton";
import { db } from "@/lib/db";
import CategoryButton from "@/components/CategoryButton";
import SkillSelector from "@/components/SkillSelector";
import Styles from "./styles";

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
    <Box component="aside" sx={Styles.aside}>
      <Box
        component="form"
        action={filterJobs}
        key={JSON.stringify(defaultValues)}
        noValidate
      >
        <Box sx={Styles.fields}>
          <Box sx={Styles.field}>
            <TextField
              id="q"
              name="q"
              label="Search"
              placeholder="Title, company, etc."
              defaultValue={defaultValues.q}
              size="small"
              fullWidth
              sx={Styles.textField}
            />
          </Box>
          <Box sx={Styles.field}>
            <Typography component="label" htmlFor="type" sx={Styles.groupLabel}>
              Type
            </Typography>
            <Box sx={Styles.selectWrap}>
              <Box
                component="select"
                id="type"
                name="type"
                defaultValue={defaultValues.type || ""}
                sx={Styles.select}
              >
                <option value="">All types</option>
                {jobTypes.map((type) => (
                  <option value={type} key={type}>
                    {type}
                  </option>
                ))}
              </Box>
              <ExpandMore aria-hidden sx={Styles.selectIcon} />
            </Box>
          </Box>
          <Box sx={Styles.field}>
            <Typography
              component="label"
              htmlFor="location"
              sx={Styles.groupLabel}
            >
              Location
            </Typography>
            <Box sx={Styles.selectWrap}>
              <Box
                component="select"
                id="location"
                name="location"
                defaultValue={defaultValues.location || ""}
                sx={Styles.select}
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
              </Box>
              <ExpandMore aria-hidden sx={Styles.selectIcon} />
            </Box>
          </Box>
          <Box
            component="div"
            role="group"
            aria-labelledby="job-category-group-label"
            sx={Styles.field}
          >
            <Typography
              component="span"
              id="job-category-group-label"
              sx={Styles.groupLabel}
            >
              Category
            </Typography>
            <Box sx={Styles.categoryGrid}>
              {categories.map((category) => (
                <CategoryButton
                  key={category.category.categoryId}
                  category={category.category}
                  redirectUrl={"/jobs"}
                />
              ))}
            </Box>
          </Box>
          <Box
            component="div"
            role="group"
            aria-labelledby="job-skills-group-label"
            sx={Styles.field}
          >
            <Typography
              component="span"
              id="job-skills-group-label"
              sx={Styles.groupLabel}
            >
              Skills
            </Typography>
            <SkillSelector skillNames={uniqueSkills} redirectUrl={"/jobs"} />
          </Box>
          <FormControlLabel
            sx={Styles.remoteRow}
            control={
              <Checkbox
                id="remote"
                name="remote"
                defaultChecked={defaultValues.remote}
                sx={Styles.remoteCheckbox}
              />
            }
            label={
              <Typography component="span" sx={Styles.remoteLabel}>
                Remote jobs
              </Typography>
            }
          />
          <Box sx={Styles.submitWrap}>
            <FormSubmitButton type="submit">Filter jobs</FormSubmitButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
