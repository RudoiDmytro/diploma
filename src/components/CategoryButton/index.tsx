"use client";
import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import Styles from "./styles";

type CategoryButtonProps = {
  category: Category;
  redirectUrl: string;
  className?: string;
  sx?: SxProps<Theme>;
};

export default function CategoryButton({
  category,
  redirectUrl,
  className,
  sx,
}: CategoryButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const selectedCategory = localStorage.getItem("selectedCategory");
    setIsSelected(selectedCategory === category.naming);
  }, [category.naming, searchParams]);

  const handleCategoryClick = () => {
    if (isSelected) {
      localStorage.removeItem("selectedCategory");
    } else {
      localStorage.setItem("selectedCategory", category.naming);
    }
    setIsSelected(!isSelected);

    const params = new URLSearchParams(window.location.search);
    if (isSelected) {
      params.delete("category");
    } else {
      params.set("category", category.naming);
    }
    router.push(`${redirectUrl}?${params.toString()}`);
  };

  return (
    <Box
      component="button"
      type="button"
      aria-pressed={isSelected}
      onClick={handleCategoryClick}
      className={className}
      sx={[
        isSelected ? Styles.selected : Styles.unselected,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <span>{category.naming}</span>
    </Box>
  );
}
