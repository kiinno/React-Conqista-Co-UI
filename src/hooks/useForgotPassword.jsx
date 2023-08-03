import { useContext } from "react";
import SystemContext from "../context";

const useForgotPassword = () => {
  const { setAuth, auth } = useContext(SystemContext);

  const forgot_password = async (body) => {
    setAuth({
      forgotPassword: {
        requested: false,
        email: null,
        loading: true,
        error: null,
        verify: {
          loading: false,
          code: null,
          error: null,
        },
        reset: {
          loading: false,
          error: null,
        },
      },
    });
    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/forgot_password",
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
          forgotPassword: {
            requested: true,
            email: body.email,
            loading: false,
            error: null,
            verify: {
              loading: false,
              code: null,
              error: null,
            },
            reset: {
              loading: false,
              error: null,
            },
          },
        });
        return { data, auth, response, body };
      } else {
        setAuth({
          forgotPassword: {
            requested: false,
            email: null,
            loading: false,
            error: data,
            verify: {
              loading: false,
              code: null,
              error: null,
            },
            reset: {
              loading: false,
              error: null,
            },
          },
        });
        return Promise.reject({ error: data, auth, response });
      }
    } catch (error) {
      setAuth({
        forgotPassword: {
          requested: false,
          email: null,
          loading: false,
          error: error,
          verify: {
            loading: false,
            code: null,
            error: null,
          },
          reset: {
            loading: false,
            error: null,
          },
        },
      });
      return Promise.reject({ error, auth });
    }
  };

  return { forgot_password, auth, setAuth };
};

export default useForgotPassword;
