import { useContext } from "react";
import SystemContext from "../context";

const useVerifyResetCode = () => {
  const { setAuth, auth } = useContext(SystemContext);

  const verifyResetCode = async (code) => {
    setAuth({
      forgotPassword: {
        ...auth.forgotPassword,
        verify: {
          loading: true,
          code: code,
          error: null,
          verified: false,
        },
      },
    });
    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/verify_reset_code",
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code, email: auth.forgotPassword.email }),
          method: "POST",
        }
      );

      if (response.status === 200) {
        setAuth({
          forgotPassword: {
            ...auth.forgotPassword,
            verify: {
              loading: false,
              code: code,
              error: null,
              verified: true,
            },
          },
        });
        return {
          data: { code, email: auth.forgotPassword.email },
          auth,
          response,
          code,
        };
      } else {
        const data = await response.json();
        setAuth({
          forgotPassword: {
            ...auth.forgotPassword,
            verify: {
              loading: false,
              code: code,
              error: data,
              verified: false,
            },
          },
        });
        return Promise.reject({ error: data, auth, response });
      }
    } catch (error) {
      setAuth({
        forgotPassword: {
          verify: {
            loading: false,
            code: code,
            error,
            verified: false,
          },
        },
      });
      return Promise.reject({ error, auth });
    }
  };

  return { verifyResetCode, auth, setAuth };
};

export default useVerifyResetCode;
