import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleLoggedIn = () => {
    setLoggedIn(true);
    const userLoggedIn = localStorage.setItem("userLoggedIn", true);
  };
  const logout = () => {
    setLoggedIn(false);
    const loggedOut = localStorage.setItem("userLoggedIn", false);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        toggleLoggedIn,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
