"use client";

import ExperienceForm from "@/feature/Experience/form/ExperienceForm";

export default function RegisterActivityPage() {
  return (
    <main className="flex justify-center">
      <div className="mt-4">
        <ExperienceForm mode="create" />
      </div>
    </main>
  );
}
