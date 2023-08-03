import { useContext } from "react";
import SystemContext from "../context";

const useTokenLogin = () => {
  const { auth, setAuth } = useContext(SystemContext);

  const tokenLogin = async (token) => {
    setAuth({
      isAuthenticated: true,
      user: {},
      token: null,
      loading: false,
      error: null,
      tokenLogin: {
        loading: true,
        error: null,
        init: false,
      },
    });
    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/logged_user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setAuth({
          isAuthenticated: true,
          user: data.user,
          token: token,
          tokenLogin: {
            loading: false,
            error: null,
            init: true,
          },
          error: null,
        });
        return { data, response, auth };
      } else {
        setAuth({
          isAuthenticated: false,
          user: {},
          token: null,
          tokenLogin: {
            loading: false,
            error: data,
            init: true,
          },
          error: null,
        });
        return Promise.reject({ error: data, response, auth });
      }
    } catch (error) {
      setAuth({
        isAuthenticated: false,
        user: {},
        token: null,
        tokenLoginLoading: false,
        tokenLogin: {
          loading: false,
          error,
          init: true,
        },
        error: null,
      });
      return Promise.reject(error);
    }
  };
  return { tokenLogin, auth, setAuth };
};

export default useTokenLogin;
