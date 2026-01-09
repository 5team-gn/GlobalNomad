import instance from "./client"; 

export const uploadProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

  const response = await instance.post(`${TEAM_ID}/users/me/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};