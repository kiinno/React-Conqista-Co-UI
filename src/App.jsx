import React, { useContext, useEffect, useState } from "react";
import useTokenLogin from "./hooks/useTokenLogin";
import { ToastContainer, toast } from "react-toastify";
import SystemContext from "./context";
import Loader from "./components/Loader/Loader";

const App = ({ children }) => {
  const { tokenLogin, auth, setAuth } = useTokenLogin();
  const system = useContext(SystemContext);

  useEffect(() => {
    const token = window.localStorage.getItem("__token");
    if (token && !auth.isAuthenticated)
      tokenLogin(token).catch((err) => {
        toast.error(err.message);
      });
    else {
      setAuth({
        isAuthenticated: false,
        user: {},
        token: null,
        tokenLogin: {
          loading: false,
          error: null,
          init: true,
        },
        error: null,
      });
    }
  }, []);

  return (
    <>
      {children}
      {auth.tokenLoginLoading && <Loader />}
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme={system.ui.theme}
        className={"text-capitalize"}
      />
    </>
  );
};

export default App;
