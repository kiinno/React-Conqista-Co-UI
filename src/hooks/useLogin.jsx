import { useContext } from "react";
import SystemContext from "../context";

const useLogin = () => {
  const { setAuth, auth } = useContext(SystemContext);

  const login = async (authentication) => {
    setAuth({
      isAuthenticated: false,
      user: {},
      token: null,
      loading: true,
      error: null,
    });
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authentication),
        method: "POST",
      });
      const data = await response.json();
      if (response.status === 200) {
        const success = {
          isAuthenticated: true,
          user: data.user,
          token: data.token,
          loading: false,
          error: null,
        };
        setAuth(success);
        return { data, auth, response };
      } else {
        const failed = {
          isAuthenticated: false,
          user: {},
          token: null,
          loading: false,
          error: data,
        };
        setAuth(failed);
        return Promise.reject({ error: data, auth, response });
      }
    } catch (error) {
      console.log(error);
      setAuth({
        isAuthenticated: false,
        user: {},
        token: null,
        loading: false,
        error: error,
      });
      return Promise.reject({ error, auth });
    }
  };

  return { login, auth, setAuth };
};

export default useLogin;
