"use client";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Chip } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import Styles from "./styles";

type SkillSelectorProps = {
  skillNames: string[];
  redirectUrl: string;
};

export default function SkillSelector({
  skillNames,
  redirectUrl,
}: SkillSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("A11y");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  useEffect(() => {
    const skills = searchParams.get("skills")?.split(",") || [];
    setSelectedSkills(skills);
  }, [searchParams]);

  const handleSkillClick = (skillName: string) => {
    let updatedSkills = [...selectedSkills];

    if (updatedSkills.includes(skillName)) {
      updatedSkills = updatedSkills.filter((skill) => skill !== skillName);
    } else {
      updatedSkills.push(skillName);
    }

    setSelectedSkills(updatedSkills);

    const params = new URLSearchParams(window.location.search);

    if (updatedSkills.length > 0) {
      params.set("skills", updatedSkills.join(","));
    } else {
      params.delete("skills");
    }

    router.push(`${redirectUrl}?${params.toString()}`);

    localStorage.setItem("selectedSkills", updatedSkills.join(","));
  };

  return (
    <Box sx={Styles.container}>
      {skillNames.map((skill) => {
        const isSelected = selectedSkills.includes(skill);
        return (
          <Chip
            key={skill}
            label={skill}
            clickable
            onClick={() => handleSkillClick(skill)}
            aria-pressed={isSelected}
            // Selected chips expose a delete (X) action (≥24px target) that
            // toggles the skill off, matching the previous toggle behaviour.
            onDelete={isSelected ? () => handleSkillClick(skill) : undefined}
            deleteIcon={
              isSelected ? (
                <CancelIcon aria-label={t("remove_skill", { skill })} />
              ) : undefined
            }
            sx={[Styles.chip, isSelected ? Styles.chipSelected : Styles.chipUnselected]}
          />
        );
      })}
    </Box>
  );
}
