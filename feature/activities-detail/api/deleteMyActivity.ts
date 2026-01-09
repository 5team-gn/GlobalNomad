/**
 *
 *
 * @description 액티비티 상세 - 내가 만든 체험 삭제
 */

import axiosInstance from "@/lib/api/axios";

export async function deleteMyActivity(activityId: number): Promise<void> {
  // 팀아이디는 axiosInstance baseURL에 이미 포함되어 있다는 전제
  await axiosInstance.delete(`/my-activities/${activityId}`);
}
