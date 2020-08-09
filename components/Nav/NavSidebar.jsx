import React, { useState } from "react";
import { Burger, ExitIcon } from "../../styles/icons";
import { makeClasses } from "../../lib/helpers";
import { useSpring, a } from "react-spring";

export default function NavSidebar() {
  const [open, setOpen] = useState(false);
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
  return (
    <>
      <button onClick={() => setOpen(!open)}>
        <Burger />
      </button>
      <a.div className="menu-sidebar" style={spring}>
        <div className="menu-top">
          <span></span>
          <button onClick={() => setOpen(!open)}>
            <ExitIcon />
          </button>
        </div>
        <div className="menu-inner">
          <div className="single-menu">
            <h3>Menu 1</h3>
            <ul>
              <li>
                <a href="#">Link</a>
              </li>
              <li>
                <a href="#">Link</a>
              </li>
              <li>
                <a href="#">Link</a>
              </li>
              <li>
                <a href="#">Link</a>
              </li>
              <li>
                <a href="#">Link</a>
              </li>
              <li>
                <a href="#">Link</a>
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
