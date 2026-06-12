import { testTypes } from "@/lib/test-types";
import { TestFilterValues, testFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButton from "@/components/FormSubmitButton";
import { db } from "@/lib/db";
import CategoryButton from "@/components/CategoryButton";
import SkillSelector from "@/components/SkillSelector";
import { getTranslations } from "next-intl/server";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Styles from "./styles";

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
    db.assessment.findMany({
      distinct: ["slug"],
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
    <Box component="aside" id="testFilterSidebar" sx={Styles.sidebar}>
      <form action={filterTests} key={JSON.stringify(defaultValues)} noValidate>
        <Stack sx={Styles.fields}>
          <Box sx={Styles.field}>
            <TextField
              id="q"
              name="q"
              label="Search"
              placeholder={`${t("title")}`}
              defaultValue={defaultValues.q}
              variant="outlined"
              size="small"
              fullWidth
              sx={Styles.textField}
            />
          </Box>
          <Box sx={Styles.field}>
            <Typography component="label" htmlFor="type" sx={Styles.label}>
              Type
            </Typography>
            <Box sx={Styles.selectWrapper}>
              <Box
                component="select"
                id="type"
                name="type"
                defaultValue={defaultValues.type || ""}
                sx={Styles.select}
              >
                <option value="">{t("all_types")}</option>
                {testTypes.map((type) => (
                  <option value={type} key={type}>
                    {type}
                  </option>
                ))}
              </Box>
              <ExpandMore aria-hidden sx={Styles.selectIcon} />
            </Box>
          </Box>
          <Box
            sx={Styles.field}
            role="group"
            aria-labelledby="test-filter-category-label"
          >
            <Typography
              component="span"
              id="test-filter-category-label"
              sx={Styles.label}
            >
              {t("category")}
            </Typography>
            <Box sx={Styles.categoryGrid}>
              {categories.map((category) => (
                <CategoryButton
                  key={category.category?.categoryId}
                  category={category.category}
                  redirectUrl={"/test-library"}
                />
              ))}
            </Box>
          </Box>
          <Box
            sx={Styles.field}
            role="group"
            aria-labelledby="test-filter-skills-label"
          >
            <Typography
              component="span"
              id="test-filter-skills-label"
              sx={Styles.label}
            >
              {t("skills")}
            </Typography>
            <SkillSelector
              skillNames={uniqueSkills}
              redirectUrl={"/test-library"}
            />
          </Box>
          <FormSubmitButton type="submit" sx={{ width: "100%" }}>
            {t("filter_tests")}
          </FormSubmitButton>
        </Stack>
      </form>
    </Box>
  );
}
