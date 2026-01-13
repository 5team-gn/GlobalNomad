// app/(main)/myactivities/[id]/edit/page.tsx  (SERVER)
import ExperienceForm from "@/feature/Experience/form/ExperienceForm";
import { mapActivityToFormValues } from "@/adapters/activityToform.adapter";
import { notFound } from "next/navigation";
import { ApiError } from "@/lib/api/apiFetch";
import { getMyActivityDetail } from "@/feature/MyInfo/api/getMyActivityDetail";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activityId = Number(id);

  if (isNaN(activityId)) notFound();

  let originalData;
  try {
    originalData = await getMyActivityDetail(activityId);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) notFound();
    throw e;
  }

  const initialValues = mapActivityToFormValues(originalData);

  return (
    <div className="flex justify-center py-10">
      <ExperienceForm
        mode="edit"
        initialValues={initialValues}
        originalData={originalData}
      />
    </div>
  );
}
