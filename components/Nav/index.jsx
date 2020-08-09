import React from "react";
import { MagnifyingGlass, Profile } from "../../styles/icons";

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
            <input type="text" />
          </div>
          <div className="profile">
            <button>
              <Profile />{" "}
            </button>
          </div>
          <div className="burge">
            <button></button>
          </div>
        </div>
      </div>
    </nav>
  );
}
