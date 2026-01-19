const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface GetMyActivitiesParams {
    
  cursorId?: number;
  size?: number;
}

export const getMyActivities = async ({
  cursorId,
  size = 20,
}: GetMyActivitiesParams = {}) => {
  const query = new URLSearchParams();
  if (cursorId) query.append("cursorId", cursorId.toString());
  query.append("size", size.toString());

  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const response = await fetch(
    `${BASE_URL}/${TEAM_ID}/my-activities?${query.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "내 체험 리스트를 불러오는데 실패했습니다.");
  }

  return response.json();
};