import React, { useState, useRef } from "react";
import {
  Burger,
  ExitIcon,
  Enter,
  CheckMark,
  GameIcon,
  LinkIcon,
} from "../../styles/icons";
import { makeClasses } from "../../lib/helpers";
import { useSpring, a } from "react-spring";
import useOutside from "../../lib/hooks/useOutside";
import { useModalContext } from "../../lib/globals/ModalContext";

export default function NavSidebar() {
  const [open, setOpen] = useState(false);
  const { setLogin, setRegister } = useModalContext();
  const spring = useSpring({
    to: async (next, cancel) => {
      if (open) {
        await next({ transform: "translate(0%,0%)", display: "block" });
      } else {
        await next({ transform: "translate(100%,0%)" });
        await next({ display: "none" });
      }
    },
  });
  const sidebarRef = useRef();
  useOutside(sidebarRef, () => open && setOpen(false));
  return (
    <>
      <button onClick={() => setOpen(!open)}>
        <Burger />
      </button>
      <a.div className="menu-sidebar" ref={sidebarRef} style={spring}>
        <div className="menu-top">
          <span></span>
          <button onClick={() => setOpen(!open)}>
            <ExitIcon />
          </button>
        </div>
        <div className="menu-inner">
          <div className="single-menu">
            <h3>Menu</h3>
            <ul>
              <li>
                <a href="#">
                  <span className="icon">
                    <LinkIcon />
                  </span>
                  Home
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon">
                    <LinkIcon />
                  </span>
                  About
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon">
                    <LinkIcon />
                  </span>
                  Blog
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon">
                    <LinkIcon />
                  </span>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="single-menu">
            <h3>Games</h3>
            <ul>
              <li>
                <a href="#">
                  <span className="icon">
                    <GameIcon />
                  </span>
                  Tekken
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon">
                    <GameIcon />
                  </span>
                  Street Fighter V
                </a>
              </li>
            </ul>
          </div>
          <div className="single-menu">
            <h3>Account</h3>
            <ul>
              <li>
                <a
                  href="#"
                  onClick={(e) => (e.preventDefault(), setLogin(true))}
                >
                  <span className="icon">
                    <Enter />
                  </span>
                  Login
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => (e.preventDefault(), setRegister(true))}
                >
                  <span className="icon">
                    <CheckMark />
                  </span>
                  Register
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="menu-bottom">
          <p>2020 © String Snatcher</p>
        </div>
      </a.div>
    </>
  );
}
