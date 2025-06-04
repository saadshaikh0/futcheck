import instance from "./axiosclient";

export const loginUser = async (payload) => {
  const response = await instance.post("/api/token/", payload);
  return response.data;
};

export const registerUser = async (payload) => {
  const response = await instance.post("/api/register/", payload);
  return response.data;
};

export const verifyGoogleToken = async (payload) => {
  const response = await instance.post("/api/token/google/", payload);
  return response.data;
};
