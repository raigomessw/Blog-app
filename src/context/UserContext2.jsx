import { createContext, useState } from "react";

// Skapa en ny kontext
export const UserContext2 = createContext();

export const UserProvider = (props) => {
  const [userName, setUserName] = useState("John Doe");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <UserContext2.Provider value={{ userName, setUserName, isLoggedIn }}>
      {props.children}
    </UserContext2.Provider>
  );
};
