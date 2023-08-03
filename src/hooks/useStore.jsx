import { useContext, useEffect } from "react";
import SystemContext from "../context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useStore = () => {
  const system = useContext(SystemContext);
  const navigate = useNavigate();
  const getStore = async () => {
    try {
      system.updateStore({
        items: [],
        error: null,
        loading: true,
      });
      const response = await fetch("http://localhost:8000/api/store");
      const data = await response.json();
      if (response.status === 200) {
        system.updateStore({
          items: data.data,
          error: null,
          loading: false,
        });
        return data;
      } else {
        system.updateStore({
          items: [],
          error: data,
          loading: false,
        });
        return Promise.reject({ error: data, response });
      }
    } catch (error) {
      system.updateStore({
        items: [],
        error: error,
        loading: false,
      });
      return Promise.reject({ error });
    }
  };
  useEffect(() => {
    getStore().catch(({ error, response }) => {
      if (response && response.status === 401) navigate("/");
      toast.error(
        error.message ?? "Field to fetch, please check your internet connection"
      );
      return error;
    });
  }, []);
  return system.store;
};

export default useStore;
