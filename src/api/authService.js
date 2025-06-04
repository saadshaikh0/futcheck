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

export const refreshAccessToken = async (refreshToken) => {
  const response = await instance.post("/api/token/refresh/", {
    refresh: refreshToken,
  });
  return response.data;
};

export const fetchUserInfoBearer = async (accessToken) => {
  const response = await instance.get("/api/token/info/", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
