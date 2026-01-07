import { getActivityReviews } from "@/feature/activities-detail/api/getActivityDetail";
import { NextResponse } from "next/server";

// type RouteContext = {
//   params: Promise<{ id: string }>;
// };

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page") ?? "1");
  const size = Number(url.searchParams.get("size") ?? "3");

  const activityId = Number(id);
  if (!Number.isFinite(activityId)) {
    return NextResponse.json(
      { message: "Invalid activityId" },
      { status: 400 }
    );
  }

  const data = await getActivityReviews(activityId, page, size);
  return NextResponse.json(data);
}
