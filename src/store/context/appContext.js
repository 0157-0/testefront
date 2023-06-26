import {
    useState,
    useEffect,
    useReducer,
    
    useCallback,
  } from "react";
  
import { useUser } from "hooks/useUser";
import { userReducers } from "reducers/user.reducer";
import { Cookies } from "infra/cookies";
import { createContext } from "react";
  
  export const AppContext = createContext(null);
  
  /**
   * @description Context API
   * @param {ReactNode} children
   * @type {React.FC}
   * @returns {JSX}
   */
  export const AppProvider = ({ children }) => {

    const [user, userDispatch] = useReducer(userReducers, { logged: false });
    const [ready, setReady] = useState(false);
    const { user: userData, userRefresh } = useUser(user._id);
    console.log("AppProvider", user);

    const onAuth = useCallback(() => {
      const user = Cookies.get("ST$S");
  
   
      if (!!user) {
        userDispatch({
          type: "UPDATE_USER",
          payload: {
            ...user,
            logged: true,
          },
        });
      } else if (!!window && window.location.href.includes("dashboard")) {
        userDispatch({
          type: "LOGOUT_USER",
        });
        window.location.href = "/";
      }
  
      setReady(true);
    }, []);
  
    useEffect(() => {
      onAuth();
    }, []);
  
    useEffect(() => {
      user.logged && userRefresh();
    }, [user]);
  
    if (!ready) return null;
  
    return (
      <AppContext.Provider
        value={{
          user: { ...user, dispatch: userDispatch, onAuth },
          userData,
          userRefresh,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  };
  