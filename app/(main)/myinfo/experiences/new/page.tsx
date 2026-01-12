"use client";

import ExperienceForm from "@/feature/Experience/ExperienceForm";

export default function NewExperiencePage() {
  return (
    <main className="flex justify-center">
      <div className="mt-4">
        <ExperienceForm mode="create" />
      </div>
    </main>
  );
}
