"use client";
import { Category, Skill } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type CategoryButtonProps = {
  category: Category;
  redirectUrl: string;
};

export default function CategoryButton({
  category,
  redirectUrl,
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

    const searchParams = new URLSearchParams(window.location.search);
    if (isSelected) {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category.naming);
    }
    router.push(`${redirectUrl}?${searchParams.toString()}`);
  };

  return (
    <button
      type="button"
      id="badge-red"
      onClick={handleCategoryClick}
      className={`inline-block text-center rounded-lg ${
        isSelected ? "gradient2" : "gradient1"
      }  text-background text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-foreground`}
    >
      <span>{category.naming}</span>
    </button>
  );
}
