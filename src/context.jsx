import { createContext, useState } from "react";
import { toast } from "react-toastify";

const SystemContext = createContext({});

export const SystemProvider = ({ children }) => {
  const [systemState, setSystemState] = useState({
    ui: {
      theme: window.localStorage.getItem("theme") ?? "light",
      settingsDrawer: false,
    },
    auth: {
      isAuthenticated: false,
      user: {},
      token: null,
      loading: false,
      error: null,
      tokenLogin: {
        loading: false,
        error: null,
        init: false,
      },
      signup: {
        loading: false,
        error: null,
      },
      changeAvatarLoading: false,
      changeAvatarError: null,
      updateUserLoading: false,
      updateUserError: null,

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
    },
    store: {
      items: [],
      error: null,
      loading: false,
    },
  });

  const toggleTheme = () => {
    let theme;
    setSystemState((prev) => {
      theme = prev.ui.theme === "light" ? "dark" : "light";
      window.localStorage.setItem("theme", theme);
      return {
        ...prev,
        ui: { ...prev.ui, theme },
      };
    });
    toast.info(`Dark Mode Is ${theme === "dark" ? "On" : "Off"}`);
  };

  const updateStore = (data) =>
    setSystemState((prev) => ({
      ...prev,
      store: { ...data },
    }));

  const setAuth = (data) => {
    setSystemState((prev) => ({
      ...prev,
      auth: { ...prev.auth, ...data },
    }));
    if (data.token) window.localStorage.setItem("__token", data.token);
  };

  const toggleDettingsDrawer = () =>
    setSystemState((prev) => ({
      ...prev,
      ui: { ...prev.ui, settingsDrawer: !prev.ui.settingsDrawer },
    }));

  const logout = () => {
    setSystemState((prev) => ({
      ...prev,
      auth: {
        isAuthenticated: false,
        user: {},
        token: null,
        loading: false,
        error: null,
        tokenLogin: {
          loading: false,
          error: null,
          init: true,
        },
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
      },
    }));
    window.localStorage.removeItem("__token");
  };

  return (
    <SystemContext.Provider
      value={{
        ...systemState,
        toggleTheme,
        logout,
        toggleDettingsDrawer,
        setSystemState,
        updateStore,
        setAuth,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export default SystemContext;
