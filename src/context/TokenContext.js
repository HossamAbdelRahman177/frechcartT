import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export let UserContext = createContext();

export function UserContextProvider({ children }) {
  let [UserData, SetUserData] = useState({});
  useEffect(() => {
    let data = localStorage.getItem("user");
    if (data) {
      console.log(data);
      SetUserData(JSON.parse(data));
    }
  }, []);
  return (
    <UserContext.Provider value={{ SetUserData, UserData }}>
      {children}
    </UserContext.Provider>
  );
}
