import { useContext } from "react";
import SystemContext from "../context";

const useSignup = () => {
  const { setAuth, auth } = useContext(SystemContext);

  const signup = async (body) => {
    setAuth({
      isAuthenticated: false,
      user: {},
      token: null,
      signup: { loading: true, error: null },
    });
    try {
      const response = await fetch("http://localhost:8000/api/auth/signup", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        method: "POST",
      });
      const data = await response.json();
      if (response.status === 200) {
        setAuth({
          isAuthenticated: true,
          user: data.user,
          token: data.token,
          signup: { loading: false, error: null },
        });
        return { data, auth, response };
      } else {
        setAuth({
          signup: { loading: false, error: data },
        });
        return Promise.reject({ error: data, auth, response });
      }
    } catch (error) {
      console.log(error);
      setAuth({
        isAuthenticated: false,
        user: {},
        token: null,
        signup: { loading: false, error },
      });
      return Promise.reject({ error, auth });
    }
  };

  return { signup, auth, setAuth };
};

export default useSignup;
