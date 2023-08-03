import { useContext } from "react";
import SystemContext from "../context";

const useUpdateUserData = () => {
  const { setAuth, auth } = useContext(SystemContext);

  const updateUserData = async (updates) => {
    setAuth({
      updateUserLoading: true,
      updateUserError: null,
    });
    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/update_logged_user",
        {
          headers: {
            // "Content-Type": "application/json",
            Authorization: auth.token,
          },
          body: updates,
          method: "POST",
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setAuth({
          user: data.user,
          updateUserLoading: false,
          updateUserError: null,
        });
        return { data, auth, response };
      } else {
        setAuth({
          changeAvatarLoading: false,
          changeAvatarError: data,
        });
        return Promise.reject({ error: data, auth, response });
      }
    } catch (error) {
      setAuth({
        updateUserLoading: true,
        updateUserError: error,
      });
      return Promise.reject({ error, auth });
    }
  };

  return { updateUserData, auth, setAuth };
};

export default useUpdateUserData;
