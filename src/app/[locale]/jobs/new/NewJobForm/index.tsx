"use client";
import { createJobValues } from "@/lib/validation";
import { useForm, Controller, get } from "react-hook-form";
import { createJobSchema } from "../../../../../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobTypes, locationTypes } from "@/lib/job-types";
import LocationInput from "@/features/jobs/components/LocationInput";
import RichTextEditor from "@/components/RichTextEditor";
import { createJobPosting } from "../actions";
import { useState, useEffect } from "react";
import { Category, Skill } from "@prisma/client";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Close from "@mui/icons-material/Close";
import Styles from "./styles";

interface CheckboxFieldProps {
  skill: Skill;
  label: string;
  control: ReturnType<typeof useForm<createJobValues>>["control"];
  handleSkillSelect: (skill: Skill) => void;
  isChecked: boolean;
}

const CheckboxField = ({
  skill,
  label,
  control,
  handleSkillSelect,
  isChecked,
}: CheckboxFieldProps) => (
  <Controller
    control={control}
    name={`requiredSkills.${skill.skillId}` as keyof createJobValues}
    render={({ field }) => (
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={(_, checked) => {
              field.onChange(checked);
              handleSkillSelect(skill);
            }}
          />
        }
        label={label}
      />
    )}
  />
);

export default function NewJobForm() {
  const t = useTranslations("A11y");
  const form = useForm<createJobValues>({
    resolver: zodResolver(createJobSchema),
  });

  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isSkillsDialogOpen, setIsSkillsDialogOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [newSkillName, setNewSkillName] = useState("");

  useEffect(() => {
    const storedSkills = localStorage.getItem("selectedSkills");
    if (storedSkills) {
      setSelectedSkills(JSON.parse(storedSkills));
    }
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/skills");
        if (!response.ok) {
          throw new Error("Failed to fetch skills");
        }
        const data = await response.json();
        setSkills(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const currentValue = get(form.control, "requiredSkills.value");
    const updatedValue = currentValue?.filter((id) =>
      selectedSkills.includes(id)
    );
    form.setValue("requiredSkills", updatedValue || []);
  }, [selectedSkills, form.control, form.setValue]);

  const handleSkillsDialogOpen = () => {
    setIsSkillsDialogOpen(true);
  };

  const handleSkillsDialogClose = () => {
    setIsSkillsDialogOpen(false);
    setNewSkillName("");
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleSkillSelect = (skill: Skill) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s.skillId !== skill.skillId)
      : [...selectedSkills, skill];
    if (isMounted) {
      setSelectedSkills(updatedSkills);
      localStorage.setItem("selectedSkills", JSON.stringify(updatedSkills));
    }
  };

  const handleNewSkillSubmit = async () => {
    try {
      const response = await fetch("/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skillName: newSkillName }),
      });
      if (!response.ok) {
        throw new Error("Failed to create new skill");
      }
      const newSkill = await response.json();
      setSkills([...skills, newSkill]);
      setSelectedSkills([...selectedSkills, newSkill]);
      setNewSkillName("");
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  if (error)
    return (
      <Typography component="p" role="alert" sx={Styles.statusBox}>
        Failed to load: {error}
      </Typography>
    );
  if (loading)
    return (
      <Box role="status" aria-label={t("loading")} sx={Styles.statusBox}>
        <CircularProgress />
      </Box>
    );

  const appendToFormData = (formData, key, value) => {
    if (value === null || value === undefined) {
      return;
    }
    if (key === "requiredSkills") {
      formData.append(key, JSON.stringify(value));
    } else if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        formData.append(key, "[]");
      } else {
        value.forEach((item) => {
          formData.append(key, item);
        });
      }
    } else {
      formData.append(key, value);
    }
  };

  const onSubmit = async (values: createJobValues) => {
    const formData = new FormData();
    const skillIds = selectedSkills.map((skill) => skill.skillId);

    formData.append("requiredSkills", JSON.stringify(skillIds));

    Object.entries(values).forEach(([key, value]) => {
      if (key !== "requiredSkills") {
        appendToFormData(formData, key, value);
      }
    });

    try {
      await createJobPosting(formData);
      localStorage.removeItem("selectedSkills");
    } catch (error) {
      alert(error);
    }
  };

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    formState: { isSubmitting },
  } = form;

  return (
    <>
      <Box component="header" sx={Styles.header}>
        <Typography variant="h1" component="h1" sx={Styles.h1}>
          Find your perfect job applicant
        </Typography>
        <Typography component="p" sx={Styles.subtitle}>
          Get your job posting seen by thousands of job seekers
        </Typography>
      </Box>
      <Box component="section" sx={Styles.card}>
        <Box>
          <Typography component="h2" sx={Styles.sectionTitle}>
            Job details
          </Typography>
          <Typography component="p" sx={Styles.sectionSubtitle}>
            Provide a job description and detail
          </Typography>
        </Box>
        <Box
          component="form"
          sx={Styles.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name="title"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                value={field.value ?? ""}
                label="Job title"
                placeholder="e.g. Frontend Developer"
                fullWidth
                size="small"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="type"
            render={({ field, fieldState }) => (
              <FormControl
                fullWidth
                error={!!fieldState.error}
                sx={Styles.fieldGroup}
              >
                <FormLabel component="label" htmlFor="job-type" sx={Styles.fieldLabel}>
                  Job type
                </FormLabel>
                <Box
                  component="select"
                  id="job-type"
                  sx={Styles.nativeSelect}
                  {...field}
                  value={field.value ?? ""}
                  aria-invalid={!!fieldState.error}
                  aria-describedby={
                    fieldState.error ? "job-type-error" : undefined
                  }
                >
                  <option value="" hidden>
                    Select an option
                  </option>
                  {jobTypes.map((jobType) => (
                    <option value={jobType} key={jobType}>
                      {jobType}
                    </option>
                  ))}
                </Box>
                {fieldState.error?.message && (
                  <FormHelperText id="job-type-error">
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="companyName"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                value={field.value ?? ""}
                label="Company"
                fullWidth
                size="small"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="companyLogo"
            render={({ field: { value, onChange, ...fieldValues }, fieldState }) => (
              <FormControl error={!!fieldState.error} sx={Styles.fieldGroup}>
                <FormLabel component="label" sx={Styles.fieldLabel}>
                  Company logo
                </FormLabel>
                <Button
                  variant="outlined"
                  component="label"
                  sx={Styles.fileButton}
                >
                  Choose file
                  <Box
                    component="input"
                    {...fieldValues}
                    type="file"
                    accept="image/*"
                    sx={{
                      clip: "rect(0 0 0 0)",
                      clipPath: "inset(50%)",
                      height: "1px",
                      overflow: "hidden",
                      position: "absolute",
                      whiteSpace: "nowrap",
                      width: "1px",
                    }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      onChange(file);
                    }}
                  />
                </Button>
                {value instanceof File && (
                  <Typography component="span" sx={Styles.fileName}>
                    {value.name}
                  </Typography>
                )}
                {fieldState.error?.message && (
                  <FormHelperText>{fieldState.error.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="locationType"
            render={({ field, fieldState }) => (
              <FormControl
                fullWidth
                error={!!fieldState.error}
                sx={Styles.fieldGroup}
              >
                <FormLabel
                  component="label"
                  htmlFor="location-type"
                  sx={Styles.fieldLabel}
                >
                  Location
                </FormLabel>
                <Box
                  component="select"
                  id="location-type"
                  sx={Styles.nativeSelect}
                  {...field}
                  value={field.value ?? ""}
                  aria-invalid={!!fieldState.error}
                  aria-describedby={
                    fieldState.error ? "location-type-error" : undefined
                  }
                  onChange={(e) => {
                    field.onChange(e);
                    if (e.currentTarget.value === "Remote") trigger("location");
                  }}
                >
                  <option value="" hidden>
                    Select an option
                  </option>
                  {locationTypes.map((locationType) => (
                    <option value={locationType} key={locationType}>
                      {locationType}
                    </option>
                  ))}
                </Box>
                {fieldState.error?.message && (
                  <FormHelperText id="location-type-error">
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="location"
            render={({ field, fieldState }) => (
              <FormControl error={!!fieldState.error} sx={Styles.fieldGroup}>
                <FormLabel component="label" sx={Styles.fieldLabel}>
                  Office location
                </FormLabel>
                <LocationInput
                  onLocationSelected={field.onChange}
                  ref={field.ref}
                />
                {watch("location") && (
                  <Box sx={Styles.locationSelected}>
                    <IconButton
                      type="button"
                      size="small"
                      aria-label={t("remove_location")}
                      onClick={() =>
                        setValue("location", "", { shouldValidate: true })
                      }
                    >
                      <Close fontSize="small" />
                    </IconButton>
                    <Typography
                      component="span"
                      sx={Styles.locationSelectedText}
                    >
                      {watch("location")}
                    </Typography>
                  </Box>
                )}
                {fieldState.error?.message && (
                  <FormHelperText>{fieldState.error.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Box sx={Styles.fieldGroup}>
            <FormLabel
              component="label"
              htmlFor="applicationEmail"
              sx={Styles.fieldLabel}
            >
              How to apply
            </FormLabel>
            <Box sx={Styles.applyRow}>
              <Controller
                control={control}
                name="applicationEmail"
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    value={field.value ?? ""}
                    id="applicationEmail"
                    label="Email"
                    type="email"
                    size="small"
                    sx={{ flexGrow: 1 }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <Typography component="span" sx={Styles.orSeparator}>
                or
              </Typography>
              <Controller
                control={control}
                name="applicationUrl"
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    value={field.value ?? ""}
                    label="Website"
                    type="url"
                    size="small"
                    sx={{ flexGrow: 1 }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    onChange={(e) => {
                      field.onChange(e);
                      trigger("applicationEmail");
                    }}
                  />
                )}
              />
            </Box>
          </Box>
          <Controller
            control={control}
            name="description"
            render={({ field, fieldState }) => (
              <FormControl error={!!fieldState.error} sx={Styles.fieldGroup}>
                <FormLabel
                  component="label"
                  htmlFor="description-editor"
                  sx={Styles.fieldLabel}
                >
                  Description
                </FormLabel>
                <RichTextEditor
                  id="description-editor"
                  value={field.value || ""}
                  onChange={(value) => field.onChange(value ?? "")}
                />
                {fieldState.error?.message && (
                  <FormHelperText>{fieldState.error.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="category"
            render={({ field, fieldState }) => (
              <FormControl
                fullWidth
                error={!!fieldState.error}
                sx={Styles.fieldGroup}
              >
                <FormLabel
                  component="label"
                  htmlFor="category-select"
                  sx={Styles.fieldLabel}
                >
                  Category
                </FormLabel>
                <Box
                  component="select"
                  id="category-select"
                  sx={Styles.nativeSelect}
                  {...field}
                  value={field.value ?? ""}
                  aria-invalid={!!fieldState.error}
                  aria-describedby={
                    fieldState.error ? "category-error" : undefined
                  }
                >
                  <option value="" hidden>
                    Select a category
                  </option>
                  {categories.map((category: Category) => (
                    <option
                      value={category.categoryId}
                      key={category.categoryId}
                    >
                      {category.naming}
                    </option>
                  ))}
                  <option value="new">Add new category</option>
                </Box>
                {watch("category") === "new" && (
                  <Controller
                    control={control}
                    name="newCategory"
                    render={({ field: newField, fieldState: newState }) => (
                      <TextField
                        {...newField}
                        value={newField.value ?? ""}
                        label="New category"
                        placeholder="Enter new category"
                        fullWidth
                        size="small"
                        sx={{ marginTop: "0.5rem" }}
                        error={!!newState.error}
                        helperText={newState.error?.message}
                      />
                    )}
                  />
                )}
                {fieldState.error?.message && (
                  <FormHelperText id="category-error">
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="requiredSkills"
            render={({ fieldState }) => (
              <FormControl
                component="fieldset"
                error={!!fieldState.error}
                sx={Styles.fieldGroup}
              >
                <FormLabel component="legend" sx={Styles.fieldLabel}>
                  Required Skills
                </FormLabel>
                <Button
                  type="button"
                  variant="contained"
                  sx={Styles.selectSkillsButton}
                  onClick={handleSkillsDialogOpen}
                >
                  Select Skills
                </Button>
                <Box sx={Styles.skillsContainer}>
                  {selectedSkills &&
                    selectedSkills.map((skill) => (
                      <Chip
                        key={skill.skillId}
                        label={skill.skillName}
                        sx={Styles.skillChip}
                        onDelete={() => {
                          const next = selectedSkills.filter(
                            (s) => s.skillId !== skill.skillId
                          );
                          setSelectedSkills(next);
                          localStorage.setItem(
                            "selectedSkills",
                            JSON.stringify(next)
                          );
                        }}
                        deleteIcon={
                          <Close
                            aria-label={t("remove_skill", {
                              skill: skill.skillName,
                            })}
                          />
                        }
                      />
                    ))}
                </Box>
                {fieldState.error?.message && (
                  <FormHelperText>{fieldState.error.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Dialog
            open={isSkillsDialogOpen}
            onClose={handleSkillsDialogClose}
            aria-labelledby="skills-dialog-title"
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle
              id="skills-dialog-title"
              component="h3"
              sx={Styles.dialogTitle}
            >
              Select Required Skills
            </DialogTitle>
            <DialogContent>
              <Box sx={Styles.dialogList}>
                {skills.map((skill) => (
                  <CheckboxField
                    key={skill.skillId}
                    skill={skill}
                    label={skill.skillName}
                    control={form.control}
                    handleSkillSelect={handleSkillSelect}
                    isChecked={selectedSkills.some(
                      (s) => s.skillId === skill.skillId
                    )}
                  />
                ))}
              </Box>
              <Box sx={Styles.newSkillRow}>
                <TextField
                  label="Add new skill"
                  size="small"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                />
                <Button
                  type="button"
                  variant="contained"
                  sx={Styles.addSkillButton}
                  onClick={handleNewSkillSubmit}
                >
                  Add
                </Button>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                type="button"
                variant="contained"
                sx={Styles.confirmButton}
                onClick={handleSkillsDialogClose}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
          <Controller
            control={control}
            name="salary"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                value={field.value || ""}
                label="Salary"
                type="number"
                fullWidth
                size="small"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={Styles.submitButton}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={16} color="inherit" />
              ) : undefined
            }
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
}
