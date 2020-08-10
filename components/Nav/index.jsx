import React from "react";
import { MagnifyingGlass, Profile, Enter, CheckMark } from "../../styles/icons";
import NavSidebar from "./NavSidebar";
import Dropdown from "./Dropdown";
import { useModalContext } from "../../lib/globals/ModalContext";

export default function Nav() {
  const { setLogin, setRegister } = useModalContext();
  return (
    <nav>
      <div className="background"></div>
      <div className="nav">
        <div className="brand">
          <div className="brand-logo">
            <img src="" />
          </div>
          <div className="brand-text">
            <h4>String Snatcher</h4>
          </div>
        </div>
        <div className="sides">
          <div className="search">
            <MagnifyingGlass />
            <input type="text" placeholder="Search..." />
          </div>
          <div className="profile m-l-2">
            <Dropdown
              links={[
                {
                  label: "Login",
                  props: {
                    onClick: () => setLogin(true),
                  },
                  icon: Enter,
                },
                {
                  label: "Register",
                  props: { onClick: () => setRegister(true) },
                  icon: CheckMark,
                },
              ]}
            >
              {(props) => {
                return (
                  <button {...props}>
                    <Profile />
                  </button>
                );
              }}
            </Dropdown>
          </div>
          <div className="burger m-l-2">
            <NavSidebar />
          </div>
        </div>
      </div>
    </nav>
  );
}
