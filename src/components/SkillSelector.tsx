"use client";
import { Skill } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

    const searchParams = new URLSearchParams(window.location.search);

    if (updatedSkills.length > 0) {
      searchParams.set("skills", updatedSkills.join(","));
    } else {
      searchParams.delete("skills");
    }

    router.push(`${redirectUrl}?${searchParams.toString()}`);

    localStorage.setItem("selectedSkills", updatedSkills.join(","));
  };

  return (
    <div className="flex flex-wrap justify-between">
      {skillNames.map((skill) => (
        <button
          key={skill}
          onClick={() => handleSkillClick(skill)}
          type="button"
          className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium text-background  ${
            selectedSkills.includes(skill) ? "gradient2" : "gradient1"
          }`}
        >
          {skill}
        </button>
      ))}
    </div>
  );
}
