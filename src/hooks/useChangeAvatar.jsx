import { useContext } from "react";
import SystemContext from "../context";

const useChangeAvatar = () => {
  const { setAuth, auth } = useContext(SystemContext);

  const changeAvatar = async (formData) => {
    setAuth({
      changeAvatarLoading: true,
      changeAvatarError: null,
    });
    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/update_logged_avatar",
        {
          headers: {
            Authorization: auth.token,
          },
          body: formData,
          method: "POST",
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setAuth({
          user: data.user,
          changeAvatarLoading: false,
          changeAvatarError: null,
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
        changeAvatarLoading: false,
        changeAvatarError: error,
      });
      return Promise.reject({ error, auth });
    }
  };

  return { changeAvatar, auth, setAuth };
};

export default useChangeAvatar;
