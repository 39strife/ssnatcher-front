import React, { useState, useRef } from "react";
import { MagnifyingGlass, Profile, Enter, CheckMark } from "../../styles/icons";
import NavSidebar from "./NavSidebar";
import Dropdown from "./Dropdown";
import { useModalContext } from "../../lib/globals/ModalContext";
import { makeClasses } from "../../lib/helpers";
import Link from "next/link";
export default function Nav() {
  const { setLogin, setRegister } = useModalContext();
  const [focus, setFocus] = useState(false);
  const searchRef = useRef();
  return (
    <nav>
      <div className="background"></div>
      <div className="nav">
        <Link href="/">
          <a className="brand">
            <div className="brand-logo">
              <img src="" />
            </div>
            <div className="brand-text">
              <h4>String Snatcher</h4>
            </div>
          </a>
        </Link>
        <div className={makeClasses("sides", focus && "focused")}>
          <div className="search">
            <MagnifyingGlass />
            <input
              ref={searchRef}
              onFocus={() => setFocus(true)}
              onBlur={() => {
                setFocus(false);
                console.log(searchRef.current);
                searchRef.current.value = "";
              }}
              type="text"
              placeholder="Search..."
            />
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
