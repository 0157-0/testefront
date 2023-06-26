import { Cookies } from "infra/cookies";

export const userReducers = (state, action) => {
  switch (action.type) {
    case "HANDLE_USER":
      Cookies.set("ST$S", action.payload, {
        expires: 10,
      });
      return {
        ...state,
        ...action.payload,
      };

    case "UPDATE_USER":
      return { ...state, ...action.payload };

    case "LOGOUT":
      Cookies.remove("ST$S");
      Cookies.remove("ST$F");
      return {
        logged: false,
      };

    default:
      throw new Error();
  }
};
