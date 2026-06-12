"use client";
import { useForm, Controller, get, type Resolver } from "react-hook-form";
import { createTestSchema, createTestValues } from "../../../../../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Skill } from "@prisma/client";
import { createTestPosting } from "../actions";
import { testTypes } from "@/lib/test-types";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RichTextEditor from "@/components/RichTextEditor";
import Styles from "./styles";

const CheckboxField = ({
  skill,
  label,
  control,
  handleSkillSelect,
  isChecked,
}) => (
  <Controller
    control={control}
    name={`skills.${skill.skillId}`}
    render={({ field }) => (
      <FormControlLabel
        sx={Styles.checkboxLabel}
        control={
          <Checkbox
            checked={isChecked}
            onChange={(e) => {
              field.onChange(e.target.checked);
              handleSkillSelect(skill);
            }}
          />
        }
        label={label}
      />
    )}
  />
);

export default function NewTestForm() {
  const tA11y = useTranslations("A11y");
  const form = useForm<createTestValues>({
    resolver: zodResolver(createTestSchema) as Resolver<createTestValues>,
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
    const currentValue = get(form.control, "skills.value");
    const updatedValue = currentValue?.filter((id) =>
      selectedSkills.includes(id)
    );
    form.setValue("skills", updatedValue || []);
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

  const removeSkill = (skill: Skill) => {
    const next = selectedSkills.filter((s) => s.skillId !== skill.skillId);
    setSelectedSkills(next);
    localStorage.setItem("selectedSkills", JSON.stringify(next));
  };

  const appendToFormData = (formData, key, value) => {
    if (value === null || value === undefined) {
      return;
    }
    if (key === "requiredSkills" || key === "tests") {
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

  const onSubmit = async (data: createTestValues) => {
    const formData = new FormData();

    const skillIds = selectedSkills.map((skill) => skill.skillId);
    formData.append("skills", JSON.stringify(skillIds));

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "skills" && key !== "tests") {
        appendToFormData(formData, key, value);
      }
    });

    try {
      await createTestPosting(formData);
      localStorage.removeItem("selectedSkills");
    } catch (error) {
      alert(error);
    }
  };

  const {
    handleSubmit,
    watch,
    control,
    setFocus,
    formState: { isSubmitting },
  } = form;

  if (error)
    return (
      <Typography role="alert" component="p" sx={Styles.errorAlert}>
        Failed to load: {error}
      </Typography>
    );
  if (loading)
    return (
      <Box role="status" aria-label={tA11y("loading")} sx={Styles.statusBox}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box component="main" id="main-content" sx={Styles.main}>
      <Box component="header" sx={Styles.header}>
        <Typography variant="h1" component="h1" sx={Styles.title}>
          Create a new task
        </Typography>
        <Typography component="p" sx={Styles.subtitle}>
          Get your task posting seen by thousands of job seekers
        </Typography>
      </Box>
      <Box component="section" sx={Styles.card}>
        <Box>
          <Typography variant="h2" component="h2" sx={Styles.cardHeading}>
            Task details
          </Typography>
          <Typography component="p" sx={Styles.cardSubtext}>
            Provide a task description and detail
          </Typography>
        </Box>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit, (errors) => {
            const firstError = Object.keys(errors)[0] as
              | keyof createTestValues
              | undefined;
            if (firstError) {
              setFocus(firstError);
            }
          })}
          sx={Styles.form}
        >
          <Controller
            control={control}
            name="title"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                value={field.value ?? ""}
                label="Task title"
                placeholder="e.g. Frontend Developer"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />
          <Controller
            control={control}
            name="type"
            render={({ field, fieldState }) => (
              <FormControl error={!!fieldState.error} fullWidth>
                <FormLabel component="label" htmlFor="type" sx={Styles.fieldLabel}>
                  Task type
                </FormLabel>
                <Box sx={Styles.selectWrap}>
                  <Box
                    component="select"
                    id="type"
                    {...field}
                    value={field.value ?? ""}
                    sx={Styles.nativeSelect}
                    aria-invalid={!!fieldState.error}
                    aria-describedby={fieldState.error ? "type-error" : undefined}
                  >
                    <option value="" hidden>
                      Select an option
                    </option>
                    {testTypes.map((testType) => (
                      <option value={testType} key={testType}>
                        {testType}
                      </option>
                    ))}
                  </Box>
                  <ExpandMoreIcon fontSize="small" aria-hidden sx={Styles.selectIcon} />
                </Box>
                {fieldState.error && (
                  <Typography
                    id="type-error"
                    role="alert"
                    component="span"
                    sx={{ color: "error.main", fontSize: "0.875rem", mt: 0.5 }}
                  >
                    {fieldState.error.message}
                  </Typography>
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
                label="Company name"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />
          <Controller
            control={control}
            name="endDate"
            render={({ field, fieldState }) => (
              <FormControl error={!!fieldState.error}>
                <FormLabel component="label" sx={Styles.fieldLabel}>
                  End date
                </FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(value) =>
                      field.onChange(value ? value.toDate() : undefined)
                    }
                    slotProps={{
                      textField: {
                        sx: Styles.datePickerField,
                        error: !!fieldState.error,
                        helperText: fieldState.error?.message,
                      },
                    }}
                  />
                </LocalizationProvider>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="logo"
            render={({ field: { value, onChange, ref, ...fieldValues }, fieldState }) => (
              <FormControl error={!!fieldState.error}>
                <FormLabel component="label" sx={Styles.fieldLabel}>
                  Add a logo
                </FormLabel>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2, alignItems: "center" }}>
                  <Button
                    component="label"
                    variant="outlined"
                    sx={Styles.fileButton}
                  >
                    Choose file
                    <Box
                      component="input"
                      sx={Styles.visuallyHiddenInput}
                      {...fieldValues}
                      ref={ref}
                      type="file"
                      accept="image/*"
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
                </Box>
                {fieldState.error && (
                  <Typography
                    role="alert"
                    component="span"
                    sx={{ color: "error.main", fontSize: "0.875rem", mt: 0.5 }}
                  >
                    {fieldState.error.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field, fieldState }) => (
              <FormControl error={!!fieldState.error}>
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
                {fieldState.error && (
                  <Typography
                    role="alert"
                    component="span"
                    sx={{ color: "error.main", fontSize: "0.875rem", mt: 0.5 }}
                  >
                    {fieldState.error.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="duration"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                value={field.value ?? ""}
                type="number"
                label="Duration"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />
          <Controller
            control={control}
            name="category"
            render={({ field, fieldState }) => (
              <FormControl error={!!fieldState.error} fullWidth>
                <FormLabel
                  component="label"
                  htmlFor="category"
                  sx={Styles.fieldLabel}
                >
                  Category
                </FormLabel>
                <Box sx={Styles.selectWrap}>
                  <Box
                    component="select"
                    id="category"
                    {...field}
                    value={field.value ?? ""}
                    sx={Styles.nativeSelect}
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
                  <ExpandMoreIcon
                    fontSize="small"
                    aria-hidden
                    sx={Styles.selectIcon}
                  />
                </Box>
                {fieldState.error && (
                  <Typography
                    id="category-error"
                    role="alert"
                    component="span"
                    sx={{ color: "error.main", fontSize: "0.875rem", mt: 0.5 }}
                  >
                    {fieldState.error.message}
                  </Typography>
                )}
                {watch("category") === "new" && (
                  <Box sx={{ mt: 1 }}>
                    <Controller
                      control={control}
                      name="newCategory"
                      render={({ field: catField, fieldState: catState }) => (
                        <TextField
                          {...catField}
                          value={catField.value ?? ""}
                          label="New category"
                          placeholder="Enter new category"
                          error={!!catState.error}
                          helperText={catState.error?.message}
                          fullWidth
                        />
                      )}
                    />
                  </Box>
                )}
              </FormControl>
            )}
          />
          <Controller
            control={form.control}
            name="skills"
            render={({ fieldState }) => (
              <FormControl error={!!fieldState.error} component="fieldset">
                <FormLabel component="legend" sx={Styles.fieldLabel}>
                  Required Skills
                </FormLabel>
                <Box sx={Styles.skillsHeader}>
                  <Button
                    type="button"
                    onClick={handleSkillsDialogOpen}
                    sx={Styles.selectSkillsButton}
                  >
                    Select Skills
                  </Button>
                  <Box sx={Styles.skillsContainer}>
                    {selectedSkills &&
                      selectedSkills.map((skill) => (
                        <Chip
                          key={skill.skillId}
                          sx={Styles.skillChip}
                          label={skill.skillName}
                          onDelete={() => removeSkill(skill)}
                          deleteIcon={
                            <CloseIcon
                              aria-label={tA11y("remove_skill", {
                                skill: skill.skillName,
                              })}
                            />
                          }
                        />
                      ))}
                  </Box>
                </Box>
                {fieldState.error && (
                  <Typography
                    role="alert"
                    component="span"
                    sx={{ color: "error.main", fontSize: "0.875rem", mt: 0.5 }}
                  >
                    {fieldState.error.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
          <Dialog
            open={isSkillsDialogOpen}
            onClose={handleSkillsDialogClose}
            aria-labelledby="skills-dialog-title"
          >
            <DialogTitle id="skills-dialog-title" sx={Styles.dialogTitle}>
              Select Required Skills
              <IconButton
                aria-label={tA11y("close_dialog")}
                onClick={handleSkillsDialogClose}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={Styles.dialogContent}>
              <Box sx={Styles.dialogCheckboxes}>
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
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  size="small"
                />
                <Button
                  type="button"
                  onClick={handleNewSkillSubmit}
                  sx={Styles.addSkillButton}
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Button
                  type="button"
                  onClick={handleSkillsDialogClose}
                  sx={Styles.confirmButton}
                >
                  Confirm
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={16} color="inherit" aria-hidden />
              ) : undefined
            }
            sx={Styles.submitButton}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
