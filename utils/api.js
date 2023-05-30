import axios from "axios";

const nodelogin = axios.create({
  baseURL: "https://nodelogin-sgpy.onrender.com",
});

export const postNewUser = async (email, password) => {
  const postbody = {
    email: email,
    password: password,
  };
  const result = await nodelogin.post("/signup", postbody);
  return result.data.message;
};

export const signinUser = async (email, password) => {
  const body = {
    email: email,
    password: password,
  };
  const result = await nodelogin.post("/signin", body);
  return result.data.token;
};

export const allUsers = async () => {
  const result = await nodelogin.get("/users", {
    headers: { authorization: `Bearer ${sessionStorage.getItem("TOKEN")}` },
  });
  return result.data.users;
};

export const userProfile = async () => {
  const result = await nodelogin.get("/user", {
    headers: { authorization: `Bearer ${sessionStorage.getItem("TOKEN")}` },
  });
  return result.data.profile;
};

export const uploadPhoto = async (image) => {
  const result = await nodelogin.post("/user/photo", image, {
    headers: { authorization: `Bearer ${sessionStorage.getItem("TOKEN")} ` },
  });
  return result.data.message;
};

export const userPhoto = async () => {
  const result = await nodelogin.get("/user/photo", {
    headers: { authorization: `Bearer ${sessionStorage.getItem("TOKEN")}` },
  });
  return result.data;
};

export const changeProfile = async (updateProfile) => {
  const result = await nodelogin.patch("/user/profile", updateProfile, {
    headers: { authorization: `Bearer ${sessionStorage.getItem("TOKEN")}` },
  });
  return result.data.message;
};
