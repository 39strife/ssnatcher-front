import React, { createContext, useContext, useState, useEffect } from "react";
import { ExitIcon } from "../../styles/icons/index";
import { useSpring, a } from "react-spring";
const ModalContext = createContext({
  login: false,
  register: false,
  setLogin: (on = Boolean) => {},
  setRegister: (on = Boolean) => {},
  closeModal: () => {},
});

export const useModalContext = () => {
  return useContext(ModalContext);
};

const ModalLogin = () => {
  return (
    <>
      <form>
        <div className="modal-title">
          <h2>Login</h2>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email or username</label>
          <input
            id="email"
            type="text"
            name="username"
            placeholder="your@email.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="y0uRpA55w0rD"
            name="password"
          />
        </div>
        <div className="form-group m-b-0">
          <button className="btn">Login</button>
        </div>
      </form>
      <div className="form-group m-b-0">
        <p className="m-b-0 text-center">
          Don't have an account? <button className="link">Sign up!</button>
        </p>
      </div>
    </>
  );
};

const ModalRegister = () => {
  return (
    <>
      <form>
        <div className="modal-title">
          <h2>Login</h2>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="your@email.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="fgcChampion"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="y0uRpA55w0rD"
            name="password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirmation">Password (confirmation)</label>
          <input
            id="password_confirmation"
            type="password_confirmation"
            placeholder="y0uRpA55w0rD"
            name="password_confirmation"
          />
        </div>
        <div className="form-group"></div>
        <div className="form-group m-b-0">
          <button className="btn">Register</button>
        </div>
      </form>
      <div className="form-group m-b-0">
        <p className="m-b-0 text-center">
          Already have an account? <button className="link">Login!</button>
        </p>
      </div>
    </>
  );
};

const Modal = ({ open, children }) => {
  const { closeModal } = useModalContext();
  const style = useSpring({
    to: async (next, cancel) => {
      if (open) {
        await next({
          opacity: 1,
          transform: "translate(0%,0%)",
          display: "flex",
        });
      } else {
        await next({ opacity: 0, transform: "translate(0%,50%)" });
        await next({ display: "none" });
      }
    },
    from: { opacity: 0, transform: "translate(0%,50%)", display: "none" },
  });
  return (
    <a.div className="modal" style={style}>
      <div className="modal-body">
        <div className="modal-exit">
          <button onClick={closeModal}>
            <ExitIcon />
          </button>
        </div>
        {children}
      </div>
    </a.div>
  );
};

export const ModalProvider = ({ children }) => {
  const [{ login, register }, setState] = useState({
    login: false,
    register: true,
  });
  useEffect(() => {
    if (login || register) {
      document.body.classList.add("blocker");
    } else {
      document.body.classList.remove("blocker");
    }
  }, [login, register]);
  return (
    <ModalContext.Provider
      value={{
        login,
        register,
        closeModal: () =>
          setState({
            login: false,
            register: false,
          }),
        setLogin: (on) => {
          setState((state) => ({ register: false, login: on }));
        },
        setRegister: (on) => {
          setState((state) => ({ login: false, register: on }));
        },
      }}
    >
      <Modal open={login}>
        <ModalLogin />
      </Modal>
      <Modal open={register}>
        <ModalRegister />
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};
