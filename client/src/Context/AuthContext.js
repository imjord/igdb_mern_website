import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [navBar, setNavBar] = useState(true);

  const toggleLoggedIn = () => {
    localStorage.setItem("userLoggedIn", true);
  };
  const logout = () => {
    localStorage.removeItem("userLoggedIn");
  };

  return (
    <AuthContext.Provider
      value={{
        toggleLoggedIn,
        logout,
        setNavBar,
        navBar,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
