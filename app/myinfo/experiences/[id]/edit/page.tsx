import ExperienceForm from "@/feature/Experience/ExperienceForm";
import { mapActivityToFormValues } from "@/adapters/activityToform.adapter";
import { notFound } from "next/navigation";
import { ApiError } from "@/lib/api/apiFetch";
import { getActivityDetail } from "@/feature/activities-detail/api/getActivityDetail";

export default async function EditExperiencePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const activityId = Number(id);

  if (isNaN(activityId)) notFound();

  let originalData;
  try {
    originalData = await getActivityDetail(activityId);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  const initialValues = mapActivityToFormValues(originalData);

  return (
    <main className="flex justify-center py-10">
      <div className="mt-4">
        <ExperienceForm
          mode="edit"
          initialValues={initialValues}
          originalData={originalData}
        />
      </div>
    </main>
  );
}
