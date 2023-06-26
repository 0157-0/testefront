import api from "./api";

const login = async ( email, password ) => {
  return await api.post("/auth/authenticate", {
    email,
    password,
  });
};

export const sessionService = { login };


