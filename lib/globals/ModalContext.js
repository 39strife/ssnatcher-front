import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { ExitIcon } from "../../styles/icons/index";
import { useSpring, a } from "react-spring";
import useOutside from "../hooks/useOutside";
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
  const { setRegister } = useModalContext();
  return (
    <>
      <form>
        <div className="modal-title">
          <h2>Login</h2>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email or username</label>
          <input
            autoComplete="off"
            id="email"
            type="text"
            name="username"
            placeholder="your@email.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            autoComplete="off"
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
          Don't have an account?{" "}
          <button className="link" onClick={() => setRegister(true)}>
            Sign up!
          </button>
        </p>
      </div>
    </>
  );
};

const ModalRegister = () => {
  const { setLogin } = useModalContext();
  return (
    <>
      <form>
        <div className="modal-title">
          <h2>Register</h2>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            autoComplete="off"
            id="email"
            type="text"
            name="email"
            placeholder="your@email.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            autoComplete="off"
            id="username"
            type="text"
            name="username"
            placeholder="fgcChampion"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            autoComplete="off"
            id="password"
            type="password"
            placeholder="y0uRpA55w0rD"
            name="password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirmation">Password (confirmation)</label>
          <input
            autoComplete="off"
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
          Already have an account?{" "}
          <button className="link" onClick={() => setLogin(true)}>
            Login!
          </button>
        </p>
      </div>
    </>
  );
};

const Modal = ({ open, children }) => {
  const { closeModal } = useModalContext();
  const [showContent, setShow] = useState(false);
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
  const bodyRef = useRef();
  useEffect(() => {
    if (open) {
      setShow(true);
    } else {
      setTimeout(() => {
        setShow(false);
      }, 2000);
    }
  }, [open]);
  useOutside(bodyRef, () => (open ? closeModal() : null));
  return (
    showContent && (
      <a.div className="modal" style={style}>
        <div ref={bodyRef} className="modal-body">
          <div className="modal-exit">
            <button onClick={closeModal}>
              <ExitIcon />
            </button>
          </div>
          {children}
        </div>
      </a.div>
    )
  );
};

export const ModalProvider = ({ children }) => {
  const [{ login, register }, setState] = useState({
    login: false,
    register: false,
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
