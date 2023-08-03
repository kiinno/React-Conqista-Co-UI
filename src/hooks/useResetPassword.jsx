import { useContext } from "react";
import SystemContext from "../context";

const useResetPassword = () => {
  const { setAuth, auth } = useContext(SystemContext);

  const resetPassword = async (body) => {
    setAuth({
      forgotPassword: {
        ...auth.forgotPassword,
        reset: {
          loading: true,
          error: null,
        },
      },
    });
    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/reset_password",
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          method: "POST",
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setAuth({
          isAuthenticated: true,
          user: data.user,
          token: data.token,
          forgotPassword: {
            requested: false,
            email: null,
            loading: false,
            error: null,
            verify: {
              loading: false,
              code: null,
              error: null,
              verified: false,
            },
            reset: {
              loading: false,
              error: null,
            },
          },
        });
        return { data, auth, response };
      } else {
        setAuth({
          forgotPassword: {
            ...auth.forgotPassword,
            reset: {
              loading: false,
              error: data,
            },
          },
        });
        return Promise.reject({ error: data, auth, response });
      }
    } catch (error) {
      setAuth({
        forgotPassword: {
          ...auth.forgotPassword,
          reset: {
            loading: false,
            error: error,
          },
        },
      });
      return Promise.reject({ error, auth });
    }
  };

  return { resetPassword, auth, setAuth };
};

export default useResetPassword;
