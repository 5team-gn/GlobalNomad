import { useState } from "react";
import type { ExperienceFormValues } from "@/types/ExperienceForm.types";


export function useExperienceForm(initial?: Partial<ExperienceFormValues>) {
  const [values, setValues] = useState<ExperienceFormValues>({
    title: "",
    description: "",
    category: "",
    price: 0,
    address: "",
    bannerImageUrl: "",
    subImageUrls: [],
    schedules: [],
    ...initial,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  return { values, setValues, handleChange };
}
