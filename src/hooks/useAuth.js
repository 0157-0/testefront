import { useContext } from "react";
import { AppContext } from "store/context/appContext";

export function useAuth() {
  const context = useContext(AppContext);
  // console.log("useAuth", context)
  return context ?? "oi";
}
