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
import { makeClasses } from "../helpers";
import { ModalLogin } from "../../components/Modals/ModalLogin";
import { ModalRegister } from "../../components/Modals/ModalRegister";
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

export const Modal = ({ open, children }) => {
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
      }, 400);
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
        closeModal: () => {
          setState({
            login: false,
            register: false,
          });
        },
        setLogin: (on) => {
          console.log(on, "login");
          if (on !== login) {
            setState((state) => ({ register: false, login: on }));
          }
        },
        setRegister: (on) => {
          console.log(on, "register");
          if (on !== register) {
            setState((state) => ({ login: false, register: on }));
          }
        },
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
