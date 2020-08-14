import React, { createContext, useContext, useReducer, useEffect } from "react";
import nookies from "nookies";
import { getData, apiRoutes } from "../hooks/useRequest";
import { toast } from "react-toastify";
import { useModalContext } from "./ModalContext";
import { useRouter } from "next/router";
const INITIAL_AUTH = { isAuthenticated: false, jwtToken: null, user: {} };
const INITIAL_AUTH_ACTIONS = {
  login: ({ access_token, expires_in, type }) => {},
  logout: () => {},
  refresh: () => {},
};
const AuthContext = createContext(INITIAL_AUTH);

const AuthActions = createContext(INITIAL_AUTH_ACTIONS);

export const useAuth = () => {
  return useContext(AuthContext);
};
export const useAuthActions = () => {
  return useContext(AuthActions);
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, ...action.payload };
    case "logout":
      return { ...INITIAL_AUTH };
    case "refresh":
      return { ...state };
    default:
      throw new Error();
  }
};

export const loginRest = async (ctx = null) => {
  const { jwt } = nookies.get(ctx);
  if (!jwt) {
    return {};
  }
  return await getData(apiRoutes.profile.me, ctx)
    .then((user) => {
      console.log(user, "user");
      return { isAuthenticated: true, jwtToken: jwt, user };
    })
    .catch((e) => {
      console.log(e, "the error");
    });
};

export const AuthProvider = ({ children, INITIAL_STATE = null }) => {
  const [state, dispatch] = useReducer(
    authReducer,
    INITIAL_STATE || INITIAL_AUTH
  );
  const { closeModal } = useModalContext();
  const authActions = {
    login: ({ access_token, expires_in, type }) => {
      nookies.set(null, "jwt", access_token, {
        path: "/",
        maxAge: expires_in,
      });
      loginRest().then((e) => {
        toast("Welcome back, champ");
        dispatch({
          type: "login",
          payload: e,
        });
        closeModal();
      });
    },
    logout: (x) => {
      toast("See you later, bucko");
      nookies.destroy(null, "jwt");
      dispatch({ type: "logout" });
    },
    refresh: (z) => {},
  };
  return (
    <AuthContext.Provider value={state}>
      <AuthActions.Provider value={authActions}>
        {children}
      </AuthActions.Provider>
    </AuthContext.Provider>
  );
};

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/unauthorized");
    }
  }, []);
  return <></>;
};
