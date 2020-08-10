import React from "react";
import { MagnifyingGlass, Profile } from "../../styles/icons";
import NavSidebar from "./NavSidebar";

export default function Nav() {
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
            <button>
              <Profile />{" "}
            </button>
          </div>
          <div className="burger m-l-2">
            <NavSidebar />
          </div>
        </div>
      </div>
    </nav>
  );
}
