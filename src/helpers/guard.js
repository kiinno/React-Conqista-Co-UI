import { useContext, useEffect, useState } from "react";
import SystemContext from "../context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function guard(
  Component,
  options = {},
  redirectTo = "/",
  message
) {
  return (props) => {
    const { auth } = useContext(SystemContext);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const data = {
        isAuthenticated: auth.isAuthenticated ?? false,
        isAdmin: auth.user.isAdmin ?? false,
        requested: auth.forgotPassword.requested ?? false,
        verified: auth.forgotPassword.verify.verified ?? false,
      };
      if (
        auth.tokenLogin.init &&
        Object.keys(options).some((key) => options[key] !== data[key])
      ) {
        setShow(false);
        navigate(redirectTo);
        if (message) toast.error(message);
      } else setShow(true);
    }, [auth, navigate]);

    // useEffect(() => {
    //   if (requested) {
    //     if (auth.forgotPassword.requested === requested) {
    //       setShow(true);
    //     } else {
    //       setShow(false);
    //       navigate(redirectTo);
    //       if (message) toast.error(message);
    //     }
    //   } else {
    //     if (auth.isAuthenticated === authenticated) {
    //       if (isAdmin && auth.user.isAdmin !== isAdmin) {
    //         if (auth.tokenLogin.init) {
    //           setShow(false);
    //           navigate(redirectTo);
    //           if (message) toast.error(message);
    //         }
    //       } else setShow(true);
    //     } else {
    //       if (auth.tokenLogin.init) {
    //         setShow(false);
    //         navigate(redirectTo);
    //         if (message) toast.error(message);
    //       }
    //     }
    //   }
    // }, [auth, navigate]);

    return show ? <Component {...props} /> : <></>;
  };
}
