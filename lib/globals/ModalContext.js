import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext({
  login: false,
  register: false,
  setLogin: (on = Boolean) => {},
  setRegister: (on = Boolean) => {},
});

export const useModalContext = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [{ login, register }, setState] = useState({
    login: false,
    register: false,
  });
  return (
    <ModalContext.Provider
      value={{
        login,
        register,
        setLogin: (on) => {
          setState((state) => ({ ...state, login: on }));
        },
        setRegister: (on) => {
          setState((state) => ({ ...state, register: on }));
        },
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
