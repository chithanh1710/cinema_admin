import { createContext, ReactNode, useContext, useState } from "react";

const loginContext = createContext<
  | {
      isAuthenticated: boolean;
      username: string;
      password: string;
      errorUsername: string;
      errorPassword: string;

      setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
      setUsername: React.Dispatch<React.SetStateAction<string>>;
      setPassword: React.Dispatch<React.SetStateAction<string>>;
      checkLogin(): boolean;
    }
  | undefined
>(undefined);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const token = import.meta.env.VITE_LOGIN_TOKEN as string;
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("token") == token
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  function checkLogin() {
    if (username != "admin") {
      setErrorUsername("Tài khoản không đúng");
    }
    if (password != "123456") {
      setErrorPassword("Mật khẩu không đúng");
    }
    if (
      sessionStorage.getItem("token") == token ||
      (username == "admin" && password == "123456")
    ) {
      setIsAuthenticated(true);
      if (!sessionStorage.getItem("token")) {
        sessionStorage.setItem("token", token);
      }
      return true;
    } else {
      setIsAuthenticated(false);
      return false;
    }
  }

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    username,
    setUsername,
    password,
    setPassword,
    checkLogin,
    errorUsername,
    errorPassword,
  };
  return (
    <loginContext.Provider value={value}>{children}</loginContext.Provider>
  );
};

export function useLogin() {
  const context = useContext(loginContext);
  if (!context) throw new Error("Login Context nằm ngoài phạm vi truy cập");

  return context;
}
